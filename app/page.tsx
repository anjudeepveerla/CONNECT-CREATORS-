"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
  LogOut,
  ChevronDown,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"
import confetti from "canvas-confetti"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    creators: 0,
    brands: 0,
    revenue: 0,
    success: 0,
  })
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const router = useRouter()
  const { user, loading } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      if (user) {
        // Rain confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        
        // Store authenticated user - stay on homepage
        setAuthenticatedUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        })
        
        toast.success("Google Sign-in successful!")
        // Don't redirect to dashboard, stay on homepage
      }
    } catch (error: any) {
      console.error("Google Sign-in error:", error)
      
      // Handle specific CORS/popup errors
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        toast.error("Sign-in popup was blocked. Please allow popups and try again.")
      } else if (error.code === 'auth/cancelled-popup-request') {
        toast.error("Sign-in was cancelled. Please try again.")
      } else {
        toast.error(error.message || "Google Sign-in failed")
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setAuthenticatedUser(null)
      setIsProfileDropdownOpen(false)
      toast.success("Logged out successfully!")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Logout failed")
    }
  }

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

  // Don't redirect authenticated users, let them stay on homepage
  // useEffect(() => {
  //   if (!loading && user) {
  //     router.push("/dashboard")
  //   }
  // }, [user, loading, router])

  // Listen for Firebase auth state changes
  useEffect(() => {
    setIsHydrated(true)
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticatedUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        })
      } else {
        setAuthenticatedUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileDropdownOpen) {
        const target = event.target as HTMLElement
        if (!target.closest('.profile-dropdown')) {
          setIsProfileDropdownOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileDropdownOpen])

  // Show loading while checking authentication or before hydration
  if (loading || !isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-orange-500 text-lg font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // Allow both authenticated and non-authenticated users to see the homepage
  // if (user) {
  //   return null
  // }

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
      value: `$${animatedStats.revenue.toFixed(1)}M`,
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
    <div className={`min-h-screen bg-black overflow-hidden ${authenticatedUser ? 'pt-16' : ''}`}>
      {/* Navigation Header - Show when authenticated */}
      {authenticatedUser && (
        <>
          {/* Main Navigation Bar */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-orange-500 tracking-wider">
                    CREATOR CONNECT
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile - Positioned in absolute top-right */}
          <div className="fixed top-4 right-4 z-[60] profile-dropdown">
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-800/80 backdrop-blur-sm transition-colors border border-neutral-700/50 bg-neutral-900/90 min-w-fit"
              >
                <img
                  src={authenticatedUser.photoURL || '/default-avatar.png'}
                  alt={authenticatedUser.name}
                  className="w-8 h-8 rounded-full border-2 border-orange-500 flex-shrink-0"
                />
                <span className="text-white font-medium text-sm max-w-[120px] truncate hidden sm:block">
                  {authenticatedUser.name}
                </span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                  isProfileDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700 rounded-lg shadow-xl animate-in slide-in-from-top-2 duration-200 overflow-hidden">
                  <div className="p-4 border-b border-neutral-700">
                    <div className="flex items-center gap-3">
                      <img
                        src={authenticatedUser.photoURL || '/default-avatar.png'}
                        alt={authenticatedUser.name}
                        className="w-10 h-10 rounded-full border-2 border-orange-500 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm truncate">{authenticatedUser.name}</p>
                        <p className="text-neutral-400 text-xs truncate">{authenticatedUser.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsProfileDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors rounded-md text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4 flex-shrink-0" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

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
        {/* Left Side - Enhanced Application Showcase */}
        <div className={`${authenticatedUser ? 'w-full' : 'w-full lg:w-3/5'} flex flex-col relative p-4 sm:p-8 lg:p-12`}>
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
        {/* Right Side - Call to Action - Only show when NOT authenticated */}
        {!authenticatedUser && (
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
                        className="text-orange-500 border-orange-500/30 hover:bg-orange-500/10 mb-4"
                      >
                        Sign In
                      </Button>
                      
                      {/* Google Sign-in Button */}
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-neutral-600/50"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-neutral-900/90 px-2 text-neutral-500">Or continue with</span>
                        </div>
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white/5 hover:bg-white/10 text-white border-neutral-600/50 hover:border-white/50 font-semibold tracking-wider h-12 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          SIGN IN WITH GOOGLE
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Quick Footer Links */}
      <div className="border-t border-neutral-800 mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neutral-500">
              © 2025 VEERLA ANJUDEEP. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors">
                Contact Us
              </Link>
              <Link href="/terms" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
