import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Solana Token Creator – Create SPL Tokens Instantly",
  description:
    "Create SPL tokens on Solana in seconds. Mint, burn, freeze, revoke authorities, and manage token metadata with a simple dashboard.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Solana Token Creator</h1>
        <p className="text-gray-600">
          MintPanel lets you create SPL tokens on Solana fast. Create a mint, set supply and decimals,
          attach token metadata, and control authorities.
        </p>
        <div className="flex gap-3">
          <Link className="underline" href="/create">Create a token</Link>
          <Link className="underline" href="/faq">FAQ</Link>
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">How to create a Solana token (SPL)</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Connect your wallet.</li>
          <li>Choose token name, symbol, decimals, and supply.</li>
          <li>Add metadata (name/symbol/description/image).</li>
          <li>Deploy the mint and receive a transaction signature.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Mint, burn, freeze, and revoke authorities</h2>
        <p>
          SPL tokens can be managed by mint authority and freeze authority. You can mint more supply,
          burn tokens, freeze accounts, and revoke authorities when you want immutability.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Why use MintPanel</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Simple token creation UI for Solana SPL mints</li>
          <li>Supports token metadata (Metaplex Token Metadata)</li>
          <li>Plan options: immutable (basic) vs controllable (advanced)</li>
        </ul>
      </section>
    </main>
  )
}
