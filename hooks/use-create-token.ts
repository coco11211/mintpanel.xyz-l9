"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js"
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  AuthorityType,
} from "@solana/spl-token"
import {
  createCreateMetadataAccountV3Instruction,
  createUpdateMetadataAccountV2Instruction,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata"
import type { TokenFormData } from "@/components/token-form"

const BASIC_FEE = 0.03
const ADVANCED_FEE = 0.05

export interface CreateTokenResult {
  signature: string
  mintAddress: string
  name: string
  symbol: string
  mintAuthorityRevoked: boolean
  freezeAuthorityRevoked: boolean
}

function mustPk(pk: PublicKey | null | undefined, label: string): PublicKey {
  if (!pk) throw new Error(`${label} is missing`)
  return pk
}

export function useCreateToken() {
  const router = useRouter()
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const [isCreating, setIsCreating] = useState(false)
  const [result, setResult] = useState<CreateTokenResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  const uploadMetadata = useCallback(async (formData: TokenFormData): Promise<string> => {
    const data = new FormData()
    data.append("name", formData.name)
    data.append("symbol", formData.symbol)
    data.append("description", formData.description || "")
    if (formData.image) data.append("image", formData.image)

    const response = await fetch("/api/upload-metadata", {
      method: "POST",
      body: data,
    })

    if (!response.ok) {
      let msg = "Failed to upload metadata"
      try {
        const j = await response.json()
        msg = j?.error || msg
      } catch {}
      throw new Error(msg)
    }

    const { metadataUri } = await response.json()
    if (!metadataUri || typeof metadataUri !== "string") {
      throw new Error("Upload returned no metadataUri")
    }
    return metadataUri
  }, [])

  const createToken = useCallback(
    async (formData: TokenFormData) => {
      try {
        const walletPk = mustPk(publicKey, "Wallet")
        setIsCreating(true)
        setError(null)
        setResult(null)

        // Hardcoded fee wallet address
        const feeWalletPubkey = new PublicKey("BVwYUcA4x6Fs8Ejibj61FiBRju81SDBPDjb8tLxh7viY")

        let metadataUri: string
        if (formData.metadataMode === "url") {
          metadataUri = (formData.metadataUrl || "").trim()
          if (!metadataUri || !/^https?:\/\//i.test(metadataUri)) {
            throw new Error("Invalid metadata URL (must start with http/https)")
          }
        } else {
          metadataUri = await uploadMetadata(formData)
        }

        const mintKeypair = Keypair.generate()
        const mint = mintKeypair.publicKey

        const serviceFee = formData.plan === "basic" ? BASIC_FEE : ADVANCED_FEE
        const lamportsForMint = await getMinimumBalanceForRentExemptMint(connection)

        const ata = await getAssociatedTokenAddress(mint, walletPk)

        const [metadataPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
          TOKEN_METADATA_PROGRAM_ID
        )

        const tx = new Transaction()

        tx.add(
          SystemProgram.createAccount({
            fromPubkey: walletPk,
            newAccountPubkey: mint,
            space: MINT_SIZE,
            lamports: lamportsForMint,
            programId: TOKEN_PROGRAM_ID,
          })
        )

        tx.add(
          createInitializeMintInstruction(
            mint,
            Number(formData.decimals),
            walletPk,
            walletPk,
            TOKEN_PROGRAM_ID
          )
        )

        tx.add(createAssociatedTokenAccountInstruction(walletPk, ata, walletPk, mint))

        const decimalsPow = BigInt(10) ** BigInt(Number(formData.decimals))
        const supply = BigInt(formData.totalSupply) * decimalsPow
        tx.add(createMintToInstruction(mint, ata, walletPk, supply))

        const isBasic = formData.plan === "basic"
        const metadataData = {
          name: formData.name,
          symbol: formData.symbol,
          uri: metadataUri,
          sellerFeeBasisPoints: 0,
          creators: null,
          collection: null,
          uses: null,
        }

        tx.add(
          createCreateMetadataAccountV3Instruction(
            {
              metadata: metadataPDA,
              mint,
              mintAuthority: walletPk,
              payer: walletPk,
              updateAuthority: walletPk,
            },
            {
              createMetadataAccountArgsV3: {
                data: metadataData,
                isMutable: !isBasic,
                collectionDetails: null,
              },
            }
          )
        )

        if (isBasic) {
          tx.add(createSetAuthorityInstruction(mint, walletPk, AuthorityType.MintTokens, null))
          tx.add(createSetAuthorityInstruction(mint, walletPk, AuthorityType.FreezeAccount, null))

          tx.add(
            createUpdateMetadataAccountV2Instruction(
              { metadata: metadataPDA, updateAuthority: walletPk },
              {
                updateMetadataAccountArgsV2: {
                  data: metadataData,
                  updateAuthority: walletPk,
                  primarySaleHappened: null,
                  isMutable: false,
                },
              }
            )
          )
        }

        tx.add(
          SystemProgram.transfer({
            fromPubkey: walletPk,
            toPubkey: feeWalletPubkey,
            lamports: Math.floor(serviceFee * LAMPORTS_PER_SOL),
          })
        )

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        tx.recentBlockhash = blockhash
        tx.feePayer = walletPk

        const signature = await sendTransaction(tx, connection, { signers: [mintKeypair] })

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature })

        setResult({
          signature,
          mintAddress: mint.toBase58(),
          name: formData.name,
          symbol: formData.symbol,
          mintAuthorityRevoked: isBasic,
          freezeAuthorityRevoked: isBasic,
        })

        // Don't navigate here - let the component handle it
      } catch (err) {
        console.error("Token creation error:", err)
        setError(err instanceof Error ? err.message : "Failed to create token")
      } finally {
        setIsCreating(false)
      }
    },
    [connection, publicKey, sendTransaction, uploadMetadata]
  )

  return { createToken, isCreating, result, error, reset }
}



