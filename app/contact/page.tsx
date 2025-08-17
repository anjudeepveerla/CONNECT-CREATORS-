"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Building, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider">CONTACT US</h1>
            <p className="text-sm text-neutral-400 mt-1">Get in touch with our team for support and inquiries</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Information */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4" />
                COMPANY INFORMATION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Merchant Legal Entity Name</p>
                    <p className="text-sm text-neutral-400">VEERLA ANJUDEEP</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Registered Address</p>
                    <p className="text-sm text-neutral-400">
                      3-47/1, Vempalli, Mandal Mancherial,<br />
                      Vempalli, Telangana, PIN: 504209
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Operational Address</p>
                    <p className="text-sm text-neutral-400">
                      3-47/1, Vempalli, Mandal Mancherial,<br />
                      Vempalli, Andhra Pradesh, PIN: 504209
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" />
                CONTACT DETAILS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-white">Telephone Number</p>
                    <p className="text-sm text-neutral-400">+91 6301962520</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-white">Email Address</p>
                    <p className="text-sm text-neutral-400">anjudeep1230@gmail.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              BUSINESS HOURS & RESPONSE TIME
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Business Hours</h3>
                <p className="text-sm text-neutral-400">
                  Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                  Saturday: 10:00 AM - 2:00 PM IST<br />
                  Sunday: Closed
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Response Time</h3>
                <p className="text-sm text-neutral-400">
                  Email Inquiries: Within 24 hours<br />
                  Phone Calls: During business hours<br />
                  Support Tickets: Within 48 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              SEND US A MESSAGE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Mail className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-base text-neutral-400 mb-4">
                For immediate assistance, please contact us directly via phone or email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => window.location.href = 'tel:+916301962520'}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button
                  onClick={() => window.location.href = 'mailto:anjudeep1230@gmail.com'}
                  variant="outline"
                  className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
