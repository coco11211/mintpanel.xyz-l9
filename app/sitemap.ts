import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mintpanel.xyz"
  const now = new Date()

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/create`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/solana-token-creator`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ]
}
