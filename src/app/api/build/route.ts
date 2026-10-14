import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminEmail, customerEmail, type Row } from "@/lib/email/templates";
import { BUILD_FORM_EMAIL } from "@/lib/links";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Configure in Vercel → Settings → Environment Variables:
//   SMTP_USER = infraworld.adm@gmail.com   SMTP_PASS = <Gmail app password>
//   optional: SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 465), BUILD_NOTIFY_TO (default infraworld.adm@gmail.com)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (s: unknown, n: number) => String(s ?? "").slice(0, n).trim();

export async function POST(req: Request) {
  const user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (!user || !pass) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 501 });

  let body: { pkg?: string; pkgMsg?: string; name?: string; company?: string; email?: string; rows?: unknown; website?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const email = clip(body.email, 200);
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "bad_email" }, { status: 400 });
  const rows: Row[] = Array.isArray(body.rows)
    ? (body.rows as unknown[]).slice(0, 60).filter((r): r is [unknown, unknown] => Array.isArray(r) && r.length === 2).map(([k, v]) => [clip(k, 200), clip(v, 3000)] as Row).filter(([k, v]) => k && v)
    : [];
  const pkg = clip(body.pkg, 40) || "Advisory", pkgMsg = clip(body.pkgMsg, 400), name = clip(body.name, 120) || "there", company = clip(body.company, 200);
  const origin = new URL(req.url).origin.replace("http://localhost:3000", "https://infraworld.org");

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });
  const from = `"INFRA" <${user}>`;
  const notify = process.env.BUILD_NOTIFY_TO || BUILD_FORM_EMAIL;

  try {
    const a = adminEmail({ origin, pkg, name, company, email, rows });
    const c = customerEmail({ origin, pkg, pkgMsg, name, rows });
    await Promise.all([
      transport.sendMail({ from, to: notify, replyTo: email, subject: a.subject, html: a.html, text: a.text }),
      transport.sendMail({ from, to: email, replyTo: notify, subject: c.subject, html: c.html, text: c.text }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("build email failed", e);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
