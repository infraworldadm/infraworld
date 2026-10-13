import { Lbl } from "@/components/site/ui";

const props = [
  { tag: "1:1 Dirham Peg", title: "Stable Value", text: "Dirham-pegged settlement for consistent value and stable reporting." },
  { tag: "10 AED Fee", title: "Fixed Transaction Costs", text: "Fixed transaction costs enable predictable operational expenses." },
  { tag: "Fully Backed", title: "Collateralized Model", text: "Issuance follows controlled mint and burn processes tied to reserves, designed to be auditable." },
  { tag: "Enterprise Grade", title: "Institutional Ready", text: "Dirham-denominated for enterprise and regulated use.", blue: true },
];

const steps = [
  { k: "Fund", h: "Convert USDC/USDT to reAED", p: "Dirham-denominated unit of account for INFRA activity." },
  { k: "Operate", h: "Use across payments, settlement, and token programs", p: "Predictable costs support stable operational planning." },
  { k: "Report", h: "Audit-friendly flows", p: "Traceable transactions and settlement records for operations and finance teams." },
  { k: "Exit", h: "Redeem reAED to USDC/USDT", p: "Redemption follows a controlled burn-and-release process." },
];

export function Reaed() {
  return (
    <div className="band">
      <section className="wrap" id="reaed" style={{ paddingBottom: "var(--gap)" }}>
        <div className="bento">
          <div className="tile c7 rv">
            <Lbl blue>What is reAED? · An INFRA project</Lbl>
            <h2 className="st2">INFRA&apos;s first network: a Dirham-pegged unit of account.</h2>
            <p>
              reAED is a Dirham-pegged stablecoin that serves as the native unit of account on the INFRA network. It is used for
              transaction fees, payments, settlement, and on-chain operations—without introducing cryptocurrency volatility into
              pricing or reporting.
            </p>
            <p>
              reAED is designed for enterprise and institutional use. The 1:1 peg to the UAE Dirham supports predictable value
              representation and simplifies integration with traditional accounting workflows.
            </p>
            <p className="push qt">
              Behaves like <span>digital cash infrastructure</span>, not a cryptocurrency.
            </p>
          </div>
          <div className="tile c5 dark rv">
            <div className="row">
              <Lbl>Peg monitor</Lbl>
            </div>
            <div className="peg">
              <div><small>AED</small><b className="tn">1.0000</b></div>
              <div><small>reAED</small><b className="tn" style={{ color: "#7EA0FF" }}>1.0000</b></div>
            </div>
            <div className="pegchart">
              <svg viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                <g stroke="rgba(255,255,255,.08)"><path d="M0 20H300M0 60H300M0 100H300" /></g>
                <path id="pegLine" d="M0 60 H300" stroke="#1F5BFF" strokeWidth="2" fill="none" />
                <circle cx="300" cy="60" r="4" fill="#fff" />
              </svg>
            </div>
            <p className="note">1 reAED = 1 AED · mint and burn tied to reserves</p>
          </div>

          {props.map((p) => (
            <div key={p.title} className={`tile c3 half rv${p.blue ? " blue" : ""}`}>
              <span className="tag" style={p.blue ? { borderColor: "rgba(255,255,255,.3)", color: "#fff" } : undefined}>{p.tag}</span>
              <h3 className="push">{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" id="howWrap">
        <div className="tile steps-t" id="howTile">
          <div className="row" style={{ alignItems: "flex-end" }}>
            <div style={{ display: "grid", gap: 12 }}>
              <Lbl blue>How reAED Works</Lbl>
              <h2>Enter → Operate → Report → Exit</h2>
            </div>
            <div className="path" id="path">
              <b data-k="0">USDC/USDT</b>→<b data-k="1">reAED</b>→<b data-k="3">USDC/USDT</b>
            </div>
          </div>
          <div className="rail"><i id="rail" /></div>
          <div className="steps" id="steps">
            {steps.map((s, i) => (
              <div className="step" key={s.k}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="k">{s.k}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
