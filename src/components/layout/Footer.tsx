/* eslint-disable @next/next/no-html-link-for-pages -- full page loads so home-page effects and hash scrolling initialise */
import { BuildCta } from "@/components/site/BuildCta";
import { FloatingBuild } from "@/components/site/FloatingBuild";
import { BUILD_FORM_URL } from "@/lib/links";

const COLS: { title: string; links: [string, string][] }[] = [
  { title: "Platform", links: [["INFRA", "/#infra"], ["Networks", "/#networks"], ["reAED", "/reaed"], ["Technology", "/#technology"], ["FAQ", "/#faq"]] },
  { title: "Products", links: [["INFRA Wallet", "/wallet"], ["Pool Balances", "/balances"], ["Build / White label", BUILD_FORM_URL]] },
  { title: "Company", links: [["Contact", "/#contact"], ["info@infraworld.com", "mailto:info@infraworld.com"]] },
  { title: "Legal", links: [["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms"]] },
];

export function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <>
      {cta && <BuildCta />}
      {cta && <FloatingBuild />}
      <footer className="site wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="/" className="brand" aria-label="INFRA home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Logo/infra-logo-light.svg" alt="INFRA" width={80} height={24} />
            </a>
            <p>Pegged stablecoin network infrastructure. reAED for the Dirham economy.</p>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title} className="foot-col">
              <h4>{c.title}</h4>
              {c.links.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
            </nav>
          ))}
        </div>
        <div className="foot-bar">
          <span>© {new Date().getFullYear()} INFRA. All rights reserved.</span>
          <span>Dubai, United Arab Emirates</span>
        </div>
      </footer>
    </>
  );
}
