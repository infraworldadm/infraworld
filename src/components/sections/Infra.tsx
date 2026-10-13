import { Btn, Ic, Lbl } from "@/components/site/ui";
import { Calculator } from "@/components/site/Calculator";

const networks = [
  { sym: "reAED", cur: "AED", name: "UAE Dirham", status: "First network · INFRA project", main: true, href: "#reaed" },
  { sym: "reUSD", cur: "USD", name: "US Dollar", status: "On request", href: "#contact" },
  { sym: "reEUR", cur: "EUR", name: "Euro", status: "On request", href: "#contact" },
  { sym: "reGBP", cur: "GBP", name: "British Pound", status: "On request", href: "#contact" },
];

const applications = [
  { icon: "store", title: "Payments & merchant settlement", description: "Accept and settle with stable Dirham-denominated value." },
  { icon: "swap", title: "B2B settlement rails", description: "Move value between business entities with predictable costs and traceable settlement." },
  { icon: "gift", title: "Tokenized loyalty and rewards", description: "Issue loyalty units or credits with configurable rules, while settling in reAED." },
  { icon: "code", title: "Developer and partner ecosystems", description: "Build apps that rely on stable fees and predictable economics." },
];

const band = ["Pegged stablecoin networks", "10 AED fixed fee on reAED", "1:1 currency peg", "PoSA consensus", "EVM compatible", "Auditable flows"];

export function Infra() {
  return (
    <>
      {/* What is INFRA */}
      <section className="wrap" id="infra">
        <div className="bento">
          <div className="tile c7 rv">
            <Lbl blue>What is INFRA?</Lbl>
            <h2 className="st2">An EVM-compatible Layer 1 for pegged stablecoin networks.</h2>
            <p>
              INFRA is an EVM-compatible Layer 1 blockchain designed for the UAE and the wider MENA region. It provides a stable and
              transparent foundation for payments, settlement, and tokenized value flows.
            </p>
            <p>
              A qualified Proof of Staked Authority validator set provides fast confirmation, clear governance, and an operational
              model suited to commercial and regulated environments.
            </p>
          </div>
          <div className="tile c5 dark rv">
            <Lbl>Network profile</Lbl>
            <div className="kv push">
              <div><span>Type</span>Layer 1</div>
              <div><span>Runtime</span>EVM-compatible</div>
              <div><span>Consensus</span>Proof of Staked Authority</div>
              <div><span>Region</span>UAE &amp; MENA</div>
              <div><span>Unit of account</span>Pegged stablecoin</div>
              <div><span>First network</span>reAED · 10 AED / tx</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stablecoin networks */}
      <section className="wrap" id="networks" style={{ paddingTop: "var(--gap)" }}>
        <div className="tile rv">
          <div className="row" style={{ alignItems: "flex-end" }}>
            <div style={{ display: "grid", gap: 12, maxWidth: 720 }}>
              <Lbl blue>Stablecoin networks</Lbl>
              <h2 className="st2">One infrastructure. A pegged stablecoin for each currency.</h2>
            </div>
            <Btn href="#contact" label="Launch a currency network" variant="k" />
          </div>
          <p style={{ maxWidth: "70ch" }}>
            INFRA is not limited to one currency. It provides pegged stablecoin network infrastructure: each network uses a stablecoin
            pegged 1:1 to its currency as the unit of account, with fixed, currency-denominated transaction fees and the same qualified
            validator model. reAED, pegged to the UAE Dirham, is INFRA&apos;s first project. The same infrastructure can support reUSD,
            reEUR, reGBP and other currency networks.
          </p>
          <div className="nets">
            {networks.map((n) => (
              <a key={n.sym} href={n.href} className={`net${n.main ? " main" : ""}`}>
                <div className="cc">
                  <span className="sym">{n.sym}</span>
                  <span className="peg1">{n.cur}</span>
                </div>
                <svg className="wave2" viewBox="0 0 200 34" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 17 H200" stroke={n.main ? "rgba(255,255,255,.35)" : "rgba(10,11,14,.2)"} strokeWidth="1" />
                  <path className="flow2" d="M0 17 H200" stroke={n.main ? "#fff" : "#1F5BFF"} strokeWidth="2" fill="none" />
                </svg>
                <span className="peg1">1 {n.sym} = 1 {n.cur} · {n.name}</span>
                <span className="st">{n.status}</span>
              </a>
            ))}
            <a href="#contact" className="net add">
              <span className="plus"><Ic n="plus" /></span>
              <span style={{ fontWeight: 500 }}>Your currency</span>
              <span className="peg1">Talk to Partnerships</span>
            </a>
          </div>
        </div>
      </section>

      {/* Core infrastructure features */}
      <section className="wrap" style={{ paddingTop: "var(--gap)" }}>
        <div className="bento">
          <div className="tile c3 rv">
            <Lbl>Core feature</Lbl>
            <div className="viz">
              <svg viewBox="0 0 220 110" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 70 C20 30 30 90 50 50 S80 20 100 70 S140 95 160 40 S200 60 220 30" fill="none" stroke="rgba(10,11,14,.25)" strokeWidth="1.2" />
                <path d="M0 58 H220" stroke="#1F5BFF" strokeWidth="2" />
                <circle className="vdot" r="4" fill="#1F5BFF" cy="58" cx="0" />
              </svg>
            </div>
            <h3>10 AED per transaction</h3>
            <p>Every transaction has a 10 AED fixed cost, independent of congestion and market conditions.</p>
          </div>
          <div className="tile c3 rv">
            <Lbl>Core feature</Lbl>
            <div className="viz">
              <svg viewBox="0 0 220 110" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 55 H220" stroke="#0A0B0E" strokeWidth="1.2" />
                <path d="M0 55 H220" stroke="#1F5BFF" strokeWidth="1.2" strokeDasharray="4 4" />
                <text x="10" y="44" fontSize="10" fill="rgba(10,11,14,.55)" style={{ fontFamily: "var(--m)" }}>AED 1.0000</text>
                <text x="210" y="76" textAnchor="end" fontSize="10" fill="#1F5BFF" style={{ fontFamily: "var(--m)" }}>reAED 1.0000</text>
              </svg>
            </div>
            <h3>Dirham-native digital currency</h3>
            <p>reAED is pegged 1:1 to AED for fees, payments, and settlement.</p>
          </div>
          <div className="tile c3 rv">
            <Lbl>Core feature</Lbl>
            <div className="viz"><div className="hashes" id="hashes" /></div>
            <h3>Auditable flows</h3>
            <p>On-chain, verifiable transactions and fees for oversight and reporting.</p>
          </div>
          <div className="tile c3 rv">
            <Lbl>Core feature</Lbl>
            <div className="viz">
              <div className="vset">
                {Array.from({ length: 7 }, (_, k) => <i key={k} style={{ ["--k" as string]: k }} />)}
              </div>
            </div>
            <h3>Qualified governance</h3>
            <p>A PoSA validator set is designed for operational reliability and clear governance.</p>
          </div>
        </div>
      </section>

      {/* Infrastructure applications */}
      <section className="wrap sec">
        <div className="bento">
          <div className="tile c4 r2 rv" style={{ justifyContent: "space-between" }}>
            <Lbl blue>Infrastructure applications</Lbl>
            <h2 className="st2">Where stable settlement does the work.</h2>
            <p className="push">Payments, B2B rails, loyalty, developer ecosystems and enterprise tokenization on one network.</p>
          </div>
          {applications.map((a) => (
            <a key={a.title} href="#contact" className="tile c4 app rv">
              <span className="go"><Ic n="arrow" /></span>
              <Ic n={a.icon} className="i ic" />
              <h3 className="push">{a.title}</h3>
              <p>{a.description}</p>
            </a>
          ))}
          <div className="tile c12 dark rv">
            <div className="bento" style={{ ["--gap" as string]: "28px" }}>
              <div className="c5" style={{ display: "grid", gap: 14, alignContent: "start" }}>
                <Lbl>Infrastructure application</Lbl>
                <h2 className="st2">Enterprise tokenization</h2>
                <p>
                  Deploy tokens representing internal credits, asset-backed units, or branded payment instruments—using shared
                  infrastructure.
                </p>
              </div>
              <ul className="list c7">
                <li>Internal credits<span>TOKEN</span></li>
                <li>Asset-backed units<span>TOKEN</span></li>
                <li>Branded payment instruments<span>TOKEN</span></li>
                <li>Shared infrastructure<span>INFRA L1</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Economic model */}
      <section className="wrap">
        <div className="bento">
          <div className="tile c5 rv">
            <Lbl blue>Economic model</Lbl>
            <h2 className="st2">Income that follows usage, not market cycles.</h2>
            <p>
              INFRA operates on a transaction-based revenue model. Each transaction pays a fixed 10 AED fee, creating a predictable
              income stream that grows with real usage rather than market cycles.
            </p>
            <div className="flow push">
              <div className="fn"><b>Transaction</b><small>Input</small></div>
              <div className="wr" />
              <div className="fn on"><b>10</b><small>AED fixed fee</small></div>
              <div className="wr" />
              <div className="fn"><b>Network Revenue</b><small>Output</small></div>
            </div>
          </div>
          <Calculator />
        </div>
      </section>

      <div className="bandb" aria-hidden="true">
        <div className="mq2" id="mq2">
          {[0, 1].map((k) => (
            <div key={k}>
              {band.map((t) => <span key={t}>{t}</span>)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
