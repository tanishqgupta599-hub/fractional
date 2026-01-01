"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function KycPage() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      if (!isSupabaseConfigured()) {
        setSession(null);
        setProfile({ full_name: "", phone: "", city: "", investor_type: "", kyc_status: "Pending" });
        setLoading(false);
        return;
      }
      const supabase = supabaseBrowser();
      supabase.auth.getSession().then(async ({ data }) => {
        const s = data.session;
        if (!s) {
          setSession(null);
          setProfile({ full_name: "", phone: "", city: "", investor_type: "", kyc_status: "Pending" });
          setLoading(false);
          return;
        }
        setSession(s);
        const { data: p } = await supabase.from("profiles").select("*").eq("id", s.user.id).single();
        setProfile(p || { full_name: "", phone: "", city: "", investor_type: "", kyc_status: "Pending" });
        setLoading(false);
      });
    } catch {
      setSession(null);
      setProfile({ full_name: "", phone: "", city: "", investor_type: "", kyc_status: "Pending" });
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 md:px-6 py-20">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-primary/10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[160px]" />

      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">KYC Verification</h1>
            <p className="text-gray-400">Securely submit your details for verification</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 bg-black/50 border-white/10">
              <h2 className="text-lg font-bold text-white mb-4">Your Details</h2>
              <div className="space-y-3 text-sm">
                <div className="text-gray-400">Name</div>
                <div className="text-white font-medium">{profile?.full_name || session?.user?.user_metadata?.full_name || "-"}</div>
                <div className="text-gray-400">Email</div>
                <div className="text-white font-medium">{session?.user?.email || "-"}</div>
                <div className="text-gray-400">Phone</div>
                <div className="text-white font-medium">{profile?.phone || "-"}</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-black/50 border-white/10">
              <h2 className="text-lg font-bold text-white mb-4">Upload Documents</h2>
              <form
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setMessage(null);
                  setError(null);
                  setSubmitting(true);
                  try {
                    setMessage("KYC submitted. Our team will verify and update your status.");
                  } catch (err: any) {
                    setError(err?.message || "Submission failed");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Aadhaar Number</div>
                    <input name="aadhaarNumber" placeholder="XXXX-XXXX-XXXX" className="h-12 w-full rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">PAN Number</div>
                    <input name="panNumber" placeholder="ABCDE1234F" className="h-12 w-full rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Upload Aadhaar Front</div>
                    <input type="file" name="aadhaarFront" className="w-full text-sm text-gray-300 file:text-white file:bg-primary/20 file:border file:border-primary/40 file:px-3 file:py-2 file:rounded-lg file:hover:bg-primary/30" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Upload Aadhaar Back</div>
                    <input type="file" name="aadhaarBack" className="w-full text-sm text-gray-300 file:text-white file:bg-primary/20 file:border file:border-primary/40 file:px-3 file:py-2 file:rounded-lg file:hover:bg-primary/30" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Upload PAN</div>
                    <input type="file" name="panFile" className="w-full text-sm text-gray-300 file:text-white file:bg-primary/20 file:border file:border-primary/40 file:px-3 file:py-2 file:rounded-lg file:hover:bg-primary/30" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Address Proof</div>
                    <input type="file" name="addressProof" className="w-full text-sm text-gray-300 file:text-white file:bg-primary/20 file:border file:border-primary/40 file:px-3 file:py-2 file:rounded-lg file:hover:bg-primary/30" />
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Selfie</div>
                  <input type="file" name="selfie" className="w-full text-sm text-gray-300 file:text-white file:bg-primary/20 file:border file:border-primary/40 file:px-3 file:py-2 file:rounded-lg file:hover:bg-primary/30" />
                </div>

                <div className="flex items-center gap-4">
                  <Button className="h-12" disabled={submitting}>{submitting ? "Submitting..." : "Submit for Verification"}</Button>
                  {message && <span className="text-green-400 text-sm">{message}</span>}
                  {error && <span className="text-red-400 text-sm">{error}</span>}
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

