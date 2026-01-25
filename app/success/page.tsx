import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // In Next.js 15+, searchParams is async
  const params = await searchParams

  const mint =
    typeof params?.mint === "string"
      ? params?.mint
      : Array.isArray(params?.mint)
      ? params?.mint[0]
      : ""

  const sig =
    typeof params?.sig === "string"
      ? params?.sig
      : Array.isArray(params?.sig)
      ? params?.sig[0]
      : ""

  const network =
    typeof params?.network === "string"
      ? params?.network
      : Array.isArray(params?.network)
      ? params?.network[0]
      : "devnet"

  const clusterParam = network === "mainnet-beta" ? "" : "?cluster=devnet"
  const networkLabel = network === "mainnet-beta" ? "Mainnet" : "Devnet"
  const txUrl = sig ? `https://explorer.solana.com/tx/${sig}${clusterParam}` : ""
  const mintUrl = mint ? `https://explorer.solana.com/address/${mint}${clusterParam}` : ""

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Token Created Successfully</h1>
        <p className="text-gray-600">Your token was created on Solana {networkLabel}.</p>
      </header>

      <section className="rounded-xl border p-4 space-y-2">
        <div className="text-sm text-gray-600">Mint Address</div>
        <div className="break-all font-mono text-sm">{mint || "(missing mint param)"}</div>
        {mintUrl && (
          <a className="underline text-sm" href={mintUrl} target="_blank" rel="noreferrer">
            View Token
          </a>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link className="rounded border px-4 py-2" href="/create">
          Create Another Token
        </Link>

        {mint && (
          <Link className="rounded border px-4 py-2" href={`/manage/${mint}`}>
            Manage Token
          </Link>
        )}

        {txUrl && (
          <a className="rounded border px-4 py-2" href={txUrl} target="_blank" rel="noreferrer">
            View Transaction
          </a>
        )}
      </div>
    </main>
  )
}

