"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HelpCircle, BookOpen, Video, Mail, MessageSquare, FileText,
  ArrowRight, Sparkles, Search, Zap, Shield
} from "lucide-react";


export default function SupportPage() {
  const supportResources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and technical documentation",
      link: "/docs"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for visual learners",
      link: "/tutorials"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Answers to frequently asked questions",
      link: "/faq-extended"
    },
    {
      icon: FileText,
      title: "Guides",
      description: "Detailed guides for specific use cases",
      link: "/guides"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help from our support team via email",
      link: "/contact"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with us in real-time during business hours",
      link: "/contact"
    },
  ];

  const commonIssues = [
    {
      title: "Token creation failed",
      solution: "Ensure you have enough SOL in your wallet for creation fees and network costs. Try refreshing your wallet connection.",
      link: "/docs"
    },
    {
      title: "Wallet won't connect",
      solution: "Make sure your wallet extension is unlocked and you're on the correct network (mainnet or devnet).",
      link: "/docs"
    },
    {
      title: "Can't update metadata",
      solution: "Metadata updates require update authority. If you created with Basic plan, metadata is immutable.",
      link: "/token-standards"
    },
    {
      title: "Logo not displaying",
      solution: "Ensure your logo is in PNG/JPG format and under 1MB. IPFS propagation can take a few minutes.",
      link: "/tutorials"
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
              24/7 support resources
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Support
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Center
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers, get help, and learn how to make the most of MintPanel
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full h-12 pl-12 pr-4 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our self-service resources or contact support
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {supportResources.map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={resource.link}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <resource.icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                      <Button variant="ghost" size="sm" className="p-0">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Issues & Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Quick fixes for the most common problems
            </p>
          </motion.div>

          <div className="space-y-4">
            {commonIssues.map((issue, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Zap className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{issue.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{issue.solution}</p>
                        <Link
                          href={issue.link}
                          className="text-sm text-accent hover:underline inline-flex items-center gap-1"
                        >
                          Learn more <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <Shield className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Our support team is ready to assist you
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/contact">
                  Contact Support <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/docs">
                  Browse Docs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
