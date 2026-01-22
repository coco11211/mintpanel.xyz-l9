"use client"

import { ReactNode, useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl, type Cluster } from "@solana/web3.js"

import "@solana/wallet-adapter-react-ui/styles.css"

export default function WalletProviderWrapper({ children }: { children: ReactNode }) {
  // Determine network from environment or default to devnet
  const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster | undefined) || "devnet"

  const endpoint = useMemo(() => {
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC || process.env.NEXT_PUBLIC_RPC
    if (rpcUrl && rpcUrl.startsWith("http")) {
      return rpcUrl
    }
    return clusterApiUrl(network)
  }, [network])

  const wallets = useMemo(() => {
    // Create wallet adapters with network configuration
    return [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ]
  }, [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
