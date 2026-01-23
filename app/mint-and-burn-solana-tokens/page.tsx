"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MintAndBurn: React.FC = () => (
  <article className="container py-16 max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
    <h1>Mint and Burn Solana Tokens</h1>
    <p className="lead">Understanding how to increase or decrease your token's supply on Solana.</p>

    <h2>What is Minting?</h2>
    <p>Minting creates new tokens and adds them to the total supply. Only the mint authority can perform this action. New tokens can be minted to any wallet address.</p>

    <h2>What is Burning?</h2>
    <p>Burning permanently removes tokens from circulation. Any token holder can burn their own tokens. This reduces the total supply.</p>

    <h2>Use Cases for Minting</h2>
    <ul>
      <li>Distributing rewards to users</li>
      <li>Scheduled token releases</li>
      <li>Staking rewards</li>
      <li>Team/advisor vesting</li>
    </ul>

    <h2>Use Cases for Burning</h2>
    <ul>
      <li>Reducing supply for scarcity</li>
      <li>Buyback and burn programs</li>
      <li>Fee burning mechanisms</li>
      <li>Proof of burn protocols</li>
    </ul>

    <h2>Mint Authority</h2>
    <p>The mint authority controls who can create new tokens. With MintPanel's Advanced plan, you keep this authority. With Basic plan, it's revoked—no new tokens can ever be minted.</p>

    <div className="not-prose mt-8">
      <Button asChild>
        <Link href="/create">Create Your Token <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </div>
  </article>
);

export default MintAndBurn;
