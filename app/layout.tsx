import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

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
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
