"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  ShieldCheck, 
  Scale, 
  FileSearch, 
  AlertTriangle, 
  Landmark, 
  Users, 
  Gavel,
  Eye,
  ScrollText,
  Briefcase,
  Lock,
  CheckCircle2,
  Search
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// --- Utility Components ---

function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <motion.div 
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_800px_at_50%_-30%,#D4AF3715,transparent)]" 
      />
    </div>
  );
}

function SectionHeading({ children, subtitle, align = "left" }: { children: React.ReactNode, subtitle?: string, align?: "left" | "center" }) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-4xl md:text-6xl text-white mb-6 tracking-tight"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// --- Hero Section with "Vault" Animation ---

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="relative pt-32 pb-32 md:pt-48 md:pb-48 overflow-hidden min-h-[90vh] flex items-center bg-[#050505]">
      <AnimatedGridBackground />
      
      {/* Dynamic Background Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3], 
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2], 
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 mix-blend-screen" 
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: y1 }} className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#D4AF37] tracking-widest uppercase mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Institutional Grade Security</span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-[0.9] tracking-tight">
              Radical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white/80 to-[#D4AF37]/50">Trust.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-xl">
              Trust is not given—it is engineered. Through immutable transparency, robust governance, and an unwavering commitment to investor protection.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
               {["Fully Regulated", "Bank-Grade Security", "Audited Partners"].map((tag, i) => (
                 <motion.div 
                   key={tag}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 + i * 0.1 }}
                   className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-sm text-white/60"
                 >
                   <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                   {tag}
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Vault Animation */}
        <motion.div 
          style={{ y: y2, rotate }} 
          className="order-1 lg:order-2 flex justify-center items-center relative"
        >
          <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
             {/* Concentric Rings */}
             {[100, 80, 60, 40].map((size, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-white/10 rounded-full"
                  style={{ 
                    margin: `${i * 10}%`,
                    borderStyle: i % 2 === 0 ? "solid" : "dashed"
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
                />
             ))}
             
             {/* Central Lock Core */}
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                   animate={{ 
                      boxShadow: ["0 0 20px rgba(212,175,55,0.2)", "0 0 60px rgba(212,175,55,0.4)", "0 0 20px rgba(212,175,55,0.2)"] 
                   }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a701e] flex items-center justify-center relative z-10"
                >
                   <Lock className="w-12 h-12 text-black" />
                </motion.div>
             </div>

             {/* Floating Particles */}
             {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`p-${i}`}
                  className="absolute w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center z-20"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: Math.cos(i * 60 * (Math.PI / 180)) * 200,
                    y: Math.sin(i * 60 * (Math.PI / 180)) * 200,
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                   <ShieldCheck className="w-5 h-5 text-white/40" />
                </motion.div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Transparency Section with "X-Ray" Effect ---

function TransparencySection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading subtitle="Honesty is our only policy. We disclose risks as clearly as opportunities.">
          Transparency by Design
        </SectionHeading>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Capital Realities - The "Hard Truths" */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent overflow-hidden"
          >
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    650px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.1),
                    transparent 80%
                  )
                `,
              }}
            />
            <div className="relative h-full p-8 rounded-[22px] bg-[#0A0A0A] border border-white/5 overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                  <Eye className="w-32 h-32" />
               </div>

               <h3 className="text-2xl text-white font-serif mb-6 flex items-center gap-3">
                 <AlertTriangle className="w-6 h-6 text-orange-500" />
                 Capital Realities
               </h3>
               
               <ul className="space-y-6 relative z-10">
                {[
                  { title: "No Guaranteed Returns", desc: "All projected yields are estimates based on historical data." },
                  { title: "Market Risk", desc: "Real estate values can fluctuate based on economic conditions." },
                  { title: "Long-term Commitment", desc: "These are not trading assets. Built for patient wealth preservation." }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5 shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    <div>
                      <strong className="block text-white text-lg mb-1">{item.title}</strong>
                      <span className="text-white/50 text-sm leading-relaxed">{item.desc}</span>
                    </div>
                  </motion.li>
                ))}
               </ul>
            </div>
          </motion.div>

          {/* Card 2: Documentation - The "Open Book" */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 p-8 flex flex-col justify-center items-center text-center group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(212,175,55,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
               <motion.div 
                 animate={{ rotateY: [0, 180, 360] }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 mx-auto border border-white/10"
               >
                 <FileSearch className="w-10 h-10 text-[#D4AF37]" />
               </motion.div>
               
               <h4 className="text-3xl font-serif text-white mb-4">Full Documentation Access</h4>
               <p className="text-white/50 leading-relaxed max-w-sm mx-auto mb-8">
                 Every asset comes with a comprehensive data room. Nothing is hidden behind a paywall.
               </p>

               <div className="flex flex-wrap justify-center gap-3">
                 {["Title Reports", "Valuation Certs", "SPV Docs", "Legal Opinions"].map((doc, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-white/5 text-xs text-white/40 border border-white/5">
                      {doc}
                    </span>
                 ))}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Fee Structure Section with Animated Table ---

function FeeStructureSection() {
  return (
    <section className="py-32 bg-[#080808] relative">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading subtitle="We align our success with yours. No hidden charges." align="center">
          Clear Fees. No Hidden Charges.
        </SectionHeading>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
             {[
               { 
                 type: "Platform Fee", 
                 desc: "One-time fee on investment to cover technology, KYC, and initial structuring costs.",
                 icon: Landmark
               },
               { 
                 type: "Asset Management", 
                 desc: "Annual fee for property maintenance, security, and legal compliance.",
                 icon: Briefcase
               },
               { 
                 type: "Performance Fee", 
                 desc: "We only make money when you do. Applies only on profits above a hurdle rate.",
                 icon: TrendingUpIcon,
                 highlight: true
               },
               { 
                 type: "Exit Facilitation", 
                 desc: "Standard brokerage fee applicable only when a successful resale occurs.",
                 icon: ScrollText
               }
             ].map((fee, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className={`p-8 rounded-2xl border ${fee.highlight ? 'border-[#D4AF37]/30 bg-[#D4AF37]/5' : 'border-white/5 bg-white/[0.02]'} hover:bg-white/[0.05] transition-all group`}
               >
                 <div className="flex items-start justify-between mb-4">
                   <h3 className={`text-xl font-medium ${fee.highlight ? 'text-[#D4AF37]' : 'text-white'}`}>{fee.type}</h3>
                   <fee.icon className={`w-6 h-6 ${fee.highlight ? 'text-[#D4AF37]' : 'text-white/40'} group-hover:scale-110 transition-transform`} />
                 </div>
                 <p className="text-white/60 leading-relaxed text-sm">{fee.desc}</p>
               </motion.div>
             ))}
          </div>
          
          <div className="mt-8 flex justify-center">
             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm">
                <Search className="w-4 h-4" />
                <span>Exact percentages vary by asset and are detailed in the Investment Memorandum.</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Governance Section with Connecting Nodes ---

function GovernanceSection() {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading subtitle="Structure that protects your interests.">
              Built on Strong Governance
            </SectionHeading>
            
            <div className="space-y-12">
              {[
                { title: "SPV Structure", desc: "Each asset is housed in a separate Special Purpose Vehicle (Private Limited Company). Bankruptcy remote.", icon: Landmark },
                { title: "Defined Rights", desc: "Your ownership rights, voting powers, and dividend entitlements are legally documented.", icon: Gavel },
                { title: "Investor-Aligned", desc: "Major deviations from the business plan require investor consent.", icon: Users }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                      <item.icon className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                    {i !== 2 && <div className="absolute top-14 left-7 w-px h-12 bg-white/10 group-hover:bg-[#D4AF37]/30 transition-colors delay-100" />}
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-serif mb-2 group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
             whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative perspective-1000"
          >
             {/* Animated Card Stack */}
             <div className="relative bg-[#0A0A0A] border border-white/10 p-10 rounded-3xl space-y-8 shadow-2xl transform hover:rotate-y-[-5deg] hover:rotate-x-[5deg] transition-transform duration-500 preserve-3d">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <span className="text-white/40 uppercase text-xs tracking-widest font-semibold">Document Integrity Check</span>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 text-xs tracking-widest uppercase">Live System</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    "Shareholders Agreement",
                    "SPV Incorporation Cert",
                    "Title Search Report",
                    "Valuation Report",
                    "Regulatory Filings"
                  ].map((doc, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                         </div>
                         <span className="text-white font-medium">{doc}</span>
                      </div>
                      <span className="text-white/30 text-xs font-mono">VERIFIED</span>
                    </motion.div>
                  ))}
                </div>
             </div>
             
             {/* Decorative Elements behind card */}
             <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-white/5 rounded-3xl bg-white/[0.01]" />
             <div className="absolute -z-20 top-20 -right-20 w-full h-full border border-white/5 rounded-3xl bg-white/[0.005]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Advisory Section with "Network" Effect ---

function AdvisorySection() {
  return (
    <section className="py-32 border-t border-white/5 bg-[#050505] pb-40">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading subtitle="We work with independent professionals to ensure checks, balances, and accountability." align="center">
          Advisors & Partners
        </SectionHeading>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { category: "Legal Advisory", icon: Scale, status: "Tier-1 Firm (In Discussion)" },
            { category: "Valuation", icon: FileSearch, status: "Independent RICS Valuers" },
            { category: "Tech Security", icon: Lock, status: "Enterprise Grade Infrastructure" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-8 border border-white/5 group-hover:border-[#D4AF37]/50 transition-colors duration-500 shadow-2xl">
                  <item.icon className="w-8 h-8 text-white/80 group-hover:text-[#D4AF37] transition-colors duration-500" />
                </div>
                
                <h3 className="text-xl text-white font-serif mb-4">{item.category}</h3>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />
                <p className="text-[#D4AF37] text-sm font-medium tracking-wide uppercase bg-[#D4AF37]/10 px-4 py-2 rounded-full">
                  {item.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper icon for fee section
function TrendingUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

export default function TrustPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[#D4AF37]/30 overflow-x-hidden">
      <HeroSection />
      <TransparencySection />
      <FeeStructureSection />
      <GovernanceSection />
      <AdvisorySection />
    </div>
  );
}
