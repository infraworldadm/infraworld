"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BUILD_FORM_EMAIL } from "@/config/links";

type Ans = Record<string, string | string[]>;
type Q = {
  id: string;
  title: string;
  help?: string;
  type: "text" | "email" | "tel" | "long" | "number" | "single" | "multi" | "dropdown";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  show?: (a: Ans) => boolean;
};

/** Returns the "what to launch" answer (A–E option text). */
const L = (a: Ans) => String(a.launch || "");
/** True for B (own currency network) or C (own chain). */
const isNet = (a: Ans) => /^B|^C/.test(L(a));
/** True for C (own dedicated chain). */
const isChain = (a: Ans) => /^C/.test(L(a));
/** True if answer `k` includes (multi) or starts with (single) `v`. */
const has = (a: Ans, k: string, v: string) => (Array.isArray(a[k]) ? (a[k] as string[]).includes(v) : String(a[k] || "").startsWith(v));
/** True if the user picked "No wallet needed". */
const noWallet = (a: Ans) => has(a, "wallets", "No wallet needed");

const QS: Q[] = [
  { id: "name", title: "What's your name?", type: "text", required: true, placeholder: "Full name" },
  { id: "company", title: "Company and your role", type: "text", required: true, placeholder: "e.g. Acme Pay — Head of Product" },
  { id: "email", title: "Work email", type: "email", required: true, placeholder: "name@company.com" },
  { id: "phone", title: "Phone / WhatsApp", type: "tel", placeholder: "+971 …" },
  { id: "orgType", title: "What type of organisation are you?", type: "single", required: true, options: ["Bank", "Fintech / payment provider", "Exchange / broker", "Government / central bank", "Enterprise / corporate", "Startup / Web3 project", "Other"] },
  {
    id: "launch", title: "What would you like to launch with INFRA?", type: "single", required: true,
    options: [
      "A. Join the INFRA network — use reAED and the existing chain",
      "B. Our own currency network on INFRA infrastructure (e.g. reUSD, reINR)",
      "C. Our own dedicated chain — white-label INFRA L1 with our validators",
      "D. A white-label wallet only",
      "E. Not sure — advise me",
    ],
  },
  { id: "currency", title: "Which currency should your stablecoin be pegged to?", type: "dropdown", options: ["AED", "USD", "EUR", "GBP", "INR", "SAR", "SGD", "JPY", "Other"], show: (a) => isNet(a) || /^E/.test(L(a)) },
  { id: "currencyOther", title: "Which currency?", type: "text", show: (a) => (isNet(a) || /^E/.test(L(a))) && a.currency === "Other" },
  { id: "ticker", title: "Preferred token name / ticker", type: "text", placeholder: "reXYZ", show: isNet },
  { id: "backing", title: "How will the stablecoin be backed?", type: "single", options: ["Fiat reserves in a bank", "Stablecoins (USDC / USDT)", "Hybrid", "Need advice"], show: isNet },
  { id: "hosting", title: "Who should operate the infrastructure?", type: "single", options: ["INFRA-managed (INFRA hosts and runs it)", "Self-hosted on our servers", "Hybrid", "Need advice"], show: isNet },
  { id: "validators", title: "Validator set", type: "single", options: ["Use INFRA's validator set", "Our own validators", "Mixed (INFRA + ours)"], show: isChain },
  { id: "validatorCount", title: "How many validators will you run?", type: "number", placeholder: "e.g. 5", show: (a) => isChain(a) && /Our own|Mixed/.test(String(a.validators || "")) },
  { id: "consensus", title: "Consensus", type: "single", options: ["Default PoSA (recommended)", "Custom — tell us more"], show: isChain },
  { id: "consensusDetail", title: "Describe the consensus you need", type: "long", show: (a) => isChain(a) && String(a.consensus || "").startsWith("Custom") },
  { id: "networkType", title: "Network type", type: "single", options: ["Public", "Permissioned (approved participants only)", "Testnet / pilot first"], show: isNet },
  { id: "feeModel", title: "How should transaction fees work?", type: "single", options: ["Default — INFRA fixed fee per transaction (adjustable by governance)", "Custom fixed fee", "Percentage of transaction value", "Tiered by volume", "Gasless — we sponsor users' fees"], show: isNet },
  { id: "feeDetail", title: "Describe your fee: amount, percentage or tiers", type: "long", placeholder: "e.g. 2 units per tx, or 0.1% capped at 5", show: (a) => isNet(a) && /Custom|Percentage|Tiered/.test(String(a.feeModel || "")) },
  { id: "feeDist", title: "Where should collected fees go?", help: "Default six-pool split: Validators 10% · Cashback 30% · Dividend 30% · Tank 10% · Team 10% · Reserve 10%", type: "single", options: ["Default six-pool split", "Custom split", "Need advice"], show: isNet },
  { id: "feeDistDetail", title: "Your pools and percentages (must total 100%)", type: "long", placeholder: "Validators 20%, Treasury 50%, Rewards 30%", show: (a) => isNet(a) && a.feeDist === "Custom split" },
  { id: "cashback", title: "Should users earn cashback on fees?", type: "single", options: ["Yes", "No", "Not sure"], show: isNet },
  { id: "wallets", title: "Which wallets do you need?", help: "Choose as many as you like", type: "multi", required: true, options: ["Android app", "iOS app", "Browser extension (Chrome, Brave, Edge)", "No wallet needed"] },
  { id: "branding", title: "How should the wallet be branded?", type: "single", options: ["INFRA Wallet as-is", "White-label — our name, logo and colours", "Fully custom design and features"], show: (a) => !noWallet(a) },
  { id: "walletFeatures", title: "Which wallet features do you need?", help: "Choose as many as you like", type: "multi", options: ["Send & receive", "In-wallet swap (DEX)", "Cross-chain bridge (Ethereum, BNB Chain, TRON)", "Multiple wallets per user", "Local-currency balances", "reID Connect (identity / KYC)", "Biometric & passcode security", "Push notifications", "NFTs", "dApp connect (WalletConnect)", "Other"], show: (a) => !noWallet(a) },
  { id: "walletOther", title: "What else should the wallet do?", type: "long", show: (a) => !noWallet(a) && has(a, "walletFeatures", "Other") },
  { id: "modules", title: "Which extra modules would you like?", help: "Choose as many as you like", type: "multi", options: ["Cross-chain bridge (ETH / BNB / TRON)", "DEX & liquidity pools", "Block explorer", "Mint & burn admin console", "Public pool-balances dashboard", "Cashback / rewards programme", "Enterprise token issuance (loyalty, custom tokens)", "Merchant payments / POS", "KYC / AML via reID", "Fiat on/off-ramp partners", "Multisig treasury (Gnosis Safe)", "API & SDK access", "Other"] },
  { id: "modulesOther", title: "Tell us what else you need", type: "long", show: (a) => has(a, "modules", "Other") },
  { id: "countries", title: "Where will you operate?", type: "text", required: true, placeholder: "UAE, KSA, EU…" },
  { id: "licence", title: "What's your licensing status?", type: "single", options: ["Licensed (e.g. VARA, CBUAE, ADGM/FSRA, DFSA)", "Application in progress", "Not yet — need guidance", "Not required for our use case"] },
  { id: "licenceDetail", title: "Which regulator and licence?", type: "text", show: (a) => /^Licensed|^Application/.test(String(a.licence || "")) },
  { id: "volume", title: "Expected transactions per month in year 1", type: "single", options: ["Under 10k", "10k – 100k", "100k – 1M", "Over 1M", "Not sure"] },
  { id: "timeline", title: "When do you want to go live?", type: "single", options: ["Within 1 month", "1 – 3 months", "3 – 6 months", "6+ months", "Just exploring"] },
  { id: "budget", title: "Budget range (optional)", type: "single", options: ["Under $25k", "$25k – $100k", "$100k – $250k", "Over $250k", "Prefer to discuss"] },
  { id: "notes", title: "Anything else we should know?", type: "long", placeholder: "Goals, partners, constraints…" },
  { id: "brief", title: "Link to a brief or spec (optional)", type: "text", placeholder: "Google Drive / Dropbox / Notion link" },
];

const PKG: Record<string, [string, string]> = {
  A: ["Connect", "We'll send onboarding steps to join the INFRA network within 1 business day."],
  B: ["Network", "Your network brief is in. Expect an architecture and fee proposal within 2 business days."],
  C: ["Sovereign", "A solutions architect will reach out to book a call and scope your dedicated INFRA chain."],
  D: ["Wallet", "We'll send a white-label wallet demo and pricing shortly."],
  E: ["Advisory", "We'll review your answers and suggest the right setup on a short call."],
};

const KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Typeform-style form: one question per screen, branching via each question's `show()`, emails answers via FormSubmit. */
export function BuildForm() {
  const [a, setA] = useState<Ans>({});
  const [i, setI] = useState(-1); // -1 = welcome
  const [dir, setDir] = useState(1);
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "fail">("idle");
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null);

  const visible = useMemo(() => QS.filter((q) => !q.show || q.show(a)), [a]);
  const q = i >= 0 ? visible[i] : undefined;
  const progress = i < 0 ? 0 : state === "done" ? 100 : Math.round((i / visible.length) * 100);
  const pkg = PKG[L(a).charAt(0)] || PKG.E;

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
    return () => clearTimeout(t);
  }, [i]);

  /** Validates the current question; returns an error message or "". */
  const valid = useCallback((qq: Q) => {
    const v = a[qq.id];
    const empty = v === undefined || (Array.isArray(v) ? v.length === 0 : String(v).trim() === "");
    if (qq.required && empty) return "Please fill this in";
    if (qq.type === "email" && !empty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v))) return "Please enter a valid email";
    return "";
  }, [a]);

  /** Builds a label → answer payload and posts it to FormSubmit (emails BUILD_FORM_EMAIL). */
  const submit = useCallback(async () => {
    setState("sending");
    const data: Record<string, string> = {
      _subject: `New INFRA build request — ${pkg[0]} — ${String(a.company || a.name || "")}`,
      _template: "table",
      _captcha: "false",
      _replyto: String(a.email || ""),
      Package: pkg[0],
    };
    for (const qq of QS) {
      if (qq.show && !qq.show(a)) continue;
      const v = a[qq.id];
      if (v === undefined || (Array.isArray(v) ? !v.length : !String(v).trim())) continue;
      data[qq.title] = Array.isArray(v) ? v.join(", ") : String(v);
    }
    data["Submitted from"] = window.location.href;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${BUILD_FORM_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || String(j.success) === "false") throw new Error(j.message || "Send failed");
      setState("done");
    } catch {
      setState("fail");
    }
  }, [a, pkg]);

  /** Advances to the next visible question (validating first); past the last one triggers submit. */
  const next = useCallback(() => {
    if (i < 0) { setDir(1); setI(0); return; }
    if (!q) return;
    const e = valid(q);
    if (e) { setErr(e); return; }
    setErr("");
    setDir(1);
    if (i >= visible.length - 1) { setI(visible.length); return; }
    setI(i + 1);
  }, [i, q, valid, visible.length]);

  /** Goes back one question. */
  const back = () => { setErr(""); setDir(-1); setI(Math.max(-1, i - 1)); };

  /** Stores an answer and clears any error. */
  const set = (id: string, v: string | string[]) => { setErr(""); setA((p) => ({ ...p, [id]: v })); };
  /** Handles an option click: toggles multi-select, or saves single choice and auto-advances. */
  const pick = (qq: Q, opt: string) => {
    if (qq.type === "multi") {
      const cur = (a[qq.id] as string[]) || [];
      let nv = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt];
      if (opt === "No wallet needed" && !cur.includes(opt)) nv = [opt];
      else if (opt !== "No wallet needed") nv = nv.filter((x) => x !== "No wallet needed");
      set(qq.id, nv);
    } else {
      set(qq.id, opt);
      setTimeout(() => { setDir(1); setErr(""); setI((n) => n + 1); }, 320);
    }
  };

  // keyboard: Enter = next, letter = choose
  useEffect(() => {
    /** Keyboard shortcuts: Enter = OK, letter keys pick options. */
    const onKey = (e: KeyboardEvent) => {
      if (state === "sending") return;
      const t = e.target as HTMLElement;
      if (e.key === "Enter" && !(t.tagName === "TEXTAREA" && !e.metaKey && !e.ctrlKey)) { e.preventDefault(); next(); return; }
      if (q?.options && q.type !== "dropdown" && t.tagName !== "INPUT" && t.tagName !== "TEXTAREA" && e.key.length === 1) {
        const k = KEYS.indexOf(e.key.toUpperCase());
        if (k >= 0 && k < q.options.length) pick(q, q.options[k]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // last question answered → single choice auto-advance beyond end triggers submit
  useEffect(() => {
    if (i === visible.length && state === "idle") submit();
  }, [i, visible.length, state, submit]);

  const done = i >= visible.length;
  const summary: [string, string][] = (
    [
      ["Package", L(a) ? pkg[0] : ""],
      ["Currency", String(a.currency === "Other" ? a.currencyOther || "" : a.currency || "")],
      ["Ticker", String(a.ticker || "")],
      ["Infrastructure", String(a.hosting || "")],
      ["Validators", String(a.validators || "")],
      ["Fees", String(a.feeModel || "").replace(/ —.*/, "")],
      ["Fee pools", String(a.feeDist || "")],
      ["Wallets", ((a.wallets as string[]) || []).join(" · ")],
      ["Branding", String(a.branding || "").replace(/ —.*/, "")],
      ["Modules", ((a.modules as string[]) || []).length ? `${(a.modules as string[]).length} selected` : ""],
      ["Go-live", String(a.timeline || "")],
    ] as [string, string][]
  ).filter(([, v]) => v);

  return (
    <div className="bf">
      <div className="bf-prog" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      <div className="bf-stage">
        {i < 0 && (
          <div className="bf-step" key="welcome" data-dir={dir}>
            <span className="bf-kicker">Build with INFRA · White label</span>
            <h1>Build your stablecoin network with INFRA.</h1>
            <p className="bf-help">Pick what you need — network, currency peg, fee logic, pool distribution, wallets and add-ons. Skip what you don&apos;t. About 4 minutes.</p>
            <button className="bf-ok" onClick={next}>Start <span>press Enter ↵</span></button>
          </div>
        )}

        {q && !done && (
          <div className="bf-step" key={q.id} data-dir={dir}>
            <span className="bf-num">{i + 1} → <small>of {visible.length}</small></span>
            <h2>{q.title}{q.required && <b aria-hidden="true"> *</b>}</h2>
            {q.help && <p className="bf-help">{q.help}</p>}

            {(q.type === "text" || q.type === "email" || q.type === "tel" || q.type === "number") && (
              <input ref={inputRef} className="bf-in" type={q.type} inputMode={q.type === "number" ? "numeric" : undefined} placeholder={q.placeholder || "Type your answer here…"} value={String(a[q.id] || "")} onChange={(e) => set(q.id, e.target.value)} />
            )}
            {q.type === "long" && (
              <textarea ref={inputRef} className="bf-in bf-ta" rows={3} placeholder={q.placeholder || "Type your answer here…"} value={String(a[q.id] || "")} onChange={(e) => set(q.id, e.target.value)} />
            )}
            {q.type === "dropdown" && (
              <select ref={inputRef} className="bf-in bf-sel" value={String(a[q.id] || "")} onChange={(e) => set(q.id, e.target.value)}>
                <option value="" disabled>Select…</option>
                {q.options!.map((o) => <option key={o}>{o}</option>)}
              </select>
            )}
            {(q.type === "single" || q.type === "multi") && (
              <div className={`bf-opts${q.options!.length > 6 ? " two" : ""}`} role={q.type === "multi" ? "group" : "radiogroup"}>
                {q.options!.map((o, k) => {
                  const on = q.type === "multi" ? ((a[q.id] as string[]) || []).includes(o) : a[q.id] === o;
                  return (
                    <button key={o} type="button" className={`bf-opt${on ? " on" : ""}`} onClick={() => pick(q, o)} aria-pressed={on} style={{ animationDelay: `${k * 0.035}s` }}>
                      <kbd>{KEYS[k]}</kbd><span>{o}</span>{on && <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>}
                    </button>
                  );
                })}
              </div>
            )}

            {err && <p className="bf-err">⚠ {err}</p>}
            <div className="bf-row">
              <button className="bf-ok" onClick={next}>{i === visible.length - 1 ? "Submit" : "OK"} <span>{q.type === "long" ? "Ctrl/⌘ + Enter ↵" : "press Enter ↵"}</span></button>
            </div>
          </div>
        )}

        {done && (
          <div className="bf-step" key="end" data-dir={1}>
            {state === "sending" && <><span className="bf-spin" /><h2>Sending your request…</h2></>}
            {state === "done" && (
              <>
                <span className="bf-check"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
                <span className="bf-kicker">{pkg[0]} package</span>
                <h2>Thank you, {String(a.name || "").split(" ")[0] || "there"}!</h2>
                <p className="bf-help">{pkg[1]} Our team has your answers and will reply to {String(a.email || "your email")}.</p>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a className="bf-ok" href="/">Back to INFRA</a>
              </>
            )}
            {state === "fail" && (
              <>
                <h2>We couldn&apos;t send that automatically.</h2>
                <p className="bf-help">Your answers are still here. Try again, or email them to us directly.</p>
                <div className="bf-row">
                  <button className="bf-ok" onClick={submit}>Try again</button>
                  <a className="bf-ghost" href={`mailto:${BUILD_FORM_EMAIL}?subject=${encodeURIComponent("INFRA build request — " + pkg[0])}&body=${encodeURIComponent(QS.filter((qq) => a[qq.id] && (!qq.show || qq.show(a))).map((qq) => `${qq.title}: ${Array.isArray(a[qq.id]) ? (a[qq.id] as string[]).join(", ") : a[qq.id]}`).join("\n"))}`}>Email instead</a>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <aside className="bf-side" aria-label="Your build so far">
        <span className="bf-kicker">Your INFRA build</span>
        {summary.length ? (
          <dl>{summary.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        ) : (
          <p>Your selections appear here as you go — network, fee logic, pool distribution, wallets and modules.</p>
        )}
        <div className="bf-tickers" aria-hidden="true">{["reAED", "reUSD", "reEUR", "reGBP", "reINR", "reSAR", "+ yours"].map((t) => <span key={t} className={t === "reAED" ? "is-live" : ""}>{t}</span>)}</div>
      </aside>

      {!done && i >= 0 && (
        <div className="bf-nav">
          <button onClick={back} aria-label="Previous question">↑</button>
          <button onClick={next} aria-label="Next question">↓</button>
        </div>
      )}
    </div>
  );
}
