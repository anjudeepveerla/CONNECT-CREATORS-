"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calculator, Zap, Users, Calendar, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"

const GrowthTrendChart = ({ data, title }) => {
  const width = 600
  const height = 300
  const padding = 40

  const xMax = width - padding * 2
  const yMax = height - padding * 2

  const xDomain = data.map((d) => d.name)
  const yDomainMax = Math.max(...data.map((d) => Math.max(d.current, d.projected))) * 1.2

  const xScale = (index) => padding + (index / (data.length - 1)) * xMax
  const yScale = (value) => height - padding - (value / yDomainMax) * yMax

  const currentLinePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.current)}`).join(" ")
  const projectedLinePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.projected)}`).join(" ")

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
          <defs>
            <filter id="glowOrange">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowGreen">
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
              {Math.floor(tick.value).toLocaleString()}
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
            d={currentLinePath}
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            filter="url(#glowOrange)"
            className="chart-line-animate"
          />
          <path
            d={projectedLinePath}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray="5 5"
            filter="url(#glowGreen)"
            className="chart-line-animate"
          />

          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={`current-dot-${i}`}
              cx={xScale(i)}
              cy={yScale(d.current)}
              r="4"
              fill="#f97316"
              filter="url(#glowOrange)"
            />
          ))}
          {data.map((d, i) => (
            <circle
              key={`projected-dot-${i}`}
              cx={xScale(i)}
              cy={yScale(d.projected)}
              r="3"
              fill="#22c55e"
              filter="url(#glowGreen)"
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
          <span className="text-neutral-300">Current Growth</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 border-t-2 border-dashed border-green-500"></span>
          <span className="text-neutral-300">Projected Growth</span>
        </div>
      </div>
    </div>
  )
}

export default function GrowthPredictorPage() {
  const [formData, setFormData] = useState({
    platform: "",
    currentFollowers: "",
    engagementRate: "",
    postsPerWeek: "",
    avgViewsPerPost: "",
    targetPeriod: "",
  })

  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [growthTrendData, setGrowthTrendData] = useState([])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateGrowth = async () => {
    setLoading(true)
    setShowResults(false)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate calculation delay

    const { platform, currentFollowers, engagementRate, postsPerWeek, avgViewsPerPost, targetPeriod } = formData

    // Convert string inputs to numbers
    const followers = Number.parseFloat(currentFollowers) || 0
    const er = Number.parseFloat(engagementRate) || 0
    const pf = Number.parseFloat(postsPerWeek) || 0
    const views = Number.parseFloat(avgViewsPerPost) || 0

    // Get target months based on period
    const targetMonths = targetPeriod === "3 months" ? 3 : targetPeriod === "6 months" ? 6 : 12

    // Calculate BaseGrowthRate% = (ER × 0.5) + (PF × 0.8) + (V / CurrentFollowers × 10), capped at 15% monthly
    const baseGrowthRate = Math.min(er * 0.5 + pf * 0.8 + (views / followers) * 10, 15) / 100 // Convert to decimal

    // ProjectedFollowers = CurrentFollowers × (1 + BaseGrowthRate%) ^ TargetMonths
    const projectedFollowers = Math.round(followers * Math.pow(1 + baseGrowthRate, targetMonths))

    // Calculate earnings using pricing formula (simplified version)
    const calculateEarnings = (followerCount) => {
      let baseRate = 0
      if (platform === "Instagram") {
        baseRate =
          followerCount <= 10000
            ? followerCount * 0.01
            : followerCount <= 100000
              ? followerCount * 0.008
              : followerCount * 0.005
      } else if (platform === "TikTok") {
        baseRate =
          followerCount <= 10000
            ? followerCount * 0.008
            : followerCount <= 100000
              ? followerCount * 0.006
              : followerCount * 0.004
      } else if (platform === "YouTube") {
        baseRate =
          followerCount <= 10000
            ? followerCount * 0.02
            : followerCount <= 100000
              ? followerCount * 0.015
              : followerCount * 0.01
      }
      return Math.round(baseRate * (er / 100) * 1.2) // Factor in engagement
    }

    const currentEarnings = calculateEarnings(followers)
    const projectedEarnings = calculateEarnings(projectedFollowers)

    // Calculate ConsistencyScore
    const recommendedPosts = platform === "Instagram" ? 4 : platform === "TikTok" ? 5 : 2
    const consistencyScore = Math.min((pf / recommendedPosts) * 100, 100)

    // Generate growth trend data for chart
    const monthlyData = []
    for (let i = 0; i <= targetMonths; i++) {
      const currentGrowth = followers + followers * 0.02 * i // Conservative current growth
      const projectedGrowth = Math.round(followers * Math.pow(1 + baseGrowthRate, i))
      monthlyData.push({
        name: i === 0 ? "Now" : `Month ${i}`,
        current: currentGrowth,
        projected: projectedGrowth,
      })
    }
    setGrowthTrendData(monthlyData)

    setResults({
      baseGrowthRate: (baseGrowthRate * 100).toFixed(1),
      projectedFollowers,
      currentEarnings,
      projectedEarnings,
      consistencyScore: consistencyScore.toFixed(1),
      weeklyGoal: recommendedPosts,
      growthIncrease: projectedFollowers - followers,
      earningsIncrease: projectedEarnings - currentEarnings,
      targetMonths,
    })

    setLoading(false)
    setShowResults(true)
  }

  const resetForm = () => {
    setFormData({
      platform: "",
      currentFollowers: "",
      engagementRate: "",
      postsPerWeek: "",
      avgViewsPerPost: "",
      targetPeriod: "",
    })
    setResults(null)
    setShowResults(false)
    setGrowthTrendData([])
  }

  return (
    <div className="h-full w-full overflow-auto">
      <div className="max-w-none w-full p-4 lg:p-6 xl:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-orange-500 tracking-wider">GROWTH PREDICTOR</h1>
            </div>
            <p className="text-neutral-400 text-lg max-w-2xl">
              Predict your future growth and earnings potential with AI-powered analytics
            </p>
          </div>
        </div>

        <Card className="bg-neutral-900 border-neutral-700 w-full">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-white">
              <Calculator className="w-5 h-5 text-orange-500" />
              Growth Parameters
            </CardTitle>
            <p className="text-sm text-neutral-400 mt-2">
              Enter your current metrics to predict future growth and earnings potential
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Form Grid - Better organized with logical grouping */}
            <div className="space-y-6">
              {/* Row 1: Platform and Growth Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-neutral-300 tracking-wide">
                    PLATFORM
                  </Label>
                  <Select value={formData.platform} onValueChange={(value) => handleInputChange("platform", value)}>
                    <SelectTrigger className="h-12 bg-neutral-800 border-neutral-600 text-white hover:border-orange-500/50 focus:border-orange-500">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="Instagram" className="text-white hover:bg-neutral-700 focus:bg-neutral-700">
                        Instagram
                      </SelectItem>
                      <SelectItem value="TikTok" className="text-white hover:bg-neutral-700 focus:bg-neutral-700">
                        TikTok
                      </SelectItem>
                      <SelectItem value="YouTube" className="text-white hover:bg-neutral-700 focus:bg-neutral-700">
                        YouTube
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-neutral-300 tracking-wide">
                    TARGET GROWTH PERIOD
                  </Label>
                  <Select
                    value={formData.targetPeriod}
                    onValueChange={(value) => handleInputChange("targetPeriod", value)}
                  >
                    <SelectTrigger className="h-12 bg-neutral-800 border-neutral-600 text-white hover:border-orange-500/50 focus:border-orange-500">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="3 months" className="text-white hover:bg-neutral-700 focus:bg-neutral-700">
                        3 months
                      </SelectItem>
                      <SelectItem value="6 months" className="text-white hover:bg-neutral-700 focus:bg-neutral-700">
                        6 months
                      </SelectItem>
                      <SelectItem value="1 year" className="text-white hover:bg-neutral-700 focus:bg-neutral-700">
                        1 year
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Followers and Engagement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-neutral-300 tracking-wide">
                    CURRENT FOLLOWERS/SUBSCRIBERS
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g., 50000"
                    value={formData.currentFollowers}
                    onChange={(e) => handleInputChange("currentFollowers", e.target.value)}
                    className="h-12 bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 hover:border-orange-500/50 focus:border-orange-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-neutral-300 tracking-wide">
                    AVERAGE ENGAGEMENT RATE (%)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 3.5"
                    value={formData.engagementRate}
                    onChange={(e) => handleInputChange("engagementRate", e.target.value)}
                    className="h-12 bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 hover:border-orange-500/50 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Row 3: Posts and Views */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-neutral-300 tracking-wide">
                    POSTS PER WEEK
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g., 4"
                    value={formData.postsPerWeek}
                    onChange={(e) => handleInputChange("postsPerWeek", e.target.value)}
                    className="h-12 bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 hover:border-orange-500/50 focus:border-orange-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-neutral-300 tracking-wide">
                    AVERAGE VIEWS PER POST
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g., 25000"
                    value={formData.avgViewsPerPost}
                    onChange={(e) => handleInputChange("avgViewsPerPost", e.target.value)}
                    className="h-12 bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 hover:border-orange-500/50 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons - Centered and properly spaced */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-700">
              <Button
                onClick={calculateGrowth}
                className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base tracking-wide shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
                disabled={loading || !formData.platform || !formData.currentFollowers || !formData.targetPeriod}
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                {loading ? "Calculating..." : "Predict Growth"}
              </Button>
              <Button
                onClick={resetForm}
                variant="outline"
                className="h-12 px-8 border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white bg-transparent transition-all duration-200"
              >
                Reset
              </Button>
            </div>

            <div
              className={cn(
                "transition-all duration-500 ease-out overflow-hidden w-full",
                showResults ? "max-h-[2000px] opacity-100 pt-8" : "max-h-0 opacity-0",
              )}
            >
              {results && (
                <div className="space-y-8 w-full">
                  {/* Growth Stats - Better organized grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-orange-500" />
                        </div>
                        <span className="text-sm font-medium text-neutral-400 tracking-wide">PROJECTED FOLLOWERS</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{results.projectedFollowers.toLocaleString()}</div>
                      <div className="text-sm text-green-400 font-medium">
                        +{results.growthIncrease.toLocaleString()} ({results.baseGrowthRate}% monthly)
                      </div>
                    </div>

                    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-sm font-medium text-neutral-400 tracking-wide">MONTHLY GROWTH</span>
                      </div>
                      <div className="text-3xl font-bold text-green-400 mb-2">{results.baseGrowthRate}%</div>
                      <div className="text-sm text-neutral-400">
                        Projected monthly growth rate
                      </div>
                    </div>

                    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-sm font-medium text-neutral-400 tracking-wide">TIMELINE</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-400 mb-2">{results.targetMonths}</div>
                      <div className="text-sm text-neutral-400">
                        months to target
                      </div>
                    </div>
                  </div>

                  {/* Consistency Score */}
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BarChart className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-neutral-400">CONSISTENCY SCORE</span>
                      </div>
                      <Badge
                        className={`${
                          Number.parseFloat(results.consistencyScore) >= 80
                            ? "bg-green-500/20 text-green-400"
                            : Number.parseFloat(results.consistencyScore) >= 60
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {results.consistencyScore}%
                      </Badge>
                    </div>
                    <div className="w-full bg-neutral-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${results.consistencyScore}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-neutral-400">
                      Recommended: {results.weeklyGoal} posts per week for optimal growth
                    </div>
                  </div>

                  {/* Growth Trend Chart */}
                  {growthTrendData.length > 0 && (
                    <div className="w-full">
                      <GrowthTrendChart data={growthTrendData} title="Growth Projection Timeline" />
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-neutral-400">GROWTH TIMELINE</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Current</span>
                        <span className="text-white">
                          {Number.parseFloat(formData.currentFollowers).toLocaleString()} followers
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">After {results.targetMonths} months</span>
                        <span className="text-orange-500 font-semibold">
                          {results.projectedFollowers.toLocaleString()} followers
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Monthly Growth Rate</span>
                        <span className="text-green-400">{results.baseGrowthRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-400">GROWTH RECOMMENDATIONS</span>
                    </div>
                    <ul className="text-sm text-neutral-300 space-y-1">
                      <li>• Maintain {results.weeklyGoal} posts per week for consistency</li>
                      <li>• Focus on engagement-driven content to boost your {formData.engagementRate}% rate</li>
                      <li>• Track progress monthly to stay on target</li>
                      {Number.parseFloat(results.consistencyScore) < 80 && (
                        <li className="text-yellow-400">• Increase posting frequency to improve consistency score</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
