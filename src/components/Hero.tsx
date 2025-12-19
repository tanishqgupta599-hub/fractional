"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { ArrowRight, ShieldCheck, TrendingUp, Users, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={targetRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20" />
        <motion.div 
          style={{ y, opacity }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse" 
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]), opacity }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse shadow-[0_0_10px_#D4AF37]"></span>
              <span className="font-semibold tracking-wide">New Opportunity: Dholera SIR Phase 1 Live Now</span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-8 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl leading-tight"
          >
            Own Premium <br className="hidden md:block" />
            Real Assets. <br />
            <span className="text-gradient-gold drop-shadow-2xl">
              Fraction by Fraction.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mb-12 text-lg text-gray-300 md:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
          >
            Invest in high-growth land and commercial properties starting from just <span className="text-white font-semibold">₹5,000</span>. 
            Secure legal structure, transparent ownership, and zero hassle.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Link href="/properties">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Explore Properties <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px] text-lg">
                How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12"
          >
            {[
              { icon: ShieldCheck, title: "Bank-Grade Legal", desc: "Ownership via SPV & Trust structures" },
              { icon: TrendingUp, title: "High Growth Potential", desc: "Strategic locations like Dholera SIR" },
              { icon: Users, title: "Managed Ownership", desc: "We handle maintenance & paperwork" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="mb-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-white text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
