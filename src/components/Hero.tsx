"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";
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
                <span className="font-semibold tracking-wide">New Opportunity: Dholera SIR Phase 1 Live</span>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-8 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl leading-tight"
            >
              Own Premium <br />
              Real Assets. <br />
              <span className="text-gradient-gold drop-shadow-2xl italic relative">
                Fraction by Fraction.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 53.0003 5.99998 83.0003 3.99998C113 1.99998 198 1.49999 198 1.49999" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mb-12 text-lg text-gray-300 md:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
            >
              The smartest way to invest in high-growth land and commercial real estate. 
              Start with <span className="text-white font-bold border-b border-primary">₹5,000</span>. 
              Bank-grade security. 100% transparent.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
            >
              <Link href="/properties">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  Start Investing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px] text-lg">
                  How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex justify-center items-center gap-6 text-sm text-gray-400 mb-12"
            >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-white font-bold">Accepting Early Investors</span>
                </div>
            </motion.div>
          </div>
      </div>
    </section>
  );
}
