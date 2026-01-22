"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthClient() {
  const router = useRouter()
  const sp = useSearchParams()

  const nextPath = useMemo(() => sp.get("next") || "/create", [sp])
  const [code, setCode] = useState("")
  const [err, setErr] = useState<string | null>(null)

  const required = process.env.NEXT_PUBLIC_MANAGE_CODE || ""

  useEffect(() => {
    // if no code configured, allow by default (prevents lockout)
    if (!required) return
    const ok = typeof window !== "undefined" && localStorage.getItem("mp_auth_ok") === "1"
    if (ok) router.replace(nextPath)
  }, [required, router, nextPath])

  function submit() {
    setErr(null)
    if (!required) {
      localStorage.setItem("mp_auth_ok", "1")
      router.replace(nextPath)
      return
    }
    if (code.trim() !== required.trim()) {
      setErr("Invalid code")
      return
    }
    localStorage.setItem("mp_auth_ok", "1")
    router.replace(nextPath)
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Access</h1>
        <p className="text-sm text-gray-600">Enter the access code to open the control panel.</p>
      </header>

      <div className="space-y-3 rounded-xl border p-4">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="w-full rounded border px-4 py-2" onClick={submit}>
          Continue
        </button>
        {err && <div className="text-sm text-red-600">{err}</div>}
      </div>
    </main>
  )
}
