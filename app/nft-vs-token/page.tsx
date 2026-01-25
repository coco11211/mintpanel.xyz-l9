"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Coins, ArrowRight, Sparkles } from "lucide-react";


export default function NFTvsTokenPage() {
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
              Understanding blockchain assets
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              NFTs vs
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Fungible Tokens
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Understanding the key differences and when to use each type
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Coins className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Fungible Tokens (SPL)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Interchangeable tokens where each unit is identical and has the same value.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Characteristics:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Divisible (can have decimals)</li>
                      <li>• Interchangeable</li>
                      <li>• Same value for each unit</li>
                      <li>• Used as currency/utility</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Use Cases:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Cryptocurrencies</li>
                      <li>• Governance tokens</li>
                      <li>• Reward points</li>
                      <li>• In-game currencies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Image className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Non-Fungible Tokens (NFTs)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Unique tokens where each has distinct properties and value.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Characteristics:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Unique and distinct</li>
                      <li>• Not interchangeable</li>
                      <li>• Individual value</li>
                      <li>• Represents ownership</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Use Cases:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Digital art</li>
                      <li>• Collectibles</li>
                      <li>• Game items</li>
                      <li>• Certificates</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decision Guide */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Which Should You Choose?</h2>
            <p className="text-lg text-muted-foreground">
              Quick decision guide for your project
            </p>
          </motion.div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Choose Fungible Tokens if:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ You need a currency or point system</li>
                  <li>✓ All units should have the same value</li>
                  <li>✓ You need divisibility (decimals)</li>
                  <li>✓ You're building DeFi applications</li>
                  <li>✓ You need governance or voting rights</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Choose NFTs if:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Each item should be unique</li>
                  <li>✓ You're creating art or collectibles</li>
                  <li>✓ Representing real-world assets</li>
                  <li>✓ Creating certificates or credentials</li>
                  <li>✓ Building unique game items</li>
                </ul>
              </CardContent>
            </Card>
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
              Ready to Create Fungible Tokens?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              MintPanel specializes in SPL fungible token creation
            </p>
            <Button size="lg" className="text-lg px-8 h-12" asChild>
              <Link href="/create">
                Create SPL Token <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
