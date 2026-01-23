"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useNetwork } from "@/contexts/NetworkContext";

export interface FeeConfig {
  id: string;
  network: string;
  basic_fee_sol: number;
  advanced_fee_sol: number;
  fee_wallet: string;
  is_active: boolean;
}

export const useFeeConfig = () => {
  const { network } = useNetwork();

  return useQuery({
    queryKey: ["fee-config", network],
    queryFn: async (): Promise<FeeConfig | null> => {
      const { data, error } = await supabase
        .from("fee_config")
        .select("*")
        .eq("network", network)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching fee config:", error);
        throw error;
      }

      return data;
    },
  });
};

export const getFeeForPlan = (feeConfig: FeeConfig | null | undefined, plan: "basic" | "advanced"): number => {
  if (!feeConfig) return 0;
  return plan === "basic" ? feeConfig.basic_fee_sol : feeConfig.advanced_fee_sol;
};
