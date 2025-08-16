"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, BarChart } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Reusable Line Chart Component (adapted from InfluencerWorthDashboard)
const EngagementTrendChart = ({ data, title }) => {
  const width = 600
  const height = 300
  const padding = 40

  const xMax = width - padding * 2
  const yMax = height - padding * 2

  const xDomain = data.map((d) => d.name)
  const yDomainMax = Math.max(...data.map((d) => Math.max(d.userValue, d.industryAverage))) * 1.2 // 20% buffer

  const xScale = (index) => padding + (index / (data.length - 1)) * xMax
  const yScale = (value) => height - padding - (value / yDomainMax) * yMax

  const userLinePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.userValue)}`).join(" ")
  const industryLinePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.industryAverage)}`)
    .join(" ")

  const numYAxisTicks = 5
  const yAxisTicks = Array.from({ length: numYAxisTicks })
    .map((_, i) => {
      const value = (yDomainMax / (numYAxisTicks - 1)) * i
      return {
        value: value,
        y: yScale(value),
      }
    })
    .reverse()

  return (
    <div className="relative bg-neutral-900 border border-neutral-700 rounded-xl p-4 lg:p-6 overflow-hidden w-full">
      <h3 className="text-lg font-bold text-white tracking-wider mb-4">{title}</h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="min-w-[400px] block">
          {/* Glow filter for lines */}
          <defs>
            <filter id="glowOrange">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowWhite">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Lines */}
          {yAxisTicks.map((tick, i) => (
            <line
              key={`y-grid-${i}`}
              x1={padding}
              y1={tick.y}
              x2={width - padding}
              y2={tick.y}
              stroke="#262626"
              strokeDasharray="2 2"
            />
          ))}
          {xDomain.map((_, i) => (
            <line
              key={`x-grid-${i}`}
              x1={xScale(i)}
              y1={padding}
              x2={xScale(i)}
              y2={height - padding}
              stroke="#262626"
              strokeDasharray="2 2"
            />
          ))}

          {/* Y-axis labels */}
          {yAxisTicks.map((tick, i) => (
            <text
              key={`y-label-${i}`}
              x={padding - 10}
              y={tick.y + 4}
              textAnchor="end"
              className="text-xs fill-neutral-400 font-mono"
            >
              {Math.floor(tick.value).toLocaleString()}%
            </text>
          ))}

          {/* X-axis labels */}
          {xDomain.map((name, i) => (
            <text
              key={`x-label-${i}`}
              x={xScale(i)}
              y={height - padding + 20}
              textAnchor="middle"
              className="text-xs fill-neutral-400 font-mono"
            >
              {name}
            </text>
          ))}

          {/* Lines */}
          <path
            d={userLinePath}
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            filter="url(#glowOrange)"
            className="chart-line-animate"
          />
          <path
            d={industryLinePath}
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="2"
            strokeDasharray="5 5"
            filter="url(#glowWhite)"
            className="chart-line-animate"
          />

          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={`user-dot-${i}`}
              cx={xScale(i)}
              cy={yScale(d.userValue)}
              r="4"
              fill="#f97316"
              filter="url(#glowOrange)"
            />
          ))}
          {data.map((d, i) => (
            <circle
              key={`industry-dot-${i}`}
              cx={xScale(i)}
              cy={yScale(d.industryAverage)}
              r="3"
              fill="#e4e4e7"
              filter="url(#glowWhite)"
            />
          ))}
        </svg>
      </div>
      <style jsx>{`
        .chart-line-animate {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 2s ease-out forwards;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 bg-orange-500 rounded-full"></span>
          <span className="text-neutral-300">Your Engagement</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 border-t-2 border-dashed border-neutral-300"></span>
          <span className="text-neutral-300">Industry Average</span>
        </div>
      </div>
    </div>
  )
}

export default function EngagementCalculatorPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [inputValues, setInputValues] = useState({})
  const [engagementRate, setEngagementRate] = useState<number | null>(null)
  const [engagementStatus, setEngagementStatus] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [engagementTrendData, setEngagementTrendData] = useState([])

  const platformInputs = {
    youtube: [
      { id: "subscribers", label: "Subscribers", type: "number" },
      { id: "views", label: "Views (Avg. per video)", type: "number" },
      { id: "likes", label: "Likes (Avg. per video)", type: "number" },
      { id: "comments", label: "Comments (Avg. per video)", type: "number" },
      { id: "shares", label: "Shares (Avg. per video)", type: "number" },
    ],
    instagram: [
      { id: "followers", label: "Followers", type: "number" },
      { id: "likes", label: "Likes (Avg. per post)", type: "number" },
      { id: "comments", label: "Comments (Avg. per post)", type: "number" },
      { id: "saves", label: "Saves (Avg. per post)", type: "number" },
      { id: "shares", label: "Shares (Avg. per post)", type: "number" },
    ],
    x: [
      { id: "followers", label: "Followers", type: "number" },
      { id: "engagements", label: "Engagements (Avg. per tweet)", type: "number" },
    ],
    tiktok: [
      { id: "followers", label: "Followers", type: "number" },
      { id: "views", label: "Views (Avg. per video)", type: "number" },
      { id: "likes", label: "Likes (Avg. per video)", type: "number" },
      { id: "comments", label: "Comments (Avg. per video)", type: "number" },
      { id: "shares", label: "Shares (Avg. per video)", type: "number" },
    ],
    facebook: [
      { id: "followers", label: "Followers", type: "number" },
      { id: "reach", label: "Reach (Avg. per post)", type: "number" },
      { id: "reactions", label: "Reactions (Avg. per post)", type: "number" },
      { id: "comments", label: "Comments (Avg. per post)", type: "number" },
      { id: "shares", label: "Shares (Avg. per post)", type: "number" },
    ],
  }

  const calculateEngagement = async () => {
    setLoading(true)
    setShowResults(false)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate calculation delay

    let rate = 0
    const values = Object.fromEntries(Object.entries(inputValues).map(([key, value]) => [key, Number(value) || 0]))

    switch (selectedPlatform) {
      case "youtube":
        if (values.subscribers > 0) {
          rate = ((values.likes + values.comments + values.shares) / values.subscribers) * 100
        }
        break
      case "instagram":
        if (values.followers > 0) {
          rate = ((values.likes + values.comments + values.saves + values.shares) / values.followers) * 100
        }
        break
      case "x":
        if (values.followers > 0) {
          rate = (values.engagements / values.followers) * 100
        }
        break
      case "tiktok":
        if (values.followers > 0) {
          rate = ((values.likes + values.comments + values.shares) / values.followers) * 100
        }
        break
      case "facebook":
        if (values.followers > 0) {
          // Using followers as denominator for Facebook as requested
          rate = ((values.reactions + values.comments + values.shares) / values.followers) * 100
        }
        break
      default:
        rate = 0
    }

    setEngagementRate(rate)

    // Updated thresholds
    if (rate <= 1) {
      setEngagementStatus("Low")
    } else if (rate > 1 && rate <= 3) {
      setEngagementStatus("Average")
    } else {
      // rate > 3
      setEngagementStatus("High")
    }

    // Generate mock trend data for the chart
    const mockTrend = [
      {
        name: "Week 1",
        userValue: Math.max(0, rate * 0.8 + (Math.random() * 0.5 - 0.25)),
        industryAverage: Math.max(0, rate * 0.7 + (Math.random() * 0.5 - 0.25)),
      },
      { name: "Week 2", userValue: rate, industryAverage: Math.max(0, rate * 0.9 + (Math.random() * 0.5 - 0.25)) },
      {
        name: "Week 3",
        userValue: Math.max(0, rate * 1.1 + (Math.random() * 0.5 - 0.25)),
        industryAverage: Math.max(0, rate * 1.0 + (Math.random() * 0.5 - 0.25)),
      },
      {
        name: "Week 4",
        userValue: Math.max(0, rate * 0.95 + (Math.random() * 0.5 - 0.25)),
        industryAverage: Math.max(0, rate * 0.85 + (Math.random() * 0.5 - 0.25)),
      },
      {
        name: "Week 5",
        userValue: Math.max(0, rate * 1.05 + (Math.random() * 0.5 - 0.25)),
        industryAverage: Math.max(0, rate * 0.9 + (Math.random() * 0.5 - 0.25)),
      },
    ]
    setEngagementTrendData(mockTrend)

    setLoading(false)
    setShowResults(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Low":
        return "text-red-500"
      case "Average":
        return "text-yellow-500"
      case "High":
        return "text-green-500"
      default:
        return "text-neutral-400"
    }
  }

  const getBadgeColor = (status) => {
    switch (status) {
      case "Low":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "Average":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "High":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"
    }
  }

  const getProgressBarColor = (status) => {
    switch (status) {
      case "Low":
        return "bg-red-500"
      case "Average":
        return "bg-yellow-500"
      case "High":
        return "bg-green-500"
      default:
        return "bg-neutral-500"
    }
  }

  const isCalculateDisabled = () => {
    if (!selectedPlatform) return true
    const requiredInputs = platformInputs[selectedPlatform] || []
    return requiredInputs.some((input) => !inputValues[input.id] || Number(inputValues[input.id]) < 0)
  }

  return (
    <div className="h-full w-full overflow-auto">
      <div className="max-w-none w-full p-4 lg:p-6 xl:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider">KNOW YOUR ENGAGEMENT RATE</h1>
            <p className="text-sm text-neutral-400 mt-1">Calculate your influencer engagement rate across platforms</p>
          </div>
        </div>

        <Card className="bg-neutral-900 border-neutral-700 w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              ENGAGEMENT CALCULATOR
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs text-neutral-400 tracking-wider">PLATFORM</Label>
              <Select
                value={selectedPlatform}
                onValueChange={(value) => {
                  setSelectedPlatform(value)
                  setInputValues({}) // Reset inputs when platform changes
                  setShowResults(false) // Hide results
                  setEngagementRate(null)
                  setEngagementStatus("")
                  setEngagementTrendData([]) // Clear chart data
                }}
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white w-full">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="x">X (Twitter)</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedPlatform && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {platformInputs[selectedPlatform]?.map((input) => (
                  <div key={input.id} className="space-y-2">
                    <Label className="text-xs text-neutral-400 tracking-wider">{input.label.toUpperCase()}</Label>
                    <Input
                      type={input.type}
                      placeholder={`Enter ${input.label.toLowerCase()}`}
                      value={inputValues[input.id] || ""}
                      onChange={(e) => setInputValues({ ...inputValues, [input.id]: e.target.value })}
                      className="bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 w-full"
                    />
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={calculateEngagement}
              disabled={loading || isCalculateDisabled()}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
            >
              {loading ? "Calculating..." : "Calculate Engagement Rate"}
            </Button>

            <div
              className={cn(
                "transition-all duration-500 ease-out overflow-hidden w-full",
                showResults ? "max-h-[2000px] opacity-100 pt-6" : "max-h-0 opacity-0",
              )}
            >
              {engagementRate !== null && (
                <div className="space-y-6 w-full">
                  <div className="text-center">
                    <p className="text-xs text-neutral-400 tracking-wider">ENGAGEMENT RATE</p>
                    <p
                      className={cn(
                        "text-4xl lg:text-5xl xl:text-6xl font-bold font-mono",
                        getStatusColor(engagementStatus),
                      )}
                    >
                      {engagementRate.toFixed(2)}%
                    </p>
                    <Badge className={cn("mt-3", getBadgeColor(engagementStatus))}>
                      {engagementStatus.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Progress Bar for Engagement Rate */}
                  <div className="w-full bg-neutral-800 rounded-full h-3 mt-6">
                    <Progress
                      value={Math.min(100, engagementRate * 10)} // Scale engagement rate for progress bar (e.g., 10% engagement = 100% on bar)
                      className={cn("h-3", getProgressBarColor(engagementStatus))}
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-3 h-3" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-pointer hover:text-white transition-colors">
                              How is engagement calculated?
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-neutral-800 border-neutral-700 text-neutral-300 max-w-xs">
                            <p className="font-semibold mb-1">Formula for {selectedPlatform}:</p>
                            {selectedPlatform === "youtube" && <p>(Likes + Comments + Shares) ÷ Subscribers × 100</p>}
                            {selectedPlatform === "instagram" && (
                              <p>(Likes + Comments + Saves + Shares) ÷ Followers × 100</p>
                            )}
                            {selectedPlatform === "x" && <p>(Engagements ÷ Followers) × 100</p>}
                            {selectedPlatform === "tiktok" && <p>(Likes + Comments + Shares) ÷ Followers × 100</p>}
                            {selectedPlatform === "facebook" && (
                              <p>(Reactions + Comments + Shares) ÷ Followers × 100</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-neutral-500 italic text-center lg:text-right">
                      This is an estimate. Actual engagement may vary based on platform behavior.
                    </span>
                  </div>

                  {/* Engagement Trend Chart */}
                  {engagementTrendData.length > 0 && (
                    <div className="w-full">
                      <EngagementTrendChart data={engagementTrendData} title="Engagement Trend Overview" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
