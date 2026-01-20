# Quick Start Deployment Guide

## Prerequisites

1. Vercel account (free tier works)
2. Solana wallet for receiving fees
3. (Optional) GitHub account for version control

## Step-by-Step Deployment

### Step 1: Get Your Fee Wallet Address

1. Open Phantom/Solflare/Backpack wallet
2. Copy your wallet address
3. Save it - you'll need this for environment variables

Example: `7xK9...(your full address)...YzPq`

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Fastest)

```bash
# Install dependencies
npm install

# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? N (for first deploy)
# - Project name: mintpanel
# - Directory: ./ (press Enter)
```

After deployment, set environment variables:

```bash
vercel env add NEXT_PUBLIC_SOLANA_RPC
# Paste: https://api.devnet.solana.com

vercel env add NEXT_PUBLIC_FEE_WALLET
# Paste your wallet address

# Redeploy with new env vars
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import this code (upload folder or connect GitHub)
4. Configure project:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Install Command: `npm install`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SOLANA_RPC = https://api.devnet.solana.com
   NEXT_PUBLIC_FEE_WALLET = YOUR_WALLET_ADDRESS
   ```
6. Click "Deploy"

### Step 3: Enable Vercel Blob Storage

Vercel Blob is automatically enabled for your project. No manual setup needed!

The `BLOB_READ_WRITE_TOKEN` is automatically injected by Vercel.

### Step 4: Connect Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add `mintpanel.xyz`
4. Follow DNS configuration instructions

### Step 5: Test on Devnet

1. Visit your deployed URL
2. Connect wallet (make sure it's on Devnet)
3. Create a test token
4. Verify on Solscan: https://solscan.io/token/[mint]?cluster=devnet

### Step 6: Switch to Mainnet (When Ready)

Update environment variables in Vercel:

```
NEXT_PUBLIC_SOLANA_RPC = https://api.mainnet-beta.solana.com
```

Or use a premium RPC:
- Helius: `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY`
- QuickNode: `https://your-endpoint.quiknode.pro/YOUR_KEY/`

Also update `src/components/SuccessDisplay.tsx`:
```typescript
const network = 'mainnet-beta' // line 9
```

Redeploy:
```bash
vercel --prod
```

## Environment Variables Summary

| Variable | Devnet Value | Mainnet Value |
|----------|--------------|---------------|
| `NEXT_PUBLIC_SOLANA_RPC` | `https://api.devnet.solana.com` | `https://api.mainnet-beta.solana.com` |
| `NEXT_PUBLIC_FEE_WALLET` | Your devnet wallet | Your mainnet wallet |

## Troubleshooting

### Deployment fails

Check:
- `npm install` runs successfully locally
- `npm run build` completes without errors
- No TypeScript errors: `npm run lint`

### "Blob storage not available"

- Vercel Blob is automatic on paid plans
- Free tier has limits but should work
- Check Vercel dashboard → Storage tab

### Metadata not loading

- Wait 30 seconds after token creation
- Check: `https://your-domain.vercel.app/metadata/[mint].json`
- Verify blob storage is enabled

### Transaction fails

- Ensure wallet has enough SOL (devnet: use faucet)
- Check fee wallet address is valid Solana address
- Verify RPC endpoint is reachable

## Getting Devnet SOL

For testing on devnet:
```bash
solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet
```

Or use web faucet: https://faucet.solana.com

## Monitoring

Check Vercel deployment logs:
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Click latest deployment
5. View "Functions" logs

## Next Steps

1. ✅ Deploy to devnet
2. ✅ Test token creation
3. ✅ Verify metadata loads
4. ✅ Check Solscan
5. ⏸️  Wait before mainnet
6. ⚡ Switch to mainnet RPC
7. 🚀 Launch!

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Test transaction on Solscan explorer
3. Verify environment variables are set
4. Check browser console (F12)

---

**Security Reminder:**
- Never commit `.env.local` to GitHub
- Keep your fee wallet private key secure
- Test thoroughly on devnet first
