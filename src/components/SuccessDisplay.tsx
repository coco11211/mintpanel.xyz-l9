'use client'

interface SuccessDisplayProps {
  mint: string
  signature: string
  plan: string
  onCreateAnother: () => void
}

export function SuccessDisplay({ mint, signature, plan, onCreateAnother }: SuccessDisplayProps) {
  const network = 'devnet' // Change to 'mainnet-beta' for production
  const solscanUrl = `https://solscan.io/token/${mint}?cluster=${network}`
  const txUrl = `https://solscan.io/tx/${signature}?cluster=${network}`

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/50 border border-primary rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2">Token Created Successfully!</h2>
          <p className="text-gray-400">Your {plan} token is now live on Solana</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Mint Address</div>
            <div className="font-mono text-sm break-all">{mint}</div>
            <a
              href={solscanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm mt-2 inline-block"
            >
              View on Solscan →
            </a>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Transaction Signature</div>
            <div className="font-mono text-sm break-all">{signature}</div>
            <a
              href={txUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm mt-2 inline-block"
            >
              View Transaction →
            </a>
          </div>
        </div>

        {plan === 'advanced' && (
          <div className="bg-primary/10 border border-primary rounded-lg p-4 mb-8">
            <h3 className="font-semibold mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Authorities Revoked
            </h3>
            <ul className="space-y-1 text-sm">
              <li>✓ Mint authority removed - Supply is fixed</li>
              <li>✓ Freeze authority removed - Accounts cannot be frozen</li>
              <li>✓ Update authority removed - Metadata is permanent</li>
            </ul>
          </div>
        )}

        <button
          onClick={onCreateAnother}
          className="w-full bg-primary text-black font-semibold py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Create Another Token
        </button>
      </div>
    </div>
  )
}
