"use client";

import { useState, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useNetwork } from "@/contexts/NetworkContext";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { buildCreateTokenTransaction } from "@/lib/solana/tokenOperations";
import { TokenFormData } from "@/lib/schemas/tokenForm";
import { TxStatus } from "@/components/common/TransactionStatus";

interface UseCreateTokenResult {
  createToken: (data: TokenFormData, feeWallet: string, feeAmount: number) => Promise<{ mint: string; signature: string } | null>;
  status: TxStatus;
  statusMessage: string;
}

export const useCreateToken = (): UseCreateTokenResult => {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { network } = useNetwork();
  const { toast } = useToast();

  const [status, setStatus] = useState<TxStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const createToken = useCallback(
    async (
      data: TokenFormData,
      feeWallet: string,
      feeAmount: number
    ): Promise<{ mint: string; signature: string } | null> => {
      if (!publicKey || !signTransaction) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to create a token",
          variant: "destructive",
        });
        return null;
      }

      try {
        setStatus("pending");
        setStatusMessage("Preparing transaction...");

        const isAdvanced = data.plan === "advanced";

        // Build metadata URI (using a simple JSON structure)
        // In production, you'd upload this to IPFS/Arweave
        const metadata = {
          name: data.name,
          symbol: data.symbol,
          description: data.description || "",
          image: data.imageUrl || "",
          external_url: data.externalUrl || "",
        };

        // For now, use a data URI (not ideal for production)
        const metadataUri = data.imageUrl
          ? `https://arweave.net/placeholder` // Placeholder - in production upload to Arweave
          : "";

        // Build the token creation transaction
        const { mintKeypair, transaction, mintAddress } = await buildCreateTokenTransaction({
          connection,
          payer: publicKey,
          name: data.name,
          symbol: data.symbol,
          decimals: data.decimals,
          supply: Number(data.supply),
          metadataUri,
          isMutable: isAdvanced,
          keepMintAuthority: isAdvanced,
          keepFreezeAuthority: isAdvanced,
        });

        // Add fee payment if fee wallet is set
        if (feeWallet && feeAmount > 0) {
          const { SystemProgram } = await import("@solana/web3.js");
          transaction.add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: new PublicKey(feeWallet),
              lamports: Math.floor(feeAmount * LAMPORTS_PER_SOL),
            })
          );
        }

        // Get recent blockhash
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.lastValidBlockHeight = lastValidBlockHeight;
        transaction.feePayer = publicKey;

        // Partial sign with mint keypair
        transaction.partialSign(mintKeypair);

        setStatus("signing");
        setStatusMessage("Please approve the transaction in your wallet...");

        // Send transaction
        const signature = await sendTransaction(transaction, connection, {
          signers: [mintKeypair],
        });

        setStatus("confirming");
        setStatusMessage("Confirming transaction...");

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight,
        });

        if (confirmation.value.err) {
          throw new Error("Transaction failed");
        }

        // Save to database
        await supabase.from("tokens").insert({
          mint_address: mintAddress,
          creator_wallet: publicKey.toBase58(),
          name: data.name,
          symbol: data.symbol,
          decimals: data.decimals,
          initial_supply: Number(data.supply),
          description: data.description || null,
          image_url: data.imageUrl || null,
          metadata_uri: metadataUri || null,
          plan: data.plan,
          network,
          creation_signature: signature,
          payment_amount: feeAmount,
          is_metadata_mutable: isAdvanced,
        });

        // Save transaction
        await supabase.from("token_transactions").insert({
          signature,
          transaction_type: "create",
          token_mint: mintAddress,
          user_wallet: publicKey.toBase58(),
          network,
          details: { name: data.name, symbol: data.symbol, supply: data.supply },
        });

        setStatus("confirmed");
        setStatusMessage("Token created successfully!");

        toast({
          title: "Token Created!",
          description: `${data.name} (${data.symbol}) has been created`,
        });

        return { mint: mintAddress, signature };
      } catch (error) {
        console.error("Token creation failed:", error);
        setStatus("failed");
        setStatusMessage(error instanceof Error ? error.message : "Transaction failed");

        toast({
          title: "Creation Failed",
          description: error instanceof Error ? error.message : "Failed to create token",
          variant: "destructive",
        });

        return null;
      }
    },
    [publicKey, signTransaction, sendTransaction, connection, network, toast]
  );

  return { createToken, status, statusMessage };
};
