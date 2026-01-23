"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useNetwork } from "@/contexts/NetworkContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coins, ChevronDown, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create Token" },
  { href: "/dashboard", label: "My Tokens" },
];

export const Header: React.FC = () => {
  const { network, setNetwork, networkConfig } = useNetwork();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Coins className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              MintPanel
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Circle
                  className={cn(
                    "h-2 w-2 fill-current",
                    network === "mainnet-beta" ? "text-success" : "text-warning"
                  )}
                />
                <span className="text-xs font-medium">
                  {networkConfig.name}
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setNetwork("devnet")}>
                <Circle className="mr-2 h-2 w-2 fill-warning text-warning" />
                Devnet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setNetwork("mainnet-beta")}>
                <Circle className="mr-2 h-2 w-2 fill-success text-success" />
                Mainnet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
};
