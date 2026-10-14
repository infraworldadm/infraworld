import { Btn, Ic, Lbl } from "@/components/site/ui";

const nodes = [
  { sym: "reAED", cur: "UAE Dirham", x: 90, y: 90, live: true },
  { sym: "reUSD", cur: "US Dollar", x: 430, y: 90 },
  { sym: "reEUR", cur: "Euro", x: 90, y: 370 },
  { sym: "reGBP", cur: "British Pound", x: 430, y: 370 },
];
const C = { x: 260, y: 230 };

/** Network-of-networks visual: one INFRA core, a pegged stablecoin network per currency. Pure SVG + CSS (light on mobile). */
function NetworkStage() {
  return (
    <svg viewBox="0 0 520 460" className="gstage" role="img" aria-label="INFRA core connecting pegged stablecoin networks: reAED, reUSD, reEUR and reGBP">
      <defs>
        <radialGradient id="gglow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#1F5BFF" stopOpacity=".22" />
          <stop offset="1" stopColor="#1F5BFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C.x} cy={C.y} r="200" fill="url(#gglow)" />
      <circle cx={C.x} cy={C.y} r="150" className="g-orbit" />
      <circle cx={C.x} cy={C.y} r="105" className="g-orbit g-orbit2" />
      {nodes.map((n, i) => (
        <g key={n.sym}>
          <path id={`gl${i}`} d={`M${C.x} ${C.y} L${n.x} ${n.y}`} className={`g-link${n.live ? " live" : ""}`} />
          {[0, 1, 2].map((k) => (
            <circle key={k} r={n.live ? 4 : 3} className={`g-pk${n.live ? " live" : ""}`}>
              <animateMotion dur={n.live ? "2.4s" : "4.2s"} begin={`${k * (n.live ? 0.8 : 1.4)}s`} repeatCount="indefinite" keyPoints={i % 2 ? "0;1" : "1;0"} keyTimes="0;1" calcMode="linear">
                <mpath href={`#gl${i}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
      ))}
      {nodes.map((n) => (
        <g key={n.sym + "n"} transform={`translate(${n.x} ${n.y})`} className={`g-node${n.live ? " live" : ""}`}>
          {n.live && <circle r="46" className="g-ping" />}
          <rect x="-58" y="-30" width="116" height="60" rx="14" />
          <text y="-3" textAnchor="middle" className="g-sym">{n.sym}</text>
          <text y="16" textAnchor="middle" className="g-cur">{n.live ? "Live · " : ""}{n.cur}</text>
        </g>
      ))}
      <g transform={`translate(${C.x} ${C.y})`} className="g-core">
        <rect x="-62" y="-62" width="124" height="124" rx="26" className="g-core-b" transform="rotate(45)" />
        <text y="-2" textAnchor="middle" className="g-core-t">INFRA</text>
        <text y="18" textAnchor="middle" className="g-core-s">Layer 1 · EVM</text>
      </g>
    </svg>
  );
}

export function GlobalHero() {
  return (
    <section className="wrap hero" id="overview">
      <div className="bento">
        <div className="tile c12 t-hero">
          <canvas id="terrain" aria-hidden="true" />
          <div className="fade" aria-hidden="true" />
          <div className="hero-grid">
            <div className="hero-in">
              <a href="/reaed" className="pill hi">
                <span className="pd">First network</span>
                <span className="pl-full">reAED · pegged 1:1 to the UAE Dirham is live</span>
                <span className="pl-short">reAED is live</span>
                <Ic n="arrow" />
              </a>
              <Lbl blue>INFRA Global · Pegged stablecoin network infrastructure</Lbl>
              <h1 id="h1">
                <span className="ln"><span>One Layer 1.</span></span>
                <span className="ln"><span><span className="bl">A stable network</span></span></span>
                <span className="ln"><span>for every currency.</span></span>
              </h1>
              <p className="sub hi">
                INFRA gives economies their own pegged stablecoin network — fixed fees, stable value and auditable flows on
                an EVM-compatible chain. reAED is first; reUSD, reEUR and reGBP follow on the same stack.
              </p>
              <div className="ctas hi">
                <Btn href="#contact" label="Launch a currency network" variant="b" />
                <Btn href="/reaed" label="Explore reAED" variant="o" />
              </div>
            </div>
            <div className="stage" id="stage" data-cursor="Networks">
              <NetworkStage />
            </div>
          </div>
          <div className="hstats">
            <div>
              <span className="lbl">Model</span>
              <b>Pegged</b>
              <span>Each network uses a 1:1 currency-pegged stablecoin as its unit of account</span>
            </div>
            <div>
              <span className="lbl">Fees</span>
              <b>Fixed</b>
              <span>Flat, protocol-enforced fee per transaction — no gas auctions</span>
            </div>
            <div>
              <span className="lbl">Consensus</span>
              <b>PoSA</b>
              <span>Qualified validators, clear governance and production infrastructure</span>
            </div>
            <div>
              <span className="lbl">Runtime</span>
              <b>EVM</b>
              <span>Full compatibility with Ethereum tooling, wallets and smart contracts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
