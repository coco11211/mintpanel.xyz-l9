"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const sp = useSearchParams()

  // Accept either ?mint=... or ?mintAddress=...
  const mintAddress = sp.get("mint") || sp.get("mintAddress") || ""
  const signature = sp.get("signature") || sp.get("sig") || ""
  const name = sp.get("name") || ""
  const symbol = sp.get("symbol") || ""

  const explorerTx = useMemo(() => {
    if (!signature) return ""
    return `https://explorer.solana.com/tx/${signature}?cluster=devnet`
  }, [signature])

  const explorerMint = useMemo(() => {
    if (!mintAddress) return ""
    return `https://explorer.solana.com/address/${mintAddress}?cluster=devnet`
  }, [mintAddress])

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Token Created Successfully</h1>
        {(name || symbol) && (
          <p className="text-gray-600">
            {name ? name : "Your token"}{symbol ? ` (${symbol})` : ""} has been created on Solana.
          </p>
        )}
      </header>

      <section className="space-y-3 p-4 rounded-xl border">
        <h2 className="text-lg font-semibold">Token Details</h2>

        <div className="text-sm space-y-1">
          {name && <div><span className="text-gray-600">Name:</span> {name}</div>}
          {symbol && <div><span className="text-gray-600">Symbol:</span> {symbol}</div>}

          <div className="break-all">
            <span className="text-gray-600">Mint:</span>{" "}
            {mintAddress ? (
              <a className="underline" href={explorerMint} target="_blank" rel="noreferrer">{mintAddress}</a>
            ) : (
              <span className="text-gray-500">Missing mint in URL</span>
            )}
          </div>

          <div className="break-all">
            <span className="text-gray-600">Signature:</span>{" "}
            {signature ? (
              <a className="underline" href={explorerTx} target="_blank" rel="noreferrer">{signature}</a>
            ) : (
              <span className="text-gray-500">Missing signature in URL</span>
            )}
          </div>
        </div>

        <div className="pt-2 flex gap-4 text-sm">
          <Link className="underline" href="/create">Create Another Token</Link>
          {mintAddress && (
            <Link className="underline" href={`/manage/${mintAddress}`}>Manage Token</Link>
          )}
        </div>
      </section>

      <section className="space-y-2 text-sm text-gray-600">
        <div>Tip: If “Manage Token” is missing, open the success page with <code>?mint=YOUR_MINT</code>.</div>
      </section>
    </main>
  )
}
