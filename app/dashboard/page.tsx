"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calculator, Bell, RefreshCw, BarChart, Menu, TrendingUp, LogOut, User, ChevronDown, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import PricingCalculatorPage from "../pricing-calculator/page"
import EngagementCalculatorPage from "../engagement-calculator/page"
import GrowthPredictorPage from "../growth-predictor/page"
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth-context"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("calculator")
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const router = useRouter()
  const { user, signOut: supabaseSignOut, loading } = useAuth()
  const [systemStats, setSystemStats] = useState({
    calculations: 1247,
    creators: 892,
    brands: 156,
  })

  useEffect(() => {
    // Check for Firebase auth first, then Supabase auth
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setAuthenticatedUser({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
          provider: 'firebase'
        })
      } else {
        setAuthenticatedUser(null)
        // If no Firebase user and no Supabase user, redirect to login
        if (!loading && !user) {
          router.push("/login")
        }
      }
    })

    return () => unsubscribe()
  }, [user, loading, router])

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        calculations: prev.calculations + Math.floor(Math.random() * 5) + 1,
        creators: Math.max(800, prev.creators + Math.floor(Math.random() * 21) - 10),
        brands: prev.brands + Math.floor(Math.random() * 3),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    try {
      if (authenticatedUser?.provider === 'firebase') {
        await signOut(auth)
        toast.success("Logged out successfully!")
      } else {
        await supabaseSignOut()
      }
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Logout failed")
    }
  }

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

  if (!user && !authenticatedUser) {
    return null
  }

  // Get current user info from either Firebase or Supabase
  const currentUser = authenticatedUser || user
  const userName = authenticatedUser?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || "User"
  const userEmail = authenticatedUser?.email || user?.email || ""
  const userPhoto = authenticatedUser?.photoURL || user?.user_metadata?.avatar_url
  const userRole = user?.user_metadata?.role || "Creator"

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex w-64 flex-shrink-0">
          <SidebarHeader className="p-4 border-b border-neutral-700">
            <div className="flex items-center gap-3 w-full">
              <Calculator className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div className="flex-1">
                <h1 className="text-orange-500 font-bold text-base tracking-wider">{"CONNECT CREATOR"}</h1>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="text-neutral-400 border-neutral-600 hover:bg-neutral-800 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-200"
                title="Back to Homepage"
              >
                <Home className="w-4 h-4" />
              </Button>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex-1 p-2">
            <SidebarGroup>
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveSection("calculator")}
                    isActive={activeSection === "calculator"}
                    className="w-full justify-start p-3 rounded-lg hover:bg-neutral-800 transition-colors min-h-[60px]"
                  >
                    <Calculator className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <div className="ml-3 text-left leading-tight">
                      <div className="text-xs font-medium">PRICING</div>
                      <div className="text-xs font-medium">CALCULATOR</div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveSection("engagement")}
                    isActive={activeSection === "engagement"}
                    className="w-full justify-start p-3 rounded-lg hover:bg-neutral-800 transition-colors min-h-[60px]"
                  >
                    <BarChart className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <div className="ml-3 text-left leading-tight">
                      <div className="text-xs font-medium">ENGAGEMENT</div>
                      <div className="text-xs font-medium">CALCULATOR</div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveSection("growth")}
                    isActive={activeSection === "growth"}
                    className="w-full justify-start p-3 rounded-lg hover:bg-neutral-800 transition-colors min-h-[60px]"
                  >
                    <TrendingUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <div className="ml-3 text-left leading-tight">
                      <div className="text-xs font-medium">GROWTH</div>
                      <div className="text-xs font-medium">PREDICTOR</div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-neutral-700">
            <div className="p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full blur-sm opacity-50"></div>
                </div>
                <span className="text-xs text-white font-medium">SYSTEM ONLINE</span>
              </div>
              <div className="text-xs text-neutral-400 space-y-1">
                <div className="flex justify-between">
                  <span>CALCULATIONS:</span>
                  <span className="font-mono">{systemStats.calculations.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>CREATORS:</span>
                  <span className="font-mono">{systemStats.creators} ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>BRANDS:</span>
                  <span className="font-mono">{systemStats.brands} CONNECTED</span>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navigation Bar */}
          <div className="h-16 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
            {/* Left Section */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <SidebarTrigger className="md:hidden p-2 hover:bg-neutral-700 rounded-lg transition-colors">
                <Menu className="w-5 h-5 text-neutral-400" />
              </SidebarTrigger>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="md:hidden text-neutral-400 border-neutral-600 hover:bg-neutral-800 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-200 flex-shrink-0"
                title="Back to Homepage"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="text-sm text-neutral-400 overflow-hidden">
                <span className="whitespace-nowrap">CREATOR CONNECT / </span>
                <span className="text-orange-500 font-medium whitespace-nowrap">
                  {activeSection === "calculator" && "PRICING CALCULATOR"}
                  {activeSection === "engagement" && "ENGAGEMENT CALCULATOR"}
                  {activeSection === "growth" && "GROWTH PREDICTOR"}
                </span>
              </div>
            </div>

            {/* Right Section - User Profile */}
            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <div className="hidden lg:block text-xs text-neutral-500 whitespace-nowrap">
                LAST UPDATE: 08/06/2025 00:03 UTC
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:text-orange-500 w-8 h-8 flex-shrink-0"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:text-orange-500 w-8 h-8 flex-shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>

              {/* User Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-600/50 bg-neutral-800/80 min-w-fit"
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt={userName}
                      className="w-7 h-7 rounded-full border-2 border-orange-500 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-white font-medium text-sm max-w-[120px] truncate hidden sm:block">
                    {userName}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700 rounded-lg shadow-xl animate-in slide-in-from-top-2 duration-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-neutral-700">
                      <div className="flex items-center gap-3">
                        {userPhoto ? (
                          <img
                            src={userPhoto}
                            alt={userName}
                            className="w-12 h-12 rounded-full border-2 border-orange-500 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                            {userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-medium text-sm truncate">{userName}</p>
                          <p className="text-neutral-400 text-xs truncate">{userEmail}</p>
                          <p className="text-orange-500 text-xs font-medium">{userRole}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="flex items-center gap-2 p-2 text-green-400 text-sm font-medium mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Online</span>
                      </div>
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
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-auto">
            <div className="h-full w-full">
              {activeSection === "calculator" && <PricingCalculatorPage />}
              {activeSection === "engagement" && <EngagementCalculatorPage />}
              {activeSection === "growth" && <GrowthPredictorPage />}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
