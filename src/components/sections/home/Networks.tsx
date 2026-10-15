// Home: stablecoin networks grid (one card per currency) + "Your currency".
import { Btn, Ic, Lbl } from "@/components/common/ui";
import { BUILD_FORM_URL } from "@/config/links";

const networks = [
  { sym: "reAED", cur: "AED", name: "UAE Dirham", status: "First network · INFRA project", main: true, href: "/reaed" },
  { sym: "reUSD", cur: "USD", name: "US Dollar", status: "On request", href: BUILD_FORM_URL },
  { sym: "reEUR", cur: "EUR", name: "Euro", status: "On request", href: BUILD_FORM_URL },
  { sym: "reGBP", cur: "GBP", name: "British Pound", status: "On request", href: BUILD_FORM_URL },
];

/** Currency network cards. reAED links to its page; others open the Build form. */
export function Networks() {
  return (
      <section className="wrap" id="networks" style={{ paddingTop: "var(--gap)" }}>
        <div className="tile rv">
          <div className="row" style={{ alignItems: "flex-end" }}>
            <div style={{ display: "grid", gap: 12, maxWidth: 720 }}>
              <Lbl blue>Stablecoin networks</Lbl>
              <h2 className="st2">One infrastructure. A pegged stablecoin for each currency.</h2>
            </div>
            <Btn href={BUILD_FORM_URL} label="Launch a currency network" variant="k" />
          </div>
          <p style={{ maxWidth: "60ch" }}>Each network has its own 1:1 pegged stablecoin and fixed fee, on the same validator model.</p>
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
            <a href={BUILD_FORM_URL} className="net add">
              <span className="plus"><Ic n="plus" /></span>
              <span style={{ fontWeight: 500 }}>Your currency</span>
              <span className="peg1">Launch with INFRA</span>
            </a>
          </div>
        </div>
      </section>

  );
}
