"use client"

import React from "react";
import Link from "next/link";
import { Coins } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-5">
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
                Dashboard
              </Link>
              <Link href="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/features" className="hover:text-foreground transition-colors">
                Features
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Learn</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/docs" className="hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="/tutorials" className="hover:text-foreground transition-colors">
                Tutorials
              </Link>
              <Link href="/guides" className="hover:text-foreground transition-colors">
                Guides
              </Link>
              <Link href="/token-standards" className="hover:text-foreground transition-colors">
                Token Standards
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Resources</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/resources" className="hover:text-foreground transition-colors">
                Resources
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/use-cases" className="hover:text-foreground transition-colors">
                Use Cases
              </Link>
              <Link href="/comparison" className="hover:text-foreground transition-colors">
                Comparison
              </Link>
              <Link href="/security" className="hover:text-foreground transition-colors">
                Security
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Support</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/support" className="hover:text-foreground transition-colors">
                Support Center
              </Link>
              <Link href="/faq" className="hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link href="/faq-extended" className="hover:text-foreground transition-colors">
                Extended FAQ
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} MintPanel. All rights reserved.</div>
          <div className="mt-1 text-xs opacity-50">v2.0.0 - Fixed: Mint display, Network switching, Pricing</div>
        </div>
      </div>
    </footer>
  );
};
