"use client"

import { ReactNode, useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { useNetwork } from "@/contexts/NetworkContext"

import "@solana/wallet-adapter-react-ui/styles.css"

export default function WalletProviderWrapper({ children }: { children: ReactNode }) {
  const { network, connection } = useNetwork()

  // Convert network to WalletAdapterNetwork
  const walletNetwork = network === "mainnet-beta" ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet

  const wallets = useMemo(() => {
    // Create wallet adapters with network configuration
    return [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: walletNetwork }),
    ]
  }, [walletNetwork])

  const endpoint = useMemo(() => {
    return connection.rpcEndpoint
  }, [connection])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
