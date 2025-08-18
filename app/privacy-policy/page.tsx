"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="h-full w-full overflow-auto">
      <div className="max-w-none w-full p-4 lg:p-6 xl:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider">PRIVACY POLICY</h1>
            <p className="text-sm text-neutral-400 mt-1">Last updated on 17-08-2025</p>
          </div>
        </div>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4" />
              HOW WE COLLECT, USE, AND PROTECT DATA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-neutral-300 leading-relaxed">
            <section className="space-y-2">
              <h3 className="text-white font-semibold">1. Who we are</h3>
              <p>
                This website is operated by <span className="text-orange-400 font-semibold">VEERLA ANJUDEEP</span> ("we", "us", "our"). We provide AI-powered pricing insights for influencer collaborations.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">2. Data we collect</h3>
              <ul className="list-disc pl-6 space-y-1 text-neutral-300">
                <li>Account information (email, role) if you sign up.</li>
                <li>Usage inputs (platform, followers, engagement, niche, country) to generate pricing insights.</li>
                <li>Technical data (IP address, device/browser info, approximate location) for security and analytics.</li>
                <li>Support communications (email/phone) when you contact us.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">3. How we use data</h3>
              <ul className="list-disc pl-6 space-y-1 text-neutral-300">
                <li>To provide pricing calculations and analytics features you request.</li>
                <li>To improve our models, UX, and service reliability.</li>
                <li>To communicate important updates, security alerts, and support responses.</li>
                <li>To comply with applicable laws and prevent misuse.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">4. Legal basis</h3>
              <p>
                We process data based on your consent, our legitimate interests in operating the service, and compliance with legal obligations.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">5. Data protection & security</h3>
              <p>
                We implement reasonable technical and organizational safeguards (encryption-in-transit, access controls). No method is 100% secure; we continuously improve our security.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">6. Cookies & tracking</h3>
              <p>
                We may use essential cookies for authentication and basic analytics to understand usage patterns. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">7. Third parties</h3>
              <p>
                We do not sell your personal data. Limited data may be shared with service providers (e.g., hosting, analytics) under contracts requiring confidentiality and security.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">8. Data retention</h3>
              <p>
                We retain data only as long as necessary to provide the service and as required by law. You may request deletion of your account data.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">9. Your rights</h3>
              <ul className="list-disc pl-6 space-y-1 text-neutral-300">
                <li>Access and review your data.</li>
                <li>Request correction or deletion.</li>
                <li>Withdraw consent where processing is based on consent.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">10. Contact</h3>
              <p>
                Email: <span className="text-neutral-200">anjudeep1230@gmail.com</span><br />
                Phone: <span className="text-neutral-200">+91 6301962520</span><br />
                Address: <span className="text-neutral-200">3-47/1, Vempalli, Mandal Mancherial, Telangana 504209</span>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
