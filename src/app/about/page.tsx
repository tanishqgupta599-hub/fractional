"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { ShieldCheck, TrendingUp, Lock, Users, ArrowDown, CheckCircle2, Quote, Building2, MousePointer2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// --- Components ---

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  // Mouse move effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY, pageX, pageY }: React.MouseEvent) {
    // Optimization: Avoid getBoundingClientRect() which forces reflow
    // Since this section is at the top (0,0), pageX/Y are effectively relative to the container
    mouseX.set(pageX);
    mouseY.set(pageY);
  }

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.1]" />
        
        {/* Mouse Follower */}
        <motion.div 
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 will-change-transform"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(212, 175, 55, 0.1),
                transparent 80%
              )
            `,
          }}
        />
        
        <motion.div 
          style={{ y: heroY }}
          className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] opacity-30 animate-pulse will-change-transform" 
        />
        <motion.div 
          style={{ y: heroY }}
          className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] opacity-20 will-change-transform" 
        />
      </div>

      <motion.div 
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full border border-white/10 bg-white/5 text-xs tracking-[0.3em] text-white/70 uppercase mb-8 backdrop-blur-md shadow-2xl">
            The Vision
          </span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter mb-8 leading-[0.9]">
            Own Smart. <br />
            <span className="text-gradient-gold italic pr-4">Grow Strong.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Building the infrastructure for long-term wealth preservation through institutional-grade real estate assets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-sm"
        >
          <span className="tracking-widest uppercase text-[10px] opacity-60">Scroll to Explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProblemSolutionSection() {
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
              Democratizing the <br />
              <span className="text-white/60">Ultra-High Net Worth</span> Playbook.
            </h2>
            <div className="space-y-6 text-lg text-white/80 font-light leading-relaxed">
              <p>
                Historically, prime land and commercial real estate have been the privilege of the ultra-wealthy. High ticket sizes, complex legalities, and illiquidity created insurmountable barriers.
              </p>
              <p>
                We believe access to high-quality assets should be democratized—not lowered in quality. By structuring ownership into secure, legal fractions, we enable diversification without compromising on the asset's caliber.
              </p>
            </div>
          </motion.div>

          <div className="relative perspective-1000">
            {/* Abstract Visual Representation */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-3xl blur-3xl opacity-30" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {[
                { icon: Users, title: "Accessibility", value: "₹5k Entry", sub: "Vs ₹1Cr+ Traditional" },
                { icon: ShieldCheck, title: "Governance", value: "SPV Structure", sub: "Bank-Grade Legal" },
                { icon: TrendingUp, title: "Growth", value: "15-18% IRR", sub: "Historical Target" },
                { icon: Lock, title: "Security", value: "100% Asset Backed", sub: "Tangible Ownership" },
              ].map((stat, i) => (
                <TiltCard key={i} index={i} stat={stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltCard({ index, stat }: { index: number, stat: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragElastic={0.16}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileTap={{ cursor: "grabbing" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="glass-card p-6 border border-white/5 hover:border-primary/30 group cursor-grab relative overflow-hidden will-change-transform"
    >
       <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors relative z-10">
        <stat.icon className="w-5 h-5 text-white/90 group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-white/60 text-sm uppercase tracking-wider mb-1 relative z-10">{stat.title}</h3>
      <div className="text-2xl font-bold text-white mb-1 relative z-10">{stat.value}</div>
      <div className="text-xs text-white/50 relative z-10">{stat.sub}</div>
    </motion.div>
  );
}

function TimelineSection() {
  return (
    <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Strategic Value Creation</h2>
          <p className="text-xl text-white/80 font-light">
            We don't chase trends. We identify regions where infrastructure, policy, and demographics converge to create inevitable value over decades.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent md:-translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-24">
            {[
              { 
                year: "Phase 1", 
                title: "Acquisition & Legal", 
                desc: "Rigorous due diligence. Only top 1% of assets make the cut. We check everything from title history to soil quality.",
                align: "left"
              },
              { 
                year: "Phase 2", 
                title: "Infrastructure Growth", 
                desc: "Government projects (Airports, Highways) drive land utility value. We position ourselves before the boom.",
                align: "right"
              },
              { 
                year: "Phase 3", 
                title: "Value Realization", 
                desc: "Exit via developer buyout, resale, or commercial leasing. The patient capital reaps the compound rewards.",
                align: "left"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: item.align === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${item.align === "right" ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`md:w-1/2 ${item.align === "right" ? "md:pl-12 text-left" : "md:pr-12 md:text-right"} pl-12 md:pl-0`}>
                  <div className="text-primary text-sm font-bold tracking-widest uppercase mb-2">{item.year}</div>
                  <h3 className="text-3xl text-white font-serif mb-4">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed max-w-md ml-auto mr-auto md:mx-0">{item.desc}</p>
                </div>
                
                <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-[#050505] bg-primary shadow-[0_0_20px_rgba(212,175,55,0.5)] z-10" />
                
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GrowthChartSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4">The Compounding Advantage</h2>
          <p className="text-white/80 font-light max-w-2xl mx-auto">
            Real estate in emerging growth corridors has historically outperformed traditional fixed-income instruments, hedging against inflation while building generational wealth.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto h-[400px] bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12">
          {/* Chart Area */}
          <div className="absolute inset-0 p-12 flex items-end justify-between">
            {/* Y-Axis Grid */}
            <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-px bg-white/5" />
              ))}
            </div>

            {/* SVG Chart Lines */}
            <svg className="absolute inset-0 w-full h-full p-12 overflow-visible" preserveAspectRatio="none">
              {/* Inflation */}
              <motion.path
                d="M0,300 C100,290 400,250 800,200"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
               {/* Land */}
              <motion.path
                d="M0,300 C200,280 400,150 800,0"
                fill="none"
                stroke="url(#gradient-gold)"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Labels */}
            <div className="absolute bottom-20 right-10 text-primary font-bold text-lg">Strategic Land</div>
            <div className="absolute bottom-32 right-10 text-white/40 text-sm">Inflation</div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-xs text-white/40 font-mono">
          *Illustrative projection based on historical market trends in target corridors. Not a guarantee of future performance.
        </div>
      </div>
    </section>
  );
}

function ManifestoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const words = [
    "We believe in", "patience over speed.",
    "We believe in", "tangible assets.",
    "We believe that", "wealth is built",
    "through discipline,", "not speculation."
  ];

  return (
    <section ref={containerRef} className="py-40 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {words.map((word, i) => {
            // Logic to fade in words one by one based on scroll
            const start = i / words.length;
            const end = start + (1 / words.length);
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            
            return (
              <motion.span
                key={i}
                style={{ opacity, willChange: "opacity" }}
                className="inline-block mr-4 mb-2 text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight transition-colors duration-200"
              >
                {word}
              </motion.span>
            )
          })}
        </div>
        
        <div className="mt-24 grid md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
           {[
              { title: "Transparency", desc: "Every document, every risk, disclosed upfront." },
              { title: "Control", desc: "You own the asset, not just a paper promise." },
              { title: "Legacy", desc: "Investments built to outlast a generation." }
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 + (i * 0.2) }}
             >
                <h4 className="text-primary font-bold uppercase tracking-widest mb-3">{item.title}</h4>
                <p className="text-white/70 font-light">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

function Word({ word, i, total, scrollYProgress }: { word: string, i: number, total: number, scrollYProgress: any }) {
  const start = i / total;
  const end = start + (1 / total);
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

  return (
    <motion.span
      style={{ opacity, willChange: "opacity" }}
      className="inline-block mr-4 mb-2 text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight transition-colors duration-200"
    >
      {word}
    </motion.span>
  );
}

function FoundersNote() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/[0.02] border border-white/5 p-12 rounded-3xl backdrop-blur-sm"
        >
          <Quote className="w-16 h-16 text-primary/20 mx-auto mb-8 rotate-180" />
          
          <p className="text-3xl md:text-5xl text-white/90 font-serif italic leading-tight mb-12">
            "We are not here to sell you a dream. We are here to partner with you in owning a piece of the future."
          </p>
          
          <div className="flex flex-col items-center">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-6" />
            <h4 className="text-white text-lg font-bold tracking-widest uppercase">The Founders</h4>
            <p className="text-primary/80 text-sm mt-2">Building for the next decade.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-primary/30">
      <HeroSection />
      <ProblemSolutionSection />
      <TimelineSection />
      <GrowthChartSection />
      <ManifestoScroll />
      <FoundersNote />
    </div>
  );
}
