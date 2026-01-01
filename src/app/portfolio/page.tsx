"use client";

import { useEffect, useMemo, useState } from "react";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [investments, setInvestments] = useState<any[]>([]);

  useEffect(() => {
    try {
      if (!isSupabaseConfigured()) {
        setSession(null);
        setInvestments([]);
        setLoading(false);
        return;
      }
      const supabase = supabaseBrowser();
      supabase.auth.getSession().then(async ({ data }) => {
        const s = data.session;
        if (!s) {
          setSession(null);
          setInvestments([]);
          setLoading(false);
          return;
        }
        setSession(s);
        const { data: inv } = await supabase
          .from("investments")
          .select("*")
          .eq("user_id", s.user.id)
          .order("created_at", { ascending: false });
        setInvestments(inv || []);
        setLoading(false);
      });
    } catch {
      setSession(null);
      setInvestments([]);
      setLoading(false);
    }
  }, []);

  const totals = useMemo(() => {
    const units = investments.reduce((a, b) => a + (b.units_bought || 0), 0);
    const invested = investments.reduce((a, b) => a + (b.amount_invested || 0), 0);
    return { units, invested };
  }, [investments]);

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
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">My Portfolio</h1>
            <p className="text-gray-400">Owned units and investment details</p>
          </div>
          <Link href="/marketplace">
            <Button variant="ghost" className="text-primary">
              Buy More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card hover className="p-6 bg-black/50 border-white/10">
            <div className="text-gray-400 text-xs">Total Units</div>
            <div className="text-3xl font-bold text-white">{totals.units}</div>
          </Card>
          <Card hover className="p-6 bg-black/50 border-white/10">
            <div className="text-gray-400 text-xs">Total Invested</div>
            <div className="text-3xl font-bold text-white">₹ {Intl.NumberFormat("en-IN").format(totals.invested)}</div>
          </Card>
          <Card hover className="p-6 bg-black/50 border-white/10">
            <div className="text-gray-400 text-xs">Estimated Value</div>
            <div className="text-3xl font-bold text-white">₹ {Intl.NumberFormat("en-IN").format(totals.invested)}</div>
          </Card>
        </div>

        <Card className="p-6 bg-black/50 border-white/10">
          {(!investments || investments.length === 0) ? (
            <div className="text-gray-500">No holdings yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400">
                    <th className="text-left p-2">Property</th>
                    <th className="text-left p-2">Units</th>
                    <th className="text-left p-2">Price/Unit</th>
                    <th className="text-left p-2">Amount Invested</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv) => {
                    const units = inv.fractions || 0;
                    const amt = inv.amount || 0;
                    const ppu = units ? Math.round(amt / units) : 0;
                    return (
                      <tr key={inv.id} className="border-t border-white/10">
                        <td className="p-2 text-white">{inv.properties?.name || "Unknown"}</td>
                        <td className="p-2 text-gray-300">{units}</td>
                        <td className="p-2 text-gray-300">₹ {Intl.NumberFormat("en-IN").format(ppu)}</td>
                        <td className="p-2 text-gray-300">₹ {Intl.NumberFormat("en-IN").format(amt)}</td>
                        <td className="p-2 text-gray-300">{new Date(inv.created_at).toLocaleDateString()}</td>
                        <td className="p-2">
                          <Link href={`/properties/${inv.properties?.slug || inv.property_id}`}>
                            <Button variant="secondary" className="h-8 text-xs">View</Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

