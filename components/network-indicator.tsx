"use client"

import { useEffect, useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { clusterApiUrl } from "@solana/web3.js"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2, Globe } from "lucide-react"

export function NetworkIndicator() {
  const { connection } = useConnection()
  const { connected } = useWallet()
  const [networkName, setNetworkName] = useState<string>("")
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(true)

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        const rpcEndpoint = connection.rpcEndpoint
        const expectedNetwork =
          (process.env.NEXT_PUBLIC_SOLANA_NETWORK as string) || "devnet"

        // Determine network based on RPC endpoint
        let detectedNetwork = "custom"
        if (rpcEndpoint.includes("devnet")) {
          detectedNetwork = "devnet"
        } else if (rpcEndpoint.includes("mainnet")) {
          detectedNetwork = "mainnet-beta"
        } else if (rpcEndpoint.includes("testnet")) {
          detectedNetwork = "testnet"
        }

        setNetworkName(detectedNetwork)

        // Check if we're on the expected network
        const expectedDevnet = expectedNetwork === "devnet"
        const isDevnet = detectedNetwork === "devnet"
        setIsCorrectNetwork(expectedDevnet === isDevnet || detectedNetwork === "custom")
      } catch (error) {
        console.error("Error checking network:", error)
      }
    }

    checkNetwork()
  }, [connection])

  if (!connected) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isCorrectNetwork ? (
        <Alert variant="destructive" className="max-w-md shadow-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Network Warning:</strong> Your wallet may be on the wrong
            network. Expected: {process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"},
            Connected to: {networkName}. Please switch your wallet network.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-lg">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Network:</span>
          <span className="font-medium text-foreground capitalize">
            {networkName}
          </span>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </div>
      )}
    </div>
  )
}
