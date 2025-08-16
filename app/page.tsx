"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  CheckCircle,
  Star,
  Target,
  Brain,
  Rocket,
  ArrowRight,
  User,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    creators: 0,
    brands: 0,
    revenue: 0,
    success: 0,
  })
  const router = useRouter()
  const { user, loading } = useAuth()

  // Define testimonials array before useEffect hooks
  const testimonials = [
    {
      name: "Aarav Mehta",
      role: "Fitness Influencer",
      followers: "120K Followers",
      quote: "This platform gave me the confidence to finally charge what I'm worth. My brand deals have doubled.",
      avatar: "AM",
    },
    {
      name: "Ritika Verma",
      role: "Beauty Creator",
      followers: "310K Followers",
      quote: "I used to guess my rates — now I negotiate with real data. It's like having an agent in my pocket.",
      avatar: "RV",
    },
    {
      name: "Kabir Sinha",
      role: "Marketing Head",
      company: "TechNova India",
      quote: "Our influencer campaigns became smarter and faster. Pricing insights saved us lakhs in budget.",
      avatar: "KS",
    },
    {
      name: "Sneha Reddy",
      role: "Agency Partner",
      clients: "75+ Clients",
      quote: "Handling dozens of creators used to be chaotic. Now, it's automated, accurate, and effortless.",
      avatar: "SR",
    },
    {
      name: "Emily Carter",
      role: "Lifestyle Blogger",
      location: "New York",
      quote: "Loved how quick and transparent it was. Within minutes, I had a fair rate for my next collab.",
      avatar: "EC",
    },
    {
      name: "Leo Martinez",
      role: "Brand Manager",
      location: "Barcelona",
      quote: "No more manual tracking or gut-based decisions. This tool is now part of every campaign.",
      avatar: "LM",
    },
  ]

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  // Animate stats on load
  useEffect(() => {
    const targets = { creators: 12847, brands: 2156, revenue: 45.2, success: 94.7 }
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats({
        creators: Math.floor(targets.creators * easeOut),
        brands: Math.floor(targets.brands * easeOut),
        revenue: targets.revenue * easeOut,
        success: targets.success * easeOut,
      })

      if (step >= steps) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [])

  // Testimonial rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-orange-500 text-lg font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if user is authenticated (will redirect)
  if (user) {
    return null
  }

  const features = [
    {
      icon: Brain,
      title: "Smarter Pricing Starts Here",
      description:
        "Forget guessing games. Our AI pricing tool gives accurate, real-time rate suggestions based on your niche, engagement, and location. Built for creators and brands to price with confidence — instantly.",
      highlight: "AI-Powered",
    },
    {
      icon: TrendingUp,
      title: "Know Your Real Influence",
      description:
        "Your engagement tells your story. Quickly calculate your true value with data from likes, views, comments, and shares. Prove your worth before every pitch or campaign.",
      highlight: "Real Value",
    },
    {
      icon: Target,
      title: "For Creators, Brands & Agencies",
      description:
        "Manage 1 or 100 creators with ease. Creator Connect simplifies pricing, insights, and collaboration — all in one place. Trusted by solo creators to enterprise teams.",
      highlight: "All-in-One",
    },
    {
      icon: Rocket,
      title: "Live Data. Smarter Results.",
      description:
        "Stay updated with market-backed insights from 12,000+ creators. Get better ROI, faster decisions, and rates that reflect today's trends. Always real-time. Always evolving.",
      highlight: "Live Updates",
    },
  ]

  const stats = [
    {
      label: "Active Creators",
      value: animatedStats.creators.toLocaleString(),
      icon: Users,
      suffix: "+",
    },
    {
      label: "Brands Connected",
      value: animatedStats.brands.toLocaleString(),
      icon: Shield,
      suffix: "+",
    },
    {
      label: "Revenue Generated",
      value: `₹${animatedStats.revenue.toFixed(1)}M`,
      icon: DollarSign,
      suffix: "+",
    },
    {
      label: "Success Rate",
      value: `${animatedStats.success.toFixed(1)}%`,
      icon: CheckCircle,
      suffix: "",
    },
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated Background - Only Orange/Neutral */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-neutral-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-orange-500/5 via-transparent to-orange-500/5 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {" "}
        {/* Added flex-col lg:flex-row for responsiveness */}
        {/* Left Side - Enhanced Application Showcase */}
        <div className="w-full lg:w-3/5 flex flex-col relative p-4 sm:p-8 lg:p-12">
          {" "}
          {/* Removed hidden lg:flex, adjusted padding */}
          {/* Hero Section */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Main Header */}
            <div className="mb-8 lg:mb-12">
              {" "}
              {/* Adjusted margin for mobile */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                {" "}
                {/* Adjusted gap and margin */}
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-xl flex items-center justify-center shadow-2xl">
                    {" "}
                    {/* Adjusted size */}
                    <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-white" /> {/* Adjusted size */}
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500 tracking-tight">
                    {" "}
                    {/* Adjusted font size */}
                    CREATOR CONNECT
                  </h1>
                  <p className="text-sm sm:text-base text-neutral-400 font-medium tracking-wider">
                    {" "}
                    {/* Adjusted font size */}
                    NEXT-GEN PRICING INTELLIGENCE
                  </p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {" "}
                {/* Adjusted spacing and margin */}
                <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight">
                  {" "}
                  {/* Adjusted font size */}
                  The Future of
                  <br />
                  <span className="text-orange-500">Influencer Pricing</span>
                </h2>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
                  {" "}
                  {/* Adjusted font size */}
                  Harness the power of AI and real-time market data to optimize your influencer collaborations. Join
                  thousands of creators and brands revolutionizing digital marketing.
                </p>
              </div>
              {/* Animated Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {" "}
                {/* Adjusted grid and gap */}
                {stats.map((stat, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-2xl p-4 sm:p-6 hover:border-orange-500/50 transition-all duration-300">
                      {" "}
                      {/* Adjusted padding */}
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        {" "}
                        {/* Adjusted margin */}
                        <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" /> {/* Adjusted size */}
                        <div className="text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                            {" "}
                            {/* Adjusted font size */}
                            {stat.value}
                            {stat.suffix}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wider">
                        {" "}
                        {/* Adjusted font size */}
                        {stat.label.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Features Showcase */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {" "}
                {/* Adjusted gap */}
                {features.map((feature, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-xl hover:border-orange-500/30 transition-all duration-300">
                      {" "}
                      {/* Adjusted flex direction and padding */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-800 border border-orange-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        {" "}
                        {/* Adjusted size */}
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" /> {/* Adjusted size */}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          {" "}
                          {/* Added flex-wrap for small screens */}
                          <h4 className="text-base sm:text-lg text-white font-semibold">{feature.title}</h4>{" "}
                          {/* Adjusted font size */}
                          <Badge className="bg-orange-500/20 text-orange-500 text-xs border-orange-500/30">
                            {feature.highlight}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{feature.description}</p>{" "}
                        {/* Adjusted font size */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-8 lg:mt-12 p-4 sm:p-8 lg:p-12 border-t border-neutral-800/50">
              {" "}
              {/* Adjusted padding and margin */}
              <div className="relative">
                <div className="absolute inset-0 bg-neutral-800/20 rounded-2xl"></div>
                <Card className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-2xl p-6 sm:p-8">
                  {" "}
                  {/* Adjusted padding */}
                  <CardHeader className="pb-4 sm:pb-6">
                    {" "}
                    {/* Adjusted padding */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-4">
                      {" "}
                      {/* Adjusted gap and margin */}
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" /> {/* Adjusted size */}
                      <CardTitle className="text-lg sm:text-xl font-semibold text-white">What Our Users Say</CardTitle>{" "}
                      {/* Adjusted font size */}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {" "}
                    {/* Removed default padding */}
                    <div className="relative h-40 sm:h-32 overflow-hidden">
                      {" "}
                      {/* Adjusted height */}
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-500 ${
                            index === currentTestimonial
                              ? "opacity-100 transform translate-y-0"
                              : "opacity-0 transform translate-y-4"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            {" "}
                            {/* Adjusted flex direction */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {" "}
                              {/* Adjusted size */}
                              {testimonial.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm sm:text-base text-neutral-300 italic mb-2 sm:mb-3">
                                "{testimonial.quote}"
                              </p>{" "}
                              {/* Adjusted font size and margin */}
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                {" "}
                                {/* Added flex-wrap */}
                                <span className="text-sm sm:text-base text-white font-semibold">
                                  {testimonial.name}
                                </span>{" "}
                                {/* Adjusted font size */}
                                <span className="text-neutral-500">•</span>
                                <span className="text-orange-500 text-xs sm:text-sm">
                                  {" "}
                                  {/* Adjusted font size */}
                                  {testimonial.role}
                                  {testimonial.followers && ` • ${testimonial.followers}`}
                                  {testimonial.company && ` • ${testimonial.company}`}
                                  {testimonial.clients && ` • ${testimonial.clients}`}
                                  {testimonial.location && ` • ${testimonial.location}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Testimonial Indicators */}
                    <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                      {" "}
                      {/* Adjusted margin */}
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentTestimonial ? "bg-orange-500 w-6 sm:w-8" : "bg-neutral-600" // Adjusted width
                          }`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side - Call to Action */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-4 sm:p-8 relative">
          <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
            {/* Mobile Header */}
            <div className="flex lg:hidden items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-orange-500">
                  CREATOR CONNECT
                </h1>
                <p className="text-xs text-neutral-500">INTELLIGENT PRICING PLATFORM</p>
              </div>
            </div>

            {/* Call to Action Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 rounded-3xl shadow-2xl p-4 sm:p-6">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                    <CardTitle className="text-xl sm:text-2xl font-bold text-white tracking-wider">
                      GET STARTED
                    </CardTitle>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-400">Join thousands of creators and brands</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <p className="text-neutral-300 text-sm">
                      Ready to revolutionize your influencer collaborations? Create an account and start optimizing your pricing strategy today.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        <span>AI-powered pricing insights</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        <span>Real-time market data</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        <span>Professional analytics</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-wider h-14 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5" />
                      CREATE ACCOUNT
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-xs text-neutral-500 mb-2">Already have an account?</p>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/login")}
                      className="text-orange-500 border-orange-500/30 hover:bg-orange-500/10"
                    >
                      Sign In
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
