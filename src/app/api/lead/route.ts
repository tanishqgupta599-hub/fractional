import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendAdminLeadAlert, sendLeadAutoReply } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body?.name || "");
  const email = String(body?.email || "");
  const phone = String(body?.phone || "");
  const city = String(body?.city || "");
  const budgetRange = String(body?.budgetRange || "");
  const message = String(body?.message || "");
  if (!name || !email || !phone) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  try {
    const supabase = supabaseAdmin();
    // Simple rate limit: max 3 leads per hour for same email
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recent, error: recentErr } = await supabase
      .from("leads")
      .select("id, created_at")
      .gte("created_at", oneHourAgo)
      .eq("email", email);
    if (recentErr) {
      return NextResponse.json({ ok: false, error: recentErr.message }, { status: 500 });
    }
    if ((recent?.length || 0) >= 3) {
      return NextResponse.json({ ok: false, error: "Rate limit exceeded. Try again later." }, { status: 429 });
    }
    const { error } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone,
        city: city || null,
        budget_range: budgetRange || null,
        message: message || null,
        status: "New",
      });
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    await Promise.all([
      sendAdminLeadAlert({ name, email, phone, city, budgetRange, message }),
      sendLeadAutoReply(email, name),
    ]);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
