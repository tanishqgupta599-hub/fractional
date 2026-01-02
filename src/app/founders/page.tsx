"use client";

import { Button } from "@/components/ui/Button";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function FoundersPage() {
  const [tanishqSrc, setTanishqSrc] = useState("/tanishq.jpg");
  const [lalitSrc, setLalitSrc] = useState("/lalit.jpg");

  return (
    <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Visionaries</h1>
        <p className="text-xl text-gray-400">
          Blending decades of real estate expertise with modern financial technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Founder 1 */}
        <div className="group relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 bg-card border border-white/5 p-8 rounded-2xl overflow-hidden">
            <div className="h-80 w-full bg-gray-800 mb-8 rounded-xl overflow-hidden relative">
              <Image
                src={tanishqSrc}
                alt="Tanishq Gupta"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => {
                  setTanishqSrc("https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop");
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-3xl font-bold text-white">Tanishq Gupta</h3>
                <p className="text-primary font-medium text-lg">Founder & CEO</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              Tanishq Gupta is the Founder and visionary behind the platform, bringing a modern, technology-driven approach to real-asset investing. With a background in computer science and a strong interest in financial systems, Tanishq focuses on building transparent, scalable, and future-ready investment structures.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors"><Linkedin className="h-6 w-6" /></Link>
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></Link>
            </div>
          </div>
        </div>

        {/* Founder 2 */}
        <div className="group relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 bg-card border border-white/5 p-8 rounded-2xl overflow-hidden">
            <div className="h-80 w-full bg-gray-800 mb-8 rounded-xl overflow-hidden relative">
               <Image
                src={lalitSrc}
                alt="Lalit Gupta"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => {
                  setLalitSrc("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop");
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-3xl font-bold text-white">Lalit Gupta</h3>
                <p className="text-blue-400 font-medium text-lg">Co-Founder</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              Lalit Gupta is the Co-Founder and execution lead, with over 26 years of experience across large capital projects. Having held senior roles in multinational environments, he brings deep expertise in asset evaluation, risk management, and regulatory compliance, ensuring the platform's long-term institutional trust.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors"><Linkedin className="h-6 w-6" /></Link>
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
        <p className="text-lg text-gray-300 italic">
          "To democratize wealth creation by unlocking the world's most valuable asset class for everyone."
        </p>
      </div>
    </div>
  );
}
