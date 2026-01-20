# MintPanel.xyz

Create Solana SPL tokens safely with transparent pricing. No hidden fees, no wallet draining.

## Features

- **Two Plans:**
  - Basic (0.03 SOL): Create SPL token with metadata
  - Advanced (0.05 SOL): + Revoke all authorities for maximum safety

- **Self-hosted Metadata:** No IPFS, no third-party storage dependencies
- **Atomic Transactions:** Everything happens in one transaction or nothing does
- **Transparent Pricing:** Service fee clearly shown and included in transaction
- **Wallet Support:** Phantom, Solflare, Backpack

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Solana Web3.js
- @solana/spl-token
- Metaplex Token Metadata
- Vercel Blob Storage (for images and metadata)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local`:

```env
# Solana RPC (use devnet for testing)
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com

# Your fee collection wallet address
NEXT_PUBLIC_FEE_WALLET=YOUR_WALLET_ADDRESS_HERE

# App URL (set automatically by Vercel in production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Replace `YOUR_WALLET_ADDRESS_HERE` with your actual Solana wallet address that will receive service fees.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `NEXT_PUBLIC_SOLANA_RPC`
   - Add `NEXT_PUBLIC_FEE_WALLET`
   - Vercel automatically sets `BLOB_READ_WRITE_TOKEN` for Blob Storage

### Method 2: GitHub Integration

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables
4. Deploy

### Method 3: Direct Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mintpanel)

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SOLANA_RPC` | Solana RPC endpoint | Yes |
| `NEXT_PUBLIC_FEE_WALLET` | Your fee collection wallet | Yes |
| `NEXT_PUBLIC_APP_URL` | Base URL (auto-set by Vercel) | No |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (auto-set) | No |

## Switching from Devnet to Mainnet

1. Update `NEXT_PUBLIC_SOLANA_RPC`:
```env
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
```

Or use a paid RPC for better reliability:
- Helius: `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY`
- QuickNode: `https://your-endpoint.quiknode.pro/YOUR_KEY/`

2. Update network references in `src/components/SuccessDisplay.tsx`:
```typescript
const network = 'mainnet-beta' // Changed from 'devnet'
```

3. Redeploy to Vercel

## Project Structure

```
mintpanel/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload/          # Image upload to Vercel Blob
│   │   │   └── metadata/        # Metadata storage API
│   │   ├── create/              # Token creation page
│   │   ├── metadata/[mint]/     # Public metadata JSON endpoint
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Landing page
│   │   └── globals.css
│   ├── components/
│   │   ├── TokenForm.tsx        # Main token creation form
│   │   ├── SuccessDisplay.tsx   # Post-creation success screen
│   │   └── WalletProviderWrapper.tsx
│   └── lib/
│       ├── createToken.ts       # Core Solana transaction logic
│       └── uploadImage.ts       # Image upload helper
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## How It Works

### Token Creation Flow

1. **User connects wallet** (Phantom, Solflare, or Backpack)
2. **Fills form:** Name, symbol, decimals, supply, description, image
3. **Selects plan:** Basic or Advanced
4. **Clicks "Create Token":**
   - Image uploads to Vercel Blob
   - Builds atomic Solana transaction with:
     - Create mint account
     - Initialize mint
     - Create associated token account
     - Mint initial supply
     - Create metadata account
     - (Advanced) Revoke authorities
     - Transfer service fee to MintPanel wallet
5. **Transaction succeeds or fails atomically**
6. **Metadata stored** at `/metadata/{mint}.json`

### Metadata Hosting

Metadata and images are self-hosted:
- Images: Vercel Blob Storage (permanent URLs)
- Metadata JSON: Vercel Blob Storage
- Accessible at: `https://mintpanel.xyz/metadata/{mint}.json`

This is **standard and acceptable** for fungible SPL tokens.

## Security Notes

- ✅ Never requests private keys
- ✅ Never auto-signs transactions
- ✅ All operations require user approval
- ✅ Service fee bundled in transaction (can't charge separately)
- ✅ Atomic execution (all-or-nothing)

## Cost Breakdown

**Basic Plan (0.03 SOL):**
- Network fees: ~0.002 SOL
- MintPanel service fee: 0.03 SOL
- Total: ~0.032 SOL

**Advanced Plan (0.05 SOL):**
- Network fees: ~0.002 SOL
- MintPanel service fee: 0.05 SOL
- Total: ~0.052 SOL

## Testing Checklist

- [ ] Test on devnet first
- [ ] Verify metadata URL is accessible
- [ ] Check Solscan shows correct token info
- [ ] Test Basic plan (authorities retained)
- [ ] Test Advanced plan (authorities revoked)
- [ ] Verify service fee transfer
- [ ] Test with different wallets
- [ ] Check mobile responsiveness

## Troubleshooting

### "Failed to create token"
- Check wallet has enough SOL
- Verify RPC endpoint is working
- Check browser console for errors

### "Metadata not found"
- Ensure Vercel Blob Storage is enabled
- Check `BLOB_READ_WRITE_TOKEN` is set
- Verify metadata API route is deployed

### Transaction fails
- Ensure fee wallet address is valid
- Check network fees are sufficient
- Verify RPC isn't rate-limiting

## Future Enhancements (Optional)

- Token management dashboard
- Bulk token creation
- CSV import for airdrops
- Liquidity pool integration
- Analytics tracking

## Support

For issues or questions:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test transaction on Solscan
4. Check browser console for errors

## License

MIT

---

Built with ❤️ for the Solana ecosystem
