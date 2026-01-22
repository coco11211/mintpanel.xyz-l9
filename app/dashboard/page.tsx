"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Coins, Plus, ArrowRight } from "lucide-react";
import { useUserTokens } from "@/hooks/useUserTokens";
import { NetworkBadge } from "@/components/common/NetworkBadge";
import { CopyButton } from "@/components/common/CopyButton";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  const { connected } = useWallet();
  const { data: tokens, isLoading } = useUserTokens();

  if (!connected) {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-md text-center">
          <Coins className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-8">
            Connect your Solana wallet to view and manage your tokens.
          </p>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Tokens</h1>
          <p className="text-muted-foreground">Manage your created SPL tokens</p>
        </div>
        <Button asChild>
          <Link href="/create">
            <Plus className="h-4 w-4 mr-2" /> Create Token
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : tokens && tokens.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tokens.map((token) => (
            <Card key={token.id} className="group hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{token.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{token.symbol}</p>
                  </div>
                  <NetworkBadge network={token.network as any} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <code className="text-xs bg-secondary px-2 py-1 rounded font-mono flex-1 truncate">
                    {token.mint_address}
                  </code>
                  <CopyButton value={token.mint_address} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {token.plan === "advanced" ? "Advanced" : "Basic"}
                  </span>
                  <Button size="sm" variant="ghost" className="gap-1" asChild>
                    <Link href={`/manage/${token.mint_address}`}>
                      Manage <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-12">
          <CardContent className="text-center">
            <Coins className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No tokens yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create your first SPL token to get started.
            </p>
            <Button asChild>
              <Link href="/create">Create Token</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
