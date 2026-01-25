"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useManageToken } from "@/hooks/use-manage-token"
import { useNetwork } from "@/contexts/NetworkContext"

function toBigIntAmount(amount: string, decimals: number) {
  const a = amount.trim()
  if (!a) return 0n
  if (!/^\d+(\.\d+)?$/.test(a)) throw new Error("Amount must be a number")
  const [whole, frac = ""] = a.split(".")
  const fracPadded = (frac + "0".repeat(decimals)).slice(0, decimals)
  return BigInt(whole) * (10n ** BigInt(decimals)) + BigInt(fracPadded || "0")
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border px-2.5 py-1 text-xs text-gray-700">{children}</span>
}

export default function ManageTokenPage({ params }: { params: { mint: string } }) {
  const mintStr = params.mint
  const { publicKey } = useWallet()
  const { network } = useNetwork()
  const { busy, lastSig, error, mintMore, burnMine, freezeOwner, thawOwner, updateMetadata } = useManageToken(mintStr)

  const [tab, setTab] = useState<"supply" | "freeze" | "metadata">("supply")
  const [decimals, setDecimals] = useState<number>(9)

  const [mintAmt, setMintAmt] = useState("")
  const [burnAmt, setBurnAmt] = useState("")
  const [targetOwner, setTargetOwner] = useState("")

  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [uri, setUri] = useState("")

  const clusterParam = network === "mainnet-beta" ? "" : "?cluster=devnet"
  const explorerMint = useMemo(() => `https://explorer.solana.com/address/${mintStr}${clusterParam}`, [mintStr, clusterParam])
  const explorerSig = useMemo(() => lastSig ? `https://explorer.solana.com/tx/${lastSig}${clusterParam}` : "", [lastSig, clusterParam])

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      {!publicKey && (
        <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 p-4 text-center">
          <p className="text-sm font-medium text-yellow-800">Please connect your wallet to manage this token</p>
        </div>
      )}

      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Manage Token</h1>
          <div className="text-sm text-gray-600 break-all">
            Mint: <a className="underline" href={explorerMint} target="_blank" rel="noreferrer">{mintStr}</a>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill>{network === "mainnet-beta" ? "Mainnet" : "Devnet"}</Pill>
            {publicKey ? <Pill>Wallet connected</Pill> : <Pill>Connect wallet to use actions</Pill>}
          </div>
          <div className="text-sm">
            <Link className="underline" href="/create">Create another</Link>
          </div>
        </div>

        <div className="shrink-0">
          <WalletMultiButton />
        </div>
      </header>

      <section className="rounded-2xl border p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">Decimals</div>
            <div className="text-xs text-gray-600">Used only for amount conversion in this panel.</div>
          </div>
          <input
            className="w-24 rounded-xl border px-3 py-2"
            type="number"
            min={0}
            max={18}
            value={decimals}
            onChange={(e) => setDecimals(Number(e.target.value))}
          />
        </div>

        <div className="flex gap-2">
          <button className={`rounded-xl border-2 px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${tab==="supply" ? "bg-black text-white border-black" : "border-gray-300 hover:border-black hover:bg-gray-50"}`} onClick={() => setTab("supply")}>Supply</button>
          <button className={`rounded-xl border-2 px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${tab==="freeze" ? "bg-black text-white border-black" : "border-gray-300 hover:border-black hover:bg-gray-50"}`} onClick={() => setTab("freeze")}>Freeze</button>
          <button className={`rounded-xl border-2 px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${tab==="metadata" ? "bg-black text-white border-black" : "border-gray-300 hover:border-black hover:bg-gray-50"}`} onClick={() => setTab("metadata")}>Metadata</button>
        </div>

        {tab === "supply" && (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border p-4 space-y-2">
                <div className="text-sm font-medium">Mint more</div>
                <div className="flex gap-2">
                  <input className="flex-1 rounded-xl border px-3 py-2" placeholder="Amount" value={mintAmt} onChange={(e) => setMintAmt(e.target.value)} />
                  <button
                    className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-60 hover:bg-gray-800 transition-colors cursor-pointer font-medium"
                    disabled={busy || !publicKey}
                    onClick={async () => {
                      try {
                        if (!mintAmt.trim()) {
                          alert("Please enter an amount to mint")
                          return
                        }
                        const amt = toBigIntAmount(mintAmt, decimals)
                        if (amt === 0n) {
                          alert("Amount must be greater than 0")
                          return
                        }
                        console.log("Minting", amt.toString(), "base units...")
                        await mintMore(amt)
                        setMintAmt("")
                      } catch (err: any) {
                        console.error("Mint error:", err)
                        alert(`Mint failed: ${err?.message || err}`)
                      }
                    }}
                  >
                    {busy ? "Processing..." : "Mint"}
                  </button>
                </div>
                <div className="text-xs text-gray-600">Requires your wallet is the mint authority.</div>
              </div>

              <div className="rounded-xl border p-4 space-y-2">
                <div className="text-sm font-medium">Burn (from your wallet)</div>
                <div className="flex gap-2">
                  <input className="flex-1 rounded-xl border px-3 py-2" placeholder="Amount" value={burnAmt} onChange={(e) => setBurnAmt(e.target.value)} />
                  <button
                    className="rounded-xl border-2 border-black px-4 py-2 disabled:opacity-60 hover:bg-gray-100 transition-colors cursor-pointer font-medium"
                    disabled={busy || !publicKey}
                    onClick={async () => {
                      try {
                        if (!burnAmt.trim()) {
                          alert("Please enter an amount to burn")
                          return
                        }
                        const amt = toBigIntAmount(burnAmt, decimals)
                        if (amt === 0n) {
                          alert("Amount must be greater than 0")
                          return
                        }
                        console.log("Burning", amt.toString(), "base units...")
                        await burnMine(amt)
                        setBurnAmt("")
                      } catch (err: any) {
                        console.error("Burn error:", err)
                        alert(`Burn failed: ${err?.message || err}`)
                      }
                    }}
                  >
                    {busy ? "Processing..." : "Burn"}
                  </button>
                </div>
                <div className="text-xs text-gray-600">Burns tokens from your associated token account.</div>
              </div>
            </div>
          </div>
        )}

        {tab === "freeze" && (
          <div className="space-y-3">
            <div className="text-sm font-medium">Freeze / Thaw an owner’s token account</div>
            <input className="w-full rounded-xl border px-3 py-2" placeholder="Owner wallet address" value={targetOwner} onChange={(e) => setTargetOwner(e.target.value)} />
            <div className="flex gap-2">
              <button className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-60 hover:bg-gray-800 transition-colors cursor-pointer font-medium" disabled={busy || !publicKey} onClick={async () => {
                try {
                  if (!targetOwner.trim()) {
                    alert("Please enter a wallet address")
                    return
                  }
                  console.log("Freezing account for owner:", targetOwner)
                  await freezeOwner(targetOwner)
                  setTargetOwner("")
                } catch (err: any) {
                  console.error("Freeze error:", err)
                  alert(`Freeze failed: ${err?.message || err}`)
                }
              }}>{busy ? "Processing..." : "Freeze"}</button>
              <button className="rounded-xl border-2 border-black px-4 py-2 disabled:opacity-60 hover:bg-gray-100 transition-colors cursor-pointer font-medium" disabled={busy || !publicKey} onClick={async () => {
                try {
                  if (!targetOwner.trim()) {
                    alert("Please enter a wallet address")
                    return
                  }
                  console.log("Thawing account for owner:", targetOwner)
                  await thawOwner(targetOwner)
                  setTargetOwner("")
                } catch (err: any) {
                  console.error("Thaw error:", err)
                  alert(`Thaw failed: ${err?.message || err}`)
                }
              }}>{busy ? "Processing..." : "Thaw"}</button>
            </div>
            <div className="text-xs text-gray-600">Requires your wallet is the freeze authority.</div>
          </div>
        )}

        {tab === "metadata" && (
          <div className="space-y-3">
            <div className="text-sm font-medium">Update token metadata</div>
            <div className="grid gap-2">
              <input className="w-full rounded-xl border px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="w-full rounded-xl border px-3 py-2" placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
              <input className="w-full rounded-xl border px-3 py-2" placeholder="Metadata URI (https://...)" value={uri} onChange={(e) => setUri(e.target.value)} />
            </div>
            <button className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-60 hover:bg-gray-800 transition-colors cursor-pointer font-medium" disabled={busy || !publicKey} onClick={async () => {
              try {
                if (!name.trim() || !symbol.trim() || !uri.trim()) {
                  alert("Please fill in all fields (name, symbol, and URI)")
                  return
                }
                console.log("Updating metadata:", { name, symbol, uri })
                await updateMetadata({ name, symbol, uri })
                setName("")
                setSymbol("")
                setUri("")
              } catch (err: any) {
                console.error("Update metadata error:", err)
                alert(`Update metadata failed: ${err?.message || err}`)
              }
            }}>
              {busy ? "Processing..." : "Update"}
            </button>
            <div className="text-xs text-gray-600">Requires your wallet is the update authority.</div>
          </div>
        )}
      </section>

      {(error || lastSig || busy) && (
        <section className="rounded-2xl border p-4 space-y-2">
          {busy && <div className="text-sm text-blue-600">Processing transaction...</div>}
          {error && <div className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded">{error}</div>}
          {lastSig && (
            <div className="text-sm text-green-600 font-medium bg-green-50 p-3 rounded">
              Success! Transaction: <a className="underline" href={explorerSig} target="_blank" rel="noreferrer">{lastSig}</a>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
