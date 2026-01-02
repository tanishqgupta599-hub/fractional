"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface DataPoint {
  year: string;
  value: number; // multiplier, e.g., 1.2
  percentage: number; // e.g., 20
}

const data: DataPoint[] = [
  { year: "Y0", value: 1.0, percentage: 0 },
  { year: "Y1", value: 1.2, percentage: 20 },
  { year: "Y2", value: 1.45, percentage: 45 },
  { year: "Y3", value: 1.7, percentage: 70 },
  { year: "Y4", value: 1.95, percentage: 95 },
  { year: "Y5", value: 2.2, percentage: 120 },
];

export default function GrowthChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Dimensions
  const width = 600;
  const height = 300;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  // Scales
  const maxY = 2.4;
  const minY = 1.0;
  
  const getX = (index: number) => padding + (index / (data.length - 1)) * graphWidth;
  const getY = (value: number) => height - padding - ((value - minY) / (maxY - minY)) * graphHeight;

  // Generate Path
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  
  // Smooth curve using cubic bezier (simplified catmull-rom-like)
  const pathData = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point}`;
    
    const [x, y] = point.split(',').map(Number);
    const [prevX, prevY] = a[i - 1].split(',').map(Number);
    
    // Control points for smooth curve
    const cp1x = prevX + (x - prevX) * 0.5;
    const cp1y = prevY;
    const cp2x = x - (x - prevX) * 0.5;
    const cp2y = y;

    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
  }, "");

  const areaPath = `${pathData} L ${getX(data.length - 1)},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <div className="w-full h-full min-h-[300px] select-none">
      <div className="relative w-full h-full" style={{ aspectRatio: '2/1' }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const y = height - padding - tick * graphHeight;
            return (
              <g key={tick}>
                <line 
                  x1={padding} 
                  y1={y} 
                  x2={width - padding} 
                  y2={y} 
                  stroke="white" 
                  strokeOpacity="0.1" 
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Area Fill */}
          <motion.path
            d={areaPath}
            fill="url(#growthGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Line Path */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Points and Tooltips */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = getY(d.value);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Interaction Area */}
                <circle cx={x} cy={y} r="20" fill="transparent" />
                
                {/* Visible Dot */}
                <motion.circle 
                  cx={x} 
                  cy={y} 
                  r={isHovered ? 6 : 4} 
                  fill="#fff" 
                  stroke="#22c55e" 
                  strokeWidth="2"
                  animate={{ scale: isHovered ? 1.5 : 1 }}
                />

                {/* X Axis Label */}
                <text 
                  x={x} 
                  y={height - 10} 
                  textAnchor="middle" 
                  fill="#9ca3af" 
                  fontSize="12"
                >
                  {d.year}
                </text>

                {/* Tooltip */}
                <motion.g 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered || i === data.length - 1 ? 1 : 0, y: isHovered || i === data.length - 1 ? 0 : 10 }}
                >
                  <rect 
                    x={x - 30} 
                    y={y - 45} 
                    width="60" 
                    height="30" 
                    rx="6" 
                    fill="#22c55e" 
                  />
                  <text 
                    x={x} 
                    y={y - 26} 
                    textAnchor="middle" 
                    fill="#000" 
                    fontSize="12" 
                    fontWeight="bold"
                  >
                    +{d.percentage}%
                  </text>
                  {/* Small triangle arrow */}
                  <path d={`M ${x-5} ${y-15} L ${x+5} ${y-15} L ${x} ${y-10} Z`} fill="#22c55e" />
                </motion.g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}