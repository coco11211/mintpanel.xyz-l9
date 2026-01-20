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
        const errorData = await response.json()
        msg = errorData?.error || msg
      } catch {}
      throw new Error(msg)
    }

    const json = await response.json()
    const metadataUri = json?.metadataUri as string | undefined
    if (!metadataUri || !metadataUri.startsWith("http")) throw new Error("Upload returned invalid metadataUri")
    return metadataUri
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

      let feeWalletPubkey: PublicKey
      try {
        feeWalletPubkey = new PublicKey(feeWalletStr)
      } catch {
        setError("Invalid NEXT_PUBLIC_FEE_WALLET address")
        return
      }

      setIsCreating(true)

      try {
        let metadataUri: string
        if (formData.metadataMode === "url") {
          metadataUri = (formData.metadataUrl || "").trim()
          if (!metadataUri.startsWith("http")) throw new Error("Invalid metadata URL")
        } else {
          metadataUri = await uploadMetadata(formData)
        }

        const mintKeypair = Keypair.generate()
        const mint = mintKeypair.publicKey

        const serviceFee = formData.plan === "basic" ? BASIC_FEE : ADVANCED_FEE
        const lamportsForMint = await getMinimumBalanceForRentExemptMint(connection)

        const associatedTokenAccount = await getAssociatedTokenAddress(pk(mint, "Mint"), pk(publicKey, "Wallet"))

        const [metadataPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("metadata"), pk(TOKEN_METADATA_PROGRAM_ID, "Metadata Program").toBuffer(), pk(mint, "Mint").toBuffer()],
          TOKEN_METADATA_PROGRAM_ID
        )

        const transaction = new Transaction()

        transaction.add(
          SystemProgram.createAccount({
            fromPubkey: pk(publicKey, "Wallet"),
            newAccountPubkey: pk(mint, "Mint"),
            space: MINT_SIZE,
            lamports: lamportsForMint,
            programId: TOKEN_PROGRAM_ID,
          })
        )

        transaction.add(
          createInitializeMintInstruction(mint, formData.decimals, publicKey, publicKey, TOKEN_PROGRAM_ID)
        )

        transaction.add(
          createAssociatedTokenAccountInstruction(publicKey, associatedTokenAccount, publicKey, mint)
        )

        const totalSupplyStr = String(formData.totalSupply ?? "").trim()
        if (!/^\d+$/.test(totalSupplyStr)) throw new Error("Total supply must be a whole number")
        const supplyBase = BigInt(totalSupplyStr) * pow10BigInt(formData.decimals)

        transaction.add(createMintToInstruction(mint, associatedTokenAccount, publicKey, supplyBase))

        const isImmutable = formData.plan === "basic"
        const metadataData = {
          name: formData.name,
          symbol: formData.symbol,
          uri: metadataUri,
          sellerFeeBasisPoints: 0,
          creators: null,
          collection: null,
          uses: null,
        }

        transaction.add(
          createCreateMetadataAccountV3Instruction(
            { metadata: metadataPDA, mint, mintAuthority: publicKey, payer: publicKey, updateAuthority: publicKey },
            { createMetadataAccountArgsV3: { data: metadataData, isMutable: !isImmutable, collectionDetails: null } }
          )
        )

        if (isImmutable) {
          transaction.add(createSetAuthorityInstruction(mint, publicKey, AuthorityType.MintTokens, null))
          transaction.add(createSetAuthorityInstruction(mint, publicKey, AuthorityType.FreezeAccount, null))
          transaction.add(
            createUpdateMetadataAccountV2Instruction(
              { metadata: metadataPDA, updateAuthority: publicKey },
              { updateMetadataAccountArgsV2: { data: metadataData, updateAuthority: publicKey, primarySaleHappened: null, isMutable: false } }
            )
          )
        }

        transaction.add(
          SystemProgram.transfer({
            fromPubkey: pk(publicKey, "Wallet"),
            toPubkey: pk(feeWalletPubkey, "Fee Wallet"),
            lamports: Math.floor(serviceFee * LAMPORTS_PER_SOL),
          })
        )

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash
        transaction.feePayer = publicKey

        const signature = await sendTransaction(transaction, connection, { signers: [mintKeypair] })

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature })

        setResult({
          signature,
          mintAddress: mint.toBase58(),
          name: formData.name,
          symbol: formData.symbol,
          mintAuthorityRevoked: isImmutable,
          freezeAuthorityRevoked: isImmutable,
        })
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
