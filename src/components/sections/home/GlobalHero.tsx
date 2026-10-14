// Home hero: INFRA Global headline + animated globe (canvas drawn by lib/canvas.ts → globe()).
import { Btn, Ic, Lbl } from "@/components/common/ui";
import { BUILD_FORM_URL } from "@/config/links";

/** Home hero. The globe <canvas id="globe"> is started by Effects. */
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
                an EVM-compatible chain. reAED is live; reUSD, reEUR, reGBP, reINR, reSAR and your own currency follow on the same stack.
              </p>
              <div className="ctas hi">
                <Btn href={BUILD_FORM_URL} label="Launch a currency network" variant="b" />
                <Btn href="/reaed" label="Explore reAED" variant="o" />
              </div>
            </div>
            <div className="stage" id="stage" data-cursor="Global">
              <canvas id="globe" role="img" aria-label="The INFRA core connecting to pegged stablecoin networks around the world: reAED (live), reUSD, reEUR, reGBP, reINR, reSAR, reSGD, reJPY and your currency" />
              <div className="fc fc1">
                <span className="lbl">Networks</span>
                <b className="tn">1 live · any fiat ready</b>
                <small>reAED · reUSD · reEUR · reGBP · reINR · reSAR …</small>
              </div>
              <div className="fc fc2">
                <span className="okb"><Ic n="check" /></span>
                <div style={{ display: "grid", gap: 2 }}>
                  <b>Same stack, any peg</b>
                  <small>fixed fee per network</small>
                </div>
              </div>
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
