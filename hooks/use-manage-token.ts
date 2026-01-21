"use client"

import { useCallback, useMemo, useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction } from "@solana/web3.js"
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createBurnInstruction,
  createFreezeAccountInstruction,
  createThawAccountInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token"
import {
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
  createUpdateMetadataAccountV2Instruction,
} from "@metaplex-foundation/mpl-token-metadata"

function mustPk(pk: PublicKey | null | undefined, label: string): PublicKey {
  if (!pk) throw new Error(`${label} is missing`)
  return pk
}

export function useManageToken(mintStr: string) {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [busy, setBusy] = useState(false)
  const [lastSig, setLastSig] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mint = useMemo(() => {
    try { return new PublicKey(mintStr) } catch { return null }
  }, [mintStr])

  const metadataPda = useMemo(() => {
    if (!mint) return null
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      TOKEN_METADATA_PROGRAM_ID
    )
    return pda
  }, [mint])

  const getAta = useCallback(async (owner: PublicKey) => {
    if (!mint) throw new Error("Invalid mint")
    return getAssociatedTokenAddress(mint, owner)
  }, [mint])

  const ensureAtaIx = useCallback(async (owner: PublicKey, payer: PublicKey) => {
    if (!mint) throw new Error("Invalid mint")
    const ata = await getAta(owner)
    const info = await connection.getAccountInfo(ata)
    if (info) return { ata, ix: null as any }
    return {
      ata,
      ix: createAssociatedTokenAccountInstruction(payer, ata, owner, mint, TOKEN_PROGRAM_ID),
    }
  }, [mint, getAta, connection])

  const submit = useCallback(async (tx: Transaction) => {
    const walletPk = mustPk(publicKey, "Wallet")
    setBusy(true); setError(null); setLastSig(null)
    try {
      tx.feePayer = walletPk
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
      tx.recentBlockhash = blockhash
      const sig = await sendTransaction(tx, connection)
      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: sig })
      setLastSig(sig)
      return sig
    } catch (e: any) {
      setError(e?.message || "Transaction failed")
      throw e
    } finally {
      setBusy(false)
    }
  }, [connection, publicKey, sendTransaction])

  const mintMore = useCallback(async (amountBaseUnits: bigint) => {
    if (!mint) throw new Error("Invalid mint")
    const walletPk = mustPk(publicKey, "Wallet")
    const { ata, ix } = await ensureAtaIx(walletPk, walletPk)
    const tx = new Transaction()
    if (ix) tx.add(ix)
    tx.add(createMintToInstruction(mint, ata, walletPk, amountBaseUnits, [], TOKEN_PROGRAM_ID))
    return submit(tx)
  }, [mint, publicKey, ensureAtaIx, submit])

  const burnMine = useCallback(async (amountBaseUnits: bigint) => {
    if (!mint) throw new Error("Invalid mint")
    const walletPk = mustPk(publicKey, "Wallet")
    const { ata, ix } = await ensureAtaIx(walletPk, walletPk)
    const tx = new Transaction()
    if (ix) tx.add(ix)
    tx.add(createBurnInstruction(ata, mint, walletPk, amountBaseUnits, [], TOKEN_PROGRAM_ID))
    return submit(tx)
  }, [mint, publicKey, ensureAtaIx, submit])

  const freezeOwner = useCallback(async (ownerStr: string) => {
    if (!mint) throw new Error("Invalid mint")
    const walletPk = mustPk(publicKey, "Wallet")
    const owner = new PublicKey(ownerStr)
    const ata = await getAta(owner)
    const tx = new Transaction().add(createFreezeAccountInstruction(ata, mint, walletPk, [], TOKEN_PROGRAM_ID))
    return submit(tx)
  }, [mint, publicKey, getAta, submit])

  const thawOwner = useCallback(async (ownerStr: string) => {
    if (!mint) throw new Error("Invalid mint")
    const walletPk = mustPk(publicKey, "Wallet")
    const owner = new PublicKey(ownerStr)
    const ata = await getAta(owner)
    const tx = new Transaction().add(createThawAccountInstruction(ata, mint, walletPk, [], TOKEN_PROGRAM_ID))
    return submit(tx)
  }, [mint, publicKey, getAta, submit])

  const updateMetadata = useCallback(async (fields: { name: string; symbol: string; uri: string }) => {
    if (!mint) throw new Error("Invalid mint")
    const walletPk = mustPk(publicKey, "Wallet")
    if (!metadataPda) throw new Error("Metadata PDA missing")

    const name = (fields.name || "").trim()
    const symbol = (fields.symbol || "").trim()
    const uri = (fields.uri || "").trim()
    if (!name || !symbol || !uri) throw new Error("Name, symbol, and uri are required")

    const data = {
      name,
      symbol,
      uri,
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    }

    const ix = createUpdateMetadataAccountV2Instruction(
      { metadata: metadataPda, updateAuthority: walletPk },
      {
        updateMetadataAccountArgsV2: {
          data,
          updateAuthority: walletPk,
          primarySaleHappened: null,
          isMutable: true,
        },
      }
    )

    return submit(new Transaction().add(ix))
  }, [mint, metadataPda, publicKey, submit])

  return { mint, busy, lastSig, error, mintMore, burnMine, freezeOwner, thawOwner, updateMetadata }
}
