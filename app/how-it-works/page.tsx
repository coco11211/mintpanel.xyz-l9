"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet, FileText, Upload, Settings, Rocket, CheckCircle,
  ArrowRight, Sparkles, Clock, Shield, Zap
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Wallet",
    description: "Connect your Solana wallet using Phantom, Solflare, or any supported wallet provider.",
    icon: Wallet,
    details: [
      "Click 'Connect Wallet' button",
      "Select your preferred wallet",
      "Approve the connection request",
      "Your wallet address will be displayed"
    ],
    time: "30 seconds"
  },
  {
    number: "02",
    title: "Enter Token Details",
    description: "Fill in your token's basic information including name, symbol, and decimals.",
    icon: FileText,
    details: [
      "Token name (e.g., 'My Token')",
      "Token symbol (e.g., 'MYT')",
      "Decimal places (0-9)",
      "Initial supply amount"
    ],
    time: "1 minute"
  },
  {
    number: "03",
    title: "Upload Metadata",
    description: "Add your token logo and extended metadata to make your token professional.",
    icon: Upload,
    details: [
      "Upload token logo (PNG/JPG)",
      "Add description",
      "Include social media links (optional)",
      "Metadata stored permanently on IPFS"
    ],
    time: "2 minutes"
  },
  {
    number: "04",
    title: "Configure Authorities",
    description: "Choose whether to keep or revoke mint, freeze, and update authorities.",
    icon: Settings,
    details: [
      "Mint Authority - Create new tokens later",
      "Freeze Authority - Freeze token accounts",
      "Update Authority - Modify metadata",
      "Or revoke all for immutable token"
    ],
    time: "1 minute"
  },
  {
    number: "05",
    title: "Review & Pay",
    description: "Review all details and pay the creation fee using SOL from your connected wallet.",
    icon: CheckCircle,
    details: [
      "Review all token details",
      "Select your plan (Basic or Advanced)",
      "Pay fee (0.03 or 0.05 SOL)",
      "Confirm transaction in wallet"
    ],
    time: "30 seconds"
  },
  {
    number: "06",
    title: "Token Deployed!",
    description: "Your token is instantly deployed to Solana blockchain and ready to use.",
    icon: Rocket,
    details: [
      "Token created on-chain instantly",
      "Receive unique mint address",
      "View on Solana explorers",
      "Access management dashboard"
    ],
    time: "Instant"
  },
];

const quickFacts = [
  {
    icon: Clock,
    title: "5 Minutes or Less",
    description: "Complete the entire process in under 5 minutes"
  },
  {
    icon: Shield,
    title: "Completely Safe",
    description: "Non-custodial process - you control everything"
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Your token goes live immediately on Solana"
  },
];

const whatHappens = [
  {
    title: "Token Account Creation",
    description: "A new SPL token mint account is created on Solana with your specified parameters."
  },
  {
    title: "Metadata Upload",
    description: "Your token logo and metadata are uploaded to IPFS and linked to your token via Metaplex standard."
  },
  {
    title: "Authority Configuration",
    description: "Mint, freeze, and update authorities are set according to your preferences."
  },
  {
    title: "Initial Supply Minting",
    description: "If you specified an initial supply, tokens are minted to your wallet automatically."
  },
  {
    title: "Blockchain Confirmation",
    description: "All transactions are confirmed on Solana blockchain with cryptographic proof."
  },
  {
    title: "Dashboard Access",
    description: "For Advanced plan, you get instant access to management dashboard for your token."
  },
];


export default function HowItWorksPage() {
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
              Simple 6-step process
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              How to Create Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Solana SPL Token
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Follow our simple 6-step process to launch your professional token in under 5 minutes
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Start Creating Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/tutorials">
                  Watch Video Tutorial
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-secondary/20 border-y border-border">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {quickFacts.map((fact, i) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  <fact.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{fact.title}</h3>
                <p className="text-sm text-muted-foreground">{fact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Step-by-Step Guide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to create your SPL token
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Step Number & Icon */}
                      <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-8 md:w-48 flex flex-col items-center justify-center text-center">
                        <div className="text-5xl font-bold text-accent/30 mb-4">{step.number}</div>
                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                          <step.icon className="h-8 w-8 text-accent" />
                        </div>
                        <div className="text-xs text-muted-foreground bg-background/50 px-3 py-1 rounded-full">
                          {step.time}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 p-8">
                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground mb-6">{step.description}</p>

                        <div className="grid gap-3 md:grid-cols-2">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                              <span className="text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens Behind the Scenes */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Happens Behind the Scenes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technical processes that occur when you create your token
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {whatHappens.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-accent">{i + 1}</span>
                      </div>
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* After Creation */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">After Your Token is Created</h2>
              <p className="text-lg text-muted-foreground">
                What you can do with your newly created token
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">For Basic Plan Users</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Tokens are in your wallet immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Send to other wallets or DEXs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>List on Raydium, Orca, or Jupiter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Token is immutable and decentralized</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">For Advanced Plan Users</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Everything in Basic plan, plus:</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Access management dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Mint additional tokens anytime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Burn tokens to reduce supply</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Freeze/unfreeze accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Update metadata and logo</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-secondary/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Token?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              The process is simple, fast, and secure. Get started in minutes!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Start Creating Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              No credit card required • Takes less than 5 minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
