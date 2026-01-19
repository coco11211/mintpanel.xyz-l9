"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { WalletProvider } from "@/components/wallet-provider"
import { WalletButton } from "@/components/wallet-button"
import { TokenForm, type Plan } from "@/components/token-form"
import { ArrowLeft } from "lucide-react"

export function CreatePageContent() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get("plan")
  const initialPlan: Plan = planParam === "advanced" ? "advanced" : "basic"

  return (
    <WalletProvider>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-primary-foreground"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground">MintPanel</span>
            </div>
            <WalletButton />
          </div>
        </header>

        <main className="py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Create Your Token</h1>
              <p className="mt-2 text-muted-foreground">
                Fill in the details below to create your Solana SPL token
              </p>
            </div>
            <TokenForm initialPlan={initialPlan} />
          </div>
        </main>
      </div>
    </WalletProvider>
  )
}
