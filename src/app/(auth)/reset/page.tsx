"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Supabase sets a session after user clicks the reset link.
    // We can optionally verify session presence.
    try {
      if (!isSupabaseConfigured()) {
        setError("Supabase is not configured");
        return;
      }
      const supabase = supabaseBrowser();
      supabase.auth.getSession().then(({ data }) => {
        if (!data.session) {
          setError("Reset session missing. Please use the link from your email.");
        }
      });
    } catch (e) {
      setError("Supabase is not configured");
    }
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Set New Password</h1>
        <div className="space-y-4 bg-black/40 border border-white/10 rounded-2xl p-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 w-full"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm New Password"
            className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 w-full"
          />
          <Button
            className="w-full h-12"
            disabled={loading || !password || password !== confirm || !isSupabaseConfigured()}
            onClick={async () => {
              setLoading(true);
              setError(null);
              try {
                if (!isSupabaseConfigured()) {
                  throw new Error("Supabase is not configured");
                }
                const supabase = supabaseBrowser();
                const { error } = await supabase.auth.updateUser({ password });
                if (error) throw error;
                router.replace("/login");
              } catch (err: any) {
                setError(err?.message || "Failed to update password");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}
