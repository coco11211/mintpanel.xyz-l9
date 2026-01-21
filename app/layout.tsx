import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mintpanel.xyz"),
  title: {
    default: "MintPanel – Solana Token Creator",
    template: "%s | MintPanel",
  },
  description: "Solana token creator for SPL mints. Create tokens, set metadata, and manage authorities.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MintPanel – Solana Token Creator",
    description: "Create SPL tokens on Solana in seconds. Mint, burn, freeze, and manage authorities.",
    url: "/",
    siteName: "MintPanel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MintPanel – Solana Token Creator",
    description: "Create SPL tokens on Solana in seconds. Mint, burn, freeze, and manage authorities.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
