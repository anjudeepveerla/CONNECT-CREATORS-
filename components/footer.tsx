"use client"

import Link from "next/link"
import { Calculator, Mail, FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-bold text-orange-500 tracking-wider">CREATOR CONNECT</h3>
            </div>
            <p className="text-sm text-neutral-400">
              Intelligent pricing assistant for influencer collaborations. Get fair pricing estimates and market insights.
            </p>
            <div className="text-xs text-neutral-500">
              <p>© 2025 VEERLA ANJUDEEP. All rights reserved.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing-calculator" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors">
                  Pricing Calculator
                </Link>
              </li>
              <li>
                <Link href="/engagement-calculator" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors">
                  Engagement Calculator
                </Link>
              </li>
              <li>
                <Link href="/growth-predictor" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors">
                  Growth Predictor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white tracking-wider">LEGAL & CONTACT</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-cancellation" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Refund & Cancellation
                </Link>
              </li>
            </ul>
            
            <div className="pt-4 border-t border-neutral-700">
              <div className="text-xs text-neutral-500 space-y-1">
                <p>Merchant: VEERLA ANJUDEEP</p>
                <p>Tel: +91 6301962520</p>
                <p>Email: anjudeep1230@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-6">
          <div className="text-center">
            <p className="text-xs text-neutral-500">
              This website is operated by VEERLA ANJUDEEP. For any queries regarding our services or these terms, please contact us using the information provided above.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
