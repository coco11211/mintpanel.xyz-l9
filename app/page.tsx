"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Zap, Shield, Settings, ArrowRight, Check, Sparkles } from "lucide-react";

const features = [
  { icon: Coins, title: "Create SPL Tokens", description: "Launch fungible tokens on Solana in minutes" },
  { icon: Zap, title: "Instant Deployment", description: "Tokens created on-chain immediately" },
  { icon: Shield, title: "Full Control", description: "Manage all token authorities" },
  { icon: Settings, title: "Management Dashboard", description: "Mint, burn, freeze, and update" },
];

const plans = [
  {
    name: "Basic",
    price: "0.03 SOL",
    description: "Simple token launches",
    features: ["Create SPL token", "Set initial supply", "Upload metadata", "Authorities revoked"],
    highlighted: false,
  },
  {
    name: "Advanced",
    price: "0.05 SOL",
    description: "Full token control",
    features: ["Everything in Basic", "Keep mint authority", "Keep freeze authority", "Mutable metadata", "Management dashboard"],
    highlighted: true,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground mb-6">
              <Sparkles className="h-3 w-3" />
              No coding required
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Create Solana SPL Tokens
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              The simplest way to launch and manage your own token on Solana.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/create">
                  Create Token <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/solana-token-creator">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-xl font-semibold text-center mb-10">Everything You Need</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50">
                  <CardContent className="pt-6">
                    <feature.icon className="h-8 w-8 text-foreground mb-3" />
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-xl font-semibold text-center mb-2">Simple Pricing</h2>
          <p className="text-center text-muted-foreground mb-10">Pay per token. No subscriptions.</p>
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlighted ? "border-foreground/20 relative" : "border-border/50"}
              >
                {plan.highlighted && (
                  <div className="absolute -top-2.5 left-4">
                    <span className="bg-foreground text-background text-xs font-medium px-2 py-0.5 rounded">
                      Popular
                    </span>
                  </div>
                )}
                <CardContent className="pt-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <span className="text-lg font-semibold">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} asChild>
                    <Link href="/create">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
