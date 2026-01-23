/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Empty turbopack config to silence warning - Solana packages work fine in modern browsers
  turbopack: {},
}

export default nextConfig