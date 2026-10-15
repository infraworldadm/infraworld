// Home: volatile gas fees vs INFRA fixed fee (animated chart).
import { Ic, Lbl } from "@/components/common/ui";

const challenges = [
  { icon: "wave", title: "Cost volatility", description: "Gas-market pricing makes budgeting and forecasting difficult for production workloads." },
  { icon: "ledger", title: "Accounting complexity", description: "Volatile native assets introduce reconciliation, reporting, and treasury friction." },
  { icon: "clock", title: "Operational variability", description: "Congestion and changing throughput affect reliability, latency, and user experience." },
  { icon: "swap", title: "Incentive misalignment", description: "Speculative dynamics can diverge from the requirements of long-term infrastructure." },
];

/** Fee volatility vs fixed fee chart; paths are drawn on scroll by Effects. */
export function InfrastructureChallenges() {
  return (
    <section className="wrap sec" id="challenges">
      <div className="bento">
        <div className="tile c6 r2 chart rv">
          <Lbl blue>Problems solved</Lbl>
          <h2 className="st2">Volatile fees break production budgets.</h2>
          <svg viewBox="0 0 420 200" role="img" aria-label="Comparison: gas-market fees fluctuate while the INFRA fee stays flat" className="push">
            <g stroke="rgba(10,11,14,.09)"><path d="M0 30H420M0 80H420M0 130H420M0 180H420" /></g>
            <path id="volPath" d="M0 150 C20 120 30 170 50 110 S80 60 100 130 S130 170 150 70 S180 40 200 120 S230 175 250 90 S280 30 300 100 S340 160 360 80 S400 60 420 95" fill="none" stroke="rgba(10,11,14,.35)" strokeWidth="1.5" />
            <path id="flatPath" d="M0 115 H420" fill="none" stroke="#1F5BFF" strokeWidth="2.5" />
            <circle cx="414" cy="115" r="5" fill="#1F5BFF" />
            <text x="404" y="104" textAnchor="end" fill="#1F5BFF" fontSize="12" fontWeight="500" style={{ fontFamily: "var(--m)" }}>INFRA fixed fee</text>
          </svg>
          <div className="legend">
            <span><i style={{ background: "rgba(10,11,14,.35)" }} />Gas-market pricing</span>
            <span><i style={{ background: "#1F5BFF" }} />INFRA fixed fee</span>
          </div>
        </div>
        {challenges.map((c) => (
          <div key={c.title} className="tile c3 hv rv">
            <Ic n={c.icon} className="i ic" />
            <h3 className="push">{c.title}</h3>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
