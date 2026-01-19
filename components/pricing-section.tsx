import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "0.03",
    description: "Fully immutable token - maximum safety",
    features: [
      "Create SPL token mint",
      "Upload metadata",
      "Mint initial supply",
      "Revoke mint authority (fixed supply)",
      "Revoke freeze authority",
      "Metadata locked forever",
    ],
    cta: "Create Immutable Token",
    highlighted: true,
  },
  {
    name: "Advanced",
    price: "0.05",
    description: "Keep control for future changes",
    features: [
      "Create SPL token mint",
      "Upload metadata",
      "Mint initial supply",
      "Keep mint authority (can mint more)",
      "Keep freeze authority",
      "Metadata remains editable",
    ],
    cta: "Create Flexible Token",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pay a small service fee plus network costs. That{"'"}s it.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-accent bg-card shadow-lg"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-4 py-1 text-xs font-medium text-accent-foreground">
                    Recommended
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="ml-2 text-muted-foreground">SOL + network fees</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-accent" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.highlighted ? "default" : "outline"}
                className="w-full"
              >
                <Link href={`/create?plan=${plan.name.toLowerCase()}`}>
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-border bg-muted/50 p-6">
          <h4 className="font-semibold text-foreground">Cost Breakdown</h4>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Network fees (Solana)</span>
              <span>~0.002 - 0.01 SOL</span>
            </div>
            <div className="flex justify-between">
              <span>MintPanel service fee</span>
              <span>0.03 or 0.05 SOL</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-medium text-foreground">
              <span>Total estimated</span>
              <span>~0.035 - 0.06 SOL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
