"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SplTokenMetadata: React.FC = () => (
  <article className="container py-16 max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
    <h1>SPL Token Metadata: Complete Guide</h1>
    <p className="lead">Learn how metadata works for SPL tokens on Solana and how to set it up correctly.</p>

    <h2>What is SPL Token Metadata?</h2>
    <p>Token metadata provides human-readable information about your token, including its name, symbol, description, and image. This data is stored on-chain using the Metaplex Token Metadata program.</p>

    <h2>Metadata Fields</h2>
    <ul>
      <li><strong>Name:</strong> The full name of your token (e.g., "My Token")</li>
      <li><strong>Symbol:</strong> The ticker symbol (e.g., "MTK")</li>
      <li><strong>URI:</strong> A link to off-chain JSON metadata containing description, image, etc.</li>
      <li><strong>Seller Fee:</strong> Optional royalty percentage (typically 0 for fungible tokens)</li>
    </ul>

    <h2>Mutable vs Immutable</h2>
    <p>When creating a token, you can choose whether metadata is mutable:</p>
    <ul>
      <li><strong>Mutable:</strong> You can update name, symbol, and URI later</li>
      <li><strong>Immutable:</strong> Metadata is permanently locked after creation</li>
    </ul>

    <h2>Best Practices</h2>
    <ul>
      <li>Use high-quality images (recommended: 512x512 PNG)</li>
      <li>Host metadata on permanent storage (Arweave, IPFS)</li>
      <li>Include a clear description of your token's purpose</li>
      <li>Set an external URL for more information</li>
    </ul>

    <div className="not-prose mt-8">
      <Button asChild>
        <Link href="/create">Create Token with Metadata <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </div>
  </article>
);

export default SplTokenMetadata;
