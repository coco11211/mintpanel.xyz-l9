"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FreezeAuthority: React.FC = () => (
  <article className="container py-16 max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
    <h1>Freeze Authority on Solana</h1>
    <p className="lead">Understanding and using the freeze authority for SPL tokens.</p>

    <h2>What is Freeze Authority?</h2>
    <p>The freeze authority allows you to freeze (lock) any token account, preventing the holder from transferring or burning their tokens. This is a powerful control mechanism for token issuers.</p>

    <h2>How Freezing Works</h2>
    <ol>
      <li>The freeze authority calls the freeze instruction on a target token account</li>
      <li>The account becomes "frozen" and cannot transfer tokens</li>
      <li>The account holder still owns the tokens but cannot move them</li>
      <li>Only the freeze authority can thaw (unfreeze) the account</li>
    </ol>

    <h2>Use Cases</h2>
    <ul>
      <li><strong>Compliance:</strong> Freeze accounts for regulatory requirements</li>
      <li><strong>Security:</strong> Freeze compromised accounts</li>
      <li><strong>Disputes:</strong> Temporarily lock tokens during dispute resolution</li>
      <li><strong>Vesting:</strong> Prevent transfer until vesting completes</li>
    </ul>

    <h2>Should You Keep Freeze Authority?</h2>
    <p>Keeping freeze authority provides control but may concern users who want fully decentralized tokens. Consider your use case:</p>
    <ul>
      <li><strong>Keep it:</strong> If you need compliance controls or security measures</li>
      <li><strong>Revoke it:</strong> If you want a fully decentralized, trust-minimized token</li>
    </ul>

    <h2>Revoking Freeze Authority</h2>
    <p>With MintPanel's Basic plan, freeze authority is automatically revoked. With Advanced plan, you can revoke it later from the management dashboard—but this action is irreversible.</p>

    <div className="not-prose mt-8">
      <Button asChild>
        <Link href="/create">Create Your Token <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </div>
  </article>
);

export default FreezeAuthority;
