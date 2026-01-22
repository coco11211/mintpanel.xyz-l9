"use client"

import { ReactNode, useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

import "@solana/wallet-adapter-react-ui/styles.css"

export default function WalletProviderWrapper({ children }: { children: ReactNode }) {
  // Determine network from environment or default to devnet
  const networkEnv = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"
  const network = networkEnv === "mainnet-beta" ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet

  const endpoint = useMemo(() => {
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC || process.env.NEXT_PUBLIC_RPC
    if (rpcUrl && rpcUrl.startsWith("http")) {
      return rpcUrl
    }
    return clusterApiUrl(networkEnv as "devnet" | "mainnet-beta")
  }, [networkEnv])

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
