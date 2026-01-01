"use client";

import { motion } from "framer-motion";
import { 
  Scale, 
  ShieldAlert, 
  TrendingUp, 
  DoorOpen, 
  Landmark, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Info,
  PieChart,
  CalendarClock,
  FileText
} from "lucide-react";
import { useState } from "react";

// --- Components ---

function SectionHeading({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 tracking-tight">{children}</h2>
      {subtitle && <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Dynamic Background Graphics */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_70%)]" />
        
        {/* Abstract Geometric Grid */}
        <div className="absolute -top-[50%] -right-[20%] w-[100%] h-[100%] opacity-[0.03] rotate-12 animate-[pulse_8s_ease-in-out_infinite]">
           <svg viewBox="0 0 100 100" className="w-full h-full">
              <pattern id="hex" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,0 L20,5 L20,15 L10,20 L0,15 L0,5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white"/>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#hex)" />
           </svg>
        </div>

        {/* Floating Orb */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" 
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-primary/80 tracking-widest uppercase mb-6 backdrop-blur-md">
            <Info className="w-3 h-3" />
            <span>Investor Education</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
            Learn Before <br />
            <span className="text-white/40">You Invest.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-xl text-balance">
            We believe in transparency by design. Understand the mechanics, the risks, and the timeline of fractional real estate ownership before you commit capital.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative hidden lg:block h-[500px] w-full"
        >
           {/* Abstract Representation of "Structure" */}
           <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
              <defs>
                 <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgba(212,175,55,0.2)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'rgba(212,175,55,0.05)', stopOpacity: 1 }} />
                 </linearGradient>
              </defs>
              
              {/* Central Core (The Asset) */}
              <circle cx="200" cy="200" r="80" fill="url(#grad1)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" strokeDasharray="4 4" />
              
              {/* Orbiting Nodes (The Investors) */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                 <motion.g key={i} animate={{ rotate: 360 }} style={{ originX: "200px", originY: "200px" }} transition={{ duration: 20 + i*2, repeat: Infinity, ease: "linear" }}>
                    <circle cx={200 + 140 * Math.cos(angle * Math.PI / 180)} cy={200 + 140 * Math.sin(angle * Math.PI / 180)} r="8" fill="#D4AF37" className="opacity-60" />
                    <line x1="200" y1="200" x2={200 + 140 * Math.cos(angle * Math.PI / 180)} y2={200 + 140 * Math.sin(angle * Math.PI / 180)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                 </motion.g>
              ))}
           </svg>
        </motion.div>
      </div>
    </section>
  );
}

function WhatIsFractional() {
  const steps = [
    {
      icon: PieChart,
      title: "Division of Asset",
      desc: "A high-value property (e.g., ₹10Cr) is divided into smaller, equal fractions (e.g., ₹5,000 each) via a Special Purpose Vehicle (SPV)."
    },
    {
      icon: FileText,
      title: "Legal Ownership",
      desc: "Investors do not just hold a 'paper promise'. You hold shares in the SPV (Private Limited Company) which owns the land title."
    },
    {
      icon: TrendingUp,
      title: "Proportional Returns",
      desc: "Any appreciation in land value or rental yield is distributed strictly according to your ownership percentage."
    }
  ];

  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
           <SectionHeading subtitle="A structural innovation, not a financial derivative.">
             What is Fractional Ownership?
           </SectionHeading>
           
           {/* Animated Donut Chart Visual */}
           <div className="hidden md:block w-32 h-32 relative mb-12">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="40" fill="none" stroke="#D4AF37" strokeWidth="8" 
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-white/50 text-xs">SPV</div>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors will-change-transform group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-white font-serif mb-3">{step.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RisksAndRewards() {
  return (
    <section className="py-20 border-t border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading subtitle="An honest look at the potential upside and the inherent realities of real estate.">
          Risks & Rewards
        </SectionHeading>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Rewards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 will-change-transform"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-2xl text-white font-serif">The Potential Upside</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                "High Appreciation: Land in growth corridors has historically outperformed inflation.",
                "Inflation Hedge: Real asset value tends to rise with purchasing power loss.",
                "Passive Ownership: We handle all maintenance, legal, and administrative work.",
                "Diversification: Spread capital across multiple locations/assets."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-white/70">
                  <CheckCircle2 className="w-5 h-5 text-green-500/50 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Risks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 will-change-transform"
          >
             <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-2xl text-white font-serif">The Risks</h3>
            </div>

            <ul className="space-y-4">
              {[
                "Illiquidity: Real estate is not a stock. Exits take time and are market-dependent.",
                "Market Fluctuations: Property values can stagnate or decrease in short cycles.",
                "Regulatory Changes: Government policies on land use can evolve.",
                "No Guaranteed Returns: Past performance is not an indicator of future results."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-white/70">
                  <XCircle className="w-5 h-5 text-orange-500/50 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <div className="mt-12 p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl flex gap-4 items-start">
          <Info className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
          <p className="text-sm text-orange-200/80 leading-relaxed">
            <strong>Important Note:</strong> This is not financial advice. All investments carry risks. We strongly recommend consulting with a financial advisor to ensure this asset class aligns with your liquidity needs and risk tolerance.
          </p>
        </div>
      </div>
    </section>
  );
}

function ExitScenarios() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading subtitle="Real estate is a long-term game. Liquidity is event-based.">
          Exit Scenarios
        </SectionHeading>

        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: "Resale via Marketplace",
                desc: "Sell your fractions to other investors on our secondary market after the lock-in period.",
                time: "Medium Term (1-3 Yrs)"
              },
              {
                title: "Asset Sale",
                desc: "The entire asset is sold to a developer or third party once target appreciation is met. Majority vote required.",
                time: "Long Term (3-5+ Yrs)"
              },
              {
                title: "Buyback",
                desc: "In specific scenarios, the platform or developer may offer a buyback at market valuation.",
                time: "Event Driven"
              }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden group hover:border-primary/30 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <DoorOpen className="w-24 h-24" />
                </div>
                
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] tracking-widest uppercase text-white/50 mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {item.time}
                  </span>
                  <h3 className="text-xl text-white font-serif mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TaxOverview() {
  return (
    <section className="py-20 border-t border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          <Landmark className="w-12 h-12 text-primary/50 mx-auto mb-6" />
          <h2 className="font-serif text-3xl text-white mb-6">Tax Implications</h2>
          <p className="text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto">
            Profits from fractional real estate are generally treated as <strong>Capital Gains</strong>. 
            <br className="hidden md:block" />
            Long-term capital gains (held {'>'} 24 months) may benefit from indexation, reducing your tax liability.
          </p>
          
          <div className="text-xs text-white/30 max-w-lg mx-auto border-t border-white/5 pt-6">
            *Tax laws are subject to change. We do not provide tax advice. Please consult a CA for your specific situation.
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="py-20 border-t border-white/5 pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading subtitle="Why modern investors are shifting to fractional.">
          The Comparison
        </SectionHeading>

        <div className="overflow-x-auto relative rounded-3xl border border-white/5 bg-white/[0.01] p-2">
           {/* Highlight Glow Background for Fractional Column */}
           <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-r-2xl border-l border-white/5 hidden md:block" />

          <table className="w-full text-left border-collapse relative z-10">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 pl-6 text-white/40 font-normal uppercase tracking-widest text-sm w-1/3">Feature</th>
                <th className="py-6 text-white font-serif text-xl w-1/3">Traditional Real Estate</th>
                <th className="py-6 pr-6 text-primary font-serif text-xl w-1/3">Fractional Ownership</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { feature: "Minimum Investment", trad: "₹50 Lakhs - ₹5 Cr+", frac: "₹5,000" },
                { feature: "Liquidity", trad: "Very Low (Months/Years)", frac: "Medium (Secondary Market)" },
                { feature: "Diversification", trad: "Difficult (Concentrated Risk)", frac: "Easy (Multiple Assets)" },
                { feature: "Management", trad: "Active (Headache)", frac: "Passive (Fully Managed)" },
                { feature: "Transparency", trad: "Opaque", frac: "Digital & Transparent" },
                { feature: "Professional Vetting", trad: "Do It Yourself", frac: "Institutional Grade Due Diligence" },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 pl-6 text-white/60 font-medium">{row.feature}</td>
                  <td className="py-6 text-white/40 group-hover:text-white/60 transition-colors">{row.trad}</td>
                  <td className="py-6 pr-6 text-primary/80 group-hover:text-primary transition-colors font-semibold">{row.frac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function LearnPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-primary/30">
      <HeroSection />
      <WhatIsFractional />
      <RisksAndRewards />
      <ExitScenarios />
      <TaxOverview />
      <ComparisonTable />
    </div>
  );
}
