"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users, Target, Award, Layers, TrendingUp, Gift, Vote, Coins,
  Heart, Zap, Globe, Star, ArrowRight, Sparkles, CheckCircle
} from "lucide-react";

const useCases = [
  {
    icon: Users,
    title: "Community Tokens",
    description: "Build engaged communities with tokenized incentives",
    longDescription: "Create tokens to reward community members, incentivize participation, and build stronger engagement. Perfect for Discord communities, social platforms, and creator economies.",
    benefits: [
      "Reward active community members",
      "Create exclusive membership tiers",
      "Incentivize content creation",
      "Build loyal fan bases"
    ],
    examples: ["Discord community tokens", "Creator fan tokens", "Social media rewards", "Forum reputation systems"]
  },
  {
    icon: Target,
    title: "DAO Governance Tokens",
    description: "Power decentralized decision-making",
    longDescription: "Launch governance tokens for your DAO to enable democratic voting and decentralized management. Give stakeholders a voice in organizational decisions.",
    benefits: [
      "Democratic voting mechanisms",
      "Proportional voting power",
      "Treasury management rights",
      "Protocol upgrade decisions"
    ],
    examples: ["DAO voting tokens", "Protocol governance", "Treasury management", "Community proposals"]
  },
  {
    icon: Award,
    title: "Reward & Loyalty Programs",
    description: "Modern loyalty programs on blockchain",
    longDescription: "Replace traditional points systems with blockchain-based reward tokens. Tradeable, transparent, and valuable loyalty programs for your business.",
    benefits: [
      "Customer retention",
      "Tradeable reward points",
      "Transparent tracking",
      "Partner integrations"
    ],
    examples: ["Customer loyalty points", "Referral rewards", "Cashback tokens", "Membership benefits"]
  },
  {
    icon: Layers,
    title: "Gaming & Metaverse",
    description: "In-game currencies and virtual assets",
    longDescription: "Create in-game currencies, virtual land tokens, and tradeable game assets. Build play-to-earn economies and cross-game asset ecosystems.",
    benefits: [
      "In-game currency systems",
      "Tradeable game assets",
      "Play-to-earn mechanics",
      "Cross-platform utility"
    ],
    examples: ["Game currencies", "Virtual land tokens", "Item trading tokens", "Achievement badges"]
  },
  {
    icon: TrendingUp,
    title: "DeFi & Trading",
    description: "Financial applications and trading",
    longDescription: "Launch tokens for DeFi protocols, liquidity pools, yield farming, and decentralized trading platforms.",
    benefits: [
      "Liquidity pool tokens",
      "Yield farming rewards",
      "Staking mechanisms",
      "Trading pair creation"
    ],
    examples: ["LP tokens", "Yield tokens", "Synthetic assets", "Index tokens"]
  },
  {
    icon: Gift,
    title: "Airdrops & Giveaways",
    description: "Distribute rewards at scale",
    longDescription: "Create tokens specifically for airdrops, marketing campaigns, and large-scale giveaways to your audience.",
    benefits: [
      "Mass distribution capability",
      "Marketing campaigns",
      "User acquisition",
      "Brand awareness"
    ],
    examples: ["Marketing airdrops", "Contest prizes", "Promotional tokens", "Launch campaigns"]
  },
  {
    icon: Vote,
    title: "Voting Systems",
    description: "Transparent and verifiable voting",
    longDescription: "Implement token-based voting for elections, polls, and decision-making processes with complete transparency.",
    benefits: [
      "Verifiable voting records",
      "Tamper-proof results",
      "Weighted voting options",
      "Transparent governance"
    ],
    examples: ["Organization voting", "Community polls", "Election systems", "Proposal voting"]
  },
  {
    icon: Coins,
    title: "Project Fundraising",
    description: "Token sales and crowdfunding",
    longDescription: "Launch tokens for Initial DEX Offerings (IDOs), private sales, or crowdfunding campaigns for your project.",
    benefits: [
      "Fundraising mechanism",
      "Early supporter rewards",
      "Token distribution",
      "Investor relations"
    ],
    examples: ["IDO tokens", "Private sale tokens", "Crowdfund tokens", "Presale allocations"]
  },
  {
    icon: Heart,
    title: "Charity & Donations",
    description: "Transparent charitable giving",
    longDescription: "Create tokens for charitable causes with transparent tracking and donor rewards. Build trust through blockchain transparency.",
    benefits: [
      "Transparent fund tracking",
      "Donor recognition",
      "Impact verification",
      "Recurring donations"
    ],
    examples: ["Charity tokens", "Fundraiser tokens", "Donor rewards", "Impact tokens"]
  },
  {
    icon: Star,
    title: "Brand & Influencer Tokens",
    description: "Personal brand tokenization",
    longDescription: "Create personal tokens for influencers, artists, and brands. Offer exclusive access, perks, and direct fan engagement.",
    benefits: [
      "Direct fan engagement",
      "Exclusive content access",
      "Merchandise discounts",
      "Meet & greet opportunities"
    ],
    examples: ["Influencer tokens", "Artist tokens", "Brand tokens", "Celebrity tokens"]
  },
  {
    icon: Zap,
    title: "Utility Tokens",
    description: "Platform access and services",
    longDescription: "Create utility tokens that provide access to your platform, services, or exclusive features.",
    benefits: [
      "Platform access control",
      "Service payments",
      "Feature unlocking",
      "Premium memberships"
    ],
    examples: ["Access tokens", "Service credits", "API tokens", "Premium features"]
  },
  {
    icon: Globe,
    title: "Regional & Local Currencies",
    description: "Community and local economies",
    longDescription: "Launch tokens for specific regions, cities, or local communities to boost local economic activity.",
    benefits: [
      "Local economy boost",
      "Community bonds",
      "Regional rewards",
      "Local business support"
    ],
    examples: ["City tokens", "Regional currencies", "Local rewards", "Community credits"]
  },
];


export default function UseCasesPage() {
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
              Endless possibilities
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              What You Can Build With
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                SPL Tokens
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From community tokens to DeFi protocols, discover how creators and businesses are using SPL tokens
            </p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4">
                      <useCase.icon className="h-7 w-7 text-accent" />
                    </div>
                    <CardTitle className="text-xl mb-2">{useCase.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-normal">{useCase.description}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{useCase.longDescription}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Key Benefits:</h4>
                      <ul className="space-y-1.5">
                        {useCase.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Examples:</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-secondary px-2 py-1 rounded"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Ready to Build Your Use Case?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Create your SPL token in minutes and start building the future
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Create Your Token <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/how-it-works">
                  Learn How It Works
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
