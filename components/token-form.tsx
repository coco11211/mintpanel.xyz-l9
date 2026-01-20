"use client"

import React from "react"
import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, AlertTriangle, Loader2 } from "lucide-react"
import { useCreateToken } from "@/hooks/use-create-token"

export type Plan = "basic" | "advanced"

export interface TokenFormData {
  name: string
  symbol: string
  decimals: number
  totalSupply: string
  description: string
  image: File | null
  metadataUrl: string
  metadataMode: "upload" | "url"
  plan: Plan
}

interface TokenFormProps {
  initialPlan?: Plan
}

export function TokenForm({ initialPlan = "basic" }: TokenFormProps) {
  const router = useRouter()
  const { connected, publicKey } = useWallet()
  const { setVisible } = useWalletModal()
  const { createToken, isCreating, result, error, reset } = useCreateToken()

  // Redirect to success page when token is created
  useEffect(() => {
    if (result) {
      const params = new URLSearchParams({
        mint: result.mintAddress,
        tx: result.signature,
        name: result.name,
        symbol: result.symbol || "",
        mintRevoked: result.mintAuthorityRevoked ? "true" : "false",
        freezeRevoked: result.freezeAuthorityRevoked ? "true" : "false",
      })
      router.push(`/success?${params.toString()}`)
    }
  }, [result, router])

  const [formData, setFormData] = useState<TokenFormData>({
    name: "",
    symbol: "",
    decimals: 9,
    totalSupply: "1000000000",
    description: "",
    image: null,
    metadataUrl: "",
    metadataMode: "upload",
    plan: initialPlan,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected) {
      setVisible(true)
      return
    }
    await createToken(formData)
  }

  const serviceFee = formData.plan === "basic" ? 0.03 : 0.05
  const estimatedNetworkFee = 0.01
  const totalEstimated = serviceFee + estimatedNetworkFee

  // Show loading while redirecting to success page
  if (result) {
    return (
      <div className="mx-auto max-w-2xl flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const isFormValid =
    formData.name &&
    formData.symbol &&
    (formData.metadataMode === "upload" ? formData.image : formData.metadataUrl)

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Token Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Token Name</Label>
              <Input
                id="name"
                placeholder="My Token"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                maxLength={32}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="MTK"
                value={formData.symbol}
                onChange={(e) => setFormData((prev) => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                required
                maxLength={10}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="decimals">Decimals</Label>
              <Input
                id="decimals"
                type="number"
                min={0}
                max={9}
                value={formData.decimals}
                onChange={(e) => setFormData((prev) => ({ ...prev, decimals: parseInt(e.target.value) || 0 }))}
                required
              />
              <p className="text-xs text-muted-foreground">Usually 9 for Solana tokens</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supply">Total Supply</Label>
              <Input
                id="supply"
                type="text"
                placeholder="1000000000"
                value={formData.totalSupply}
                onChange={(e) => setFormData((prev) => ({ ...prev, totalSupply: e.target.value.replace(/[^0-9]/g, "") }))}
                required
              />
              <p className="text-xs text-muted-foreground">Raw amount (before decimals)</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional for URL mode)</Label>
            <Textarea
              id="description"
              placeholder="Describe your token..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="space-y-4">
            <Label>Metadata Source</Label>
            <RadioGroup
              value={formData.metadataMode}
              onValueChange={(val: "upload" | "url") => setFormData(prev => ({ ...prev, metadataMode: val }))}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="mode-upload" />
                <Label htmlFor="mode-upload">Upload Image (Auto-create JSON)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="url" id="mode-url" />
                <Label htmlFor="mode-url">Existing Metadata JSON URL</Label>
              </div>
            </RadioGroup>

            {formData.metadataMode === "upload" ? (
              <div className="space-y-2">
                <Label>Token Image</Label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-border">
                      <img src={imagePreview || "/placeholder.svg"} alt="Token preview" className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-border bg-muted">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, or GIF. Max 5MB.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="metadataUrl">Metadata JSON URL</Label>
                <Input
                  id="metadataUrl"
                  placeholder="https://mysite.com/metadata.json"
                  value={formData.metadataUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, metadataUrl: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">Must be a valid HTTPS URL pointing to a JSON file conforming to Metaplex standard.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Choose Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.plan}
            onValueChange={(value: Plan) => setFormData((prev) => ({ ...prev, plan: value }))}
            className="grid gap-4 sm:grid-cols-2"
          >
            <Label
              htmlFor="basic"
              className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${formData.plan === "basic" ? "border-accent bg-accent/5" : "border-border"
                }`}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="basic" id="basic" />
                <span className="font-semibold text-foreground">Basic (Immutable)</span>
                <span className="ml-auto text-sm font-medium text-foreground">0.03 SOL</span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>Fixed supply forever</li>
                <li>Mint authority revoked</li>
                <li>Freeze authority revoked</li>
                <li>Metadata locked</li>
              </ul>
            </Label>
            <Label
              htmlFor="advanced"
              className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${formData.plan === "advanced" ? "border-accent bg-accent/5" : "border-border"
                }`}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <span className="font-semibold text-foreground">Advanced (Flexible)</span>
                <span className="ml-auto text-sm font-medium text-foreground">0.05 SOL</span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>Keep mint authority</li>
                <li>Keep freeze authority</li>
                <li>Editable metadata</li>
                <li>Full control retained</li>
              </ul>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <Alert className="border-border bg-muted/50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>About Mint Authority:</strong> The mint authority can create more tokens.
          Revoking it makes your token supply fixed forever. This cannot be undone.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated network fees</span>
              <span className="text-foreground">~{estimatedNetworkFee} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MintPanel service fee</span>
              <span className="text-foreground">{serviceFee} SOL</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-medium">
              <span className="text-foreground">Total estimated</span>
              <span className="text-foreground">~{totalEstimated.toFixed(3)} SOL</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isCreating || !isFormValid}
      >
        {isCreating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Token...
          </>
        ) : connected ? (
          "Create Token"
        ) : (
          "Connect Wallet to Continue"
        )}
      </Button>
    </form>
  )
}
