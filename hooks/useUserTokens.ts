"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNetwork } from "@/contexts/NetworkContext";

export interface UserToken {
  id: string;
  mint_address: string;
  name: string;
  symbol: string;
  decimals: number;
  initial_supply: number;
  description: string | null;
  image_url: string | null;
  plan: "basic" | "advanced";
  network: string;
  created_at: string;
  is_metadata_mutable: boolean;
}

export const useUserTokens = () => {
  const { publicKey } = useWallet();
  const { network } = useNetwork();
  const walletAddress = publicKey?.toBase58();

  return useQuery({
    queryKey: ["user-tokens", walletAddress, network],
    queryFn: async (): Promise<UserToken[]> => {
      if (!walletAddress) return [];

      const { data, error } = await supabase
        .from("tokens")
        .select("*")
        .eq("creator_wallet", walletAddress)
        .eq("network", network)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user tokens:", error);
        throw error;
      }

      return (data || []) as UserToken[];
    },
    enabled: !!walletAddress,
  });
};
