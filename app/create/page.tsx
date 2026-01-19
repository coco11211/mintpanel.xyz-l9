import { Suspense } from "react"
import { CreatePageContent } from "@/components/create-page-content"

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <CreatePageContent />
    </Suspense>
  )
}
