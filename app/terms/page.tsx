"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider">TERMS & CONDITIONS</h1>
            <p className="text-sm text-neutral-400 mt-1">Last updated on 17-08-2025 23:03:34</p>
          </div>
        </div>

        {/* Terms Content */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" />
              TERMS OF SERVICE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
                <p>
                  These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding agreement by and between VEERLA ANJUDEEP, ("Website Owner" or "we" or "us" or "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, "Services").
                </p>
                
                <p>
                  By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.
                </p>
                
                <p>
                  The use of this website or availing of our Services is subject to the following terms of use:
                </p>
                
                <div className="space-y-3 pl-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      You agree to pay us the charges associated with availing the Services.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the us for the Services.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, than this would make you ineligible for a refund.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Vempalli, Telangana.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              QUESTIONS ABOUT THESE TERMS?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-6">
            <p className="text-sm text-neutral-400 mb-4">
              If you have any questions about these Terms & Conditions, please contact us.
            </p>
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Contact Us
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
