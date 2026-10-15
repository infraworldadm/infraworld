// Home: four core properties (fixed fee, stable peg, auditable flows, governance) with mini animations driven by Effects.
import { Lbl } from "@/components/common/ui";

/** "Why INFRA" — four short tiles with small animated visuals. */
export function Pillars() {
  return (
      <section className="wrap blk" id="why">
        <div className="bento">
          <div className="tile c3 rv">
            <Lbl>Why INFRA</Lbl>
            <div className="viz">
              <svg viewBox="0 0 220 110" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 70 C20 30 30 90 50 50 S80 20 100 70 S140 95 160 40 S200 60 220 30" fill="none" stroke="rgba(10,11,14,.25)" strokeWidth="1.2" />
                <path d="M0 58 H220" stroke="#1F5BFF" strokeWidth="2" />
                <circle className="vdot" r="4" fill="#1F5BFF" cy="58" cx="0" />
              </svg>
            </div>
            <h3>Fixed fee per transaction</h3>
            <p>One flat fee per transaction, set by network governance — not by congestion or gas auctions.</p>
          </div>
          <div className="tile c3 rv">
            <Lbl>Why INFRA</Lbl>
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
            <Lbl>Why INFRA</Lbl>
            <div className="viz"><div className="hashes" id="hashes" /></div>
            <h3>Auditable flows</h3>
            <p>On-chain, verifiable transactions and fees for oversight and reporting.</p>
          </div>
          <div className="tile c3 rv">
            <Lbl>Why INFRA</Lbl>
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

  );
}
