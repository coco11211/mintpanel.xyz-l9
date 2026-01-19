"use client"

import { useState, useCallback } from "react"
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

const FEE_WALLET = process.env.NEXT_PUBLIC_FEE_WALLET || ""
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

  const uploadMetadata = async (formData: TokenFormData): Promise<string> => {
    const data = new FormData()
    data.append("name", formData.name)
    data.append("symbol", formData.symbol)
    data.append("description", formData.description)
    if (formData.image) {
      data.append("image", formData.image)
    }

    const response = await fetch("/api/upload-metadata", {
      method: "POST",
      body: data,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to upload metadata")
    }

    const { metadataUri } = await response.json()
    return metadataUri
  }

  const createToken = useCallback(
    async (formData: TokenFormData) => {
      if (!publicKey) {
        setError("Please connect your wallet")
        return
      }

      if (!FEE_WALLET) {
        setError("Fee wallet not configured")
        return
      }

      setIsCreating(true)
      setError(null)
      setResult(null)

      try {
        // Step 1: Upload metadata to IPFS
        const metadataUri = await uploadMetadata(formData)

        // Step 2: Create mint keypair
        const mintKeypair = Keypair.generate()
        const mint = mintKeypair.publicKey

        // Step 3: Calculate fees
        const serviceFee = formData.plan === "basic" ? BASIC_FEE : ADVANCED_FEE
        const lamportsForMint = await getMinimumBalanceForRentExemptMint(connection)
        const feeWalletPubkey = new PublicKey(FEE_WALLET)

        // Step 4: Get associated token account
        const associatedTokenAccount = await getAssociatedTokenAddress(mint, publicKey)

        // Step 5: Get metadata PDA
        const [metadataPDA] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )

        // Step 6: Build transaction
        const transaction = new Transaction()

        // Create mint account
        transaction.add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mint,
            space: MINT_SIZE,
            lamports: lamportsForMint,
            programId: TOKEN_PROGRAM_ID,
          })
        )

        // Initialize mint
        transaction.add(
          createInitializeMintInstruction(
            mint,
            formData.decimals,
            publicKey, // mint authority
            publicKey, // freeze authority
            TOKEN_PROGRAM_ID
          )
        )

        // Create associated token account
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey, // payer
            associatedTokenAccount,
            publicKey, // owner
            mint
          )
        )

        // Mint initial supply
        const supply = BigInt(formData.totalSupply) * BigInt(10 ** formData.decimals)
        transaction.add(
          createMintToInstruction(
            mint,
            associatedTokenAccount,
            publicKey, // mint authority
            supply
          )
        )

        // Create metadata account
        // Basic = immutable (isMutable: false), Advanced = flexible (isMutable: true)
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
            {
              metadata: metadataPDA,
              mint: mint,
              mintAuthority: publicKey,
              payer: publicKey,
              updateAuthority: publicKey,
            },
            {
              createMetadataAccountArgsV3: {
                data: metadataData,
                isMutable: !isImmutable,
                collectionDetails: null,
              },
            }
          )
        )

        // Basic plan: Revoke authorities and make token fully immutable
        if (isImmutable) {
          // Revoke mint authority (no more tokens can ever be minted)
          transaction.add(
            createSetAuthorityInstruction(
              mint,
              publicKey,
              AuthorityType.MintTokens,
              null
            )
          )

          // Revoke freeze authority (tokens can never be frozen)
          transaction.add(
            createSetAuthorityInstruction(
              mint,
              publicKey,
              AuthorityType.FreezeAccount,
              null
            )
          )

          // Make metadata immutable
          transaction.add(
            createUpdateMetadataAccountV2Instruction(
              {
                metadata: metadataPDA,
                updateAuthority: publicKey,
              },
              {
                updateMetadataAccountArgsV2: {
                  data: metadataData,
                  updateAuthority: publicKey,
                  primarySaleHappened: null,
                  isMutable: false,
                },
              }
            )
          )
        }

        // Transfer service fee
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: feeWalletPubkey,
            lamports: Math.floor(serviceFee * LAMPORTS_PER_SOL),
          })
        )

        // Step 7: Send transaction
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash
        transaction.feePayer = publicKey

        const signature = await sendTransaction(transaction, connection, {
          signers: [mintKeypair],
        })

        // Wait for confirmation
        await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        })

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
    [connection, publicKey, sendTransaction]
  )

  return {
    createToken,
    isCreating,
    result,
    error,
    reset,
  }
}
