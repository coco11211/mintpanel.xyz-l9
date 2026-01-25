"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";


export default function ComparisonPage() {
  const comparison = [
    { feature: "Instant Token Deployment", mintpanel: true, others: "Varies" },
    { feature: "No Coding Required", mintpanel: true, others: true },
    { feature: "Metadata Upload", mintpanel: true, others: "Limited" },
    { feature: "Permanent IPFS Storage", mintpanel: true, others: false },
    { feature: "Keep Token Authorities", mintpanel: true, others: "Sometimes" },
    { feature: "Management Dashboard", mintpanel: true, others: false },
    { feature: "Analytics & Insights", mintpanel: true, others: false },
    { feature: "Mint Additional Tokens", mintpanel: true, others: false },
    { feature: "Burn Token Supply", mintpanel: true, others: false },
    { feature: "Freeze Accounts", mintpanel: true, others: false },
    { feature: "Update Metadata", mintpanel: true, others: false },
    { feature: "Priority Support", mintpanel: true, others: false },
    { feature: "Pricing", mintpanel: "0.03 - 0.05 SOL", others: "0.1+ SOL" },
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
              Industry leading features
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Why Choose
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                MintPanel?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              See how we compare to other Solana token creation platforms
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold">Feature</th>
                      <th className="text-center py-4 px-6 font-semibold">MintPanel</th>
                      <th className="text-center py-4 px-6 font-semibold">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((item, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        viewport={{ once: true }}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="py-4 px-6">{item.feature}</td>
                        <td className="py-4 px-6 text-center">
                          {typeof item.mintpanel === "boolean" ? (
                            item.mintpanel ? (
                              <Check className="h-6 w-6 text-accent mx-auto" />
                            ) : (
                              <X className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-medium">{item.mintpanel}</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {typeof item.others === "boolean" ? (
                            item.others ? (
                              <Check className="h-6 w-6 text-muted-foreground mx-auto" />
                            ) : (
                              <X className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-muted-foreground">{item.others}</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
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
              Experience the Difference
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands who chose MintPanel for superior features and pricing
            </p>
            <Button size="lg" className="text-lg px-8 h-12" asChild>
              <Link href="/create">
                Create Your Token <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
