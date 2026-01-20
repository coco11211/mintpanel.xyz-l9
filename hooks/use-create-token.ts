"use client"

import { useState, useCallback } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js"
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
} from "@metaplex-foundation/mpl-token-metadata"
import type { TokenFormData } from "@/components/token-form"

const BASIC_FEE = 0.03
const ADVANCED_FEE = 0.05

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
)

export interface CreateTokenResult {
  signature: string
  mintAddress: string
  name: string
  symbol: string
  mintAuthorityRevoked: boolean
  freezeAuthorityRevoked: boolean
}

function pk(value: PublicKey | null | undefined, label: string): PublicKey {
  if (!value) throw new Error(`${label} is missing`)
  return value
}

function pow10BigInt(decimals: number): bigint {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 18) {
    throw new Error("Invalid decimals")
  }
  return 10n ** BigInt(decimals)
}

export function useCreateToken() {
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

    const response = await fetch("/api/upload-metadata", { method: "POST", body: data })
    if (!response.ok) throw new Error("Failed to upload metadata")

    const json = await response.json()
    if (!json?.metadataUri?.startsWith("http")) {
      throw new Error("Invalid metadata URI returned")
    }
    return json.metadataUri
  }, [])

  const createToken = useCallback(
    async (formData: TokenFormData) => {
      setError(null)
      setResult(null)

      if (!publicKey) {
        setError("Please connect your wallet")
        return
      }

      const feeWalletStr = process.env.NEXT_PUBLIC_FEE_WALLET
      if (!feeWalletStr) {
        setError("Missing NEXT_PUBLIC_FEE_WALLET env var")
        return
      }

      let feeWallet: PublicKey
      try {
        feeWallet = new PublicKey(feeWalletStr)
      } catch {
        setError("Invalid fee wallet address")
        return
      }

      setIsCreating(true)

      try {
        const metadataUri =
          formData.metadataMode === "url"
            ? formData.metadataUrl
            : await uploadMetadata(formData)

        const mintKeypair = Keypair.generate()
        const mint = mintKeypair.publicKey

        const lamportsForMint = await getMinimumBalanceForRentExemptMint(connection)
        const ata = await getAssociatedTokenAddress(mint, publicKey)

        const [metadataPDA] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )

        const tx = new Transaction()

        tx.add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mint,
            space: MINT_SIZE,
            lamports: lamportsForMint,
            programId: TOKEN_PROGRAM_ID,
          })
        )

        tx.add(
          createInitializeMintInstruction(
            mint,
            formData.decimals,
            publicKey,
            publicKey
          )
        )

        tx.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            ata,
            publicKey,
            mint
          )
        )

        const supply =
          BigInt(formData.totalSupply) * pow10BigInt(formData.decimals)

        tx.add(createMintToInstruction(mint, ata, publicKey, supply))

        const isImmutable = formData.plan === "basic"

        tx.add(
          createCreateMetadataAccountV3Instruction(
            {
              metadata: metadataPDA,
              mint,
              mintAuthority: publicKey,
              payer: publicKey,
              updateAuthority: publicKey,
            },
            {
              createMetadataAccountArgsV3: {
                data: {
                  name: formData.name,
                  symbol: formData.symbol,
                  uri: metadataUri,
                  sellerFeeBasisPoints: 0,
                  creators: null,
                  collection: null,
                  uses: null,
                },
                isMutable: !isImmutable,
                collectionDetails: null,
              },
            }
          )
        )

        if (isImmutable) {
          tx.add(
            createSetAuthorityInstruction(
              mint,
              publicKey,
              AuthorityType.MintTokens,
              null
            )
          )
          tx.add(
            createSetAuthorityInstruction(
              mint,
              publicKey,
              AuthorityType.FreezeAccount,
              null
            )
          )
        }

        tx.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: feeWallet,
            lamports: Math.floor(
              (isImmutable ? BASIC_FEE : ADVANCED_FEE) * LAMPORTS_PER_SOL
            ),
          })
        )

        const sig = await sendTransaction(tx, connection, {
          signers: [mintKeypair],
        })

        setResult({
          signature: sig,
          mintAddress: mint.toBase58(),
          name: formData.name,
          symbol: formData.symbol,
          mintAuthorityRevoked: isImmutable,
          freezeAuthorityRevoked: isImmutable,
        })
      } catch (e: any) {
        console.error(e)
        setError(e.message ?? "Token creation failed")
      } finally {
        setIsCreating(false)
      }
    },
    [connection, publicKey, sendTransaction, uploadMetadata]
  )

  return { createToken, isCreating, result, error, reset }
}
