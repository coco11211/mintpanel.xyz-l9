"use client"

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect } from "react";
import { Connection } from "@solana/web3.js";
import { SolanaNetwork, NETWORKS } from "@/lib/solana/constants";

interface NetworkContextValue {
  network: SolanaNetwork;
  setNetwork: (network: SolanaNetwork) => void;
  connection: Connection;
  networkConfig: typeof NETWORKS[SolanaNetwork];
}

const NetworkContext = createContext<NetworkContextValue | null>(null);

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
};

interface NetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const [network, setNetworkState] = useState<SolanaNetwork>("devnet");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("solana-network");
    if (saved) {
      setNetworkState(saved as SolanaNetwork);
    }
  }, []);

  const setNetwork = useCallback((newNetwork: SolanaNetwork) => {
    setNetworkState(newNetwork);
    if (mounted) {
      localStorage.setItem("solana-network", newNetwork);
    }
  }, [mounted]);

  const connection = useMemo(
    () => new Connection(NETWORKS[network].endpoint, "confirmed"),
    [network]
  );

  const networkConfig = NETWORKS[network];

  const value = useMemo(
    () => ({ network, setNetwork, connection, networkConfig }),
    [network, setNetwork, connection, networkConfig]
  );

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};
