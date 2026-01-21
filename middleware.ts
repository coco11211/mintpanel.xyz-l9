import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only gate manage routes
  if (!pathname.startsWith("/manage")) return NextResponse.next()

  const ok = req.cookies.get("mp_auth")?.value === "1"
  if (ok) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = "/auth"
  url.searchParams.set("next", pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/manage/:path*"],
}
