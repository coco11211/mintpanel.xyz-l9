"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText, Shield, Coins, CheckCircle, Code, Database,
  ArrowRight, Sparkles, Lock, Repeat, Eye, Settings
} from "lucide-react";


export default function TokenStandardsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/5 -z-10" />

        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground mb-6">
              <Sparkles className="h-3 w-3" />
              Industry standard
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Understanding
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                SPL Token Standards
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn about Solana's SPL token standard and how it powers fungible tokens on the blockchain
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is SPL */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">What is SPL Token?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  SPL (Solana Program Library) Token is the standard for fungible and non-fungible tokens on the Solana blockchain.
                  It's equivalent to Ethereum's ERC-20 standard but optimized for Solana's high-performance architecture.
                </p>
                <p>
                  SPL tokens are created using the Token Program, one of Solana's core programs, which defines the rules and
                  operations for creating and managing tokens on the network.
                </p>
                <div className="bg-secondary/50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2 text-foreground">Key Characteristics:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span>Extremely low transaction costs (&lt; $0.01)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span>Lightning-fast confirmation times (&lt; 400ms)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span>Native integration with Solana ecosystem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span>Compatible with all major Solana wallets and DEXs</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Token Components */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">SPL Token Components</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the key components of an SPL token
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Database className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Mint Account</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-3">
                    The mint account stores global information about the token including total supply, decimal places, and authorities.
                  </p>
                  <ul className="space-y-1">
                    <li>• Supply tracking</li>
                    <li>• Decimal configuration</li>
                    <li>• Authority management</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Token Accounts</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-3">
                    Token accounts hold the balance for a specific wallet address. Each wallet needs a token account to hold each SPL token.
                  </p>
                  <ul className="space-y-1">
                    <li>• Balance storage</li>
                    <li>• Owner association</li>
                    <li>• Transfer capability</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Code className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Metadata Account</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-3">
                    Stores token information like name, symbol, logo, and description using the Metaplex Token Metadata standard.
                  </p>
                  <ul className="space-y-1">
                    <li>• Name and symbol</li>
                    <li>• Logo and images</li>
                    <li>• Description and links</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Token Authorities */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Token Authorities</h2>
            <p className="text-lg text-muted-foreground">
              Three key authorities that control different aspects of your token
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Repeat className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Mint Authority</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Controls the ability to create new tokens and increase the total supply.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded text-xs space-y-2">
                    <p><strong>With Authority:</strong> Can mint new tokens anytime</p>
                    <p><strong>Without Authority:</strong> Fixed supply, no new tokens can be created</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Freeze Authority</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Controls the ability to freeze token accounts, preventing transfers.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded text-xs space-y-2">
                    <p><strong>With Authority:</strong> Can freeze/unfreeze any token account</p>
                    <p><strong>Without Authority:</strong> All accounts permanently unlocked</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Settings className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Update Authority</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Controls the ability to update token metadata like name, symbol, and logo.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded text-xs space-y-2">
                    <p><strong>With Authority:</strong> Can update metadata anytime</p>
                    <p><strong>Without Authority:</strong> Metadata is permanently immutable</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Token Operations */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Standard Token Operations</h2>
            <p className="text-lg text-muted-foreground">
              Common operations available for SPL tokens
            </p>
          </motion.div>

          <div className="grid gap-4">
            {[
              { title: "Transfer", desc: "Send tokens from one account to another" },
              { title: "Mint", desc: "Create new tokens (requires Mint Authority)" },
              { title: "Burn", desc: "Permanently destroy tokens, reducing supply" },
              { title: "Approve", desc: "Allow another account to spend tokens on your behalf" },
              { title: "Revoke", desc: "Remove spending approval from an account" },
              { title: "Freeze Account", desc: "Prevent transfers from specific account (requires Freeze Authority)" },
              { title: "Thaw Account", desc: "Unfreeze a frozen account (requires Freeze Authority)" },
              { title: "Set Authority", desc: "Transfer or revoke authorities" },
            ].map((op, i) => (
              <motion.div
                key={op.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="py-4 flex items-center gap-4">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <h3 className="font-semibold">{op.title}</h3>
                      <p className="text-sm text-muted-foreground">{op.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your SPL Token?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Use our platform to create compliant SPL tokens in minutes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Create Token Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/docs">
                  Read Documentation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
