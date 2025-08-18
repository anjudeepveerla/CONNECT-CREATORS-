"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RefundCancellationPage() {
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider">REFUND & CANCELLATION POLICY</h1>
            <p className="text-sm text-neutral-400 mt-1">Last updated on 17-08-2025</p>
          </div>
        </div>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              POLICY DETAILS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-neutral-300 leading-relaxed">
            <section className="space-y-2">
              <h3 className="text-white font-semibold">1. Overview</h3>
              <p>
                This policy applies to the services offered by <span className="text-orange-400 font-semibold">VEERLA ANJUDEEP</span> on the Creator Connect platform, including access to pricing reports and analytics.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">2. Nature of service</h3>
              <p>
                We provide instant digital services (AI-generated insights) delivered immediately after successful payment verification. For demo environments, payments may be simulated.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">3. Refund eligibility</h3>
              <ul className="list-disc pl-6 space-y-1 text-neutral-300">
                <li>If you were charged but could not access the purchased report, contact us within 48 hours for a full refund.</li>
                <li>Duplicate charges will be fully refunded upon verification.</li>
                <li>Refunds are not applicable once the report is generated and accessible, as the service is delivered instantly.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">4. Cancellation</h3>
              <p>
                Orders for digital reports cannot be canceled after successful payment as processing begins immediately.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">5. How to request a refund</h3>
              <p>
                Email <span className="text-neutral-200">anjudeep1230@gmail.com</span> or call <span className="text-neutral-200">+91 6301962520</span> within 48 hours. Include transaction details (time, amount, email used) and screenshots if available.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">6. Processing time</h3>
              <p>
                Approved refunds will be processed within 5–7 business days to the original payment method.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-semibold">7. Contact</h3>
              <p>
                VEERLA ANJUDEEP<br />
                3-47/1, Vempalli, Mandal Mancherial, Telangana 504209<br />
                Email: <span className="text-neutral-200">anjudeep1230@gmail.com</span> | Phone: <span className="text-neutral-200">+91 6301962520</span>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
