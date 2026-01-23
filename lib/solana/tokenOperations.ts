import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  Connection,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createInitializeMint2Instruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createSetAuthorityInstruction,
  AuthorityType,
  createBurnInstruction,
  createFreezeAccountInstruction,
  createThawAccountInstruction,
} from "@solana/spl-token";
import { SolanaNetwork } from "./constants";

// Metaplex Token Metadata Program
const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

export interface TokenMetadata {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints?: number;
  creators?: null;
}

export interface CreateTokenParams {
  connection: Connection;
  payer: PublicKey;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  metadataUri: string;
  isMutable: boolean;
  keepMintAuthority: boolean;
  keepFreezeAuthority: boolean;
}

export interface CreateTokenResult {
  mintKeypair: Keypair;
  transaction: Transaction;
  mintAddress: string;
}

// Get metadata PDA
function getMetadataPDA(mint: PublicKey): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    TOKEN_METADATA_PROGRAM_ID
  );
  return pda;
}

// Create metadata instruction (simplified - using raw instruction)
function createMetadataInstruction(
  metadataPDA: PublicKey,
  mint: PublicKey,
  mintAuthority: PublicKey,
  payer: PublicKey,
  updateAuthority: PublicKey,
  name: string,
  symbol: string,
  uri: string,
  isMutable: boolean
): TransactionInstruction {
  const data = Buffer.alloc(1000);
  let offset = 0;

  // Instruction discriminator for CreateMetadataAccountV3
  data.writeUInt8(33, offset);
  offset += 1;

  // Name (string with length prefix)
  const nameBytes = Buffer.from(name);
  data.writeUInt32LE(nameBytes.length, offset);
  offset += 4;
  nameBytes.copy(data, offset);
  offset += nameBytes.length;

  // Symbol (string with length prefix)
  const symbolBytes = Buffer.from(symbol);
  data.writeUInt32LE(symbolBytes.length, offset);
  offset += 4;
  symbolBytes.copy(data, offset);
  offset += symbolBytes.length;

  // URI (string with length prefix)
  const uriBytes = Buffer.from(uri);
  data.writeUInt32LE(uriBytes.length, offset);
  offset += 4;
  uriBytes.copy(data, offset);
  offset += uriBytes.length;

  // Seller fee basis points
  data.writeUInt16LE(0, offset);
  offset += 2;

  // Creators (None)
  data.writeUInt8(0, offset);
  offset += 1;

  // Collection (None)
  data.writeUInt8(0, offset);
  offset += 1;

  // Uses (None)
  data.writeUInt8(0, offset);
  offset += 1;

  // Is mutable
  data.writeUInt8(isMutable ? 1 : 0, offset);
  offset += 1;

  // Collection details (None)
  data.writeUInt8(0, offset);
  offset += 1;

  const instructionData = data.subarray(0, offset);

  return new TransactionInstruction({
    keys: [
      { pubkey: metadataPDA, isSigner: false, isWritable: true },
      { pubkey: mint, isSigner: false, isWritable: false },
      { pubkey: mintAuthority, isSigner: true, isWritable: false },
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: updateAuthority, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: TOKEN_METADATA_PROGRAM_ID,
    data: instructionData,
  });
}

export async function buildCreateTokenTransaction(
  params: CreateTokenParams
): Promise<CreateTokenResult> {
  const { connection, payer, name, symbol, decimals, supply, metadataUri, isMutable, keepMintAuthority, keepFreezeAuthority } = params;

  const mintKeypair = Keypair.generate();
  const mintAddress = mintKeypair.publicKey;

  // Get rent
  const lamportsForMint = await getMinimumBalanceForRentExemptMint(connection);

  // Get ATA
  const ata = await getAssociatedTokenAddress(mintAddress, payer);

  // Get metadata PDA
  const metadataPDA = getMetadataPDA(mintAddress);

  const transaction = new Transaction();

  // 1. Create mint account
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mintAddress,
      space: MINT_SIZE,
      lamports: lamportsForMint,
      programId: TOKEN_PROGRAM_ID,
    })
  );

  // 2. Initialize mint
  transaction.add(
    createInitializeMint2Instruction(
      mintAddress,
      decimals,
      payer, // mint authority
      keepFreezeAuthority ? payer : null, // freeze authority
      TOKEN_PROGRAM_ID
    )
  );

  // 3. Create metadata
  transaction.add(
    createMetadataInstruction(
      metadataPDA,
      mintAddress,
      payer,
      payer,
      payer,
      name,
      symbol,
      metadataUri,
      isMutable
    )
  );

  // 4. Create ATA
  transaction.add(
    createAssociatedTokenAccountInstruction(
      payer,
      ata,
      payer,
      mintAddress
    )
  );

  // 5. Mint initial supply
  const mintAmount = BigInt(supply) * BigInt(10 ** decimals);
  transaction.add(
    createMintToInstruction(
      mintAddress,
      ata,
      payer,
      mintAmount
    )
  );

  // 6. Revoke mint authority if basic plan
  if (!keepMintAuthority) {
    transaction.add(
      createSetAuthorityInstruction(
        mintAddress,
        payer,
        AuthorityType.MintTokens,
        null
      )
    );
  }

  return {
    mintKeypair,
    transaction,
    mintAddress: mintAddress.toBase58(),
  };
}

// Additional token operations
export async function buildMintMoreTransaction(
  connection: Connection,
  mint: PublicKey,
  authority: PublicKey,
  destination: PublicKey,
  amount: bigint,
  decimals: number
): Promise<Transaction> {
  const ata = await getAssociatedTokenAddress(mint, destination);
  const transaction = new Transaction();

  // Check if ATA exists, if not create it
  const ataInfo = await connection.getAccountInfo(ata);
  if (!ataInfo) {
    transaction.add(
      createAssociatedTokenAccountInstruction(authority, ata, destination, mint)
    );
  }

  const mintAmount = amount * BigInt(10 ** decimals);
  transaction.add(createMintToInstruction(mint, ata, authority, mintAmount));

  return transaction;
}

export async function buildBurnTransaction(
  mint: PublicKey,
  owner: PublicKey,
  amount: bigint,
  decimals: number
): Promise<Transaction> {
  const ata = await getAssociatedTokenAddress(mint, owner);
  const burnAmount = amount * BigInt(10 ** decimals);

  return new Transaction().add(
    createBurnInstruction(ata, mint, owner, burnAmount)
  );
}

export async function buildFreezeTransaction(
  mint: PublicKey,
  authority: PublicKey,
  targetOwner: PublicKey
): Promise<Transaction> {
  const ata = await getAssociatedTokenAddress(mint, targetOwner);
  return new Transaction().add(
    createFreezeAccountInstruction(ata, mint, authority)
  );
}

export async function buildThawTransaction(
  mint: PublicKey,
  authority: PublicKey,
  targetOwner: PublicKey
): Promise<Transaction> {
  const ata = await getAssociatedTokenAddress(mint, targetOwner);
  return new Transaction().add(
    createThawAccountInstruction(ata, mint, authority)
  );
}

export async function buildRevokeAuthorityTransaction(
  mint: PublicKey,
  currentAuthority: PublicKey,
  authorityType: "mint" | "freeze"
): Promise<Transaction> {
  const type = authorityType === "mint" ? AuthorityType.MintTokens : AuthorityType.FreezeAccount;
  return new Transaction().add(
    createSetAuthorityInstruction(mint, currentAuthority, type, null)
  );
}

export async function buildTransferAuthorityTransaction(
  mint: PublicKey,
  currentAuthority: PublicKey,
  newAuthority: PublicKey,
  authorityType: "mint" | "freeze"
): Promise<Transaction> {
  const type = authorityType === "mint" ? AuthorityType.MintTokens : AuthorityType.FreezeAccount;
  return new Transaction().add(
    createSetAuthorityInstruction(mint, currentAuthority, type, newAuthority)
  );
}
