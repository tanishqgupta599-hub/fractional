"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Server } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            <Shield className="w-6 h-6" />
            <span className="text-xs font-bold tracking-widest uppercase">Legal Document</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">Privacy Policy</h1>
          <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
            This policy outlines how we collect, use, and protect your personal information. 
            We are committed to maintaining the confidentiality and security of your data.
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
              <Eye className="w-5 h-5 text-white/40" />
              1. Information Collection
            </h2>
            <div className="prose prose-invert prose-p:text-white/60 prose-headings:text-white max-w-none">
              <p>
                We collect information that you voluntarily provide to us when you express interest in obtaining information about our products or services, when you participate in activities on the Platform, or otherwise when you contact us.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-white/60">
                <li><strong>Personal Identity Information:</strong> Name, email address, phone number.</li>
                <li><strong>Investment Preferences:</strong> Investment range, asset class interests.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and operating system (collected automatically for security).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Server className="w-5 h-5 text-white/40" />
              2. Use of Information
            </h2>
            <div className="prose prose-invert prose-p:text-white/60 max-w-none">
              <p>
                We use the information we collect or receive for the following purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-white/60">
                <li>To facilitate account creation and logon process.</li>
                <li>To send you administrative information (updates to terms, conditions, and policies).</li>
                <li>To respond to user inquiries and offer support.</li>
                <li>To protect our Services (fraud monitoring and prevention).</li>
                <li>To enforce our terms, conditions, and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-white/40" />
              3. Data Protection & Security
            </h2>
            <div className="prose prose-invert prose-p:text-white/60 max-w-none">
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">4. Disclosure to Third Parties</h2>
            <div className="prose prose-invert prose-p:text-white/60 max-w-none">
              <p>
                We <strong>do not</strong> sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">5. Contact Us</h2>
            <div className="p-6 bg-white/[0.03] border border-white/5 rounded-xl">
              <p className="text-white/60 mb-4">
                If there are any questions regarding this privacy policy, you may contact us using the information below:
              </p>
              <div className="text-white font-medium">
                <p>Compliance Officer</p>
                <p className="text-[#D4AF37]">legal@fractional.com</p>
              </div>
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
