import { clusterApiUrl } from "@solana/web3.js";

export type SolanaNetwork = "mainnet-beta" | "devnet";

export const NETWORKS: Record<SolanaNetwork, { name: string; endpoint: string; explorer: string }> = {
  "mainnet-beta": {
    name: "Mainnet",
    endpoint: clusterApiUrl("mainnet-beta"),
    explorer: "https://solscan.io",
  },
  devnet: {
    name: "Devnet",
    endpoint: clusterApiUrl("devnet"),
    explorer: "https://solscan.io",
  },
};

export const getExplorerUrl = (network: SolanaNetwork, type: "tx" | "address" | "token", value: string) => {
  const base = NETWORKS[network].explorer;
  const cluster = network === "devnet" ? "?cluster=devnet" : "";

  switch (type) {
    case "tx":
      return `${base}/tx/${value}${cluster}`;
    case "address":
      return `${base}/account/${value}${cluster}`;
    case "token":
      return `${base}/token/${value}${cluster}`;
    default:
      return `${base}/${value}${cluster}`;
  }
};

export const DEFAULT_DECIMALS = 9;
export const MAX_DECIMALS = 9;
export const MIN_DECIMALS = 0;

export const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
export const TOKEN_METADATA_PROGRAM_ID = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
