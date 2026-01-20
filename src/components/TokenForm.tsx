'use client'

import { useState, useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { createToken } from '@/lib/createToken'
import { uploadImage } from '@/lib/uploadImage'

interface TokenFormProps {
  onSuccess: (data: { mint: string; signature: string; plan: string }) => void
}

export function TokenForm({ onSuccess }: TokenFormProps) {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimals: 9,
    supply: '',
    description: '',
  })

  const [plan, setPlan] = useState<'basic' | 'advanced'>('basic')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setError(null)
    }
  }

  const estimatedNetworkFees = 0.002 // Approximate
  const serviceFee = plan === 'basic' ? 0.03 : 0.05
  const totalEstimated = estimatedNetworkFees + serviceFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!publicKey) {
      setError('Please connect your wallet')
      return
    }

    if (!imageFile) {
      setError('Please upload a token image')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Upload image first
      const imageUrl = await uploadImage(imageFile)

      // Create token
      const result = await createToken({
        connection,
        wallet: { publicKey, sendTransaction },
        tokenData: {
          name: formData.name,
          symbol: formData.symbol,
          decimals: formData.decimals,
          supply: parseFloat(formData.supply),
          description: formData.description,
          imageUrl,
        },
        plan,
      })

      onSuccess({
        mint: result.mint,
        signature: result.signature,
        plan,
      })
    } catch (err) {
      console.error('Token creation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to create token')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Create Your Token</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plan Selection */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <label className="block text-sm font-semibold mb-4">Select Plan</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPlan('basic')}
                  className={`p-4 rounded-lg border-2 transition ${
                    plan === 'basic'
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="font-semibold mb-1">Basic</div>
                  <div className="text-2xl font-bold text-primary">0.03 SOL</div>
                  <div className="text-xs text-gray-400 mt-2">Create token with metadata</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPlan('advanced')}
                  className={`p-4 rounded-lg border-2 transition ${
                    plan === 'advanced'
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="font-semibold mb-1">Advanced</div>
                  <div className="text-2xl font-bold text-primary">0.05 SOL</div>
                  <div className="text-xs text-gray-400 mt-2">Revoke all authorities</div>
                </button>
              </div>
            </div>

            {/* Token Details */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold mb-4">Token Details</h3>

              <div>
                <label className="block text-sm mb-2">Token Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="My Token"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Symbol</label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  placeholder="MTK"
                  required
                  maxLength={10}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Decimals</label>
                  <input
                    type="number"
                    value={formData.decimals}
                    onChange={(e) => setFormData({ ...formData, decimals: parseInt(e.target.value) })}
                    min={0}
                    max={9}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">Usually 9 for tokens</p>
                </div>

                <div>
                  <label className="block text-sm mb-2">Total Supply</label>
                  <input
                    type="number"
                    value={formData.supply}
                    onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
                    placeholder="1000000"
                    required
                    min={1}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your token..."
                  rows={3}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Token Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-black file:font-semibold"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg" />
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-black font-semibold py-4 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Token...' : 'Create Token'}
            </button>
          </form>
        </div>

        {/* Cost Breakdown Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 sticky top-4">
            <h3 className="font-semibold mb-4">Cost Breakdown</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Network fees (est.)</span>
                <span>{estimatedNetworkFees.toFixed(4)} SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">MintPanel service fee</span>
                <span className="text-primary font-semibold">{serviceFee.toFixed(2)} SOL</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold">
                <span>Total (estimated)</span>
                <span className="text-primary">{totalEstimated.toFixed(4)} SOL</span>
              </div>
            </div>

            {plan === 'advanced' && (
              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-sm font-semibold mb-3">Advanced Features</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">Mint authority revoked:</strong> No more tokens can be created</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">Freeze authority revoked:</strong> Accounts cannot be frozen</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">Metadata immutable:</strong> Token info cannot be changed</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="border-t border-gray-700 pt-4 mt-4">
              <p className="text-xs text-gray-500">
                If the transaction fails, nothing is charged. The service fee is included in the same transaction as token creation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
