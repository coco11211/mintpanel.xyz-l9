"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, ArrowRight, Sparkles } from "lucide-react";


export default function FAQExtendedPage() {
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is MintPanel?",
          a: "MintPanel is a no-code platform for creating and managing SPL tokens on Solana blockchain. It makes token creation accessible to everyone, from beginners to experienced developers."
        },
        {
          q: "Do I need coding experience?",
          a: "No! MintPanel is designed to be completely no-code. You can create professional SPL tokens through our intuitive interface without writing a single line of code."
        },
        {
          q: "What wallet do I need?",
          a: "You need a Solana-compatible wallet like Phantom, Solflare, or any wallet supported by Solana wallet adapter. Make sure it has enough SOL to cover creation fees and network costs."
        },
        {
          q: "How long does token creation take?",
          a: "The entire process takes less than 5 minutes. Once you submit your transaction, your token is deployed instantly on the Solana blockchain."
        },
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "What's the difference between Basic and Advanced?",
          a: "Basic plan (0.03 SOL) creates immutable tokens with all authorities revoked. Advanced plan (0.05 SOL) lets you keep authorities to manage, mint, burn, and update your token after creation."
        },
        {
          q: "Are there any recurring fees?",
          a: "No! You pay once per token creation. There are no subscriptions or monthly fees. The only additional costs are Solana's minimal network transaction fees (usually < $0.01)."
        },
        {
          q: "Can I upgrade from Basic to Advanced later?",
          a: "No, once you create a token with Basic plan, authorities are permanently revoked. If you think you'll need management features, choose Advanced from the start."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept SOL payments through your connected Solana wallet. All fees are paid directly on-chain as part of the creation transaction."
        },
      ]
    },
    {
      category: "Token Creation",
      questions: [
        {
          q: "What information do I need to provide?",
          a: "You'll need: token name, symbol (ticker), decimal places (0-9), initial supply, and optionally a logo image and description for metadata."
        },
        {
          q: "Can I change my token details after creation?",
          a: "With Advanced plan, you can update metadata (name, symbol, description, logo). With Basic plan, all details are immutable. Supply can be changed by minting/burning if you have those authorities."
        },
        {
          q: "What file formats do you support for logos?",
          a: "We support PNG, JPG, and SVG image formats. Recommended size is 512x512 pixels for best display across platforms."
        },
        {
          q: "Where is my token metadata stored?",
          a: "Metadata is permanently stored on IPFS (decentralized storage) and linked to your token through the Metaplex metadata standard, ensuring permanent availability."
        },
      ]
    },
    {
      category: "Token Management",
      questions: [
        {
          q: "How do I mint additional tokens?",
          a: "If you kept mint authority (Advanced plan), access your token management dashboard and use the Mint function. Specify the amount and destination wallet address."
        },
        {
          q: "Can I burn tokens?",
          a: "Yes! Any token holder can burn their own tokens. Token creators with mint authority can also burn tokens from their wallet to reduce supply."
        },
        {
          q: "What does freezing an account do?",
          a: "Freezing prevents a specific token account from transferring tokens. This requires freeze authority. The account can still receive tokens but cannot send them until unfrozen."
        },
        {
          q: "Can I revoke authorities later?",
          a: "Yes! If you have an authority, you can revoke it at any time. This is permanent and cannot be undone. It's commonly done to make a token fully decentralized."
        },
      ]
    },
    {
      category: "Technical Questions",
      questions: [
        {
          q: "What is an SPL token?",
          a: "SPL (Solana Program Library) Token is the standard for fungible tokens on Solana blockchain, similar to ERC-20 on Ethereum but optimized for Solana's high-performance architecture."
        },
        {
          q: "What are token decimals?",
          a: "Decimals determine how divisible your token is. For example, 9 decimals means your token can be divided into 0.000000001 units, similar to how 1 SOL = 1,000,000,000 lamports."
        },
        {
          q: "Can my token be listed on DEXs?",
          a: "Yes! SPL tokens created with MintPanel are standard Solana tokens compatible with all major DEXs like Raydium, Orca, and Jupiter. You'll need to create a liquidity pool to enable trading."
        },
        {
          q: "Is my token visible on Solana explorers?",
          a: "Yes! Your token appears on Solana explorers (Solscan, Solana Explorer, etc.) immediately after creation. You can view all transactions, holders, and metadata."
        },
      ]
    },
    {
      category: "Security & Safety",
      questions: [
        {
          q: "Is MintPanel safe to use?",
          a: "Yes! We use non-custodial architecture meaning you always control your private keys. We only interact with official Solana programs that have been audited and battle-tested."
        },
        {
          q: "Do you have access to my private keys?",
          a: "Never! We never ask for, store, or have access to your private keys. All transactions are signed locally in your wallet, and we only receive the signed transaction."
        },
        {
          q: "What if I make a mistake?",
          a: "Double-check all details before confirming. Token creation is permanent. However, with Advanced plan, you can update metadata if you made an error in name, symbol, or description."
        },
        {
          q: "How can I avoid scams?",
          a: "Always bookmark our official URL. Never share your seed phrase. Verify all transaction details before signing. Be cautious of impersonators on social media."
        },
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
              Comprehensive answers
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Frequently Asked
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Questions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to all your questions about creating and managing Solana SPL tokens
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-16 last:mb-0"
            >
              <h2 className="text-2xl font-bold mb-8">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <HelpCircle className="h-6 w-6 text-accent shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg mb-3">{faq.q}</h3>
                          <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
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
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Our support team is here to help you succeed
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/contact">
                  Contact Support <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/docs">
                  View Documentation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
