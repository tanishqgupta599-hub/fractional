"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  Building2, 
  ShoppingBag, 
  Info, 
  ShieldCheck, 
  GraduationCap, 
  LogOut, 
  Users, 
  Mail, 
  Briefcase,
  MapPin,
  PlayCircle
} from "lucide-react";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase";
import { useEffect } from "react";

// --- Menu Configuration ---

const MENU_ITEMS = [
  {
    label: "Explore",
    id: "explore",
    items: [
      {
        title: "Properties",
        href: "/properties",
        desc: "Curated high-growth assets.",
        icon: Building2
      },
      {
        title: "Marketplace",
        href: "/marketplace",
        desc: "Secondary market for liquidity.",
        icon: ShoppingBag
      },
      {
        title: "How It Works",
        href: "/how-it-works",
        desc: "Step-by-step investment process.",
        icon: PlayCircle
      }
    ]
  },
  {
    label: "Knowledge",
    id: "knowledge",
    items: [
      {
        title: "Investor Education",
        href: "/learn",
        desc: "Risks, rewards, and mechanics.",
        icon: GraduationCap
      },
      {
        title: "Trust & Safety",
        href: "/trust",
        desc: "Governance, legal, and security.",
        icon: ShieldCheck
      },
      {
        title: "Exit Options",
        href: "/exit",
        desc: "Liquidity and realization events.",
        icon: LogOut
      }
    ]
  },
  {
    label: "Company",
    id: "company",
    items: [
      {
        title: "About / Vision",
        href: "/about",
        desc: "Our mission and philosophy.",
        icon: Info
      },
      {
        title: "Founders",
        href: "/founders",
        desc: "The team behind the platform.",
        icon: Users
      },
      {
        title: "Contact Us",
        href: "/contact",
        desc: "Get in touch with our team.",
        icon: Mail
      }
    ]
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(useScroll().scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    try {
      if (!isSupabaseConfigured()) {
        setLoggedIn(false);
        setRole(null);
        return;
      }
      const supabase = supabaseBrowser();
      supabase.auth.getSession().then(async ({ data }) => {
        const s = data.session;
        setLoggedIn(!!s);
        if (s) {
          const { data: profile } = await supabase.from("profiles").select("role").eq("id", s.user.id).single();
          setRole((profile?.role as any) || "user");
        }
      });
    } catch {
      setLoggedIn(false);
      setRole(null);
    }
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-[#050505]/80 backdrop-blur-xl border-white/5 shadow-2xl" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50 relative">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8a701e] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span className="text-black font-extrabold text-xl font-serif">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">ASSETORY</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* Direct Link */}
          <Link 
            href="/why-dholera" 
            className="text-sm font-medium text-white/70 hover:text-[#D4AF37] transition-colors flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Why Dholera?</span>
          </Link>

          {/* Dropdown Menus */}
          {MENU_ITEMS.map((menu) => (
            <div 
              key={menu.id}
              className="relative"
              onMouseEnter={() => setActiveMenu(menu.id)}
            >
              <button 
                className={cn(
                  "flex items-center gap-1 py-2 text-sm font-medium transition-colors outline-none",
                  activeMenu === menu.id ? "text-[#D4AF37]" : "text-white/70 hover:text-white"
                )}
                onClick={() => setActiveMenu(activeMenu === menu.id ? null : menu.id)}
              >
                <span>{menu.label}</span>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    activeMenu === menu.id ? "rotate-180" : ""
                  )} 
                />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeMenu === menu.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[320px]"
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
                      <div className="p-2 space-y-1">
                        {menu.items.map((item) => (
                          <Link 
                            key={item.title} 
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors text-white/60">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs text-white/40 mt-0.5 font-light">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Auth & CTA */}
        <div className="flex items-center gap-6">
          {!loggedIn ? (
            <Link href="/login" className="hidden sm:block text-sm font-medium text-white/60 hover:text-white transition-colors">
              Log In
            </Link>
          ) : (
            <>
              <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-white/60 hover:text-white transition-colors">
                Dashboard
              </Link>
              {role === "admin" && (
                <Link href="/admin" className="hidden sm:block text-sm font-medium text-white/60 hover:text-white transition-colors">
                  Admin
                </Link>
              )}
            </>
          )}
          
          <Link href="/signup">
            <Button 
              variant="primary" 
              size="sm" 
              className="shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow duration-300"
            >
              Start Investing
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
