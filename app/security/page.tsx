"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield, Lock, Eye, Key, CheckCircle, Server, Database, FileCheck,
  ArrowRight, Sparkles, AlertCircle, Fingerprint
} from "lucide-react";


export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Non-Custodial Architecture",
      description: "You maintain complete control of your private keys and assets",
      details: "We never ask for, store, or have access to your private keys. All transactions are signed locally in your wallet."
    },
    {
      icon: Key,
      title: "Secure Wallet Integration",
      description: "Integration with industry-leading Solana wallets",
      details: "Support for Phantom, Solflare, and other trusted wallet providers using standard Solana wallet adapter."
    },
    {
      icon: Shield,
      title: "Smart Contract Security",
      description: "Battle-tested Solana programs",
      details: "We use only official Solana Program Library (SPL) programs that have been audited and tested by thousands of projects."
    },
    {
      icon: Database,
      title: "Decentralized Storage",
      description: "Permanent metadata storage on IPFS",
      details: "Your token metadata is stored on decentralized networks, ensuring permanence and censorship resistance."
    },
    {
      icon: Eye,
      title: "Transparent Operations",
      description: "All operations visible on-chain",
      details: "Every action is recorded on Solana blockchain, providing complete transparency and auditability."
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Enterprise-grade hosting and monitoring",
      details: "99.9% uptime, DDoS protection, and real-time monitoring ensure platform availability."
    },
  ];

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
              Bank-grade security
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Enterprise-Grade
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Security & Privacy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your security is our top priority. Learn how we protect your assets and data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{feature.description}</p>
                    <p className="text-sm text-muted-foreground">{feature.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Best Practices</h2>
            <p className="text-lg text-muted-foreground">
              Follow these guidelines to maximize security
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              "Never share your private keys or seed phrases with anyone",
              "Always verify transaction details before signing",
              "Use hardware wallets for high-value operations",
              "Enable 2FA on your wallet if available",
              "Keep your wallet software up to date",
              "Bookmark the official MintPanel URL to avoid phishing",
              "Verify smart contract addresses on blockchain explorers",
              "Start with small amounts when testing",
            ].map((practice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="py-4 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{practice}</span>
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
              Secure Token Creation Starts Here
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Create tokens with confidence knowing your assets are protected
            </p>
            <Button size="lg" className="text-lg px-8 h-12" asChild>
              <Link href="/create">
                Create Secure Token <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
