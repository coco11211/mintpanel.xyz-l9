"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useManageToken } from "@/hooks/use-manage-token"

function toBigIntAmount(amount: string, decimals: number) {
  const a = amount.trim()
  if (!a) return 0n
  if (!/^\d+(\.\d+)?$/.test(a)) throw new Error("Amount must be a number")
  const [whole, frac = ""] = a.split(".")
  const fracPadded = (frac + "0".repeat(decimals)).slice(0, decimals)
  return BigInt(whole) * (10n ** BigInt(decimals)) + BigInt(fracPadded || "0")
}

export default function ManageTokenPage({ params }: { params: { mint: string } }) {
  const mintStr = params.mint
  const { busy, lastSig, error, mintMore, burnMine, freezeOwner, thawOwner, updateMetadata } =
    useManageToken(mintStr)

  const [decimals, setDecimals] = useState<number>(9)
  const [mintAmt, setMintAmt] = useState("")
  const [burnAmt, setBurnAmt] = useState("")
  const [targetOwner, setTargetOwner] = useState("")
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [uri, setUri] = useState("")

  const explorerSig = useMemo(
    () => (lastSig ? `https://explorer.solana.com/tx/${lastSig}?cluster=devnet` : null),
    [lastSig]
  )
  const explorerMint = useMemo(
    () => `https://explorer.solana.com/address/${mintStr}?cluster=devnet`,
    [mintStr]
  )

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Manage Token</h1>
        <div className="text-sm break-all">
          Mint:{" "}
          <a className="underline" href={explorerMint} target="_blank" rel="noreferrer">
            {mintStr}
          </a>
        </div>
        <div className="flex gap-3 text-sm">
          <Link className="underline" href="/create">Create another</Link>
        </div>
      </header>

      <section className="space-y-3 p-4 rounded-xl border">
        <h2 className="text-xl font-semibold">Decimals</h2>
        <p className="text-sm text-gray-600">Set this to your token’s decimals so amounts convert correctly.</p>
        <input className="w-32 border rounded px-3 py-2" type="number" min={0} max={18}
          value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} />
      </section>

      <section className="space-y-3 p-4 rounded-xl border">
        <h2 className="text-xl font-semibold">Mint more tokens</h2>
        <div className="flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" placeholder="Amount (e.g. 1000)"
            value={mintAmt} onChange={(e) => setMintAmt(e.target.value)} />
          <button className="border rounded px-4 py-2" disabled={busy}
            onClick={async () => { const amt = toBigIntAmount(mintAmt, decimals); await mintMore(amt) }}>
            Mint
          </button>
        </div>
        <p className="text-xs text-gray-600">Requires your wallet is the mint authority.</p>
      </section>

      <section className="space-y-3 p-4 rounded-xl border">
        <h2 className="text-xl font-semibold">Burn tokens (from your wallet)</h2>
        <div className="flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" placeholder="Amount (e.g. 100)"
            value={burnAmt} onChange={(e) => setBurnAmt(e.target.value)} />
          <button className="border rounded px-4 py-2" disabled={busy}
            onClick={async () => { const amt = toBigIntAmount(burnAmt, decimals); await burnMine(amt) }}>
            Burn
          </button>
        </div>
      </section>

      <section className="space-y-3 p-4 rounded-xl border">
        <h2 className="text-xl font-semibold">Freeze / Thaw an account</h2>
        <input className="w-full border rounded px-3 py-2" placeholder="Owner wallet address to freeze/thaw"
          value={targetOwner} onChange={(e) => setTargetOwner(e.target.value)} />
        <div className="flex gap-2">
          <button className="border rounded px-4 py-2" disabled={busy} onClick={() => freezeOwner(targetOwner)}>Freeze</button>
          <button className="border rounded px-4 py-2" disabled={busy} onClick={() => thawOwner(targetOwner)}>Thaw</button>
        </div>
        <p className="text-xs text-gray-600">Requires your wallet is the freeze authority.</p>
      </section>

      <section className="space-y-3 p-4 rounded-xl border">
        <h2 className="text-xl font-semibold">Update token metadata</h2>
        <input className="w-full border rounded px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Metadata URI (https://...)" value={uri} onChange={(e) => setUri(e.target.value)} />
        <button className="border rounded px-4 py-2" disabled={busy} onClick={() => updateMetadata({ name, symbol, uri })}>
          Update metadata
        </button>
      </section>

      {(error || lastSig) && (
        <section className="space-y-2 p-4 rounded-xl border">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {explorerSig && (
            <div className="text-sm">
              Last tx: <a className="underline" href={explorerSig} target="_blank" rel="noreferrer">{lastSig}</a>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
