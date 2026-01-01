"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Forgot Password</h1>
        <div className="space-y-4 bg-black/40 border border-white/10 rounded-2xl p-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 w-full"
          />
          <Button
            className="w-full h-12"
            disabled={loading || !email || !isSupabaseConfigured()}
            onClick={async () => {
              setLoading(true);
              setError(null);
              setMessage(null);
              try {
                if (!isSupabaseConfigured()) {
                  throw new Error("Supabase is not configured");
                }
                const supabase = supabaseBrowser();
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                  redirectTo: window.location.origin + "/reset",
                });
                if (error) throw error;
                setMessage("Reset link sent. Check your email.");
              } catch (err: any) {
                setError(err?.message || "Failed to send reset link");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
          {message && <p className="text-green-400">{message}</p>}
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}
