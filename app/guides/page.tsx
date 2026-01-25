"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen, Rocket, Users, TrendingUp, Shield, Code,
  ArrowRight, Sparkles, Clock, CheckCircle, Zap, Target
} from "lucide-react";


export default function GuidesPage() {
  const guides = [
    {
      title: "Complete Beginner's Guide to Token Creation",
      description: "Everything you need to know to create your first SPL token",
      icon: Rocket,
      difficulty: "Beginner",
      duration: "15 min read",
      topics: [
        "Understanding SPL tokens",
        "Choosing between Basic and Advanced",
        "Preparing your metadata",
        "Step-by-step creation process",
        "Post-launch best practices"
      ]
    },
    {
      title: "Token Economics (Tokenomics) Design Guide",
      description: "How to design sustainable token economics for your project",
      icon: TrendingUp,
      difficulty: "Intermediate",
      duration: "20 min read",
      topics: [
        "Determining total supply",
        "Distribution strategies",
        "Vesting schedules",
        "Utility vs governance",
        "Inflation and deflation"
      ]
    },
    {
      title: "Building a Token Community",
      description: "Strategies for growing and engaging your token holders",
      icon: Users,
      difficulty: "Intermediate",
      duration: "18 min read",
      topics: [
        "Initial distribution methods",
        "Community incentive programs",
        "Governance participation",
        "Communication channels",
        "Retention strategies"
      ]
    },
    {
      title: "Listing Your Token on DEXs",
      description: "Complete guide to creating liquidity and getting listed",
      icon: Zap,
      difficulty: "Advanced",
      duration: "25 min read",
      topics: [
        "Understanding liquidity pools",
        "Raydium pool creation",
        "Orca integration",
        "Price discovery strategies",
        "Managing impermanent loss"
      ]
    },
    {
      title: "Token Security Best Practices",
      description: "Protecting your token and community from threats",
      icon: Shield,
      difficulty: "Intermediate",
      duration: "16 min read",
      topics: [
        "Authority management",
        "Smart contract risks",
        "Phishing prevention",
        "Multisig wallets",
        "Audit considerations"
      ]
    },
    {
      title: "Advanced Token Management",
      description: "Using authorities and dashboard features effectively",
      icon: Code,
      difficulty: "Advanced",
      duration: "22 min read",
      topics: [
        "Minting strategies",
        "Burning mechanisms",
        "Freeze authority use cases",
        "Metadata updates",
        "Revoking authorities"
      ]
    },
    {
      title: "DAO and Governance Token Guide",
      description: "Creating tokens for decentralized governance",
      icon: Target,
      difficulty: "Advanced",
      duration: "24 min read",
      topics: [
        "Governance models",
        "Voting mechanisms",
        "Proposal systems",
        "Treasury management",
        "On-chain vs off-chain"
      ]
    },
    {
      title: "Marketing Your Token Launch",
      description: "Strategies for successful token marketing",
      icon: TrendingUp,
      difficulty: "Intermediate",
      duration: "19 min read",
      topics: [
        "Pre-launch marketing",
        "Social media strategies",
        "Influencer partnerships",
        "Community building",
        "Launch events"
      ]
    },
    {
      title: "Token Airdrop Strategies",
      description: "Planning and executing successful token airdrops",
      icon: Users,
      difficulty: "Intermediate",
      duration: "17 min read",
      topics: [
        "Airdrop targeting",
        "Distribution methods",
        "Anti-bot measures",
        "Engagement requirements",
        "Follow-up strategies"
      ]
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
              In-depth guides
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Comprehensive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Token Guides
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Step-by-step guides to help you succeed at every stage of your token journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, i) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <guide.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-secondary px-2 py-1 rounded">{guide.difficulty}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {guide.duration}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>

                    <div className="space-y-2 mb-6">
                      <h4 className="text-sm font-semibold">What you'll learn:</h4>
                      <ul className="space-y-1.5">
                        {guide.topics.slice(0, 3).map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                      {guide.topics.length > 3 && (
                        <p className="text-xs text-muted-foreground pl-5">
                          + {guide.topics.length - 3} more topics
                        </p>
                      )}
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      Read Guide <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
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
            <BookOpen className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Put Knowledge Into Action?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Start creating your SPL token with the knowledge you've gained
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Create Your Token <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/tutorials">
                  Watch Video Tutorials
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
