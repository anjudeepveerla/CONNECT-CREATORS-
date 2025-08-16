"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, DollarSign, BarChart3, Lightbulb, Search } from "lucide-react"
import { InfluencerWorthDashboard } from "@/components/influencer-worth-dashboard"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function PricingCalculatorPage() {
  const [formData, setFormData] = useState({
    userType: "",
    platform: "",
    followers: "",
    engagement: "",
    country: "",
    city: "",
    contentType: "",
    niche: "",
  })

  // Results state - will only be populated after payment verification
  const [results, setResults] = useState<{
    suggestedPrice: number
    priceBreakdown: {
      baseRate: number
      engagementBonus: number
      nicheDemandMultiplier: number
      locationModifier: number
    }
    marketBenchmarks: {
      "similar creators": { min: number; avg: number; max: number }
      "niche average": { min: number; avg: number; max: number }
    }
    confidenceScore: number
    smartTips: string[]
    engagementScore: number
    growthPotential: string
    lineChartData: { name: string; userValue: number; industryAverage: number }[]
    radarChartData: { reach: number; engagement: number; consistency: number; growth: number; nicheValue: number }
    country: string
  } | null>(null)

  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [isReportUnlocked, setIsReportUnlocked] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null)
  const [isResultsBlurred, setIsResultsBlurred] = useState(false)

  // Store form data temporarily for calculation after payment
  const [pendingCalculation, setPendingCalculation] = useState(false)

  const contentMultipliers = {
    reel: 1.0,
    post: 0.7,
    story: 0.4,
    bundle: 2.0,
  }

  const platformContentTypes = {
    instagram: {
      post: 0.7,
      story: 0.4,
      reel: 1.0,
      bundle: 2.0,
    },
    youtube: {
      short: 1.0, // Treated as reel equivalent
      "long video": 2.5,
      live: 3.0,
      "community post": 0.7, // Treated as post equivalent
    },
    linkedin: {
      post: 0.7,
      article: 1.2,
      "sponsored post": 1.8,
    },
    x: {
      tweet: 0.2,
      thread: 0.5,
      space: 0.6,
    },
    facebook: {
      post: 0.7,
      story: 0.4,
      live: 1.2,
    },
    other: {
      "generic post": 0.7,
      story: 0.4,
      video: 1.0,
    },
  }

  const tier1Countries = [
    "usa",
    "canada",
    "uk",
    "germany",
    "france",
    "italy",
    "spain",
    "netherlands",
    "sweden",
    "switzerland",
    "austria",
    "norway",
    "denmark",
    "finland",
    "ireland",
    "australia",
    "japan",
    "southkorea",
    "singapore",
    "uae",
  ]

  const tier15Countries = [
    "china",
    "brazil",
    "mexico",
    "argentina",
    "turkey",
    "israel",
    "chile",
    "malaysia",
    "southafrica",
    "poland",
    "czech",
    "hungary",
    "romania",
    "bulgaria",
    "croatia",
    "slovakia",
    "slovenia",
    "estonia",
    "latvia",
    "lithuania",
  ]

  const tier2Countries = [
    "india",
    "pakistan",
    "indonesia",
    "vietnam",
    "philippines",
    "thailand",
    "egypt",
    "morocco",
    "nigeria",
    "kenya",
    "bangladesh",
    "srilanka",
    "cambodia",
  ]

  const nicheMultipliers = {
    fashion: 1.2,
    beauty: 1.1,
    fitness: 1.1,
    tech: 1.3,
    travel: 1.1,
    food: 1.0,
    lifestyle: 0.9,
    gaming: 1.0,
    finance: 1.5,
    health: 1.05,
    motivation: 0.95,
    education: 1.2,
    comedy: 0.8,
    parenting: 1.0,
    business: 1.3,
    photography: 0.9,
    cars: 1.1,
    books: 0.85,
    art: 0.9,
  }

  const countries = [
    { value: "afghanistan", label: "Afghanistan" },
    { value: "albania", label: "Albania" },
    { value: "algeria", label: "Algeria" },
    { value: "argentina", label: "Argentina" },
    { value: "armenia", label: "Armenia" },
    { value: "australia", label: "Australia" },
    { value: "austria", label: "Austria" },
    { value: "azerbaijan", label: "Azerbaijan" },
    { value: "bahrain", label: "Bahrain" },
    { value: "bangladesh", label: "Bangladesh" },
    { value: "belarus", label: "Belarus" },
    { value: "belgium", label: "Belgium" },
    { value: "bolivia", label: "Bolivia" },
    { value: "brazil", label: "Brazil" },
    { value: "bulgaria", label: "Bulgaria" },
    { value: "cambodia", label: "Cambodia" },
    { value: "canada", label: "Canada" },
    { value: "chile", label: "Chile" },
    { value: "china", label: "China" },
    { value: "colombia", label: "Colombia" },
    { value: "croatia", label: "Croatia" },
    { value: "czech", label: "Czech Republic" },
    { value: "denmark", label: "Denmark" },
    { value: "ecuador", label: "Ecuador" },
    { value: "egypt", label: "Egypt" },
    { value: "estonia", label: "Estonia" },
    { value: "finland", label: "Finland" },
    { value: "france", label: "France" },
    { value: "georgia", label: "Georgia" },
    { value: "germany", label: "Germany" },
    { value: "ghana", label: "Ghana" },
    { value: "greece", label: "Greece" },
    { value: "hungary", label: "Hungary" },
    { value: "iceland", label: "Iceland" },
    { value: "india", label: "India" },
    { value: "indonesia", label: "Indonesia" },
    { value: "iran", label: "Iran" },
    { value: "iraq", label: "Iraq" },
    { value: "ireland", label: "Ireland" },
    { value: "israel", label: "Israel" },
    { value: "italy", label: "Italy" },
    { value: "japan", label: "Japan" },
    { value: "jordan", label: "Jordan" },
    { value: "kazakhstan", label: "Kazakhstan" },
    { value: "kenya", label: "Kenya" },
    { value: "kuwait", label: "Kuwait" },
    { value: "latvia", label: "Latvia" },
    { value: "lebanon", label: "Lebanon" },
    { value: "lithuania", label: "Lithuania" },
    { value: "luxembourg", label: "Luxembourg" },
    { value: "malaysia", label: "Malaysia" },
    { value: "mexico", label: "Mexico" },
    { value: "morocco", label: "Morocco" },
    { value: "netherlands", label: "Netherlands" },
    { value: "newzealand", label: "New Zealand" },
    { value: "nigeria", label: "Nigeria" },
    { value: "norway", label: "Norway" },
    { value: "pakistan", label: "Pakistan" },
    { value: "peru", label: "Peru" },
    { value: "philippines", label: "Philippines" },
    { value: "poland", label: "Poland" },
    { value: "portugal", label: "Portugal" },
    { value: "qatar", label: "Qatar" },
    { value: "romania", label: "Romania" },
    { value: "russia", label: "Russia" },
    { value: "saudi", label: "Saudi Arabia" },
    { value: "singapore", label: "Singapore" },
    { value: "slovakia", label: "Slovakia" },
    { value: "slovenia", label: "Slovenia" },
    { value: "southafrica", label: "South Africa" },
    { value: "southkorea", label: "South Korea" },
    { value: "spain", label: "Spain" },
    { value: "srilanka", label: "Sri Lanka" },
    { value: "sweden", label: "Sweden" },
    { value: "switzerland", label: "Switzerland" },
    { value: "thailand", label: "Thailand" },
    { value: "turkey", label: "Turkey" },
    { value: "uae", label: "United Arab Emirates" },
    { value: "uk", label: "United Kingdom" },
    { value: "ukraine", label: "Ukraine" },
    { value: "usa", label: "United States" },
    { value: "uruguay", label: "Uruguay" },
    { value: "venezuela", label: "Venezuela" },
    { value: "vietnam", label: "Vietnam" },
  ]

  const [countryOpen, setCountryOpen] = useState(false)

  const getRegionalMultiplier = (countryValue: string) => {
    if (tier1Countries.includes(countryValue)) {
      return 2.0 // Tier-1: High budget countries
    }
    if (tier15Countries.includes(countryValue)) {
      return 1.5 // Tier-1.5: Upper-middle income countries
    }
    if (tier2Countries.includes(countryValue)) {
      return 1.2 // Tier-2: Developing countries
    }
    return 1.0 // Tier-3: Low income countries (default)
  }

  const getEngagementFactor = (engagement: number) => {
    if (engagement < 2) {
      return 0.7 // Reduce by 30%
    }
    if (engagement > 5) {
      return 1.2 // Increase by 20%
    }
    return 1.0 // Normal (2-5%)
  }

  const getContentMultiplier = (contentType: string) => {
    const normalizedType = contentType?.toLowerCase()

    // Map platform-specific content types to standard multipliers
    if (normalizedType?.includes("reel") || normalizedType?.includes("short")) {
      return contentMultipliers.reel
    }
    if (normalizedType?.includes("post") || normalizedType?.includes("tweet") || normalizedType?.includes("article")) {
      return contentMultipliers.post
    }
    if (normalizedType?.includes("story")) {
      return contentMultipliers.story
    }
    if (normalizedType?.includes("bundle")) {
      return contentMultipliers.bundle
    }

    // Default to reel multiplier for other video content
    return contentMultipliers.reel
  }

  const formatCurrencyValue = (value: number) => {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const calculatePricing = async () => {
    setLoading(true)
    setIsReportUnlocked(false)
    setPaymentVerified(false)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // SECURITY: Don't calculate or store any pricing results yet
    // Just show the payment modal - pricing will be calculated after payment verification
    setLoading(false)
    setPendingCalculation(true)
    setIsModalOpen(true)
  }

  const handleGenerateReport = () => {
    setIsModalOpen(true)
  }

  const handlePayment = async (amount: number) => {
    setPaymentProcessing(true)
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Generate a unique payment session ID
    const sessionId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setPaymentSessionId(sessionId)
    setPaymentVerified(true)
    setPaymentProcessing(false)

    // Close payment modal and start generating report
    setIsModalOpen(false)
    setIsGeneratingReport(true)

    // Simulate report generation time
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Now calculate the actual pricing results after payment verification
    const results = await calculatePricingResults(formData, sessionId)
    
    setIsGeneratingReport(false)
    setIsReportUnlocked(true)
    
    // Store results only after payment verification
    setResults(results)
  }

  // SECURE: Calculate pricing results only after payment verification
  const calculatePricingResults = async (formData: any, sessionId: string) => {
    // Verify payment session is valid
    if (!sessionId || !sessionId.startsWith('pay_')) {
      throw new Error('Invalid payment session')
    }

    const followers = Number.parseInt(formData.followers) || 0
    const engagement = Number.parseFloat(formData.engagement) || 0

    const baselinePriceUSD = 100 // $100 baseline
    const baselineFollowers = 40000
    const baselineEngagement = 5

    const followerScalingFactor = followers / baselineFollowers
    const engagementFactor = getEngagementFactor(engagement)
    const contentMultiplier = getContentMultiplier(formData.contentType)
    const nicheMultiplier = nicheMultipliers[formData.niche?.toLowerCase()] || 1.0
    const regionalMultiplier = getRegionalMultiplier(formData.country)

    const suggestedPriceUSD =
      baselinePriceUSD *
      followerScalingFactor *
      engagementFactor *
      contentMultiplier *
      nicheMultiplier *
      regionalMultiplier

    let confidenceScore = 70
    if (
      formData.followers &&
      formData.engagement &&
      formData.niche &&
      formData.country &&
      formData.platform &&
      formData.contentType
    ) {
      confidenceScore = 99.2
    } else if (formData.followers && formData.engagement && formData.niche) {
      confidenceScore = 85
    }
    if (engagement < 1) confidenceScore = Math.min(confidenceScore, 75)

    const marketBenchmarks = {
      "similar creators": {
        min: suggestedPriceUSD * 0.8,
        avg: suggestedPriceUSD * 1.0,
        max: suggestedPriceUSD * 1.2,
      },
      "niche average": {
        min: suggestedPriceUSD * 0.7,
        avg: suggestedPriceUSD * 0.9,
        max: suggestedPriceUSD * 1.1,
      },
    }

    const smartTips = []
    if (engagement < 3) smartTips.push("Focus on improving engagement rate for higher pricing.")
    if (suggestedPriceUSD < 50)
      smartTips.push("Explore bundling multiple content types for a better value proposition.")
    if (suggestedPriceUSD > 1000 && formData.userType === "creator")
      smartTips.push("Highlight unique value propositions to justify premium pricing.")
    if (suggestedPriceUSD > 1000 && formData.userType === "brand")
      smartTips.push("Negotiate usage rights carefully to optimize budget.")
    if (smartTips.length === 0)
      smartTips.push("Your current profile and inputs suggest optimal pricing. Keep up the great work!")

    const engagementScore = Math.min(10, Math.max(0, engagement / 2))
    const growthPotential = followers > 500000 ? "Very High" : followers > 100000 ? "High" : "Medium"

    const lineChartData = [
      { name: "Post", userValue: suggestedPriceUSD * 0.7, industryAverage: suggestedPriceUSD * 0.6 },
      { name: "Story", userValue: suggestedPriceUSD * 0.4, industryAverage: suggestedPriceUSD * 0.35 },
      { name: "Reel", userValue: suggestedPriceUSD * 1.0, industryAverage: suggestedPriceUSD * 0.9 },
      { name: "Bundle", userValue: suggestedPriceUSD * 2.0, industryAverage: suggestedPriceUSD * 1.8 },
    ]

    const radarChartData = {
      reach: Math.min(100, followers / 10000),
      engagement: Math.min(100, engagement * 10),
      consistency: 75,
      growth: 80,
      nicheValue: (nicheMultipliers[formData.niche?.toLowerCase()] || 1.0) * 50,
    }

    return {
      suggestedPrice: suggestedPriceUSD,
      priceBreakdown: {
        baseRate: baselinePriceUSD * followerScalingFactor,
        engagementBonus: baselinePriceUSD * followerScalingFactor * (engagementFactor - 1),
        nicheDemandMultiplier: nicheMultiplier,
        locationModifier: regionalMultiplier,
      },
      marketBenchmarks: marketBenchmarks,
      confidenceScore: confidenceScore,
      smartTips: smartTips,
      engagementScore: engagementScore,
      growthPotential: growthPotential,
      lineChartData: lineChartData,
      radarChartData: radarChartData,
      country: formData.country,
    }
  }

  return (
    <div className="h-full w-full overflow-auto">
      <div className="max-w-none w-full p-4 lg:p-6 xl:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider">PRICING CALCULATOR</h1>
            <p className="text-sm text-neutral-400 mt-1">Get fair pricing estimates for influencer collaborations</p>
          </div>
        </div>

        {/* Input Form */}
        <Card className="bg-neutral-900 border-neutral-700 w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              PRICING INPUT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-neutral-400 tracking-wider">USER TYPE</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creator">Creator</SelectItem>
                    <SelectItem value="brand">Brand/Agency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-neutral-400 tracking-wider">PLATFORM</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => {
                    setFormData({ ...formData, platform: value, contentType: "" })
                  }}
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white w-full">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="x">X (Twitter)</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-neutral-400 tracking-wider">FOLLOWERS</Label>
                <Input
                  type="number"
                  placeholder="e.g., 75000"
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                  className="bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-neutral-400 tracking-wider">ENGAGEMENT RATE (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="e.g., 6.5"
                  value={formData.engagement}
                  onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                  className="bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-neutral-400 tracking-wider">COUNTRY</Label>
                <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={countryOpen}
                      className="w-full justify-between bg-neutral-800 border-neutral-600 text-white hover:bg-neutral-700"
                    >
                      {formData.country
                        ? countries.find((country) => country.value === formData.country)?.label
                        : "Select country"}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white border-neutral-300">
                    <Command className="bg-white">
                      <CommandInput placeholder="Search country..." className="text-black" />
                      <CommandList>
                        <CommandEmpty className="text-black">No country found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              key={country.value}
                              value={country.value}
                              onSelect={(currentValue) => {
                                setFormData({
                                  ...formData,
                                  country: currentValue === formData.country ? "" : currentValue,
                                })
                                setCountryOpen(false)
                              }}
                              className="text-black hover:bg-neutral-100"
                            >
                              {country.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-neutral-400 tracking-wider">CITY</Label>
                <Input
                  placeholder="e.g., Mumbai, Delhi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-neutral-400 tracking-wider">NICHE</Label>
                <Select value={formData.niche} onValueChange={(value) => setFormData({ ...formData, niche: value })}>
                  <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white w-full">
                    <SelectValue placeholder="Select niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="motivation">Motivation</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="parenting">Parenting</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="cars">Cars</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-neutral-400 tracking-wider">COLLABORATION TYPE</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => setFormData({ ...formData, contentType: value })}
                  disabled={!formData.platform}
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.platform &&
                      Object.keys(platformContentTypes[formData.platform.toLowerCase()] || {}).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={calculatePricing}
              disabled={
                loading ||
                !formData.platform ||
                !formData.followers ||
                !formData.contentType ||
                !formData.country ||
                !formData.niche
              }
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
            >
              {loading ? "Calculating..." : "Calculate Pricing"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Area - Only show after payment verification */}
        {results && isReportUnlocked ? (
          <div className="relative w-full">
            <div className="w-full">
              {/* Suggested Price */}
              <Card className="bg-neutral-900 border-neutral-700 mb-6 w-full">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    SUGGESTED OPTIMAL PRICE
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6">
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-orange-500 font-mono mb-4">
                    {formatCurrencyValue(results.suggestedPrice)}
                  </div>
                  <p className="text-sm text-neutral-400 mb-4">
                    This is the AI-calculated optimal price for your collaboration.
                  </p>
                  <div>
                    <span className="text-xs text-neutral-400">Confidence Score: </span>
                    <Badge className="bg-white/20 text-white text-xs">{results.confidenceScore.toFixed(1)}%</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Price Breakdown */}
              <Card className="bg-neutral-900 border-neutral-700 mb-6 w-full">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    PRICE BREAKDOWN
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex justify-between text-sm text-neutral-300">
                    <span>Base Rate (Followers × Content Type)</span>
                    <span className="font-mono">{formatCurrencyValue(results.priceBreakdown.baseRate)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-300">
                    <span>Engagement Factor</span>
                    <span className="font-mono">{formatCurrencyValue(results.priceBreakdown.engagementBonus)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-300">
                    <span>Niche Multiplier</span>
                    <span className="font-mono">×{results.priceBreakdown.nicheDemandMultiplier.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-300">
                    <span>Regional Multiplier</span>
                    <span className="font-mono">×{results.priceBreakdown.locationModifier.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-neutral-700 pt-4 mt-4 flex justify-between text-lg font-bold text-white">
                    <span>TOTAL ESTIMATE</span>
                    <span className="font-mono text-orange-500">{formatCurrencyValue(results.suggestedPrice)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Market Benchmarks */}
              <Card className="bg-neutral-900 border-neutral-700 mb-6 w-full">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    MARKET BENCHMARKS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="border border-neutral-700 rounded p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-white uppercase tracking-wider">
                          Similar Creators
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center">
                          <div className="text-neutral-400 mb-1">MIN</div>
                          <div className="text-white font-mono">
                            {formatCurrencyValue(results.marketBenchmarks["similar creators"].min)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-neutral-400 mb-1">AVG</div>
                          <div className="text-orange-500 font-mono font-bold">
                            {formatCurrencyValue(results.marketBenchmarks["similar creators"].avg)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-neutral-400 mb-1">MAX</div>
                          <div className="text-white font-mono">
                            {formatCurrencyValue(results.marketBenchmarks["similar creators"].max)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-neutral-700 rounded p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-white uppercase tracking-wider">Niche Average</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center">
                          <div className="text-neutral-400 mb-1">MIN</div>
                          <div className="text-white font-mono">
                            {formatCurrencyValue(results.marketBenchmarks["niche average"].min)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-neutral-400 mb-1">AVG</div>
                          <div className="text-orange-500 font-mono font-bold">
                            {formatCurrencyValue(results.marketBenchmarks["niche average"].avg)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-neutral-400 mb-1">MAX</div>
                          <div className="text-white font-mono">
                            {formatCurrencyValue(results.marketBenchmarks["niche average"].max)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insights & Tips */}
              <Card className="bg-neutral-900 border-neutral-700 mb-6 w-full">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    SMART TIPS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {results.smartTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-300">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Influencer Worth Dashboard Section */}
              <div className="w-full">
                <InfluencerWorthDashboard results={results} />
              </div>

              {/* Generate Report Button - Only show if no results yet */}
              {!results && (
                <div className="flex justify-center mt-6 w-full">
                  <Button
                    onClick={handleGenerateReport}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg w-full sm:w-auto"
                  >
                    Generate Report
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Card className="bg-neutral-900 border-neutral-700 w-full">
            <CardContent className="p-8 text-center">
              <Calculator className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-base text-neutral-400">Fill in the form and click "Calculate Pricing" to get started</p>
            </CardContent>
          </Card>
        )}

        {/* Report Generation Loading State */}
        {isGeneratingReport && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="text-center p-8 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl max-w-sm w-full">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-white">Generating your influencer pricing insights…</p>
              <p className="text-sm text-neutral-400 mt-2">This may take a moment.</p>
            </div>
          </div>
        )}

        {/* Unlock Report Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-neutral-900 border-neutral-700 text-white p-6 rounded-xl max-w-md w-full shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white tracking-wider text-center mb-2">
                Unlock Influencer Report
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-400 text-center">
                Choose an option to access the full report.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 mt-6">
              <Card className="bg-neutral-800 border-neutral-700 p-4 rounded-lg">
                <CardTitle className="text-xl font-bold text-orange-500 mb-2">$9 – One-Time Access</CardTitle>
                <p className="text-sm text-neutral-300 mb-4">Get insights for this report only. No re-access later.</p>
                <Button
                  onClick={() => handlePayment(9)}
                  disabled={paymentProcessing}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  {paymentProcessing ? "Processing..." : "Pay $9 and Get Report"}
                </Button>
              </Card>
              <Card className="bg-neutral-800 border-neutral-700 p-4 rounded-lg">
                <CardTitle className="text-xl font-bold text-orange-500 mb-2">$299 – Lifetime Access</CardTitle>
                <p className="text-sm text-neutral-300 mb-4">Unlimited access to all future pricing reports forever.</p>
                <Button
                  onClick={() => handlePayment(299)}
                  disabled={paymentProcessing}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  {paymentProcessing ? "Processing..." : "Pay $299 and Unlock Forever"}
                </Button>
              </Card>
            </div>
            <p className="text-xs text-neutral-500 text-center mt-6">
              _This is a demo experience. Payments are simulated._
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
