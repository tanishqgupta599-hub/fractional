"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        isScrolled 
          ? "bg-black/60 backdrop-blur-xl border-white/5 shadow-lg" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            <span className="text-black font-extrabold text-lg">F</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">FRACTIONAL</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {[
            { name: "Properties", href: "/properties" },
            { name: "Why Dholera?", href: "/why-dholera", highlight: true },
            { name: "Marketplace", href: "/marketplace" },
            { name: "How It Works", href: "/how-it-works" },
            { name: "Founders", href: "/founders" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={cn(
                "relative hover:text-white transition-colors py-1 group",
                item.highlight && "text-green-400 hover:text-green-300"
              )}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Log In
          </Link>
          <Button variant="primary" size="sm" className="shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Start Investing
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
