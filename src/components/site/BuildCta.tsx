import { BUILD_FORM_URL } from "@/lib/links";

const TICKERS = ["reAED", "reUSD", "reEUR", "reGBP", "reINR", "reSAR", "reSGD", "reJPY", "+ yours"];

/** Site-wide call to action: build a network or white-label on INFRA (Typeform intake). */
export function BuildCta() {
  return (
    <section className="wrap build-cta" aria-label="Build with INFRA">
      <div className="bc-card">
        <div className="bc-marquee" aria-hidden="true">
          <div>
            {[...TICKERS, ...TICKERS].map((t, i) => <span key={i} className={t === "reAED" ? "is-live" : t.startsWith("+") ? "you" : ""}>{t}</span>)}
          </div>
        </div>
        <div className="bc-body">
          <div>
            <span className="bc-tag"><i />White label · Build on INFRA</span>
            <h2>Launch your own stablecoin network, wallet or chain.</h2>
            <p>Pick what you need — currency peg, fee logic, pool distribution, Android / iOS / extension wallets, bridge and more. Takes about 4 minutes.</p>
          </div>
          <a className="bc-btn" href={BUILD_FORM_URL}>
            <span className="bc-ring" aria-hidden="true" />
            <span>Start building</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
