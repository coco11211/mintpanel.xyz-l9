"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen, Rocket, Settings, Code, Shield, HelpCircle,
  FileText, Video, ArrowRight, Sparkles, Zap, Users
} from "lucide-react";


export default function DocsPage() {
  const docCategories = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "Quick start guides and tutorials for beginners",
      links: [
        { label: "What is MintPanel?", href: "/" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Creating Your First Token", href: "/tutorials" },
        { label: "Understanding SPL Tokens", href: "/token-standards" },
      ]
    },
    {
      icon: Code,
      title: "Token Creation",
      description: "Learn how to create and configure your tokens",
      links: [
        { label: "Step-by-Step Guide", href: "/how-it-works" },
        { label: "Metadata Upload", href: "/tutorials" },
        { label: "Authority Configuration", href: "/token-standards" },
        { label: "Pricing & Plans", href: "/pricing" },
      ]
    },
    {
      icon: Settings,
      title: "Token Management",
      description: "Manage your tokens after creation",
      links: [
        { label: "Minting Tokens", href: "/features" },
        { label: "Burning Supply", href: "/features" },
        { label: "Freezing Accounts", href: "/features" },
        { label: "Updating Metadata", href: "/features" },
      ]
    },
    {
      icon: Shield,
      title: "Security",
      description: "Best practices for keeping your assets safe",
      links: [
        { label: "Security Overview", href: "/security" },
        { label: "Wallet Security", href: "/security" },
        { label: "Best Practices", href: "/security" },
        { label: "Common Scams", href: "/support" },
      ]
    },
    {
      icon: FileText,
      title: "Technical Reference",
      description: "Deep dive into SPL token standards",
      links: [
        { label: "SPL Token Standard", href: "/token-standards" },
        { label: "Token Authorities", href: "/token-standards" },
        { label: "Metadata Standard", href: "/token-standards" },
        { label: "NFT vs Fungible", href: "/nft-vs-token" },
      ]
    },
    {
      icon: HelpCircle,
      title: "FAQ & Support",
      description: "Answers to common questions",
      links: [
        { label: "Basic FAQ", href: "/faq" },
        { label: "Extended FAQ", href: "/faq-extended" },
        { label: "Contact Support", href: "/contact" },
        { label: "Support Center", href: "/support" },
      ]
    },
  ];

  const quickLinks = [
    { title: "Create Token", href: "/create", icon: Rocket },
    { title: "Video Tutorials", href: "/tutorials", icon: Video },
    { title: "Use Cases", href: "/use-cases", icon: Users },
    { title: "Pricing", href: "/pricing", icon: Zap },
  ];

  return (
    <div>
      {/* Hero */}
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
              Complete documentation
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              MintPanel
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about creating and managing Solana SPL tokens
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-secondary/20 border-y border-border">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-4 max-w-4xl mx-auto">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={link.href}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                        <link.icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="font-semibold text-sm">{link.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {docCategories.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-normal">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                          >
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            {link.label}
                          </Link>
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

      {/* CTA */}
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
              Put your knowledge into practice and launch your SPL token now
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Create Token <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/contact">
                  Need Help?
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
