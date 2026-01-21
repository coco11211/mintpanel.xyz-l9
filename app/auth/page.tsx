"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function AuthPage() {
  const sp = useSearchParams()
  const next = sp.get("next") || "/"
  const [code, setCode] = useState("")
  const [err, setErr] = useState<string | null>(null)

  const expected = useMemo(() => (process.env.NEXT_PUBLIC_MANAGE_CODE || "").trim(), [])

  return (
    <main className="mx-auto max-w-md px-6 py-14 space-y-6">
      <h1 className="text-2xl font-semibold">Access required</h1>
      <p className="text-sm text-gray-600">
        Enter your access code to manage tokens. (This is a temporary gate until payments/webhooks are wired.)
      </p>

      <div className="space-y-3">
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="w-full rounded-xl border px-4 py-3 font-medium"
          onClick={() => {
            setErr(null)
            if (!expected) {
              setErr("Missing NEXT_PUBLIC_MANAGE_CODE env var.")
              return
            }
            if (code.trim() !== expected) {
              setErr("Invalid code.")
              return
            }
            document.cookie = "mp_auth=1; path=/; max-age=2592000; samesite=lax" // 30 days
            window.location.href = next
          }}
        >
          Continue
        </button>
        {err && <div className="text-sm text-red-600">{err}</div>}
      </div>

      <div className="text-xs text-gray-500">
        Admin: set <code>NEXT_PUBLIC_MANAGE_CODE</code> in Vercel env vars.
      </div>
    </main>
  )
}
