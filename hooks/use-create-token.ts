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

function pk(value: PublicKey | null | undefined, label: string): PublicKey {
  if (!value) throw new Error(`${label} is missing`)
  return value
}

function pow10BigInt(decimals: number): bigint {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 18) throw new Error("Invalid decimals")
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
    if (!response.ok) {
      let msg = "Failed to upload metadata"
      try {
        const j = await response.json()
        msg = j?.error || msg
      } catch {}
      throw new Error(msg)
    }

    const json = await response.json()
    const uri = (json?.metadataUri || "") as string
    if (!uri.startsWith("http")) throw new Error("Invalid metadata URI returned")
    return uri
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
        setError("Invalid NEXT_PUBLIC_FEE_WALLET address")
        return
      }

      setIsCreating(true)

      try {
        // 1) metadata uri
        let metadataUri = ""
        if (formData.metadataMode === "url") {
          metadataUri = (formData.metadataUrl || "").trim()
          if (!metadataUri.startsWith("http")) throw new Error("Invalid metadata URL")
        } else {
          metadataUri = await uploadMetadata(formData)
        }

        // 2) mint + rent + ata
        const mintKeypair = Keypair.generate()
        const mint = mintKeypair.publicKey

        const lamportsForMint = await getMinimumBalanceForRentExemptMint(connection)
        const ata = await getAssociatedTokenAddress(mint, publicKey)

        // 3) metadata PDA (web3.js keys, non-umi)
        const [metadataPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
          TOKEN_METADATA_PROGRAM_ID
        )

        // 4) build tx
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

        tx.add(createInitializeMintInstruction(mint, formData.decimals, publicKey, publicKey))
        tx.add(createAssociatedTokenAccountInstruction(publicKey, ata, publicKey, mint))

        const totalSupplyStr = String(formData.totalSupply ?? "").trim()
        if (!/^\d+$/.test(totalSupplyStr)) throw new Error("Total supply must be a whole number")

        const supply = BigInt(totalSupplyStr) * pow10BigInt(formData.decimals)
        tx.add(createMintToInstruction(mint, ata, publicKey, supply))

        const isImmutable = formData.plan === "basic"

        // Create metadata (v2 SDK, no Umi)
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

        // If basic/immutable: revoke authorities (token immutability side)
        if (isImmutable) {
          tx.add(createSetAuthorityInstruction(mint, publicKey, AuthorityType.MintTokens, null))
          tx.add(createSetAuthorityInstruction(mint, publicKey, AuthorityType.FreezeAccount, null))
        }

        // service fee
        const fee = isImmutable ? BASIC_FEE : ADVANCED_FEE
        tx.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: feeWallet,
            lamports: Math.floor(fee * LAMPORTS_PER_SOL),
          })
        )

        const sig = await sendTransaction(tx, connection, { signers: [mintKeypair] })

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
        setError(e?.message ?? "Token creation failed")
      } finally {
        setIsCreating(false)
      }
    },
    [connection, publicKey, sendTransaction, uploadMetadata]
  )

  return { createToken, isCreating, result, error, reset }
}
