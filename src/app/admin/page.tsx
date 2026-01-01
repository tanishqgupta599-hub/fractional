"use client";

import { useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getSession().then(async ({ data }) => {
      const s = data.session;
      if (!s) {
        router.replace("/login");
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", s.user.id).single();
      const admin = profile?.role === "admin";
      setIsAdmin(admin);
      if (!admin) {
        router.replace("/dashboard");
        return;
      }
      const { data: allLeads } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      setLeads(allLeads || []);
      setLoading(false);
    });
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return leads.filter(
      (l) =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.toLowerCase().includes(q) ||
        l.city?.toLowerCase().includes(q)
    );
  }, [leads, query]);

  if (loading) return <div className="container mx-auto px-4 md:px-6 py-20">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        <div className="flex gap-3">
          <input
            placeholder="Search leads"
            className="h-10 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={async () => {
              const supabase = supabaseBrowser();
              await supabase.auth.signOut();
              router.replace("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Phone</th>
              <th className="text-left p-2">City</th>
              <th className="text-left p-2">Budget</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
              <th className="text-left p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-white/10">
                <td className="p-2 text-white">{l.name}</td>
                <td className="p-2 text-gray-300">{l.email}</td>
                <td className="p-2 text-gray-300">{l.phone}</td>
                <td className="p-2 text-gray-300">{l.city}</td>
                <td className="p-2 text-gray-300">{l.budget_range}</td>
                <td className="p-2">
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold">
                    {l.status}
                  </span>
                </td>
                <td className="p-2">
                  <select
                    className="bg-white/5 border border-white/10 rounded-lg text-white text-xs p-1"
                    value={l.status}
                    onChange={async (e) => {
                      setUpdating(l.id);
                      const supabase = supabaseBrowser();
                      await supabase.from("leads").update({ status: e.target.value }).eq("id", l.id);
                      const updated = leads.map((lead) => (lead.id === l.id ? { ...lead, status: e.target.value } : lead));
                      setLeads(updated);
                      setUpdating(null);
                      // Optional: log admin action
                      await supabase.from("admin_logs").insert({ action: "update_lead_status", target: l.id });
                    }}
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Converted</option>
                  </select>
                </td>
                <td className="p-2 text-gray-400">{new Date(l.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            onClick={() => {
              const rows = filtered.map((l) => ({
                name: l.name,
                email: l.email,
                phone: l.phone,
                city: l.city,
                budget: l.budget_range,
                status: l.status,
                created_at: l.created_at,
              }));
              const csv = [
                "Name,Email,Phone,City,Budget,Status,Created At",
                ...rows.map((r) =>
                  [r.name, r.email, r.phone, r.city, r.budget, r.status, new Date(r.created_at).toISOString()]
                    .map((x) => `"${String(x).replace(/"/g, '""')}"`)
                    .join(",")
                ),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `leads-${new Date().toISOString()}.csv`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
