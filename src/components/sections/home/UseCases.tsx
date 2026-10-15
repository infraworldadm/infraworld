// Home: four use-case cards (one line each); each opens the Build form.
import { Ic, Lbl } from "@/components/common/ui";
import { BUILD_FORM_URL } from "@/config/links";

const applications = [
  { icon: "store", title: "Payments", description: "Accept and settle in stable, local-currency value." },
  { icon: "swap", title: "B2B settlement", description: "Move value between businesses at a fixed, known cost." },
  { icon: "gift", title: "Loyalty & rewards", description: "Issue points or credits that settle in a pegged stablecoin." },
  { icon: "code", title: "Developers", description: "Build apps on EVM with predictable fees." },
];

/** Use-case cards. */
export function UseCases() {
  return (
      <section className="wrap sec" id="use-cases">
        <div className="bento">
          <div className="tile c12 rv" style={{ gap: 8 }}>
            <Lbl blue>Use cases</Lbl>
            <h2 className="st2">Where stable settlement does the work.</h2>
          </div>
          {applications.map((a) => (
            <a key={a.title} href={BUILD_FORM_URL} className="tile c3 app rv">
              <span className="go"><Ic n="arrow" /></span>
              <Ic n={a.icon} className="i ic" />
              <h3 className="push">{a.title}</h3>
              <p>{a.description}</p>
            </a>
          ))}
        </div>
      </section>
  );
}
