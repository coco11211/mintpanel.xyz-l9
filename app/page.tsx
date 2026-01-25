"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Coins, Zap, Shield, Settings, ArrowRight, Check, Sparkles,
  Rocket, Users, TrendingUp, Lock, Code, Clock, Globe, Star,
  BarChart, Repeat, FileText, Award, Target, Layers
} from "lucide-react";

const stats = [
  { label: "Simple Interface", value: "No Code", icon: Coins },
  { label: "Fast Creation", value: "<5 min", icon: Zap },
  { label: "Network", value: "Solana", icon: TrendingUp },
  { label: "Token Standard", value: "SPL", icon: Shield },
];

const features = [
  {
    icon: Rocket,
    title: "Launch in Minutes",
    description: "Create and deploy your SPL token in under 5 minutes with our streamlined interface"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Military-grade encryption and secure wallet integration for complete peace of mind"
  },
  {
    icon: Settings,
    title: "Full Control",
    description: "Manage mint, freeze, and update authorities with granular permission controls"
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    description: "Track token performance, holder distribution, and transaction metrics in real-time"
  },
  {
    icon: Code,
    title: "No Coding Required",
    description: "Intuitive interface designed for everyone, from beginners to blockchain experts"
  },
  {
    icon: Clock,
    title: "Instant Deployment",
    description: "Your token goes live on Solana blockchain immediately after creation"
  },
  {
    icon: Repeat,
    title: "Token Management",
    description: "Mint new tokens, burn supply, freeze accounts, and update metadata anytime"
  },
  {
    icon: Globe,
    title: "Metadata Hosting",
    description: "Free permanent storage for your token logo and metadata on decentralized networks"
  },
];

const useCases = [
  {
    title: "Community Tokens",
    description: "Create tokens to reward your community members, incentivize participation, and build engagement.",
    icon: Users,
  },
  {
    title: "Governance Tokens",
    description: "Launch DAO governance tokens for decentralized decision-making in your organization.",
    icon: Target,
  },
  {
    title: "Reward Programs",
    description: "Build loyalty programs with custom tokens for customers, users, or stakeholders.",
    icon: Award,
  },
  {
    title: "Gaming Assets",
    description: "Create in-game currencies and tradeable assets for web3 games and metaverse projects.",
    icon: Layers,
  },
];

const plans = [
  {
    name: "Basic",
    price: "0.03 SOL",
    description: "Perfect for simple token launches",
    features: [
      "Create SPL token",
      "Set initial supply",
      "Upload metadata & logo",
      "Authorities revoked",
      "Permanent metadata storage",
      "Basic support"
    ],
    highlighted: false,
  },
  {
    name: "Advanced",
    price: "0.05 SOL",
    description: "Full control for serious projects",
    features: [
      "Everything in Basic",
      "Keep mint authority",
      "Keep freeze authority",
      "Mutable metadata",
      "Management dashboard",
      "Priority support",
      "Analytics & insights"
    ],
    highlighted: true,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with Gradient */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-secondary/20 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent -z-10" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground mb-8"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              No coding required - Launch your token in minutes
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-6"
            >
              Create Solana SPL Tokens
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                The Professional Way
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              The most trusted platform to launch and manage SPL tokens on Solana.
              Built for creators, developers, and entrepreneurs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Create Your Token <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/how-it-works">
                  See How It Works
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              Trusted by 5,000+ creators and developers worldwide
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make token creation and management effortless
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Every Use Case</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're building a community, launching a DAO, or creating the next big thing
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4">
                      <useCase.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/use-cases">
                Explore All Use Cases <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pay only for what you need. No hidden fees, no subscriptions.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full relative ${
                    plan.highlighted
                      ? "border-accent shadow-2xl shadow-accent/10"
                      : "border-border/50"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="pt-8 pb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">per token</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      size="lg"
                      variant={plan.highlighted ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/create">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button variant="ghost" asChild>
              <Link href="/pricing">
                View Detailed Pricing Comparison <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-secondary/10 -z-10" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Launch Your Token?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Start building on Solana with our simple, no-code token creation platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Create Your Token Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/docs">
                  Read Documentation
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              No credit card required • Launch in under 5 minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
