"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Check, Coins, Zap, Shield, Settings } from "lucide-react";

const faqs = [
  { q: "What is an SPL token?", a: "SPL tokens are fungible tokens on the Solana blockchain, similar to ERC-20 tokens on Ethereum. They can represent anything from currencies to governance tokens." },
  { q: "How much does it cost?", a: "Creating a token costs a small fee in SOL (0.01-0.02 SOL) plus network transaction fees (~0.00001 SOL)." },
  { q: "Do I need coding skills?", a: "No! MintPanel handles all the technical details. Just fill out a form and your token is created." },
  { q: "What's the difference between Basic and Advanced?", a: "Basic revokes all authorities making your token immutable. Advanced keeps mint/freeze authorities so you can manage supply later." },
  { q: "Can I update my token after creation?", a: "Only with Advanced plan. Basic tokens are immutable once created." },
];

const SolanaTokenCreator: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl mb-4">
              Solana Token Creator
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Create your own SPL token on Solana in minutes. No coding required. Full control over your token's properties and authorities.
            </p>
            <Button size="lg" asChild>
              <Link href="/create">
                Create Your Token <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-10">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-4 max-w-4xl mx-auto">
            {[
              { step: 1, title: "Connect Wallet", desc: "Connect your Solana wallet (Phantom, Solflare, Brave, etc.)" },
              { step: 2, title: "Enter Details", desc: "Set token name, symbol, decimals, and initial supply" },
              { step: 3, title: "Choose Plan", desc: "Basic (immutable) or Advanced (full control)" },
              { step: 4, title: "Create Token", desc: "Approve the transaction and your token is live" },
            ].map((item) => (
              <Card key={item.step}>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-10">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { icon: Coins, title: "SPL Token Standard", desc: "Compatible with all Solana wallets and DEXs" },
              { icon: Zap, title: "Instant Creation", desc: "Token created on-chain in seconds" },
              { icon: Shield, title: "Secure", desc: "You control all authorities" },
              { icon: Settings, title: "Management", desc: "Mint, burn, freeze from dashboard" },
            ].map((f) => (
              <Card key={f.title}>
                <CardContent className="pt-6">
                  <f.icon className="h-8 w-8 mb-3" />
                  <h3 className="font-medium mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-10">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Create Your Token?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of creators who have launched tokens on Solana.</p>
          <Button size="lg" asChild>
            <Link href="/create">Get Started</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default SolanaTokenCreator;
