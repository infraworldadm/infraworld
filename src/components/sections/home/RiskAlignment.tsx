// Home: oversight, reserves and operational alignment.
import { Lbl } from "@/components/common/ui";

const k = (n: number) => ({ ["--k" as string]: n }) as React.CSSProperties;

/** Oversight & alignment section. */
export function RiskAlignment() {
  return (
    <section className="wrap" id="risk">
      <div className="bento">
        <div className="tile c8 rv">
          <Lbl blue>Regulatory &amp; risk alignment</Lbl>
          <h2 className="st2">Designed for oversight.</h2>
          <p>
            INFRA is designed to support oversight, auditability, and controlled operational models expected in commercial
            environments. The system emphasizes transparent value flows, reserve discipline for reAED, and defined roles for
            infrastructure participants.
          </p>
        </div>
        <div className="tile c4 blue rv">
          <Lbl>Notice</Lbl>
          <p className="push" style={{ color: "#fff" }}>
            INFRA is infrastructure technology. Compliance requirements depend on jurisdiction, use case, and integration model.
            This section is informational and not legal advice.
          </p>
        </div>
        <div className="tile c4 rv">
          <div className="v2 vaud" aria-hidden="true">
            <div style={k(0)}><i />Transaction verified</div>
            <div style={k(1)}><i />Fee distribution logged</div>
            <div style={k(2)}><i />Audit trail exported</div>
          </div>
          <h3 className="push">Oversight &amp; auditability</h3>
          <p>On-chain transactions and fee distributions are verifiable, supporting monitoring, reporting, and audit trails.</p>
        </div>
        <div className="tile c4 rv">
          <div className="v2 vres" aria-hidden="true">
            <div><b /><span>Reserves</span></div>
            <em>=</em>
            <div><b /><span>reAED supply</span></div>
          </div>
          <h3 className="push">Reserve model principles</h3>
          <p>
            reAED is intended to follow a controlled mint-and-burn model tied to reserves, designed to support Dirham-denominated
            settlement.
          </p>
        </div>
        <div className="tile c4 rv">
          <div className="v2 vrole" aria-hidden="true">
            {["Validators", "Sentries", "Operators"].map((r, ri) => (
              <span key={r} style={{ display: "contents" }}>
                <span>{r}</span>
                {Array.from({ length: 5 }, (_, i) => <i key={i} style={k(ri * 5 + i)} />)}
              </span>
            ))}
          </div>
          <h3 className="push">Operational accountability</h3>
          <p>A qualified validator set and production infrastructure practices support reliability and clearer governance responsibilities.</p>
        </div>
      </div>
    </section>
  );
}
