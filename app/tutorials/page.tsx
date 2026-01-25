"use client";


import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Video, PlayCircle, Clock, ArrowRight, Sparkles, FileText,
  Zap, Users, TrendingUp, Shield, Settings
} from "lucide-react";


export default function TutorialsPage() {
  const tutorials = [
    {
      title: "Getting Started with MintPanel",
      description: "Complete walkthrough for first-time users",
      duration: "8 min",
      difficulty: "Beginner",
      views: "12.5K",
      thumbnail: "🚀"
    },
    {
      title: "Creating Your First SPL Token",
      description: "Step-by-step token creation from start to finish",
      duration: "15 min",
      difficulty: "Beginner",
      views: "18.2K",
      thumbnail: "🪙"
    },
    {
      title: "Understanding Token Authorities",
      description: "Deep dive into mint, freeze, and update authorities",
      duration: "12 min",
      difficulty: "Intermediate",
      views: "8.3K",
      thumbnail: "🔐"
    },
    {
      title: "Uploading and Managing Metadata",
      description: "How to add logos, descriptions, and social links",
      duration: "10 min",
      difficulty: "Beginner",
      views: "9.7K",
      thumbnail: "📝"
    },
    {
      title: "Token Management Dashboard Tour",
      description: "Using the management dashboard for Advanced plan users",
      duration: "14 min",
      difficulty: "Intermediate",
      views: "6.1K",
      thumbnail: "📊"
    },
    {
      title: "Minting Additional Tokens",
      description: "How to increase your token supply after creation",
      duration: "7 min",
      difficulty: "Intermediate",
      views: "5.4K",
      thumbnail: "➕"
    },
    {
      title: "Burning Token Supply",
      description: "Reducing token supply through burning",
      duration: "6 min",
      difficulty: "Intermediate",
      views: "4.9K",
      thumbnail: "🔥"
    },
    {
      title: "Freezing and Unfreezing Accounts",
      description: "Managing account freeze authority",
      duration: "8 min",
      difficulty: "Advanced",
      views: "3.2K",
      thumbnail: "❄️"
    },
    {
      title: "Listing Your Token on DEXs",
      description: "How to add liquidity and list on Raydium/Orca",
      duration: "20 min",
      difficulty: "Advanced",
      views: "11.8K",
      thumbnail: "💱"
    },
    {
      title: "Security Best Practices",
      description: "Keeping your tokens and wallet secure",
      duration: "13 min",
      difficulty: "Beginner",
      views: "7.6K",
      thumbnail: "🛡️"
    },
    {
      title: "Building a Community Token",
      description: "Creating and distributing tokens for your community",
      duration: "18 min",
      difficulty: "Intermediate",
      views: "9.3K",
      thumbnail: "👥"
    },
    {
      title: "DAO Governance Tokens",
      description: "Launching governance tokens for decentralized organizations",
      duration: "16 min",
      difficulty: "Advanced",
      views: "5.7K",
      thumbnail: "🗳️"
    },
  ];

  const categories = [
    { name: "Getting Started", icon: Sparkles, count: 3 },
    { name: "Token Management", icon: Settings, count: 4 },
    { name: "Advanced Topics", icon: TrendingUp, count: 3 },
    { name: "Security", icon: Shield, count: 2 },
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
              Learn by watching
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Video
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 mt-2">
                Tutorials
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Step-by-step video guides to help you master token creation and management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-secondary/20 border-y border-border">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-4 max-w-4xl mx-auto">
            {categories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6 pb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <category.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} videos</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="p-0">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-t-lg flex items-center justify-center">
                      <div className="text-6xl mb-4">{tutorial.thumbnail}</div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-secondary px-2 py-1 rounded">{tutorial.difficulty}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {tutorial.duration}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {tutorial.views} views
                    </div>
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
            <Video className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Put Your Knowledge Into Practice?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Start creating your SPL token now with confidence
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link href="/create">
                  Create Your Token <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                <Link href="/docs">
                  Read Documentation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
