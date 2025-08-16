import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Define protected routes
  const protectedRoutes = ["/dashboard", "/pricing-calculator", "/engagement-calculator", "/growth-predictor", "/analytics", "/settings"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  
  // Define auth routes
  const authRoutes = ["/login"]
  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // For protected routes, we'll let the client-side auth handle the redirect
  // This prevents the flash of unauthorized content
  if (isProtectedRoute) {
    return NextResponse.next()
  }

  // If trying to access auth routes while already authenticated, redirect to dashboard
  if (isAuthRoute) {
    return NextResponse.next()
  }

  // For the home page, allow access
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
