"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, ChevronDown, Check, ArrowRight } from "lucide-react";

// --- Components ---

function InputField({ 
  label, 
  type = "text", 
  placeholder, 
  required = false 
}: { 
  label: string; 
  type?: string; 
  placeholder?: string; 
  required?: boolean; 
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/70 tracking-wide ml-1">
        {label} {required && <span className="text-[#D4AF37]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.05] transition-all duration-300"
      />
    </div>
  );
}

function SelectField({ 
  label, 
  options, 
  placeholder = "Select an option" 
}: { 
  label: string; 
  options: string[]; 
  placeholder?: string; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-sm font-medium text-white/70 tracking-wide ml-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/[0.03] border ${isOpen ? 'border-[#D4AF37]/50' : 'border-white/10'} rounded-lg px-4 py-3 text-left flex items-center justify-between transition-all duration-300 group hover:bg-white/[0.05]`}
      >
        <span className={selected ? "text-white" : "text-white/20"}>
          {selected || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between group"
            >
              <span>{option}</span>
              {selected === option && <Check className="w-4 h-4 text-[#D4AF37]" />}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37]/30 flex flex-col relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 relative z-10 max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Connect With Us
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
              We work with a limited number of investors who value transparency, discipline, and long-term thinking. <br className="hidden md:block" />
              Share your details below, and we’ll reach out with relevant information.
            </p>
          </motion.div>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-2xl bg-[#0A0A0A] border border-white/5 p-8 md:p-12 shadow-2xl backdrop-blur-sm">
            
            {/* Subtle Border Glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid md:grid-cols-2 gap-8">
                <InputField label="Full Name" placeholder="e.g. Adarsh Sharma" required />
                <InputField label="Email Address" type="email" placeholder="name@company.com" required />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <InputField label="Phone Number" type="tel" placeholder="+91 98765 43210" />
                <SelectField 
                  label="Investment Interest Range" 
                  options={[
                    "Below ₹5 Lakhs",
                    "₹5–10 Lakhs",
                    "₹10–25 Lakhs",
                    "₹25+ Lakhs"
                  ]} 
                />
              </div>

              <SelectField 
                label="Area of Interest (Optional)" 
                options={[
                  "Fractional Land Ownership",
                  "Long-Term Appreciation",
                  "Future Infrastructure Zones",
                  "General Information"
                ]} 
                placeholder="Select area of interest"
              />

              {/* Action Buttons */}
              <div className="pt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <button 
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-[#D4AF37] text-black font-medium rounded-lg hover:bg-[#c4a030] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  Request Details
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button 
                  type="button"
                  className="w-full md:w-auto px-8 py-3 bg-transparent border border-white/10 text-white/70 font-medium rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                >
                  Schedule a Call
                </button>
              </div>

            </form>

            {/* Privacy Note */}
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="flex items-center gap-3 text-white/30">
                <Lock className="w-4 h-4" />
                <p className="text-xs max-w-xs leading-relaxed">
                  Your information is used solely to respond to your inquiry. 
                  We do not sell, share, or misuse personal data.
                </p>
              </div>
              
              <div className="flex gap-6 text-xs text-white/30">
                <a href="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white/50 transition-colors">Terms of Use</a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Optional: "By Invitation" Style Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-center"
        >
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 text-xs text-white/30 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50" />
              Institutional Grade Security
           </div>
        </motion.div>

      </div>
    </div>
  );
}
