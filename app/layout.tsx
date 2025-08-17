import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono as GeistMono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Footer } from "@/components/footer"

const geistMono = GeistMono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creator Connect - Influencer Pricing Platform",
  description: "Intelligent pricing assistant for influencer collaborations",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} bg-black text-white antialiased min-h-screen w-full overflow-x-hidden flex flex-col`}>
        <AuthProvider>
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
