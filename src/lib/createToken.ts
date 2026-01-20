import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import {
  createInitializeMint2Instruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  AuthorityType,
} from '@solana/spl-token'
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID as METADATA_PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata'

interface TokenData {
  name: string
  symbol: string
  decimals: number
  supply: number
  description: string
  imageUrl: string
}

interface CreateTokenParams {
  connection: Connection
  wallet: {
    publicKey: PublicKey
    sendTransaction: (transaction: Transaction, connection: Connection) => Promise<string>
  }
  tokenData: TokenData
  plan: 'basic' | 'advanced'
}

export async function createToken({
  connection,
  wallet,
  tokenData,
  plan,
}: CreateTokenParams): Promise<{ mint: string; signature: string }> {
  const { publicKey, sendTransaction } = wallet
  const { name, symbol, decimals, supply, description, imageUrl } = tokenData

  // Generate new mint keypair
  const mintKeypair = Keypair.generate()
  const mint = mintKeypair.publicKey

  // Get fee wallet from env
  const feeWallet = new PublicKey(process.env.NEXT_PUBLIC_FEE_WALLET!)
  const serviceFee = plan === 'basic' ? 0.03 : 0.05
  const serviceFeelamports = serviceFee * 1e9 // Convert SOL to lamports

  // Get associated token account
  const associatedTokenAddress = await getAssociatedTokenAddress(
    mint,
    publicKey,
    false,
    TOKEN_PROGRAM_ID
  )

  // Create metadata account address
  const [metadataAddress] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  )

  // Calculate mint rent
  const lamports = await getMinimumBalanceForRentExemptMint(connection)

  // Build transaction instructions
  const instructions: TransactionInstruction[] = []

  // 1. Create mint account
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: publicKey,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    })
  )

  // 2. Initialize mint
  instructions.push(
    createInitializeMint2Instruction(
      mint,
      decimals,
      publicKey, // mint authority
      publicKey, // freeze authority
      TOKEN_PROGRAM_ID
    )
  )

  // 3. Create associated token account
  instructions.push(
    createAssociatedTokenAccountInstruction(
      publicKey, // payer
      associatedTokenAddress,
      publicKey, // owner
      mint,
      TOKEN_PROGRAM_ID
    )
  )

  // 4. Mint initial supply
  const amount = supply * Math.pow(10, decimals)
  instructions.push(
    createMintToInstruction(
      mint,
      associatedTokenAddress,
      publicKey, // mint authority
      amount,
      [],
      TOKEN_PROGRAM_ID
    )
  )

  // 5. Create metadata account
  // Metadata will be hosted at: https://mintpanel.xyz/metadata/{mint}.json
  const metadataUri = `${process.env.NEXT_PUBLIC_APP_URL || 'https://mintpanel.xyz'}/metadata/${mint.toBase58()}.json`
  
  instructions.push(
    createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataAddress,
        mint: mint,
        mintAuthority: publicKey,
        payer: publicKey,
        updateAuthority: publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name,
            symbol,
            uri: metadataUri,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: plan === 'basic', // Advanced plan makes it immutable
          collectionDetails: null,
        },
      }
    )
  )

  // 6. If advanced plan, revoke authorities
  if (plan === 'advanced') {
    // Revoke mint authority
    instructions.push(
      createSetAuthorityInstruction(
        mint,
        publicKey, // current authority
        AuthorityType.MintTokens,
        null, // new authority (null = revoke)
        [],
        TOKEN_PROGRAM_ID
      )
    )

    // Revoke freeze authority
    instructions.push(
      createSetAuthorityInstruction(
        mint,
        publicKey, // current authority
        AuthorityType.FreezeAccount,
        null, // new authority (null = revoke)
        [],
        TOKEN_PROGRAM_ID
      )
    )
    
    // Note: Update authority for metadata is handled by setting isMutable to false
  }

  // 7. Transfer service fee to MintPanel fee wallet
  instructions.push(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: feeWallet,
      lamports: serviceFeelamports,
    })
  )

  // Create and send transaction
  const transaction = new Transaction().add(...instructions)
  transaction.feePayer = publicKey
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

  // Sign with mint keypair
  transaction.partialSign(mintKeypair)

  // Send transaction
  const signature = await sendTransaction(transaction, connection)

  // Wait for confirmation
  await connection.confirmTransaction(signature, 'confirmed')

  // Store metadata on server
  await fetch('/api/metadata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mint: mint.toBase58(),
      metadata: {
        name,
        symbol,
        description,
        image: imageUrl,
      },
    }),
  })

  return {
    mint: mint.toBase58(),
    signature,
  }
}
