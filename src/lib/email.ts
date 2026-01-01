import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@fractional.app";

const resend = new Resend(RESEND_API_KEY);

export async function sendAdminLeadAlert(payload: {
  name: string;
  email: string;
  phone: string;
  city?: string;
  budgetRange?: string;
  message?: string;
}) {
  if (!RESEND_API_KEY || !ADMIN_EMAIL) return;
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Lead: ${payload.name}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;background:#000;color:#fff;padding:24px">
        <h2 style="margin:0 0 12px;color:#D4AF37">New Lead Received</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone}</p>
        ${payload.city ? `<p><strong>City:</strong> ${payload.city}</p>` : ""}
        ${payload.budgetRange ? `<p><strong>Budget:</strong> ${payload.budgetRange}</p>` : ""}
        ${payload.message ? `<p><strong>Message:</strong> ${payload.message}</p>` : ""}
      </div>
    `,
  });
}

export async function sendLeadAutoReply(to: string, name: string) {
  if (!RESEND_API_KEY) return;
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Thanks for reaching out — ASSETORY",
    html: `
      <div style="font-family:Inter,Arial,sans-serif;background:#000;color:#fff;padding:24px">
        <h2 style="margin:0 0 12px;color:#D4AF37">Hi ${name},</h2>
        <p>Thanks for contacting ASSETORY. Our team will reach out shortly.</p>
        <p style="color:#aaa">This is an automated confirmation.</p>
      </div>
    `,
  });
}

