"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  Plane, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Globe, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Wifi
} from "lucide-react";
import Link from "next/link";

export default function WhyDholeraPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

  return (
    <div ref={targetRef} className="relative bg-black min-h-screen text-white overflow-x-hidden">
      {/* 1. Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          {/* Background Gradient/Image Placeholder */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-grain opacity-20" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6 tracking-wider">
              INDIA'S FIRST GREENFIELD SMART CITY
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-600 tracking-tight">
              THE FUTURE IS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">DHOLERA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              A <span className="text-white font-bold">₹20,000 Crore</span> vision turning into reality. 
              The global manufacturing hub where Tata, Airbus, and India's semiconductor ambitions converge.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all">
                  Invest Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/20 hover:bg-white/10 backdrop-blur-md">
                Download Master Plan
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. The Semiconductor Revolution (Tata/Micron) */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-2 text-purple-400 mb-4">
                  <Cpu className="h-6 w-6 animate-pulse" />
                  <span className="font-bold tracking-widest">INDIA'S SILICON VALLEY</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Home to India's First <span className="text-purple-500">Semiconductor Fab</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Tata Electronics partnered with Powerchip Semiconductor Manufacturing Corp (PSMC) to set up India's first AI-enabled semiconductor fabrication plant.
                  <br /><br />
                  With a massive <span className="text-white font-bold">₹91,000 Crore</span> investment, Dholera is poised to become the chip manufacturing capital of the world, creating over 20,000 skilled jobs.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="text-3xl font-bold text-white mb-1">20k+</div>
                    <div className="text-sm text-gray-400">High-Tech Jobs</div>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="text-3xl font-bold text-white mb-1">$14B+</div>
                    <div className="text-sm text-gray-400">Total Valuation</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                 {/* Abstract Chip Graphic */}
                 <div className="relative w-full aspect-square bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-2 shadow-2xl shadow-purple-500/20">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 rounded-2xl mix-blend-screen" />
                    <div className="absolute inset-0 border border-white/5 rounded-2xl" />
                    
                    {/* Floating Elements */}
                    <motion.div 
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-10 -right-10 bg-black/80 backdrop-blur-xl p-4 rounded-xl border border-purple-500/30 shadow-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white">Ta</div>
                        <div>
                          <div className="text-sm font-bold text-white">Tata Electronics</div>
                          <div className="text-xs text-green-400">Confirmed</div>
                        </div>
                      </div>
                    </motion.div>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Connectivity (Airport/Expressway) */}
      <section className="py-32 bg-gradient-to-b from-black to-blue-950/20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">World-Class Connectivity</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Seamlessly connected by Air, Land, and Sea. Dholera is the central node of the Delhi-Mumbai Industrial Corridor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-black/40 border-white/10 hover:border-blue-500/50 transition-colors group">
              <div className="h-14 w-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plane className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">International Airport</h3>
              <p className="text-gray-400 leading-relaxed">
                Operational by 2025-26. A dedicated cargo and passenger hub capable of handling the world's largest aircraft (A380).
              </p>
            </Card>

            <Card className="p-8 bg-black/40 border-white/10 hover:border-orange-500/50 transition-colors group">
              <div className="h-14 w-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ahmedabad Expressway</h3>
              <p className="text-gray-400 leading-relaxed">
                4-lane access-controlled expressway reducing travel time from Ahmedabad to just <span className="text-white font-bold">45 minutes</span>.
              </p>
            </Card>

            <Card className="p-8 bg-black/40 border-white/10 hover:border-green-500/50 transition-colors group">
              <div className="h-14 w-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">DMIC Corridor</h3>
              <p className="text-gray-400 leading-relaxed">
                Strategically located on the Delhi-Mumbai Industrial Corridor, covering 15% of India's total area and 40% of industrial output.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Smart City Features */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/2">
               <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-white/10"
               >
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop')] bg-cover bg-center" />
                 <div className="absolute inset-0 bg-black/60" />
                 
                 {/* Holographic Overlay Effects */}
                 <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-500/30 rounded-full animate-ping opacity-20" />
                 <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-cyan-500/20 rounded-full animate-pulse opacity-30" />
               </motion.div>
             </div>
             <div className="md:w-1/2 space-y-8">
               <h2 className="text-4xl font-bold">Plug-and-Play <br /><span className="text-cyan-400">Smart Infrastructure</span></h2>
               <div className="space-y-6">
                 {[
                   { icon: Wifi, title: "ICT Enabled", desc: "City-wide WiFi, sensors, and integrated command center." },
                   { icon: Zap, title: "24/7 Power", desc: "Dedicated renewable energy zones and reliable power grid." },
                   { icon: Building2, title: "Ready Utilities", desc: "Water, gas, and waste management lines pre-installed underground." }
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                   >
                     <div className="shrink-0 mt-1">
                       <item.icon className="h-6 w-6 text-cyan-400" />
                     </div>
                     <div>
                       <h3 className="font-bold text-white text-lg">{item.title}</h3>
                       <p className="text-gray-400">{item.desc}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-gradient-to-t from-blue-900/40 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            DON'T MISS THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">NEXT GURGAON</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Land prices have already appreciated 3x in the last 3 years. The best time to invest was yesterday. The second best time is now.
          </p>
          <Link href="/properties">
            <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-[#D4AF37] text-black hover:bg-[#F7E7CE] hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all">
              View Available Properties
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
