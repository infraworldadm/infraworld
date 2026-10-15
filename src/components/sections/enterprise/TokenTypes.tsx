// Enterprise page: token types an enterprise can issue on INFRA.
import { Lbl } from "@/components/common/ui";

/** Dark tile listing enterprise token types. */
export function TokenTypes() {
  return (
    <section className="wrap" style={{ paddingTop: "var(--gap)" }}>
      <div className="bento">
          <div className="tile c12 dark rv">
            <div className="bento" style={{ ["--gap" as string]: "28px" }}>
              <div className="c5" style={{ display: "grid", gap: 14, alignContent: "start" }}>
                <Lbl>Infrastructure application</Lbl>
                <h2 className="st2">Enterprise tokenization</h2>
                <p>
                  Deploy tokens representing internal credits, asset-backed units, or branded payment instruments—using shared
                  infrastructure.
                </p>
              </div>
              <ul className="list c7">
                <li>Internal credits<span>TOKEN</span></li>
                <li>Asset-backed units<span>TOKEN</span></li>
                <li>Branded payment instruments<span>TOKEN</span></li>
                <li>Shared infrastructure<span>INFRA L1</span></li>
              </ul>
            </div>
          </div>
      </div>
    </section>
  );
}
