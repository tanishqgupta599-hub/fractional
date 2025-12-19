"use client";

import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

export default function Home() {
  const featuredProperty = {
    id: "dholera-sir-phase-1",
    name: "Dholera SIR - Phase 1",
    location: "TP 2 West, Dholera Special Investment Region, Gujarat",
    type: "Commercial Land",
    pricePerFraction: "₹5,000",
    totalValuation: "₹40 Lacs",
    expectedCagr: "100%",
    risk: "Medium" as const,
    status: "Open" as const,
    image: "",
  };

  return (
    <div className="flex flex-col gap-0 pb-20">
      <Hero />

      {/* Featured Opportunity */}
      <section className="container mx-auto px-4 md:px-6 py-20 relative">
        <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-primary/5 -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-2">Featured Opportunity</h2>
            <p className="text-gray-400 text-lg">Hand-picked premium asset with high growth potential.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/properties">
              <Button variant="ghost" className="text-primary hover:text-primary/80 text-lg">
                View All Properties <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 relative rounded-3xl overflow-hidden border border-white/10 bg-black min-h-[500px] flex items-center justify-center group shadow-2xl"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-[2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="relative z-10 text-center p-12 max-w-2xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">Why Dholera?</h3>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-light">
                  India's First <span className="text-green-400 font-semibold">Platinum Rated Green Field Smart City</span>. 
                  Home to Tata's Semiconductor Fab & International Airport.
                </p>
                <Link href="/properties/dholera-sir-phase-1">
                  <Button size="lg" className="rounded-full text-lg px-10 py-8 shadow-[0_0_40px_rgba(212,175,55,0.4)] animate-pulse hover:animate-none">
                    Deep Dive into Dholera
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 h-full"
          >
            <div className="h-full">
              <PropertyCard property={featuredProperty} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Real Estate, <span className="text-gradient-gold">Reinvented.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We stripped away the complexity, paperwork, and high capital requirements. 
              What's left is pure, transparent ownership.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Accessible",
                desc: "Start with as little as ₹5,000. Build a diversified portfolio of land and commercial assets.",
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: "Transparent",
                desc: "Every inch of land is legally vetted. Ownership is structured via SPVs for maximum safety.",
                color: "from-primary to-yellow-500"
              },
              {
                title: "Liquid",
                desc: "Exit options via resale platform, periodic buybacks, or upon asset maturity.",
                color: "from-green-500 to-emerald-400"
              }
            ].map((item, i) => (
              <Card key={i} hover className="p-8 h-full bg-black/40 border-white/5">
                <div className={`w-16 h-1.5 rounded-full bg-gradient-to-r ${item.color} mb-8`} />
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] overflow-hidden border border-primary/20 p-16 text-center group"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-blue-900/10 group-hover:scale-105 transition-transform duration-[3s]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to start your journey?</h2>
            <p className="text-xl text-gray-300 mb-10 font-light">
              Join <span className="text-white font-bold">10,000+ investors</span> building wealth through fractional real estate ownership.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="text-lg px-12 py-8 shadow-[0_0_30px_rgba(212,175,55,0.25)]">Create Free Account</Button>
              <Button variant="outline" size="lg" className="text-lg px-12 py-8">Talk to an Expert</Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
