import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SolanaNetwork } from "@/lib/solana/constants";

interface NetworkBadgeProps {
  network: SolanaNetwork | string;
  className?: string;
}

export const NetworkBadge: React.FC<NetworkBadgeProps> = ({ network, className }) => {
  const isMainnet = network === "mainnet-beta";

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-xs",
        isMainnet
          ? "border-success/50 text-success bg-success/10"
          : "border-warning/50 text-warning bg-warning/10",
        className
      )}
    >
      {isMainnet ? "Mainnet" : "Devnet"}
    </Badge>
  );
};
