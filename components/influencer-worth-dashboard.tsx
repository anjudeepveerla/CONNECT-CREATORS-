"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Zap, DollarSign } from "lucide-react"

// Helper for animating numbers
const AnimatedNumber = ({ value, duration = 1000, prefix = "", suffix = "" }) => {
  const [currentValue, setCurrentValue] = useState(0)
  const ref = useRef(0)

  useEffect(() => {
    let start: number | null = null
    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = (timestamp - start) / duration
      const easedProgress = Math.min(1, progress) // Simple ease-out
      const nextValue = easedProgress * value

      if (ref.current !== nextValue) {
        setCurrentValue(nextValue)
        ref.current = nextValue
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCurrentValue(value)
      }
    }

    requestAnimationFrame(animate)
    return () => {
      start = null // Cleanup on unmount
    }
  }, [value, duration])

  return (
    <span className="font-mono">
      {prefix}
      {typeof value === "number" && value % 1 !== 0
        ? currentValue.toFixed(1)
        : Math.floor(currentValue).toLocaleString()}
      {suffix}
    </span>
  )
}

// Line Chart Component
const LineChart = ({ data, currencySymbol }) => {
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
    .reverse() // To display from max to min

  return (
    <div className="relative bg-neutral-900 border border-neutral-700 rounded-xl p-4 lg:p-6 overflow-hidden w-full">
      <h3 className="text-lg font-bold text-white tracking-wider mb-4">Influencer Value vs Industry Average</h3>
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
              {currencySymbol}
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
          <span className="text-neutral-300">Your Recommended Charge</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 border-t-2 border-dashed border-neutral-300"></span>
          <span className="text-neutral-300">Industry Average</span>
        </div>
      </div>
    </div>
  )
}

// Radar Chart Component
const RadarChart = ({ data }) => {
  const containerRef = useRef(null)
  const [svgSize, setSvgSize] = useState(300) // Default size, will be updated

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        // Use the smaller dimension to ensure it fits within a square
        setSvgSize(Math.min(width, height, 400)) // Cap at 400px for better mobile experience
      }
    }

    updateSize() // Set initial size
    window.addEventListener("resize", updateSize) // Update on resize

    // Cleanup
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const centerX = svgSize / 2
  const centerY = svgSize / 2
  const radius = svgSize / 2 - 60 // Increased padding for labels on mobile
  const numAxes = 5
  const angleSlice = (2 * Math.PI) / numAxes

  const axes = [
    { name: "Reach", value: data.reach },
    { name: "Engagement", value: data.engagement },
    { name: "Consistency", value: data.consistency },
    { name: "Growth", value: data.growth },
    { name: "Niche Value", value: data.nicheValue },
  ]

  // Normalize values to 0-100 scale for drawing
  const normalizedAxes = axes.map((axis) => ({
    ...axis,
    value: Math.min(100, Math.max(0, axis.value)), // Clamp between 0 and 100
  }))

  const getPointCoordinate = (value, index, currentRadius) => {
    const angle = angleSlice * index - Math.PI / 2 // Start from top
    return {
      x: centerX + currentRadius * Math.cos(angle) * (value / 100),
      y: centerY + currentRadius * Math.sin(angle) * (value / 100),
    }
  }

  const dataPoints = normalizedAxes.map((axis, i) => getPointCoordinate(axis.value, i, radius))
  const dataPath = dataPoints.map((point, i) => `${i === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ") + "Z"

  const [pathLength, setPathLength] = useState(0)
  const pathRef = useRef(null)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [data, svgSize]) // Recalculate path length if data or size changes

  return (
    <div
      ref={containerRef}
      className="relative bg-neutral-900 border border-neutral-700 rounded-xl p-4 lg:p-6 overflow-hidden flex items-center justify-center w-full min-h-[300px]"
    >
      <h3 className="absolute top-4 left-4 lg:top-6 lg:left-6 text-lg font-bold text-white tracking-wider z-10">
        Influencer Strength Profile
      </h3>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="block max-w-full max-h-full"
      >
        {/* Glow filter */}
        <defs>
          <filter id="glowOrangeRadar">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric Rings (3 rings) */}
        {[1 / 3, 2 / 3, 1].map((factor, i) => (
          <circle
            key={`ring-${i}`}
            cx={centerX}
            cy={centerY}
            r={radius * factor}
            fill="none"
            stroke="#3b3b3b"
            strokeWidth="1"
          />
        ))}

        {/* Radial Lines (Crosshair) */}
        {Array.from({ length: numAxes }).map((_, i) => {
          const { x, y } = getPointCoordinate(100, i, radius)
          return (
            <line key={`axis-line-${i}`} x1={centerX} y1={centerY} x2={x} y2={y} stroke="#3b3b3b" strokeWidth="1" />
          )
        })}

        {/* Data Path (Orange dot trail animation) */}
        <path
          ref={pathRef}
          d={dataPath}
          fill="none"
          stroke="#f97316"
          strokeWidth="3"
          filter="url(#glowOrangeRadar)"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength}
          className="radar-path-animate"
        />

        {/* Axis Labels */}
        {normalizedAxes.map((axis, i) => {
          // Increased multiplier for text position to prevent cutoff
          const { x, y } = getPointCoordinate(120, i, radius) // Adjusted for better mobile positioning
          return (
            <text
              key={`axis-label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              className="text-xs fill-neutral-400 font-mono"
            >
              {axis.name}
            </text>
          )
        })}
      </svg>
      <style jsx>{`
        .radar-path-animate {
          animation: dash-radar 2s ease-out forwards;
        }
        @keyframes dash-radar {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}

export function InfluencerWorthDashboard({ results }) {
  const [animatedEstimatedCharge, setAnimatedEstimatedCharge] = useState(0)
  const [animatedEngagementScore, setAnimatedEngagementScore] = useState(0)

  useEffect(() => {
    if (results) {
      // Animate Estimated Charge
      let startCharge: number | null = null
      const animateCharge = (timestamp: number) => {
        if (!startCharge) startCharge = timestamp
        const progress = (timestamp - startCharge) / 1500 // 1.5 seconds
        const easedProgress = Math.min(1, progress)
        setAnimatedEstimatedCharge(easedProgress * results.suggestedPrice)
        if (progress < 1) requestAnimationFrame(animateCharge)
      }
      requestAnimationFrame(animateCharge)

      // Animate Engagement Score
      let startEngagement: number | null = null
      const animateEngagement = (timestamp: number) => {
        if (!startEngagement) startEngagement = timestamp
        const progress = (timestamp - startEngagement) / 1000 // 1 second
        const easedProgress = Math.min(1, progress)
        setAnimatedEngagementScore(easedProgress * results.engagementScore)
        if (progress < 1) requestAnimationFrame(animateEngagement)
      }
      requestAnimationFrame(animateEngagement)
    }
  }, [results])

  if (!results) {
    return null // Don't render if no results
  }

  const getCurrencySymbol = () => {
    switch (results.country?.toLowerCase()) {
      case "usa":
      case "canada":
      case "australia":
        return "$"
      case "uk":
        return "£"
      case "india":
      default:
        return "₹"
    }
  }

  return (
    <div className="space-y-6 w-full">
      {/* Result Stats on Top */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <Card className="bg-neutral-900 border-neutral-700 w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral-400 tracking-wider">ESTIMATED CHARGE</p>
                <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-orange-500 font-mono">
                  <AnimatedNumber value={results.suggestedPrice} prefix={getCurrencySymbol()} />
                </p>
              </div>
              <DollarSign className="w-8 h-8 lg:w-10 lg:h-10 text-orange-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-700 w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral-400 tracking-wider">ENGAGEMENT SCORE</p>
                <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-white font-mono">
                  <AnimatedNumber value={results.engagementScore} suffix="/10" />
                </p>
              </div>
              <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-white flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-700 w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral-400 tracking-wider">GROWTH POTENTIAL</p>
                <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-white font-mono">
                  {results.growthPotential}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-white flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {/* Line Chart */}
        <LineChart data={results.lineChartData} currencySymbol={getCurrencySymbol()} />
        {/* Radar Chart */}
        <RadarChart data={results.radarChartData} />
      </div>
    </div>
  )
}
