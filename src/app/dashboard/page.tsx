"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { ArrowRight, PlusCircle, ShieldCheck, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [investments, setInvestments] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      if (!isSupabaseConfigured()) {
        setSession(null);
        setProfile({
          full_name: "",
          phone: "",
          city: "",
          investor_type: "",
          kyc_status: "Pending",
        });
        setInvestments([]);
        setLoading(false);
        return;
      }
      const supabase = supabaseBrowser();
      supabase.auth.getSession().then(async ({ data }) => {
        const s = data.session;
        if (!s) {
          setSession(null);
          setProfile({
            full_name: "",
            phone: "",
            city: "",
            investor_type: "",
            kyc_status: "Pending",
          });
          setInvestments([]);
          setLoading(false);
          return;
        }
        setSession(s);
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", s.user.id).single();
        setProfile(profileData);
        const { data: inv } = await supabase.from("investments").select("*").eq("user_id", s.user.id).order("created_at", { ascending: false });
        setInvestments(inv || []);
        setLoading(false);
      });
    } catch {
      setSession(null);
      setProfile({
        full_name: "",
        phone: "",
        city: "",
        investor_type: "",
        kyc_status: "Pending",
      });
      setInvestments([]);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="container mx-auto px-4 md:px-6 py-20">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-primary/10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[160px]" />

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {profile?.full_name ? `Welcome, ${profile?.full_name}` : "Welcome"}
            </h1>
            <p className="text-gray-400">Your investment hub</p>
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                if (!isSupabaseConfigured()) {
                  router.replace("/login");
                  return;
                }
                const supabase = supabaseBrowser();
                await supabase.auth.signOut();
                router.replace("/login");
              } catch {
                router.replace("/login");
              }
            }}
          >
            Logout
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Link href="/portfolio">
          <Card hover className="p-6 bg-black/50 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-xs">Portfolio Value</div>
                <div className="text-3xl font-bold text-white">₹ {Intl.NumberFormat("en-IN").format(0)}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">Change: +0%</div>
          </Card>
          </Link>
          <Card hover className="p-6 bg-black/50 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-xs">Total Units</div>
                <div className="text-3xl font-bold text-white">{investments?.reduce((a, b) => a + (b.units_bought || 0), 0) || 0}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <PlusCircle className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">New this month: 0</div>
          </Card>
          <Card hover className="p-6 bg-black/50 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-xs">KYC Status</div>
                <div className="text-3xl font-bold text-white">{profile?.kyc_status || "Pending"}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/kyc">
                <Button variant="outline" className="h-9 text-xs">Verify Now</Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-black/50 border-white/10">
              <PortfolioChart />
            </Card>
          </div>
          <div>
            <Card className="p-6 bg-black/50 border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Recent Activity</h2>
                <Link href="/marketplace">
                  <Button variant="ghost" className="text-primary">
                    View Market <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {(!investments || investments.length === 0) ? (
                <div className="text-gray-500">No activity yet.</div>
              ) : (
                <div className="space-y-3">
                  {investments.slice(0, 5).map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white font-medium">{inv.properties?.name || "Unknown Property"}</p>
                        <p className="text-xs text-gray-500">Units: {inv.fractions} • Amount: ₹{inv.amount}</p>
                      </div>
                      <Link href={`/properties/${inv.properties?.slug || inv.property_id}`}>
                        <Button variant="secondary" className="h-8 text-xs">View</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card hover className="p-6 bg-black/50 border-white/10">
            <h3 className="text-white font-bold mb-2">Explore Properties</h3>
            <p className="text-gray-400 text-sm mb-4">Discover curated assets in Dholera and beyond.</p>
            <Link href="/properties">
              <Button className="h-10">Browse</Button>
            </Link>
          </Card>
          <Card hover className="p-6 bg-black/50 border-white/10">
            <h3 className="text-white font-bold mb-2">Add Funds</h3>
            <p className="text-gray-400 text-sm mb-4">Increase your dry powder for upcoming drops.</p>
            <Button variant="outline" className="h-10">Add</Button>
          </Card>
          <Card hover className="p-6 bg-black/50 border-white/10">
            <h3 className="text-white font-bold mb-2">Learn & Safety</h3>
            <p className="text-gray-400 text-sm mb-4">Understand SPV structures, RLS, and governance.</p>
            <Link href="/safety">
              <Button variant="outline" className="h-10">Read</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
