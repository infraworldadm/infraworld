// reAED page: what reAED is, peg monitor, Fund → Operate → Report → Exit steps.
import { Lbl } from "@/components/common/ui";

const props = [
  { tag: "1:1 Dirham Peg", title: "Stable Value", text: "Dirham-pegged settlement for consistent value and stable reporting." },
  { tag: "Fixed Fee", title: "Fixed Transaction Costs", text: "Fixed transaction costs enable predictable operational expenses." },
  { tag: "Fully Backed", title: "Collateralized Model", text: "Issuance follows controlled mint and burn processes tied to reserves, designed to be auditable." },
  { tag: "Enterprise Grade", title: "Institutional Ready", text: "Dirham-denominated for enterprise and regulated use.", blue: true },
];

const steps = [
  { k: "Fund", h: "Convert USDC/USDT to reAED", p: "Dirham-denominated unit of account for INFRA activity." },
  { k: "Operate", h: "Pay, settle and run token programs", p: "Predictable costs support stable operational planning." },
  { k: "Report", h: "Audit-friendly flows", p: "Traceable transactions and settlement records for operations and finance teams." },
  { k: "Exit", h: "Redeem reAED to USDC/USDT", p: "Redemption follows a controlled burn-and-release process." },
];

/** Compact reAED overview: intro + key properties, peg monitor, and a 4-step flow. */
export function Reaed() {
  return (
    <div className="band band-c">
      <section className="wrap" id="reaed">
        <div className="bento">
          <div className="tile c8 rv re-intro">
            <Lbl blue>What is reAED? · An INFRA network</Lbl>
            <h2 className="st2">A Dirham-pegged unit of account.</h2>
            <p>reAED is pegged 1:1 to the UAE Dirham and powers fees, payments and settlement on INFRA — no crypto volatility in pricing or reporting.</p>
            <ul className="re-props">
              {props.map((p) => (
                <li key={p.title} className={p.blue ? "b" : ""}>
                  <span>{p.tag}</span>
                  <b>{p.title}</b>
                </li>
              ))}
            </ul>
          </div>
          <div className="tile c4 dark rv re-peg">
            <Lbl>Peg monitor</Lbl>
            <div className="peg">
              <div><small>AED</small><b className="tn">1.0000</b></div>
              <div><small>reAED</small><b className="tn" style={{ color: "#7EA0FF" }}>1.0000</b></div>
            </div>
            <div className="pegchart">
              <svg viewBox="0 30 300 60" preserveAspectRatio="none" aria-hidden="true">
                <g stroke="rgba(255,255,255,.08)"><path d="M0 40H300M0 80H300" /></g>
                <path id="pegLine" d="M0 60 H300" stroke="#1F5BFF" strokeWidth="2" fill="none" />
                <circle cx="300" cy="60" r="4" fill="#fff" />
              </svg>
            </div>
            <p className="note">1 reAED = 1 AED · backed by reserves</p>
          </div>

          <div className="tile c12 rv re-flow">
            <div className="re-flow-h">
              <Lbl blue>How reAED works</Lbl>
              <span className="re-path"><b>USDC/USDT</b>→<b className="on">reAED</b>→<b>USDC/USDT</b></span>
            </div>
            <ol>
              {steps.map((s, i) => (
                <li key={s.k} style={{ ["--i" as string]: i }}>
                  <span className="n">{String(i + 1).padStart(2, "0")} · {s.k}</span>
                  <b>{s.h}</b>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
