import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MintPanel.xyz</h1>
          <Link 
            href="/create"
            className="bg-primary text-black px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Create Token
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Create a Solana token safely in minutes
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Launch your SPL token with transparent pricing. No hidden fees, no wallet draining, one transaction only.
          </p>
          <Link 
            href="/create"
            className="inline-block bg-primary text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition"
          >
            Get Started
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Basic Token</h3>
            <div className="text-3xl font-bold text-primary mb-4">0.03 SOL</div>
            <p className="text-gray-400 mb-6">+ network fees</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Create SPL token mint</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Mint initial supply</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Upload token metadata</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-primary/50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Advanced Token</h3>
            <div className="text-3xl font-bold text-primary mb-4">0.05 SOL</div>
            <p className="text-gray-400 mb-6">+ network fees</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Everything in Basic</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Revoke mint authority</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Revoke freeze authority</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Make metadata immutable</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Why MintPanel?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-primary text-4xl mb-2">✓</div>
              <h4 className="font-semibold mb-2">No Hidden Fees</h4>
              <p className="text-gray-400 text-sm">
                Service fee is shown upfront and included in one transaction
              </p>
            </div>
            <div>
              <div className="text-primary text-4xl mb-2">✓</div>
              <h4 className="font-semibold mb-2">Safe & Transparent</h4>
              <p className="text-gray-400 text-sm">
                We never request private keys or auto-sign anything
              </p>
            </div>
            <div>
              <div className="text-primary text-4xl mb-2">✓</div>
              <h4 className="font-semibold mb-2">Simple Pricing</h4>
              <p className="text-gray-400 text-sm">
                Pay per use. No subscriptions, no premium unlocks
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500">
          <p>MintPanel.xyz - Simple, safe Solana token creation</p>
        </div>
      </footer>
    </div>
  )
}
