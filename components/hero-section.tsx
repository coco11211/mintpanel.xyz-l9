import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Eye } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Create a Solana token safely in minutes
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            MintPanel bundles all token creation steps into one atomic transaction. 
            Transparent pricing, no hidden fees, no wallet draining.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/create">Create Token</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Atomic Transactions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All-or-nothing execution. If any step fails, you pay nothing.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Eye className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Full Transparency</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See exact costs before signing. No surprises, no hidden charges.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Quick Setup</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect wallet, fill form, sign once. Token ready in minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
