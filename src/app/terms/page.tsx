"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, Gavel, AlertTriangle, Copyright, Scale } from "lucide-react";
import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#050505] text-white/80 selection:bg-[#D4AF37]/30">
      
      {/* Header / Navigation Back */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 h-20 flex items-center">
          <Link 
            href="/contact" 
            className="flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Contact
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 max-w-4xl">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-white/10 pb-10"
        >
          <div className="flex items-center gap-3 mb-6 text-[#D4AF37]/80">
            <FileText className="w-6 h-6" />
            <span className="text-xs font-bold tracking-widest uppercase">Legal Document</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">Terms of Use</h1>
          <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
            By accessing or using the ASSETORY Platform, you agree to be bound by these terms. 
            These terms govern your relationship with us and your use of our investment services.
          </p>
          <div className="mt-6 text-xs text-white/30 font-mono">
            Last Updated: January 01, 2026
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          
          <section>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Gavel className="w-5 h-5 text-white/40" />
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-invert prose-p:text-white/60 max-w-none">
              <p>
                Access to this website is granted only to users who accept these Terms of Use. If you do not agree to these terms, you must not use our services. We reserve the right to modify these terms at any time, and continued use of the platform constitutes acceptance of such modifications.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Scale className="w-5 h-5 text-white/40" />
              2. Nature of Platform
            </h2>
            <div className="prose prose-invert prose-p:text-white/60 max-w-none">
              <p>
                The content provided on this platform is for informational purposes only and does not constitute financial, legal, or tax advice.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-white/60">
                <li><strong>No Guarantee:</strong> Past performance of any real estate asset is not indicative of future results.</li>
                <li><strong>User Responsibility:</strong> You are solely responsible for conducting your own due diligence before making any investment decisions.</li>
                <li><strong>Platform Role:</strong> We act as a technology facilitator for fractional ownership and do not guarantee the solvency of any underlying asset.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-white/40" />
              3. Investment Risks
            </h2>
            <div className="prose prose-invert prose-p:text-white/60 max-w-none">
              <p>
                Real estate investments are speculative and involve substantial risks, including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-white/60">
                <li><strong>Illiquidity:</strong> Fractional ownership interests may not be easily sold or transferred.</li>
                <li><strong>Market Fluctuation:</strong> Property values can decline due to economic conditions.</li>
                <li><strong>Loss of Capital:</strong> Investors may lose some or all of their invested capital.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Copyright className="w-5 h-5 text-white/40" />
              4. Intellectual Property
            </h2>
            <div className="prose prose-invert prose-p:text-white/60 max-w-none">
              <p>
                All content, design, graphics, and code on this website are the property of ASSETORY Platform and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">5. Limitation of Liability</h2>
            <div className="prose prose-invert prose-p:text-white/60 max-w-none">
              <p>
                To the fullest extent permitted by law, ASSETORY Platform shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use or inability to use the platform, including but not limited to damages for loss of profits, data, or other intangible losses.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">6. Governing Law</h2>
            <div className="p-6 bg-white/[0.03] border border-white/5 rounded-xl">
              <p className="text-white/60">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Dholera/Ahmedabad.
              </p>
            </div>
          </section>

        </motion.div>

        {/* Footer Note */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-sm">
            © 2026 ASSETORY. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
