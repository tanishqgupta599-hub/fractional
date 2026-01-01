"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/30 to-primary/10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[160px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid lg:grid-cols-2 gap-10 max-w-6xl"
        >
          <div className="hidden lg:flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative p-10 rounded-3xl bg-black/40 border border-white/10"
            >
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-yellow-500 rounded-full mb-8" />
              <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6">Welcome Back</h1>
              <p className="text-lg text-gray-300 mb-8">
                Access your investment dashboard, track portfolio performance, and explore new properties.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { t: "Secure Login", c: "from-green-500 to-emerald-400" },
                  { t: "Instant Access", c: "from-blue-500 to-cyan-400" },
                  { t: "Smart Insights", c: "from-purple-500 to-fuchsia-400" },
                  { t: "Premium Support", c: "from-primary to-yellow-500" },
                ].map((b, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className={`w-12 h-1.5 bg-gradient-to-r ${b.c} rounded-full mb-3`} />
                    <div className="text-white font-semibold">{b.t}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-blue-500/30 blur-2xl opacity-60" />
            <div className="relative z-10 rounded-[2rem] bg-black/60 backdrop-blur-xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Login</h2>
                {!isSupabaseConfigured() && (
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                    Setup required
                  </span>
                )}
              </div>

              <form
                className="space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  setLoading(true);
                  const form = e.currentTarget as HTMLFormElement;
                  const data = new FormData(form);
                  const email = String(data.get("email") || "");
                  const password = String(data.get("password") || "");
                  try {
                    if (!isSupabaseConfigured()) {
                      router.push("/dashboard");
                      return;
                    }
                    const supabase = supabaseBrowser();
                    const { error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    router.push("/dashboard");
                  } catch (err: any) {
                    setError(err?.message || "Login failed");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <div className="group">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    suppressHydrationWarning
                    className="h-12 rounded-xl w-full bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition"
                  />
                </div>
                <div className="group">
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    suppressHydrationWarning
                    className="h-12 rounded-xl w-full bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition"
                  />
                </div>
                <div suppressHydrationWarning>
                  <Button className="w-full h-12 shadow-[0_0_25px_rgba(212,175,55,0.25)]" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>

              <div className="mt-6 grid sm:grid-cols-2 gap-3" suppressHydrationWarning>
                <Button
                  variant="secondary"
                  className="h-12 w-full"
                  onClick={async () => {
                    try {
                      if (!isSupabaseConfigured()) {
                        router.push("/dashboard");
                        return;
                      }
                      const supabase = supabaseBrowser();
                      await supabase.auth.signInWithOAuth({
                        provider: "google",
                        options: { redirectTo: window.location.origin + "/dashboard" },
                      });
                    } catch (err: any) {
                      setError(err?.message || "Login failed");
                    }
                  }}
                >
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full"
                  onClick={() => router.push("/forgot")}
                >
                  Forgot Password
                </Button>
              </div>

              {error && <p className="text-red-400 mt-4">{error}</p>}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
