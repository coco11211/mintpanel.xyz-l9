"use client";

import { useState, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getMint, getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { useNetwork } from "@/contexts/NetworkContext";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TxStatus } from "@/components/common/TransactionStatus";
import {
  buildMintMoreTransaction,
  buildBurnTransaction,
  buildFreezeTransaction,
  buildThawTransaction,
  buildRevokeAuthorityTransaction,
  buildTransferAuthorityTransaction,
} from "@/lib/solana/tokenOperations";

export interface TokenInfo {
  mint: string;
  decimals: number;
  supply: bigint;
  mintAuthority: string | null;
  freezeAuthority: string | null;
  isInitialized: boolean;
}

export interface TokenBalance {
  balance: bigint;
  uiBalance: number;
}

export const useTokenManagement = (mintAddress: string) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { network } = useNetwork();
  const { toast } = useToast();

  const [status, setStatus] = useState<TxStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTokenInfo = useCallback(async () => {
    if (!mintAddress) return;

    setIsLoading(true);
    try {
      const mint = new PublicKey(mintAddress);
      const mintInfo = await getMint(connection, mint);

      setTokenInfo({
        mint: mintAddress,
        decimals: mintInfo.decimals,
        supply: mintInfo.supply,
        mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
        freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
        isInitialized: mintInfo.isInitialized,
      });

      // Fetch user's balance if connected
      if (publicKey) {
        try {
          const ata = await getAssociatedTokenAddress(mint, publicKey);
          const accountInfo = await getAccount(connection, ata);
          const uiBalance = Number(accountInfo.amount) / Math.pow(10, mintInfo.decimals);
          setBalance({
            balance: accountInfo.amount,
            uiBalance,
          });
        } catch {
          // ATA doesn't exist, balance is 0
          setBalance({ balance: BigInt(0), uiBalance: 0 });
        }
      }
    } catch (error) {
      console.error("Failed to fetch token info:", error);
      toast({
        title: "Failed to load token",
        description: "Could not fetch token information from the blockchain",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [mintAddress, connection, publicKey, toast]);

  const executeTransaction = useCallback(
    async (
      buildTx: () => Promise<any>,
      txType: string,
      details?: Record<string, any>
    ): Promise<string | null> => {
      if (!publicKey) {
        toast({
          title: "Wallet not connected",
          variant: "destructive",
        });
        return null;
      }

      try {
        setStatus("pending");
        setStatusMessage("Building transaction...");

        const transaction = await buildTx();

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.lastValidBlockHeight = lastValidBlockHeight;
        transaction.feePayer = publicKey;

        setStatus("signing");
        setStatusMessage("Please approve the transaction...");

        const signature = await sendTransaction(transaction, connection);

        setStatus("confirming");
        setStatusMessage("Confirming transaction...");

        await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight,
        });

        // Save transaction to DB
        await supabase.from("token_transactions").insert({
          signature,
          transaction_type: txType as any,
          token_mint: mintAddress,
          user_wallet: publicKey.toBase58(),
          network,
          details,
        });

        setStatus("confirmed");
        setStatusMessage("Transaction confirmed!");

        toast({
          title: "Transaction Successful",
          description: `${txType} completed successfully`,
        });

        // Refresh token info
        await fetchTokenInfo();

        return signature;
      } catch (error) {
        console.error(`${txType} failed:`, error);
        setStatus("failed");
        setStatusMessage(error instanceof Error ? error.message : "Transaction failed");

        toast({
          title: "Transaction Failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });

        return null;
      }
    },
    [publicKey, connection, sendTransaction, mintAddress, network, toast, fetchTokenInfo]
  );

  const mintMore = useCallback(
    async (destinationWallet: string, amount: number) => {
      const mint = new PublicKey(mintAddress);
      const destination = new PublicKey(destinationWallet);
      const decimals = tokenInfo?.decimals || 9;

      return executeTransaction(
        () => buildMintMoreTransaction(connection, mint, publicKey!, destination, BigInt(amount), decimals),
        "mint",
        { destination: destinationWallet, amount }
      );
    },
    [mintAddress, tokenInfo, connection, publicKey, executeTransaction]
  );

  const burn = useCallback(
    async (amount: number) => {
      const mint = new PublicKey(mintAddress);
      const decimals = tokenInfo?.decimals || 9;

      return executeTransaction(
        () => buildBurnTransaction(mint, publicKey!, BigInt(amount), decimals),
        "burn",
        { amount }
      );
    },
    [mintAddress, tokenInfo, publicKey, executeTransaction]
  );

  const freeze = useCallback(
    async (targetWallet: string) => {
      const mint = new PublicKey(mintAddress);
      const target = new PublicKey(targetWallet);

      return executeTransaction(
        () => buildFreezeTransaction(mint, publicKey!, target),
        "freeze",
        { target: targetWallet }
      );
    },
    [mintAddress, publicKey, executeTransaction]
  );

  const thaw = useCallback(
    async (targetWallet: string) => {
      const mint = new PublicKey(mintAddress);
      const target = new PublicKey(targetWallet);

      return executeTransaction(
        () => buildThawTransaction(mint, publicKey!, target),
        "thaw",
        { target: targetWallet }
      );
    },
    [mintAddress, publicKey, executeTransaction]
  );

  const revokeAuthority = useCallback(
    async (authorityType: "mint" | "freeze") => {
      const mint = new PublicKey(mintAddress);

      return executeTransaction(
        () => buildRevokeAuthorityTransaction(mint, publicKey!, authorityType),
        "revoke_authority",
        { authorityType }
      );
    },
    [mintAddress, publicKey, executeTransaction]
  );

  const transferAuthority = useCallback(
    async (newAuthority: string, authorityType: "mint" | "freeze") => {
      const mint = new PublicKey(mintAddress);
      const newAuth = new PublicKey(newAuthority);

      return executeTransaction(
        () => buildTransferAuthorityTransaction(mint, publicKey!, newAuth, authorityType),
        "transfer_authority",
        { newAuthority, authorityType }
      );
    },
    [mintAddress, publicKey, executeTransaction]
  );

  const resetStatus = useCallback(() => {
    setStatus("idle");
    setStatusMessage("");
  }, []);

  return {
    tokenInfo,
    balance,
    isLoading,
    status,
    statusMessage,
    fetchTokenInfo,
    mintMore,
    burn,
    freeze,
    thaw,
    revokeAuthority,
    transferAuthority,
    resetStatus,
  };
};
