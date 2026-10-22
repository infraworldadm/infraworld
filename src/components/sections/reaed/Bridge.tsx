// reAED page: cross-chain bridge — INFRA ↔ Ethereum, BNB Chain, TRON (animated SVG, pure CSS motion).
import { Btn, Lbl } from "@/components/common/ui";
import { DirhamIcon } from "@/components/common/DirhamIcon";

const CHAINS = [
  { name: "Ethereum", tag: "ETH", color: "#627EEA", y: 52 },
  { name: "BNB Chain", tag: "BNB", color: "#F3BA2F", y: 150 },
  { name: "TRON", tag: "TRX", color: "#EB0029", y: 248 },
];
const TOKENS = ["USDT", "USDC", "reAED"];

/** Small two-column bridge section: copy + animated route diagram. */
export function Bridge() {
  return (
    <section className="wrap blk" id="bridge">
      <div className="bento">
        <div className="tile c5 rv br-copy">
          <Lbl blue>Cross-chain bridge</Lbl>
          <h2 className="st2">Move value between INFRA and the major chains.</h2>
          <p>Bridge USDT, USDC and reAED between INFRA, Ethereum, BNB Chain and TRON — built into INFRA Wallet, no third-party bridge sites.</p>
          <div className="br-chips">
            {TOKENS.map((t) => <span key={t}>{t}</span>)}
          </div>
          <div className="br-stats">
            <div><b>3</b><span>connected chains</span></div>
            <div><b>2-way</b><span>to and from INFRA</span></div>
          </div>
          <Btn href="/wallet" label="Bridge in INFRA Wallet" variant="k" className="push" />
        </div>

        <div className="tile c7 dark rv br-viz" aria-label="Animated diagram: tokens moving between INFRA and Ethereum, BNB Chain and TRON">
          <svg viewBox="0 0 560 300" className="br-svg" aria-hidden="true">
            {CHAINS.map((c, i) => (
              <g key={c.tag}>
                <path id={`brp${i}`} d={`M120 150 C 250 150, 260 ${c.y}, 390 ${c.y}`} className="br-path" />
                <path d={`M120 150 C 250 150, 260 ${c.y}, 390 ${c.y}`} className="br-flow" style={{ animationDelay: `${i * 0.5}s` }} />
                {/* outbound (INFRA → chain) and inbound (chain → INFRA) packets */}
                <circle r="4.5" className="br-pk out">
                  <animateMotion dur="2.6s" begin={`${i * 0.7}s`} repeatCount="indefinite"><mpath href={`#brp${i}`} /></animateMotion>
                </circle>
                <circle r="4.5" className="br-pk in" style={{ ["--cc" as string]: c.color }}>
                  <animateMotion dur="2.6s" begin={`${1.3 + i * 0.7}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href={`#brp${i}`} /></animateMotion>
                </circle>
                <g transform={`translate(390 ${c.y})`} className="br-chain">
                  <rect x="0" y="-22" width="142" height="44" rx="12" />
                  <circle cx="22" cy="0" r="11" fill={c.color} />
                  <text x="22" y="4" textAnchor="middle" className="br-tag">{c.tag[0]}</text>
                  <text x="41" y="-2" className="br-name">{c.name}</text>
                  <text x="41" y="11" className="br-sub">{c.tag}</text>
                </g>
              </g>
            ))}
            <g transform="translate(70 150)" className="br-hub">
              <circle r="48" className="br-ring" />
              <circle r="38" className="br-core" />
              <text y="-4" textAnchor="middle" className="br-hub-t">INFRA</text>
              <text y="12" textAnchor="middle" className="br-hub-s">L1 · reAED</text>
            </g>
          </svg>
          <div className="br-tx">
            <span className="br-coin"><DirhamIcon /></span>
            <div><b>Bridging 250 USDT</b><small>INFRA → BNB Chain</small></div>
            <span className="br-ok">Confirmed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
