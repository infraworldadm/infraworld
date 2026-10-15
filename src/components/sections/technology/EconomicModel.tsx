// Technology page: transaction-based economic model + validator income calculator + capability marquee.
import { Lbl } from "@/components/common/ui";
import { Calculator } from "@/components/sections/technology/Calculator";

const band = ["Pegged stablecoin networks", "10 AED fixed fee on reAED", "1:1 currency peg", "PoSA consensus", "EVM compatible", "Auditable flows"];

/** Fee → revenue flow and the interactive calculator. */
export function EconomicModel() {
  return (
    <>
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
