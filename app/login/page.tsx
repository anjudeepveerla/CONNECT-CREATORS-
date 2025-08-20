"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Target,
  Brain,
  Rocket,
  Mail,
  Lock,
  User,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignupLoading, setIsSignupLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "creator" as "creator" | "brand" | "agency",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const router = useRouter()
  const { signIn, signUp } = useAuth()

  const validateSignup = () => {
    const newErrors: { [key: string]: string } = {}

    if (!signupData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!signupData.password) {
      newErrors.password = "Password is required"
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const { error } = await signIn(loginData.email, loginData.password)
      
      if (error) {
        toast.error(error.message || "Login failed")
        setErrors({ general: error.message || "Invalid credentials" })
      } else {
        toast.success("Login successful!")
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      setErrors({ general: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSignup()) return

    setIsSignupLoading(true)
    setErrors({})

    try {
      const { error } = await signUp(signupData.email, signupData.password, signupData.role)
      
      if (error) {
        toast.error(error.message || "Signup failed")
        setErrors({ general: error.message || "Signup failed" })
      } else {
        toast.success("Account created successfully! Please check your email to verify your account.")
        setActiveTab("login")
        setSignupData({ email: "", password: "", confirmPassword: "", role: "creator" })
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      setErrors({ general: "An unexpected error occurred" })
    } finally {
      setIsSignupLoading(false)
    }
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
      value: "12,847",
      icon: Users,
      suffix: "+",
    },
    {
      label: "Brands Connected",
      value: "2,156",
      icon: Shield,
      suffix: "+",
    },
    {
      label: "Revenue Generated",
      value: "$45.2M",
      icon: DollarSign,
      suffix: "+",
    },
    {
      label: "Success Rate",
      value: "94.7%",
      icon: CheckCircle,
      suffix: "",
    },
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-neutral-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-orange-500/5 via-transparent to-orange-500/5 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Application Showcase */}
        <div className="hidden lg:flex lg:w-3/5 flex-col relative">
          <div className="flex-1 flex flex-col justify-center p-12">
            {/* Main Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shadow-2xl">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-orange-500 tracking-tight">CREATOR CONNECT</h1>
                  <p className="text-neutral-400 text-lg font-medium tracking-wider">NEXT-GEN PRICING INTELLIGENCE</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h2 className="text-4xl font-bold text-white leading-tight">
                  The Future of
                  <br />
                  <span className="text-orange-500">Influencer Pricing</span>
                </h2>
                <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl">
                  Harness the power of AI and real-time market data to optimize your influencer collaborations. Join
                  thousands of creators and brands revolutionizing digital marketing.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                {stats.map((stat, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <stat.icon className="w-8 h-8 text-orange-500" />
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white font-mono">
                            {stat.value}
                            {stat.suffix}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-neutral-400 font-medium tracking-wider">
                        {stat.label.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Showcase */}
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4 p-4 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-xl hover:border-orange-500/30 transition-all duration-300">
                      <div className="w-12 h-12 bg-neutral-800 border border-orange-500/30 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-white font-semibold">{feature.title}</h4>
                          <Badge className="bg-orange-500/20 text-orange-500 text-xs border-orange-500/30">
                            {feature.highlight}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Forms */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-orange-500">CREATOR CONNECT</h1>
                  <p className="text-xs text-neutral-500">INTELLIGENT PRICING PLATFORM</p>
                </div>
              </div>
            </div>

            {/* Authentication Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-neutral-900/80 backdrop-blur-xl border border-neutral-700/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Create Account
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="mt-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Card className="relative bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 rounded-3xl shadow-2xl">
                    <CardHeader className="text-center pb-6">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap className="w-6 h-6 text-orange-500" />
                        <CardTitle className="text-2xl font-bold text-white tracking-wider">ACCESS PORTAL</CardTitle>
                      </div>
                      <p className="text-neutral-400">Enter your credentials to continue</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                                        <form onSubmit={handleLogin} className="space-y-6">
                    {/* Supabase Configuration Notice */}
                    {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
                      <div className="flex items-center gap-2 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                        <span className="text-yellow-400 text-sm">
                          Supabase not configured. Please set up your environment variables to enable authentication.
                        </span>
                      </div>
                    )}
                    
                    {errors.general && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-red-400 text-sm">{errors.general}</span>
                      </div>
                    )}

                        <div className="space-y-2">
                          <Label className="text-xs text-neutral-400 tracking-wider font-semibold flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            EMAIL ADDRESS
                          </Label>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="bg-neutral-800/50 backdrop-blur-sm border-neutral-600/50 text-white placeholder-neutral-500 rounded-xl h-12 focus:border-orange-500/50 focus:ring-orange-500/20"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs text-neutral-400 tracking-wider font-semibold flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            PASSWORD
                          </Label>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={loginData.password}
                              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                              className="bg-neutral-800/50 backdrop-blur-sm border-neutral-600/50 text-white placeholder-neutral-500 rounded-xl h-12 pr-12 focus:border-orange-500/50 focus:ring-orange-500/20"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-12 px-4 text-neutral-400 hover:text-orange-500"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </Button>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-wider h-14 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              AUTHENTICATING...
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <Rocket className="w-5 h-5" />
                              LAUNCH PLATFORM
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="mt-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Card className="relative bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 rounded-3xl shadow-2xl">
                    <CardHeader className="text-center pb-6">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <User className="w-6 h-6 text-orange-500" />
                        <CardTitle className="text-2xl font-bold text-white tracking-wider">CREATE ACCOUNT</CardTitle>
                      </div>
                      <p className="text-neutral-400">Join the future of influencer marketing</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <form onSubmit={handleSignup} className="space-y-6">
                        {/* Supabase Configuration Notice */}
                        {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
                          <div className="flex items-center gap-2 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                            <span className="text-yellow-400 text-sm">
                              Supabase not configured. Please set up your environment variables to enable authentication.
                            </span>
                          </div>
                        )}
                        
                        {errors.general && (
                          <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <span className="text-red-400 text-sm">{errors.general}</span>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label className="text-xs text-neutral-400 tracking-wider font-semibold flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            EMAIL ADDRESS
                          </Label>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={signupData.email}
                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            className={`bg-neutral-800/50 backdrop-blur-sm border-neutral-600/50 text-white placeholder-neutral-500 rounded-xl h-12 focus:border-orange-500/50 focus:ring-orange-500/20 ${
                              errors.email ? "border-red-500/50" : ""
                            }`}
                            required
                          />
                          {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs text-neutral-400 tracking-wider font-semibold flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            PASSWORD
                          </Label>
                          <div className="relative">
                            <Input
                              type={showSignupPassword ? "text" : "password"}
                              placeholder="Create a password"
                              value={signupData.password}
                              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                              className={`bg-neutral-800/50 backdrop-blur-sm border-neutral-600/50 text-white placeholder-neutral-500 rounded-xl h-12 pr-12 focus:border-orange-500/50 focus:ring-orange-500/20 ${
                                errors.password ? "border-red-500/50" : ""
                              }`}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-12 px-4 text-neutral-400 hover:text-orange-500"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                            >
                              {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </Button>
                          </div>
                          {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs text-neutral-400 tracking-wider font-semibold flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            CONFIRM PASSWORD
                          </Label>
                          <Input
                            type={showSignupPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            className={`bg-neutral-800/50 backdrop-blur-sm border-neutral-600/50 text-white placeholder-neutral-500 rounded-xl h-12 focus:border-orange-500/50 focus:ring-orange-500/20 ${
                              errors.confirmPassword ? "border-red-500/50" : ""
                            }`}
                            required
                          />
                          {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs text-neutral-400 tracking-wider font-semibold flex items-center gap-2">
                            <User className="w-4 h-4" />
                            ACCOUNT TYPE
                          </Label>
                          <div className="grid grid-cols-3 gap-2">
                            {(["creator", "brand", "agency"] as const).map((role) => (
                              <Button
                                key={role}
                                type="button"
                                variant={signupData.role === role ? "default" : "outline"}
                                className={`h-12 text-xs font-medium ${
                                  signupData.role === role
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : "bg-neutral-800/50 text-neutral-400 border-neutral-600/50 hover:bg-neutral-700/50"
                                }`}
                                onClick={() => setSignupData({ ...signupData, role })}
                              >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSignupLoading}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-wider h-14 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                        >
                          {isSignupLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              CREATING ACCOUNT...
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5" />
                              CREATE ACCOUNT
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
