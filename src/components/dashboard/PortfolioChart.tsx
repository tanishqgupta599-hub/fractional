"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const data = [
  { label: "Jan", value: 450000 },
  { label: "Feb", value: 1200000 },
  { label: "Mar", value: 2100000 },
  { label: "Apr", value: 1800000 },
  { label: "May", value: 3200000 },
  { label: "Jun", value: 4500000 },
];

export function PortfolioChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate scaling
  const maxValue = Math.max(...data.map((d) => d.value));
  const height = 200;
  const width = 100; // percentages
  
  // Create path for the line
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / maxValue) * 80 - 10; // Leave some padding
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L 100,100 L 0,100 Z`;

  return (
    <div className="w-full h-[300px] bg-black/20 rounded-2xl p-6 border border-white/5 backdrop-blur-sm relative">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h3 className="text-lg font-bold text-white">Portfolio Growth</h3>
            <p className="text-sm text-gray-400">Past 6 months performance</p>
        </div>
        <div className="text-right">
            <div className="text-2xl font-bold text-green-400">+98%</div>
            <div className="text-xs text-gray-500">vs last period</div>
        </div>
      </div>

      <div className="relative h-[200px] w-full">
        {/* Chart SVG */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <motion.path
            d={areaD}
            fill="url(#chartGradient)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Line Stroke */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Interactive Points */}
        <div className="absolute inset-0 flex justify-between items-end pb-0">
            {data.map((d, i) => {
                const yPos = 100 - (d.value / maxValue) * 80 - 10;
                return (
                    <div 
                        key={i} 
                        className="relative flex flex-col items-center group h-full justify-end"
                        style={{ width: '10%' }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Dot on line (absolute positioned based on value) */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5 + i * 0.1 }}
                            className="absolute w-3 h-3 bg-[#D4AF37] rounded-full border-2 border-black z-10"
                            style={{ 
                                top: `${yPos}%`, 
                                left: '50%', 
                                x: '-50%',
                                y: '-50%' 
                            }}
                        >
                            {/* Tooltip */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap pointer-events-none">
                                <div className="font-bold text-white">₹ {(d.value/100000).toFixed(1)}L</div>
                                <div className="text-gray-400">{d.label}</div>
                            </div>
                        </motion.div>
                        
                        {/* X Axis Label */}
                        <div className="mt-4 text-xs text-gray-500 font-medium">{d.label}</div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}
