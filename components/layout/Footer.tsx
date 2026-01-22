"use client"

import React from "react";
import Link from "next/link";
import { Coins } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Coins className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="font-semibold">MintPanel</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Create and manage Solana SPL tokens with ease.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Product</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/create" className="hover:text-foreground transition-colors">
                Create Token
              </Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">
                My Tokens
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Learn</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/solana-token-creator" className="hover:text-foreground transition-colors">
                Token Creator Guide
              </Link>
              <Link href="/spl-token-metadata" className="hover:text-foreground transition-colors">
                SPL Token Metadata
              </Link>
              <Link href="/mint-and-burn-solana-tokens" className="hover:text-foreground transition-colors">
                Mint & Burn
              </Link>
              <Link href="/freeze-authority-solana" className="hover:text-foreground transition-colors">
                Freeze Authority
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="cursor-default">Terms of Service</span>
              <span className="cursor-default">Privacy Policy</span>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MintPanel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
