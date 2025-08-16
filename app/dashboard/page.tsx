"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calculator, Bell, RefreshCw, BarChart, Menu, TrendingUp, LogOut } from "lucide-react"
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

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("calculator")
  const router = useRouter()
  const { user, signOut, loading } = useAuth()
  const [systemStats, setSystemStats] = useState({
    calculations: 1247,
    creators: 892,
    brands: 156,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
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
    await signOut()
    router.push("/login")
  }

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

  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex w-64 flex-shrink-0">
          <SidebarHeader className="p-4 border-b border-neutral-700">
            <div className="flex items-center gap-3 w-full">
              <Calculator className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <h1 className="text-orange-500 font-bold text-base tracking-wider">{"CONNECT CREATOR"}</h1>
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
              <div className="text-sm text-neutral-400 overflow-hidden">
                <span className="whitespace-nowrap">CREATOR CONNECT / </span>
                <span className="text-orange-500 font-medium whitespace-nowrap">
                  {activeSection === "calculator" && "PRICING CALCULATOR"}
                  {activeSection === "engagement" && "ENGAGEMENT CALCULATOR"}
                  {activeSection === "growth" && "GROWTH PREDICTOR"}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <div className="hidden sm:block text-xs text-neutral-500 whitespace-nowrap">
                Welcome, <span className="text-orange-500 font-medium">{user?.user_metadata?.role || "User"}</span>
              </div>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-neutral-400 hover:text-orange-500 text-xs whitespace-nowrap px-3 py-2 flex-shrink-0"
              >
                LOGOUT
              </Button>
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
