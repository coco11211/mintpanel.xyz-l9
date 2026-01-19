import { Wallet, FileEdit, Send, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Connect your Solana wallet (Phantom, Solflare, or Backpack).",
  },
  {
    icon: FileEdit,
    title: "Fill Details",
    description: "Enter token name, symbol, supply, upload image, and choose your plan.",
  },
  {
    icon: Send,
    title: "Sign Transaction",
    description: "Review costs and sign one atomic transaction. Everything happens at once.",
  },
  {
    icon: CheckCircle,
    title: "Token Created",
    description: "Your token is live on Solana. View on Solscan and start using it.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps to create your Solana token
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="mt-4 text-sm font-medium text-accent">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-7 hidden h-0.5 w-full -translate-y-1/2 bg-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
