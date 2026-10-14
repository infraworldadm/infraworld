// Branded HTML emails for /build submissions. Table-based + inline styles for Gmail/Outlook/Apple Mail.

export type Row = [label: string, value: string];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const C = { black: "#0A0B0E", blue: "#1F5BFF", field: "#F3F5F9", line: "#E3E7EF", t1: "#0A0B0E", t2: "#4B5262", t3: "#8A909C" };
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

function shell(o: { origin: string; preheader: string; kicker: string; title: string; intro: string; body: string; cta?: { href: string; label: string } }) {
  const logo = `${o.origin}/Logo/INFRA_Logo%20on%20Dark%20bg.png`;
  const tickers = ["reAED · LIVE", "reUSD", "reEUR", "reGBP", "reINR", "reSAR"]
    .map((t, i) => `<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 11px;border-radius:99px;font:500 11px ${MONO};letter-spacing:.04em;${i === 0 ? `background:${C.blue};color:#fff;border:1px solid ${C.blue}` : "color:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.22)"}">${t}</span>`)
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(o.title)}</title></head>
<body style="margin:0;padding:0;background:${C.field};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(o.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.field}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${C.line}">
  <tr><td style="background:${C.black};background-image:radial-gradient(120% 140% at 100% 0%,rgba(31,91,255,.55),rgba(10,11,14,0) 60%);padding:28px 32px 22px">
    <img src="${logo}" width="110" alt="INFRA" style="display:block;width:110px;height:auto;border:0;margin-bottom:22px">
    <div style="font:600 11px ${MONO};letter-spacing:.12em;text-transform:uppercase;color:#7EA0FF;margin-bottom:10px">${esc(o.kicker)}</div>
    <div style="font:700 26px/1.15 ${FONT};letter-spacing:-.02em;color:#ffffff;margin-bottom:18px">${esc(o.title)}</div>
    <div>${tickers}</div>
  </td></tr>
  <tr><td style="height:4px;background:${C.blue};line-height:4px;font-size:0">&nbsp;</td></tr>
  <tr><td style="padding:28px 32px 8px;font:400 15px/1.6 ${FONT};color:${C.t2}">${o.intro}</td></tr>
  <tr><td style="padding:8px 32px 8px">${o.body}</td></tr>
  ${o.cta ? `<tr><td style="padding:16px 32px 8px"><a href="${o.cta.href}" style="display:inline-block;background:${C.black};color:#ffffff;text-decoration:none;font:600 15px ${FONT};padding:14px 24px;border-radius:10px">${esc(o.cta.label)} &rarr;</a></td></tr>` : ""}
  <tr><td style="padding:28px 32px 28px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.line}"><tr><td style="padding-top:18px;font:400 12px/1.6 ${FONT};color:${C.t3}">
      <b style="color:${C.t1}">INFRA</b> — Pegged stablecoin network infrastructure. reAED for the Dirham economy.<br>
      <a href="${o.origin}" style="color:${C.blue};text-decoration:none">infraworld.org</a> &nbsp;·&nbsp;
      <a href="${o.origin}/wallet" style="color:${C.blue};text-decoration:none">INFRA Wallet</a> &nbsp;·&nbsp;
      <a href="${o.origin}/balances" style="color:${C.blue};text-decoration:none">Pool balances</a> &nbsp;·&nbsp;
      <a href="${o.origin}/privacy-policy" style="color:${C.blue};text-decoration:none">Privacy</a><br>
      Dubai, United Arab Emirates. INFRA will never ask for your recovery phrase or private keys.
    </td></tr></table>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

function table(rows: Row[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:12px;border-collapse:separate;overflow:hidden">${rows
    .map(
      ([k, v], i) => `<tr><td style="padding:12px 16px;${i ? `border-top:1px solid ${C.line};` : ""}background:${i % 2 ? "#ffffff" : "#FAFBFD"}">
      <div style="font:600 10.5px ${MONO};letter-spacing:.08em;text-transform:uppercase;color:${C.t3};margin-bottom:4px">${esc(k)}</div>
      <div style="font:500 14.5px/1.5 ${FONT};color:${C.t1}">${esc(v).replace(/\n/g, "<br>")}</div></td></tr>`,
    )
    .join("")}</table>`;
}

function pill(label: string) {
  return `<span style="display:inline-block;padding:6px 12px;border-radius:99px;background:rgba(31,91,255,.1);color:${C.blue};font:600 12px ${MONO};letter-spacing:.06em;text-transform:uppercase">${esc(label)}</span>`;
}

export function adminEmail(p: { origin: string; pkg: string; name: string; company: string; email: string; rows: Row[] }) {
  const html = shell({
    origin: p.origin,
    preheader: `${p.pkg} request from ${p.company || p.name} — ${p.email}`,
    kicker: "New build request",
    title: `${p.company || p.name} wants to build on INFRA`,
    intro: `${pill(`${p.pkg} package`)}<br><br><b style="color:${C.t1}">${esc(p.name)}</b> (${esc(p.email)}) submitted the Build with INFRA form. Reply to this email to respond directly.`,
    body: table(p.rows),
    cta: { href: `mailto:${encodeURIComponent(p.email)}?subject=${encodeURIComponent("Your INFRA " + p.pkg + " request")}`, label: `Reply to ${p.name.split(" ")[0] || "lead"}` },
  });
  const text = `New INFRA build request — ${p.pkg}\n\n` + p.rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { subject: `New INFRA build request — ${p.pkg} — ${p.company || p.name}`, html, text };
}

export function customerEmail(p: { origin: string; pkg: string; pkgMsg: string; name: string; rows: Row[] }) {
  const first = p.name.split(" ")[0] || "there";
  const html = shell({
    origin: p.origin,
    preheader: `We've received your INFRA ${p.pkg} request. ${p.pkgMsg}`,
    kicker: `${p.pkg} package · Request received`,
    title: `Thanks, ${first} — your INFRA build is in.`,
    intro: `${esc(p.pkgMsg)}<br><br>Here's a copy of what you selected. If anything needs changing, just reply to this email.`,
    body:
      table(p.rows) +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;background:${C.field};border-radius:12px"><tr><td style="padding:18px 20px;font:400 14px/1.6 ${FONT};color:${C.t2}">
        <b style="color:${C.t1}">What happens next</b><br>
        1. Our team reviews your configuration.<br>
        2. We send a tailored proposal — architecture, fees and timeline.<br>
        3. We book a call to agree scope and start your pilot.</td></tr></table>`,
    cta: { href: `${p.origin}/wallet`, label: "Try INFRA Wallet" },
  });
  const text = `Thanks, ${first} — your INFRA ${p.pkg} request is in.\n\n${p.pkgMsg}\n\nYour selections:\n` + p.rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nINFRA — infraworld.org`;
  return { subject: `We've received your INFRA ${p.pkg} request`, html, text };
}
