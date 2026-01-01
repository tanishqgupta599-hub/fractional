"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-black via-blue-950/20 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h1>
          
          <form
          className="space-y-4 bg-black/40 border border-white/10 rounded-2xl p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            const form = e.currentTarget as HTMLFormElement;
            const data = new FormData(form);
            const full_name = String(data.get("full_name") || "");
            const email = String(data.get("email") || "");
            const phone = String(data.get("phone") || "");
            const city = String(data.get("city") || "");
            const investor_type = String(data.get("investor_type") || "");
            const password = String(data.get("password") || "");
            try {
              if (!isSupabaseConfigured()) {
                router.push("/dashboard");
                return;
              }
              const supabase = supabaseBrowser();
              const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name } },
              });
              if (signUpError) throw signUpError;
              const userId = signUpData.user?.id;
              if (userId) {
                await supabase
                  .from("profiles")
                  .insert({
                    id: userId,
                    full_name,
                    phone,
                    city,
                    investor_type,
                    kyc_status: "Pending",
                    role: "user",
                  });
              }
              router.push("/dashboard");
            } catch (err: any) {
              setError(err?.message || "Signup failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <input name="full_name" required placeholder="Full Name" className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 w-full" />
          <input name="email" type="email" required placeholder="Email" className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 w-full" />
          <input name="phone" required placeholder="Phone Number" className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 w-full" />
          <input name="city" placeholder="City" className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 w-full" />
          <select name="investor_type" className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white w-full">
            <option value="Retail">Retail</option>
            <option value="HNI">HNI</option>
            <option value="Institutional">Institutional</option>
          </select>
          <input name="password" type="password" required placeholder="Password" className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 w-full" />
          <Button className="w-full h-12" disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
        </form>
        <div className="mt-6">
          <Button
            variant="secondary"
            className="w-full h-12"
            onClick={async () => {
              if (!isSupabaseConfigured()) {
                setError("Supabase is not configured");
                return;
              }
              const supabase = supabaseBrowser();
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: window.location.origin + "/dashboard" },
              });
            }}
          >
            Continue with Google
          </Button>
        </div>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
      </div>
    </div>
  );
}
