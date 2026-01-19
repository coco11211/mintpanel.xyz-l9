import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
  {
    question: "What is an SPL token?",
    answer:
      "SPL (Solana Program Library) tokens are the standard token format on the Solana blockchain, similar to ERC-20 tokens on Ethereum. They can represent anything from cryptocurrencies to loyalty points, governance tokens, or digital assets.",
  },
  {
    question: "What is mint authority?",
    answer:
      "Mint authority is the permission to create (mint) additional tokens. If you keep mint authority, you can increase the token supply later. If you revoke it using the Advanced plan, the supply becomes permanently fixed and no one can ever create more tokens.",
  },
  {
    question: "What is freeze authority?",
    answer:
      "Freeze authority allows the holder to freeze token accounts, preventing transfers. This is sometimes used for compliance or security reasons. Revoking freeze authority means no one can ever freeze any holder's tokens.",
  },
  {
    question: "Should I revoke authorities?",
    answer:
      "It depends on your use case. For community tokens or memecoins, revoking authorities builds trust since no one can manipulate supply or freeze accounts. For utility tokens where you might need to mint rewards later, keep the mint authority. Consider your token's purpose carefully - revoking is permanent.",
  },
  {
    question: "What happens if the transaction fails?",
    answer:
      "MintPanel bundles all operations into a single atomic transaction. If any step fails (token creation, minting, metadata upload, or fee transfer), the entire transaction reverts and you pay nothing except minimal network fees for the failed attempt. This protects you from partial failures.",
  },
  {
    question: "Where is my token metadata stored?",
    answer:
      "Token metadata (name, symbol, description, image) is stored on Vercel Blob storage with public HTTPS URLs. This provides fast, reliable access. The metadata URI is recorded on-chain via the Metaplex Token Metadata Program.",
  },
  {
    question: "What are the fees?",
    answer:
      "Basic plan costs 0.03 SOL plus network fees (~0.01 SOL). Advanced plan costs 0.05 SOL plus network fees. Network fees cover Solana transaction costs and rent for account creation. There are no hidden fees - the cost breakdown is shown before you sign.",
  },
  {
    question: "Can I edit my token after creation?",
    answer:
      "With the Basic plan, you retain update authority and can modify metadata later using Metaplex tools. With the Advanced plan, metadata is made immutable, meaning it cannot be changed. Choose based on whether you need flexibility or want to guarantee permanence.",
  },
  {
    question: "Is MintPanel safe to use?",
    answer:
      "Yes. MintPanel only uses official Solana programs (SPL Token Program and Metaplex Token Metadata Program). We never have access to your wallet - you sign transactions directly with your wallet. The service fee transfer happens in the same atomic transaction as token creation, so you're never charged unless the token is successfully created.",
  },
  {
    question: "Which wallets are supported?",
    answer:
      "MintPanel supports Phantom, Solflare, and other Wallet Standard compatible wallets. Simply click 'Connect Wallet' and select your preferred wallet.",
  },
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">
              Everything you need to know about creating Solana tokens with MintPanel
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Ready to create your token?</p>
            <Button asChild size="lg">
              <Link href="/create">Create Token</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
