"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen, Video, FileText, Code, Download, ExternalLink,
  ArrowRight, Sparkles, Globe, Wrench, Users, Zap
} from "lucide-react";


export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Wallets",
      icon: Users,
      description: "Recommended Solana wallets",
      resources: [
        { name: "Phantom", description: "Most popular Solana wallet", link: "https://phantom.app" },
        { name: "Solflare", description: "Feature-rich Solana wallet", link: "https://solflare.com" },
        { name: "Backpack", description: "Crypto super app", link: "https://backpack.app" },
      ]
    },
    {
      title: "Block Explorers",
      icon: Globe,
      description: "View your tokens on-chain",
      resources: [
        { name: "Solscan", description: "Most detailed Solana explorer", link: "https://solscan.io" },
        { name: "Solana Explorer", description: "Official Solana explorer", link: "https://explorer.solana.com" },
        { name: "SolanaFM", description: "Fast Solana explorer", link: "https://solana.fm" },
      ]
    },
    {
      title: "DEXs & Trading",
      icon: Zap,
      description: "Decentralized exchanges",
      resources: [
        { name: "Raydium", description: "Leading Solana DEX and AMM", link: "https://raydium.io" },
        { name: "Orca", description: "User-friendly Solana DEX", link: "https://orca.so" },
        { name: "Jupiter", description: "Best price aggregator", link: "https://jup.ag" },
      ]
    },
    {
      title: "Developer Tools",
      icon: Code,
      description: "Build on Solana",
      resources: [
        { name: "Solana Docs", description: "Official Solana documentation", link: "https://docs.solana.com" },
        { name: "SPL Token Docs", description: "Token program documentation", link: "https://spl.solana.com" },
        { name: "Metaplex Docs", description: "Metadata standard docs", link: "https://docs.metaplex.com" },
      ]
    },
    {
      title: "Learning Resources",
      icon: BookOpen,
      description: "Learn about Solana and tokens",
      resources: [
        { name: "Solana Cookbook", description: "Developer recipes", link: "https://solanacookbook.com" },
        { name: "Solana University", description: "Free courses", link: "https://www.soldev.app" },
        { name: "Web3 Guide", description: "Beginner-friendly guides", link: "#" },
      ]
    },
    {
      title: "Community",
      icon: Users,
      description: "Join the ecosystem",
      resources: [
        { name: "Solana Discord", description: "Official community", link: "https://discord.gg/solana" },
        { name: "Solana Twitter", description: "Latest updates", link: "https://twitter.com/solana" },
        { name: "Solana Forum", description: "Discussion forum", link: "https://forum.solana.com" },
      ]
    },
  ];

  const downloads = [
    {
      title: "Token Creation Checklist",
      description: "Complete checklist for launching your token",
      format: "PDF",
      icon: FileText
    },
    {
      title: "Tokenomics Template",
      description: "Plan your token economics",
      format: "XLSX",
      icon: Download
    },
    {
      title: "Marketing Kit",
      description: "Templates for promoting your token",
      format: "ZIP",
      icon: Download
    },
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
              Everything you need
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Token Creator
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Resources
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Curated tools, links, and resources for Solana SPL token creators
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resourceCategories.map((category, i) => (
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
                    <ul className="space-y-3">
                      {category.resources.map((resource) => (
                        <li key={resource.name}>
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 group hover:text-accent transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 shrink-0 mt-0.5 opacity-50 group-hover:opacity-100" />
                            <div>
                              <div className="font-medium text-sm">{resource.name}</div>
                              <div className="text-xs text-muted-foreground">{resource.description}</div>
                            </div>
                          </a>
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

      {/* Downloads */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Downloads</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Templates and checklists to help you succeed
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {downloads.map((download, i) => (
              <motion.div
                key={download.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4">
                      <download.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{download.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{download.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download {download.format}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Internal Resources</h2>
            <p className="text-lg text-muted-foreground">
              Explore more from MintPanel
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Documentation", link: "/docs", icon: BookOpen },
              { title: "Video Tutorials", link: "/tutorials", icon: Video },
              { title: "Blog & Guides", link: "/blog", icon: FileText },
              { title: "Use Cases", link: "/use-cases", icon: Wrench },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={item.link}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardContent className="py-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="font-semibold flex-1">{item.title}</h3>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
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
              Use these resources to build a successful token project
            </p>
            <Button size="lg" className="text-lg px-8 h-12" asChild>
              <Link href="/create">
                Create Token Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
