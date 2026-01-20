'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import { TokenForm } from '@/components/TokenForm'
import { SuccessDisplay } from '@/components/SuccessDisplay'

export default function CreatePage() {
  const { connected } = useWallet()
  const [createdToken, setCreatedToken] = useState<{
    mint: string
    signature: string
    plan: string
  } | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            MintPanel.xyz
          </Link>
          <WalletMultiButton className="!bg-primary !text-black hover:!bg-primary/90" />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {!connected ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-8">
              Connect your Solana wallet to create a token
            </p>
            <WalletMultiButton className="!bg-primary !text-black hover:!bg-primary/90 mx-auto" />
          </div>
        ) : createdToken ? (
          <SuccessDisplay 
            mint={createdToken.mint}
            signature={createdToken.signature}
            plan={createdToken.plan}
            onCreateAnother={() => setCreatedToken(null)}
          />
        ) : (
          <TokenForm onSuccess={setCreatedToken} />
        )}
      </main>
    </div>
  )
}
