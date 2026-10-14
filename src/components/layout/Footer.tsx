/* eslint-disable @next/next/no-html-link-for-pages -- full page loads so home-page effects and hash scrolling initialise */
import { BuildCta } from "@/components/site/BuildCta";
import { FloatingBuild } from "@/components/site/FloatingBuild";
import { BUILD_FORM_URL } from "@/lib/links";

export function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <>
    {cta && <BuildCta />}
    {cta && <FloatingBuild />}
    <footer className="site wrap">
      <div className="foot">
        <a href="/" className="brand" aria-label="INFRA home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo/infra-logo-light.svg" alt="INFRA" width={80} height={24} />
        </a>
        <span>Pegged stablecoin network infrastructure. reAED for the Dirham economy.</span>
        <nav aria-label="Footer">
          <a href="/#infra">INFRA</a>
          <a href="/#networks">Networks</a>
          <a href="/reaed">reAED</a>
          <a href="/#technology">Technology</a>
          <a href="/#faq">FAQ</a>
          <a href="/balances">Pool Balances</a>
          <a href="/wallet">Wallet</a>
          <a href="/#contact">Contact</a>
        </nav>
        <nav aria-label="Legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
          <a href={BUILD_FORM_URL}>Build / White label</a>
        </nav>
        <span>© {new Date().getFullYear()} INFRA. All rights reserved.</span>
      </div>
    </footer>
    </>
  );
}
