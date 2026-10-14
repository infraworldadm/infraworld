import { Btn, Ic, Lbl } from "@/components/site/ui";

function Odo({ value }: { value: string }) {
  return (
    <span className="odo" data-odo>
      {value.split("").map((d, i) => (
        <i key={i} data-d={d}>
          {Array.from({ length: 10 }, (_, k) => (
            <span key={k}>{k}</span>
          ))}
        </i>
      ))}
      <span className="sr">{value}</span>
    </span>
  );
}

const statement = ["Predictable", "costs.", "Stable", "value.", "Built", "for"];

export function Hero() {
  return (
    <>
      <section className="wrap hero" id="overview">
        <div className="bento">
          <div className="tile c12 t-hero">
            <canvas id="terrain" aria-hidden="true" />
            <div className="fade" aria-hidden="true" />
            <div className="hero-grid">
              <div className="hero-in">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/#networks" className="pill hi">
                  <span className="pd">Stablecoin networks</span>
                  <span className="pl-full">reAED for the UAE Dirham · reUSD · reEUR · reGBP</span>
                  <span className="pl-short">reAED · reUSD · reEUR · reGBP</span>
                  <Ic n="arrow" />
                </a>
                <Lbl blue>reAED · An INFRA network</Lbl>
                <h1 id="h1">
                  <span className="ln"><span>Digital Infrastructure for</span></span>
                  <span className="ln"><span><span className="bl">Payments, Settlement,</span></span></span>
                  <span className="ln"><span>and Tokenized Value</span></span>
                </h1>
                <p className="sub hi">
                  Predictable costs. Stable value. Built for real economies, starting with reAED for the Dirham economy.
                </p>
                <div className="ctas hi">
                  <Btn href="#contact" label="Request a pilot" variant="b" />
                  <Btn href="#contact" label="Talk to Partnerships" variant="o" arrow={false} />
                </div>
              </div>
              <div className="stage" id="stage" data-cursor="Live chain">
                <canvas
                  id="chain"
                  role="img"
                  aria-label="Transactions settle into blocks on an INFRA network, each at a fixed fee"
                />
                <div className="fc fc1">
                  <span className="lbl">Block sealed</span>
                  <b className="tn" id="fcBlk">#1,284,512</b>
                  <small><span id="fcTx">24</span> tx · 10 AED each</small>
                </div>
                <div className="fc fc3">
                  <span className="lbl">Validator</span>
                  <b>Signed · PoSA</b>
                  <small>qualified set</small>
                </div>
                <div className="fc fc2">
                  <span className="okb"><Ic n="check" /></span>
                  <div style={{ display: "grid", gap: 2 }}>
                    <b>Settlement final</b>
                    <small>fee 10.00 reAED</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="hstats">
              <div>
                <span className="lbl">Network fee · reAED</span>
                <b className="tn"><Odo value="10" /><small>AED</small></b>
                <span>Fixed network fee: every transaction costs 10 AED</span>
              </div>
              <div>
                <span className="lbl">Unit of account</span>
                <b className="tn">1:1</b>
                <span>Stable unit of account: reAED is pegged 1:1 to the UAE Dirham</span>
              </div>
              <div>
                <span className="lbl">Operational model</span>
                <b>PoSA</b>
                <span>Qualified validators, clear governance, and production infrastructure</span>
              </div>
              <div>
                <span className="lbl">Runtime</span>
                <b>EVM</b>
                <span>Full compatibility with Ethereum tooling, wallets, and smart contracts</span>
              </div>
            </div>
          </div>

          <div className="tile c8 dark rv">
            <div className="row">
              <Lbl>Settlement stream · reAED network</Lbl>
            </div>
            <div className="ledger" aria-hidden="true">
              <div className="lrow lhead">
                <span>Time</span><span>Tx</span><span className="ty">Type</span><span className="f">Fee</span><span className="s">Status</span>
              </div>
              <div id="lbody" />
            </div>
          </div>
          <div className="tile c4 blue rv" style={{ justifyContent: "space-between" }}>
            <Lbl>Operational model</Lbl>
            <h3 style={{ fontSize: "clamp(1.4rem,2.2vw,1.9rem)", fontWeight: 500, letterSpacing: "-.03em", lineHeight: 1.15 }}>
              Qualified validators, clear governance, and production infrastructure
            </h3>
            <div className="kv">
              <div><span>Fee</span>10 AED fixed</div>
              <div><span>Peg</span>1 reAED = 1 AED</div>
              <div><span>Consensus</span>PoSA</div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <p className="scrub" id="scrub">
          {statement.map((w, i) => (
            <span key={i}>
              <span className="wd">{w}</span>{" "}
            </span>
          ))}
          <span className="wd bl">real</span> <span className="wd bl">economies.</span>
        </p>
      </section>
    </>
  );
}
