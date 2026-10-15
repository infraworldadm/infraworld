// Home: three-step "how it works" strip for launching a network on INFRA.
import { Btn, Lbl } from "@/components/common/ui";
import { BUILD_FORM_URL } from "@/config/links";

const STEPS = [
  { n: "01", t: "Pick your currency", d: "Choose the peg, token name and backing model." },
  { n: "02", t: "Configure the network", d: "Set fee logic, pool split and validators — or use our defaults." },
  { n: "03", t: "Launch with wallets", d: "Go live with Android, iOS and extension wallets, bridge and DEX." },
];

/** Numbered steps with an animated connector; ends with the Build CTA. */
export function HowItWorks() {
  return (
    <section className="wrap sec" id="how">
      <div className="tile rv how">
        <div className="row" style={{ alignItems: "flex-end" }}>
          <div style={{ display: "grid", gap: 10 }}>
            <Lbl blue>How it works</Lbl>
            <h2 className="st2">Launch a currency network in three steps.</h2>
          </div>
          <Btn href={BUILD_FORM_URL} label="Start building" variant="b" />
        </div>
        <ol className="how-steps">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="how-n">{s.n}</span>
              <b>{s.t}</b>
              <span>{s.d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
