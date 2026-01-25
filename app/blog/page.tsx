"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText, Calendar, Clock, ArrowRight, Sparkles, TrendingUp,
  Zap, Users, Shield, Code
} from "lucide-react";


export default function BlogPage() {
  const featuredPost = {
    title: "The Complete Guide to Launching Your First SPL Token in 2026",
    excerpt: "Everything you need to know about creating and launching a successful SPL token on Solana, from planning to post-launch strategies.",
    date: "2026-01-20",
    readTime: "12 min read",
    category: "Guide",
    author: "MintPanel Team"
  };

  const blogPosts = [
    {
      title: "Understanding Token Authorities: When to Keep and When to Revoke",
      excerpt: "A comprehensive guide to managing mint, freeze, and update authorities for your SPL token.",
      date: "2026-01-18",
      readTime: "8 min read",
      category: "Education",
      icon: Shield
    },
    {
      title: "10 Use Cases for Community Tokens in 2026",
      excerpt: "Explore innovative ways projects are using tokens to build engaged communities and reward participation.",
      date: "2026-01-15",
      readTime: "10 min read",
      category: "Use Cases",
      icon: Users
    },
    {
      title: "Token Launch Checklist: 15 Things to Do Before Going Live",
      excerpt: "Essential preparation steps to ensure your token launch is smooth and successful.",
      date: "2026-01-12",
      readTime: "6 min read",
      category: "Guide",
      icon: FileText
    },
    {
      title: "Security Best Practices for Token Creators",
      excerpt: "How to protect your token project and community from common security threats and scams.",
      date: "2026-01-10",
      readTime: "9 min read",
      category: "Security",
      icon: Shield
    },
    {
      title: "Comparing Solana SPL to Ethereum ERC-20 Tokens",
      excerpt: "Technical and practical differences between Solana and Ethereum token standards.",
      date: "2026-01-08",
      readTime: "11 min read",
      category: "Technical",
      icon: Code
    },
    {
      title: "How to Build Liquidity for Your New Token",
      excerpt: "Strategies for creating and maintaining healthy liquidity pools on Solana DEXs.",
      date: "2026-01-05",
      readTime: "10 min read",
      category: "DeFi",
      icon: TrendingUp
    },
    {
      title: "Token Metadata: Making Your Token Stand Out",
      excerpt: "Best practices for creating compelling metadata that attracts holders and traders.",
      date: "2026-01-03",
      readTime: "7 min read",
      category: "Guide",
      icon: Sparkles
    },
    {
      title: "DAO Governance Tokens: A Practical Guide",
      excerpt: "How to structure and launch governance tokens for decentralized autonomous organizations.",
      date: "2025-12-28",
      readTime: "13 min read",
      category: "Governance",
      icon: Users
    },
    {
      title: "Understanding Solana Transaction Fees for Token Operations",
      excerpt: "Breaking down the costs of creating, minting, and managing SPL tokens on Solana.",
      date: "2025-12-25",
      readTime: "8 min read",
      category: "Economics",
      icon: Zap
    },
  ];

  const categories = [
    "All Posts",
    "Guides",
    "Education",
    "Use Cases",
    "Security",
    "Technical",
    "DeFi"
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
              Latest insights & guides
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              MintPanel
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Blog
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              News, guides, and insights about SPL token creation on Solana
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-secondary/20 border-y border-border">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center p-12">
                  <FileText className="h-24 w-24 text-accent" />
                </div>
                <div className="md:w-3/5 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded font-medium">
                      Featured
                    </span>
                    <span className="text-xs text-muted-foreground">{featuredPost.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <post.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-secondary px-2 py-1 rounded">{post.category}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-secondary/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest articles and guides delivered to your inbox
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-lg border border-border bg-background"
              />
              <Button size="lg">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
