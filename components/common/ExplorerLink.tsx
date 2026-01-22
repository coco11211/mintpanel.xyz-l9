import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getExplorerUrl, SolanaNetwork } from "@/lib/solana/constants";
import { cn } from "@/lib/utils";

interface ExplorerLinkProps {
  type: "tx" | "address" | "token";
  value: string;
  network: SolanaNetwork;
  label?: string;
  className?: string;
  variant?: "default" | "ghost" | "outline" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const ExplorerLink: React.FC<ExplorerLinkProps> = ({
  type,
  value,
  network,
  label,
  className,
  variant = "ghost",
  size = "sm",
}) => {
  const url = getExplorerUrl(network, type, value);
  const displayLabel = label || (type === "tx" ? "View Transaction" : "View on Explorer");

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      asChild
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        {displayLabel}
        <ExternalLink className="h-3 w-3" />
      </a>
    </Button>
  );
};

export const TruncatedAddress: React.FC<{
  address: string;
  network: SolanaNetwork;
  className?: string;
}> = ({ address, network, className }) => {
  const truncated = `${address.slice(0, 4)}...${address.slice(-4)}`;
  const url = getExplorerUrl(network, "address", address);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-mono text-sm text-primary hover:underline inline-flex items-center gap-1",
        className
      )}
    >
      {truncated}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
};
