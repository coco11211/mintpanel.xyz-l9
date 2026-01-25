"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Rocket, Shield, Zap, BarChart, Code, Clock, Globe, Lock,
  Repeat, FileText, Upload, Download, Settings, Eye, Fingerprint,
  Server, Database, ArrowRight, Check, Sparkles, Users, TrendingUp
} from "lucide-react";

const coreFeatures = [
  {
    icon: Rocket,
    title: "Instant Token Deployment",
    description: "Create and deploy SPL tokens on Solana blockchain in under 5 minutes. No coding required, no complex setup.",
    benefits: [
      "Deploy directly to mainnet or devnet",
      "Immediate on-chain confirmation",
      "Automatic token account creation",
      "Instant visibility on Solana explorers"
    ]
  },
  {
    icon: Settings,
    title: "Full Authority Control",
    description: "Complete control over your token's authorities. Choose to keep or revoke mint, freeze, and update authorities.",
    benefits: [
      "Mint Authority - Create new tokens anytime",
      "Freeze Authority - Freeze/unfreeze token accounts",
      "Update Authority - Modify token metadata",
      "Revoke authorities for immutable tokens"
    ]
  },
  {
    icon: Upload,
    title: "Metadata Management",
    description: "Upload and manage your token's metadata including name, symbol, description, and logo.",
    benefits: [
      "Support for PNG, JPG, and SVG logos",
      "Permanent decentralized storage",
      "Mutable or immutable metadata options",
      "Rich metadata with social links"
    ]
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    description: "Track your token's performance with comprehensive analytics and real-time insights.",
    benefits: [
      "Real-time holder analytics",
      "Transaction history tracking",
      "Supply metrics and distribution",
      "Transfer volume monitoring"
    ]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with industry-standard encryption and secure wallet integration.",
    benefits: [
      "Non-custodial wallet integration",
      "Secure transaction signing",
      "No private key storage",
      "Audit-ready smart contracts"
    ]
  },
  {
    icon: Repeat,
    title: "Token Operations",
    description: "Manage your token with powerful operations available directly from your dashboard.",
    benefits: [
      "Mint additional token supply",
      "Burn tokens to reduce supply",
      "Freeze/unfreeze specific accounts",
      "Update metadata and logo"
    ]
  },
];

const technicalFeatures = [
  {
    icon: Code,
    title: "SPL Token Standard",
    description: "Full compliance with Solana SPL token standard for maximum compatibility"
  },
  {
    icon: Database,
    title: "Permanent Storage",
    description: "Decentralized metadata storage on IPFS for permanent availability"
  },
  {
    icon: Zap,
    title: "Low Transaction Fees",
    description: "Benefit from Solana's ultra-low fees (< $0.01 per transaction)"
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Access from anywhere with any Solana-compatible wallet"
  },
  {
    icon: Lock,
    title: "Secure by Design",
    description: "Non-custodial architecture means you always control your assets"
  },
  {
    icon: Eye,
    title: "Transparent Operations",
    description: "All operations visible on-chain for complete transparency"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Create and manage tokens anytime with 99.9% uptime"
  },
  {
    icon: Fingerprint,
    title: "Unique Token Mints",
    description: "Each token gets a unique mint address for easy identification"
  },
];

const managementFeatures = [
  {
    title: "Mint Tokens",
    description: "Create additional tokens after initial deployment",
    icon: TrendingUp,
    requirement: "Requires Mint Authority"
  },
  {
    title: "Burn Tokens",
    description: "Permanently remove tokens from circulation",
    icon: Download,
    requirement: "Token holder can burn own tokens"
  },
  {
    title: "Freeze Accounts",
    description: "Prevent specific accounts from transferring tokens",
    icon: Lock,
    requirement: "Requires Freeze Authority"
  },
  {
    title: "Update Metadata",
    description: "Modify token name, symbol, description, and logo",
    icon: FileText,
    requirement: "Requires Update Authority"
  },
];


export default function FeaturesPage() {
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
              Everything you need to succeed
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Powerful Features for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Professional Token Creation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create, deploy, and manage SPL tokens with enterprise-grade features designed for creators and developers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create and manage professional tokens
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature, i) => (
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
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on industry standards with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {technicalFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:border-accent/50 transition-colors duration-300">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Features */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Token Management Operations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful operations to manage your token after creation (Available with Advanced plan)
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {managementFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <div className="inline-block text-xs bg-secondary px-2 py-1 rounded">
                      {feature.requirement}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-secondary/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MintPanel?</h2>
              <p className="text-lg text-muted-foreground">
                The most comprehensive token creation platform on Solana
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">User-Friendly Interface</h3>
                      <p className="text-sm text-muted-foreground">
                        Intuitive design that makes token creation accessible to everyone, from beginners to experts.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Server className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Reliable Infrastructure</h3>
                      <p className="text-sm text-muted-foreground">
                        Built on enterprise-grade infrastructure with 99.9% uptime and lightning-fast performance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Security First</h3>
                      <p className="text-sm text-muted-foreground">
                        Non-custodial architecture means your assets are always under your control. We never access your private keys.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Comprehensive Documentation</h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed guides, video tutorials, and responsive support to help you succeed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Start creating professional SPL tokens in minutes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Create Your Token <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
