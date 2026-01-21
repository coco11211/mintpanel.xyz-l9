"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check, X, ExternalLink, Copy, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Loading from "./loading"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState<string | null>(null)

  const mint = searchParams.get("mint")
  const signature = searchParams.get("tx")
  const name = searchParams.get("name")
  const symbol = searchParams.get("symbol")
  const mintRevoked = searchParams.get("mintRevoked") === "true"
  const freezeRevoked = searchParams.get("freezeRevoked") === "true"

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!mint || !signature) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground">No token information found.</p>
            <Button asChild>
              <Link href="/create">Create a Token</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isDevnet = process.env.NEXT_PUBLIC_SOLANA_RPC?.includes("devnet")
  const clusterSuffix = isDevnet ? "?cluster=devnet" : ""

  return (
    <div className="flex-1 py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Token Created Successfully
          </h1>
          <p className="text-muted-foreground">
            Your {name || "token"} ({symbol || "TOKEN"}) has been created on Solana
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Token Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {name && (
              <div>
                <Label className="text-xs text-muted-foreground">Token Name</Label>
                <p className="font-medium text-foreground">{name}</p>
              </div>
            )}
            {symbol && (
              <div>
                <Label className="text-xs text-muted-foreground">Symbol</Label>
                <p className="font-medium text-foreground">{symbol}</p>
              </div>
            )}
            <div>
              <Label className="text-xs text-muted-foreground">Mint Address</Label>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm break-all text-foreground flex-1">{mint}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(mint, "mint")}
                  className="shrink-0"
                >
                  {copied === "mint" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Transaction Signature</Label>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm break-all text-foreground flex-1">{signature}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(signature, "tx")}
                  className="shrink-0"
                >
                  {copied === "tx" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authority Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <Label className="text-xs text-muted-foreground">Mint Authority</Label>
                <p className="flex items-center gap-2 mt-1 text-foreground">
                  {mintRevoked ? (
                    <>
                      <X className="h-4 w-4 text-accent" />
                      <span>Revoked (Fixed Supply)</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-accent" />
                      <span>Active (You can mint more)</span>
                    </>
                  )}
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <Label className="text-xs text-muted-foreground">Freeze Authority</Label>
                <p className="flex items-center gap-2 mt-1 text-foreground">
                  {freezeRevoked ? (
                    <>
                      <X className="h-4 w-4 text-accent" />
                      <span>Revoked (Cannot freeze)</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-accent" />
                      <span>Active (You can freeze accounts)</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1">
            <a
              href={`https://solscan.io/tx/${signature}${clusterSuffix}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              View Transaction <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <a
              href={`https://solscan.io/token/${mint}${clusterSuffix}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              View Token <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/create" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Create Another Token{"\n"}<a className="underline" href={`/manage/${mintAddress}`}>Manage Token</a>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => {
              const url = window.location.href
              copyToClipboard(url, "url")
            }}
          >
            {copied === "url" ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Share This Page
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  
  const sp = useSearchParams()
  const mintAddress = sp.get("mint") || sp.get("mintAddress") || ""
return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Suspense fallback={<Loading />}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}



