"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, ArrowRight, Sparkles, Shield, Zap, HelpCircle } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "0.03 SOL",
    priceUSD: "~$5",
    description: "Perfect for simple token launches",
    popular: false,
    features: [
      { name: "Create SPL Token", included: true },
      { name: "Set Initial Supply", included: true },
      { name: "Upload Metadata & Logo", included: true },
      { name: "Permanent Metadata Storage", included: true },
      { name: "Token Deployed Instantly", included: true },
      { name: "Basic Support (Email)", included: true },
      { name: "Keep Mint Authority", included: false },
      { name: "Keep Freeze Authority", included: false },
      { name: "Mutable Metadata", included: false },
      { name: "Management Dashboard", included: false },
      { name: "Analytics & Insights", included: false },
      { name: "Priority Support", included: false },
    ],
  },
  {
    name: "Advanced",
    price: "0.05 SOL",
    priceUSD: "~$8",
    description: "Full control for serious projects",
    popular: true,
    features: [
      { name: "Create SPL Token", included: true },
      { name: "Set Initial Supply", included: true },
      { name: "Upload Metadata & Logo", included: true },
      { name: "Permanent Metadata Storage", included: true },
      { name: "Token Deployed Instantly", included: true },
      { name: "Basic Support (Email)", included: true },
      { name: "Keep Mint Authority", included: true },
      { name: "Keep Freeze Authority", included: true },
      { name: "Mutable Metadata", included: true },
      { name: "Management Dashboard", included: true },
      { name: "Analytics & Insights", included: true },
      { name: "Priority Support", included: true },
    ],
  },
];

const comparisonFeatures = [
  {
    category: "Token Creation",
    features: [
      { name: "SPL Token Standard", basic: true, advanced: true },
      { name: "Custom Name & Symbol", basic: true, advanced: true },
      { name: "Custom Decimals (0-9)", basic: true, advanced: true },
      { name: "Initial Supply", basic: true, advanced: true },
      { name: "Metadata Upload", basic: true, advanced: true },
      { name: "Logo Upload (PNG/JPG)", basic: true, advanced: true },
    ],
  },
  {
    category: "Authorities & Control",
    features: [
      { name: "Keep Mint Authority", basic: false, advanced: true },
      { name: "Keep Freeze Authority", basic: false, advanced: true },
      { name: "Keep Update Authority", basic: false, advanced: true },
      { name: "Revoke All Authorities", basic: true, advanced: "Optional" },
    ],
  },
  {
    category: "Management Features",
    features: [
      { name: "Token Management Dashboard", basic: false, advanced: true },
      { name: "Mint New Tokens", basic: false, advanced: true },
      { name: "Burn Token Supply", basic: false, advanced: true },
      { name: "Freeze/Unfreeze Accounts", basic: false, advanced: true },
      { name: "Update Metadata", basic: false, advanced: true },
    ],
  },
  {
    category: "Storage & Hosting",
    features: [
      { name: "Metadata Storage", basic: "Permanent", advanced: "Permanent" },
      { name: "Image Hosting", basic: "Permanent", advanced: "Permanent" },
      { name: "IPFS Integration", basic: true, advanced: true },
    ],
  },
  {
    category: "Analytics & Insights",
    features: [
      { name: "Transaction History", basic: false, advanced: true },
      { name: "Holder Analytics", basic: false, advanced: true },
      { name: "Supply Tracking", basic: false, advanced: true },
      { name: "Performance Metrics", basic: false, advanced: true },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Email Support", basic: "48h", advanced: "24h" },
      { name: "Priority Support", basic: false, advanced: true },
      { name: "Documentation Access", basic: true, advanced: true },
      { name: "Video Tutorials", basic: true, advanced: true },
    ],
  },
];

const faqs = [
  {
    question: "What is the difference between Basic and Advanced?",
    answer: "Basic plan revokes all authorities after creation, making your token immutable. Advanced plan lets you keep authorities so you can manage, mint, burn, and update your token after creation."
  },
  {
    question: "Can I upgrade from Basic to Advanced later?",
    answer: "No, once you create a token with Basic plan, authorities are permanently revoked. If you think you might need management features later, choose Advanced from the start."
  },
  {
    question: "Are there any recurring fees?",
    answer: "No! You pay once per token creation. There are no subscriptions, monthly fees, or hidden costs. The only additional cost would be Solana network transaction fees for token operations."
  },
  {
    question: "What are Solana transaction fees?",
    answer: "Solana charges minimal transaction fees (usually less than $0.01) for on-chain operations. These fees go to Solana validators, not to us."
  },
  {
    question: "Can I create multiple tokens?",
    answer: "Yes! You can create as many tokens as you need. Each token creation requires the respective plan fee."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept SOL payments through your connected Solana wallet (Phantom, Solflare, etc.). The fees are paid directly on-chain."
  },
];


export default function PricingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground mb-6">
              <Sparkles className="h-3 w-3" />
              Simple, transparent pricing
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Pricing That Makes Sense
            </h1>
            <p className="text-xl text-muted-foreground">
              Pay once per token. No subscriptions. No hidden fees. Choose the plan that fits your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`h-full relative ${
                    plan.popular
                      ? "border-accent shadow-2xl shadow-accent/10 scale-105"
                      : "border-border/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-accent-foreground text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="pt-8 pb-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.priceUSD}</span>
                      </div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>

                    <Button
                      className="w-full mb-8"
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/create">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature.name} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/30 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              !feature.included ? "text-muted-foreground/50" : ""
                            }`}
                          >
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Detailed Feature Comparison</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about what's included in each plan
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {comparisonFeatures.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium">Feature</th>
                            <th className="text-center py-3 px-4 font-medium">Basic</th>
                            <th className="text-center py-3 px-4 font-medium">Advanced</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.features.map((feature, i) => (
                            <tr key={i} className="border-b border-border/50 last:border-0">
                              <td className="py-3 px-4 text-sm">{feature.name}</td>
                              <td className="py-3 px-4 text-center">
                                {typeof feature.basic === "boolean" ? (
                                  feature.basic ? (
                                    <Check className="h-5 w-5 text-accent mx-auto" />
                                  ) : (
                                    <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-sm text-muted-foreground">{feature.basic}</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center">
                                {typeof feature.advanced === "boolean" ? (
                                  feature.advanced ? (
                                    <Check className="h-5 w-5 text-accent mx-auto" />
                                  ) : (
                                    <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-sm text-muted-foreground">{feature.advanced}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing FAQs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions about our pricing and plans
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <HelpCircle className="h-6 w-6 text-accent shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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
              Ready to Create Your Token?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Choose your plan and launch your SPL token in minutes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
