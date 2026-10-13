import { Btn, Ic, Lbl } from "@/components/site/ui";

const techFeatures = [
  { tag: "Runtime", title: "EVM Compatible", description: "Full compatibility with Ethereum tooling, wallets, and smart contracts for seamless development." },
  { tag: "Consensus", title: "PoSA Consensus", description: "Proof of Staked Authority model with qualified validators for reliable performance and governance." },
  { tag: "Economics", title: "Fixed Transaction Fee", description: "Fixed 10 AED fee per transaction for predictable costs and stable settlement." },
  { tag: "Validators", title: "Qualified Validator Set", description: "Vetted validators with clear governance and operational requirements." },
  { tag: "Operations", title: "Production Infrastructure", description: "Enterprise-grade deployment with monitoring, availability, and security." },
  { tag: "Finality", title: "Fast Confirmation", description: "Low-latency finality for time-sensitive settlement and user experience." },
];

const stats = [
  { l: "Speed", b: "Fast", p: "Fast transaction confirmation", c: "" },
  { l: "Economics", b: "Predictable", p: "Fixed fees and stable economics", c: "" },
  { l: "Currency", b: "Dirham", p: "10 AED fixed fee per transaction", c: " blue" },
  { l: "Grade", b: "Production", p: "Enterprise-grade infrastructure", c: " dark" },
];

const publicInfra = [
  "Standard RPC endpoints for integrations",
  "Load balancing and availability controls",
  "Denial-of-service protections",
  "Block explorer for transparency and auditing",
  "Monitoring, dashboards, and alerting",
  "Operational tooling for production environments",
];

const sentries = [49, 130, 211];
const validators = [65, 130, 195];

export function Technology() {
  return (
    <section className="wrap" id="technology">
      <div className="bento">
        <div className="tile c7 rv">
          <Lbl blue>Technical architecture</Lbl>
          <h2 className="st2">A production-oriented Layer 1.</h2>
          <p>INFRA provides a production-oriented Layer 1 environment designed for predictable performance and institutional-grade operations.</p>
        </div>
        <div className="tile c5 blue rv" style={{ justifyContent: "flex-end" }}>
          <Lbl>Fee model</Lbl>
          <h3 style={{ fontSize: "clamp(1.25rem,2vw,1.6rem)", fontWeight: 500, letterSpacing: "-.025em", lineHeight: 1.2 }}>
            Instead of gas bidding, the network uses a fixed fee model to support predictable budgeting and stable settlement economics.
          </h3>
        </div>
        {techFeatures.map((f) => (
          <div key={f.title} className="tile c4 hv rv">
            <span className="tag">{f.tag}</span>
            <h3 className="push">{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}

        <div className="tile c5 r2 dark rv">
          <Lbl>Validator Network</Lbl>
          <h2 className="st2">Validator Participation</h2>
          <p>
            Validators secure the network and are compensated from a dedicated portion of transaction fees. INFRA uses a qualified
            validator model intended to support operational reliability and governance suited to commercial and regulated
            environments. Validator slots may be offered to enterprises and institutional partners as part of infrastructure expansion.
          </p>
          <div className="kv push">
            <div><span>Fee-based</span><em>Rewards tied to real on-chain activity</em></div>
            <div><span>Operational</span><em>Reliability and governance for production</em></div>
            <div><span>Qualified</span><em>Vetted validators with clear requirements</em></div>
          </div>
        </div>
        <div className="tile c7 r2 rv">
          <Lbl blue>Node architecture</Lbl>
          <p>INFRA uses a two-tier node layout designed to protect signing keys and reduce public attack surface.</p>
          <div className="diagram push">
            <svg viewBox="0 0 600 260" role="img" aria-label="Public traffic reaches sentry nodes, which relay to validator nodes inside a private network segment">
              <rect x="4" y="100" width="110" height="60" rx="8" fill="#fff" stroke="rgba(10,11,14,.16)" />
              <text x="59" y="126" textAnchor="middle" fill="#0A0B0E" fontSize="12" fontWeight="500">Public traffic</text>
              <text x="59" y="144" textAnchor="middle" fill="rgba(10,11,14,.42)" fontSize="10" style={{ fontFamily: "var(--m)" }}>RPC · apps</text>
              {sentries.map((y) => (
                <g key={y} fontSize="11.5" textAnchor="middle" fontWeight="500">
                  <rect x="190" y={y - 21} width="124" height="42" rx="8" fill="#fff" stroke="#1F5BFF" />
                  <text x="252" y={y + 4} fill="#1F5BFF">Sentry node</text>
                </g>
              ))}
              <rect x="388" y="6" width="206" height="248" rx="12" fill="#EAF0FF" stroke="#1F5BFF" strokeDasharray="3 5" />
              <text x="491" y="27" textAnchor="middle" fill="#1F5BFF" fontSize="9.5" letterSpacing="1.4" style={{ fontFamily: "var(--m)" }}>PRIVATE SEGMENT</text>
              {validators.map((y) => (
                <g key={y} fontSize="11.5" textAnchor="middle">
                  <rect x="412" y={y - 25} width="158" height="50" rx="8" fill="#0A0B0E" />
                  <text x="491" y={y - 4} fill="#fff" fontWeight="500">Validator node</text>
                  <text x="491" y={y + 13} fill="rgba(255,255,255,.55)" fontSize="9.5" style={{ fontFamily: "var(--m)" }}>isolated signing key</text>
                </g>
              ))}
              <g fill="none" stroke="rgba(10,11,14,.16)" strokeWidth="1">
                <path id="p1" d="M114 130 C150 130 155 49 190 49" /><path id="p2" d="M114 130 H190" /><path id="p3" d="M114 130 C150 130 155 211 190 211" />
                <path id="p4" d="M314 49 C352 49 360 65 412 65" /><path id="p5" d="M314 130 H412" /><path id="p6" d="M314 211 C352 211 360 195 412 195" />
              </g>
              <g className="pk">
                {[1, 2, 3, 4, 5, 6].map((n, i) => (
                  <circle key={n} r="3.5" fill={n < 4 ? "#1F5BFF" : "#0A0B0E"}>
                    <animateMotion dur="2.2s" begin={`${[0, 0.7, 1.4, 1.1, 1.8, 0.4][i]}s`} repeatCount="indefinite">
                      <mpath href={`#p${n}`} />
                    </animateMotion>
                  </circle>
                ))}
              </g>
            </svg>
          </div>
          <div className="kv">
            <div><span>Validator nodes</span><em>Run in private network segments with signing keys isolated from the internet.</em></div>
            <div><span>Sentry nodes</span><em>Handle public traffic and relay to validator nodes, reducing attack surface.</em></div>
          </div>
        </div>

        {stats.map((s) => (
          <div key={s.b} className={`tile c3 half stt rv${s.c}`}>
            <Lbl>{s.l}</Lbl>
            <b className="push">{s.b}</b>
            <p>{s.p}</p>
          </div>
        ))}

        <div className="tile c8 rv">
          <Lbl blue>Public infrastructure</Lbl>
          <ul className="chk">
            {publicInfra.map((i) => (
              <li key={i}><Ic n="check" />{i}</li>
            ))}
          </ul>
        </div>
        <div className="tile c4 dark glow rv" style={{ justifyContent: "space-between" }}>
          <Ic n="cpu" className="i ic" />
          <div style={{ display: "grid", gap: 8 }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-.03em" }}>Request technical brief</h3>
            <p>Get detailed technical documentation and specifications.</p>
          </div>
          <Btn href="#contact" label="Request technical brief" variant="w" style={{ alignSelf: "flex-start" }} />
        </div>
      </div>
    </section>
  );
}
