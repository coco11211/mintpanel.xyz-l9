import type { Metadata } from "next"
import "./globals.css"
import WalletProviderWrapper from "@/components/WalletProviderWrapper"
import { NetworkIndicator } from "@/components/network-indicator"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mintpanel.xyz"),
  title: {
    default: "MintPanel – Solana Token Creator",
    template: "%s | MintPanel",
  },
  description: "Solana token creator for SPL mints. Create tokens, set metadata, and manage authorities.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProviderWrapper>
          {children}
          <NetworkIndicator />
        </WalletProviderWrapper>
      </body>
    </html>
  )
}
