"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, DollarSign, Users, BarChart, Settings, LogOut, Calculator, TrendingUp, Mail, FileText } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Pricing Calculator",
      href: "/pricing-calculator",
      icon: DollarSign,
    },
    {
      title: "Engagement Calculator",
      href: "/engagement-calculator",
      icon: Users,
    },
    {
      title: "Growth Predictor",
      href: "/growth-predictor",
      icon: TrendingUp,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  // Function to handle logout, assuming it's a client-side action
  const handleLogout = () => {
    // Clear the authentication cookie
    document.cookie = "creator-connect-auth=; path=/; max-age=0" // Set max-age to 0 to delete the cookie
    sessionStorage.removeItem("creator-connect-user") // Clear user data from session storage
    router.push("/") // Redirect to the homepage after logout
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <Calculator className="w-6 h-6 text-orange-500" />
          <h2 className="text-lg font-bold text-orange-500 tracking-wider">CREATOR CONNECT</h2>
          <SidebarTrigger className="lg:hidden" /> {/* Only show trigger on mobile/small screens */}
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-neutral-700">
        {/* Added Logout button to sidebar */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
              <span>LOGOUT</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {/* Legal & Contact Links */}
        <SidebarMenu className="mt-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/contact">
                <Mail className="w-5 h-5" />
                <span>CONTACT US</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/terms">
                <FileText className="w-5 h-5" />
                <span>TERMS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
