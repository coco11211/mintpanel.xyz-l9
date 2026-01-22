import React from "react";
import { motion } from "framer-motion";
import { Loader2, Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type TxStatus = "idle" | "pending" | "signing" | "confirming" | "confirmed" | "failed";

interface TransactionStatusProps {
  status: TxStatus;
  message?: string;
  className?: string;
}

const statusConfig: Record<TxStatus, { icon: React.ReactNode; label: string; color: string }> = {
  idle: {
    icon: <Clock className="h-4 w-4" />,
    label: "Ready",
    color: "text-muted-foreground",
  },
  pending: {
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
    label: "Preparing...",
    color: "text-warning",
  },
  signing: {
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
    label: "Waiting for signature...",
    color: "text-primary",
  },
  confirming: {
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
    label: "Confirming transaction...",
    color: "text-accent",
  },
  confirmed: {
    icon: <Check className="h-4 w-4" />,
    label: "Confirmed!",
    color: "text-success",
  },
  failed: {
    icon: <X className="h-4 w-4" />,
    label: "Failed",
    color: "text-destructive",
  },
};

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  message,
  className,
}) => {
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/50 px-4 py-3",
        className
      )}
    >
      <span className={config.color}>{config.icon}</span>
      <span className={cn("text-sm font-medium", config.color)}>
        {message || config.label}
      </span>
    </motion.div>
  );
};
