import { Btn, Lbl } from "@/components/site/ui";

const whatYouGet = [
  "A managed go-live path for token programs",
  "Stable-denominated settlement and predictable costs",
  "Reporting exports and audit-friendly flows",
  "Partner onboarding for distribution at scale",
];

const commercialModel = [
  "Setup and go-live fees",
  "Recurring platform services",
  "Usage-linked economics as programs scale",
  "Anchor-tenant programs for baseline throughput",
];

const k = (n: number) => ({ ["--k" as string]: n }) as React.CSSProperties;

export function EnterpriseProgramStructure() {
  return (
    <section className="wrap sec" id="enterprise">
      <div className="bento">
        <div className="tile c5 rv">
          <Lbl blue>Enterprise tokenization</Lbl>
          <h2 className="st2">Enterprise tokenization &amp; custom stablecoins</h2>
          <p>
            INFRA supports enterprise programs to launch tokens and stable-value instruments with predictable network costs and
            Dirham-denominated settlement via reAED.
          </p>
          <p>
            Programs are designed for commercial deployment: operational onboarding, reporting exports, and controlled rollouts
            through enterprise and partner channels.
          </p>
        </div>
        <div className="tile c7 dark glow rv">
          <Lbl>Enterprise program structure</Lbl>
          <div className="bento" style={{ ["--gap" as string]: "24px", gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
            {[
              ["What you get", whatYouGet],
              ["Commercial model", commercialModel],
            ].map(([title, items]) => (
              <div key={title as string} className="half" style={{ gridColumn: "span 1" }}>
                <p style={{ color: "#fff", fontWeight: 500, marginBottom: 6 }}>{title as string}</p>
                <ul className="list">
                  {(items as string[]).map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <Btn href="#contact" label="Discuss an enterprise token program" variant="b" className="push" style={{ alignSelf: "flex-start" }} />
        </div>

        <div className="tile c4 rv">
          <div className="v2 vtok" aria-hidden="true"><span>Internal credit</span><span>Loyalty unit</span><span>Asset-backed</span></div>
          <h3 className="push">Enterprise tokenization</h3>
          <p>Launch custom tokens for internal credits, loyalty, or asset-backed value—under your rules and reporting.</p>
        </div>
        <div className="tile c4 rv">
          <div className="v2 vsc" aria-hidden="true">
            <span className="tk b">Your brand</span><span className="ln"><i /></span><span className="tk">reAED</span>
            <small>Dirham settlement · fixed fee</small>
          </div>
          <h3 className="push">Custom stablecoins</h3>
          <p>Issue branded stable-value instruments with Dirham settlement and fixed fees.</p>
        </div>
        <div className="tile c4 rv">
          <div className="v2 vbar" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} style={k(i)} />)}</div>
          <h3 className="push">Program-based settlement</h3>
          <p>Run token programs with clear settlement reporting and auditable on-chain flows.</p>
        </div>
        <div className="tile c4 rv">
          <div className="v2 vroll" aria-hidden="true">
            <div className="trk"><i /><b style={{ left: 0 }} /><b style={{ left: "50%" }} /><b style={{ left: "100%" }} /></div>
            <div className="ms"><span>Setup</span><span>Pilot</span><span>Go-live</span></div>
          </div>
          <h3 className="push">Operational rollout</h3>
          <p>Managed path for setup and go-live, for enterprise timelines and controlled deployments.</p>
        </div>
        <div className="tile c4 rv">
          <div className="v2" aria-hidden="true">
            <svg viewBox="0 0 300 132" preserveAspectRatio="xMidYMid meet">
              <g stroke="rgba(10,11,14,.18)" fill="none">
                <path id="h1p" d="M150 66 L60 30" /><path id="h2p" d="M150 66 L60 102" /><path id="h3p" d="M150 66 L240 30" />
                <path id="h4p" d="M150 66 L240 102" /><path id="h5p" d="M150 66 L150 14" /><path id="h6p" d="M150 66 L150 118" />
              </g>
              <g fill="#fff" stroke="rgba(10,11,14,.25)">
                <circle cx="60" cy="30" r="9" /><circle cx="60" cy="102" r="9" /><circle cx="240" cy="30" r="9" />
                <circle cx="240" cy="102" r="9" /><circle cx="150" cy="14" r="7" /><circle cx="150" cy="118" r="7" />
              </g>
              <circle cx="150" cy="66" r="18" fill="#1F5BFF" />
              <text x="150" y="70" textAnchor="middle" fill="#fff" fontSize="10" style={{ fontFamily: "var(--m)" }}>INFRA</text>
              <g className="pk" fill="#1F5BFF">
                {[1, 2, 3, 4, 5, 6].map((n, i) => (
                  <circle key={n} r="3">
                    <animateMotion dur="1.8s" begin={`${i * 0.3}s`} repeatCount="indefinite">
                      <mpath href={`#h${n}p`} />
                    </animateMotion>
                  </circle>
                ))}
              </g>
            </svg>
          </div>
          <h3 className="push">Partner distribution</h3>
          <p>Scale via fintech and payment partners with onboarding, SLAs, and reporting exports.</p>
        </div>
        <div className="tile c4 rv">
          <div className="v2 vcon" aria-hidden="true">
            <div><span>Platform services</span><b>Recurring</b></div>
            <div><span>Usage-linked</span><b className="tn" id="useCnt">12,480 tx</b></div>
            <div><span>Program</span><b className="ok">Active</b></div>
          </div>
          <h3 className="push">Managed token programs</h3>
          <p>Contract-based programs with recurring platform services and usage-linked economics.</p>
        </div>
      </div>
    </section>
  );
}
