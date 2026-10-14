// /wallet — INFRA Wallet download page (extension + Android). Store links: config/wallet.ts.
import type { Metadata } from "next";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL, abs, breadcrumbJsonLd } from "@/lib/seo";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/shared/Contact";
import { Effects } from "@/components/common/Effects";
import { Btn, IconSprite, Lbl } from "@/components/common/ui";
import { Phone } from "@/components/wallet/Phone";
import { WALLET_LINKS } from "@/config/wallet";
import { BUILD_FORM_URL } from "@/config/links";

export const metadata: Metadata = {
  title: "INFRA Wallet \u2014 Multi-chain Self-custodial Crypto Wallet (Extension & Android)",
  description: "Download INFRA Wallet: a self-custodial multi-chain wallet for INFRA, Ethereum, BNB Chain and TRON. Hold reAED, swap and bridge \u2014 browser extension and Android app. White-label ready.",
  keywords: ["INFRA Wallet", "multi-chain wallet", "self-custodial wallet", "white label crypto wallet", "reAED wallet", "crypto wallet Android", "Chrome wallet extension"],
  alternates: { canonical: "/wallet" },
  openGraph: { title: "INFRA Wallet \u2014 Multi-chain Self-custodial Crypto Wallet (Extension & Android)", description: "Download INFRA Wallet: a self-custodial multi-chain wallet for INFRA, Ethereum, BNB Chain and TRON. Hold reAED, swap and bridge \u2014 browser extension and Android app. White-label ready.", url: "/wallet", images: ["/opengraph-image"] },
};

const LOGO = "/wallet/infra-wallet-logo.png";

/** Store/download button. Renders a disabled "Coming soon" state when href is empty. */
function StoreBtn({ href, kind, sub, title }: { href: string; kind: "chrome" | "android" | "ios" | "apk"; sub: string; title: string }) {
  const icon = {
    chrome: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M12 8h9M8.5 14l-4.5 7.5M15.5 14 11 21.8" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>,
    android: <svg viewBox="0 0 24 24"><path d="M4 4.5v15l9-7.5zM4 4.5 16.5 12M4 19.5 16.5 12M13 12l3.5-3 3.5 3-3.5 3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
    apk: <svg viewBox="0 0 24 24"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 19h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
    ios: <svg viewBox="0 0 24 24"><path d="M16.5 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.9-.9-3.1-.8C6.9 7.3 5.4 8.2 4.6 9.7c-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.7 2.4 3 2.4 1.2-.1 1.6-.8 3.1-.8s1.8.8 3.1.8 2.1-1.2 2.9-2.3c.9-1.3 1.3-2.6 1.3-2.7 0 0-2.6-1-2.7-4.1zM14.2 5.5c.6-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.3z" fill="currentColor" /></svg>,
  }[kind];
  const ready = Boolean(href);
  return (
    <a className={`store${ready ? "" : " soon"}`} href={ready ? href : undefined} target={ready ? "_blank" : undefined} rel="noopener noreferrer" aria-disabled={!ready}>
      <span className="store-i">{icon}</span>
      <span><small>{ready ? sub : "Coming soon"}</small><b>{title}</b></span>
    </a>
  );
}

const features = [
  { tag: "Multi-chain", title: "One wallet, four networks", text: "Manage assets on INFRA, Ethereum, BNB Chain and TRON from a single self-custodial wallet — built to add new chains as adoption grows.", chips: ["INFRA", "Ethereum", "BNB Chain", "TRON"] },
  { tag: "Instant swaps", title: "Swap inside the wallet", text: "Same-network swaps without leaving the app: reAED ⇄ USDT, USDC ⇄ USDT, ETH ⇄ USDC and more, with clear fees and slippage before you confirm.", chips: ["Select", "Review", "Swap", "Done"] },
  { tag: "Cross-chain bridge", title: "Move assets between chains", text: "An integrated bridge moves supported assets between INFRA, Ethereum, BNB Chain and TRON — no separate bridging site needed.", chips: ["INFRA → BNB", "ETH → INFRA", "TRON → ETH"] },
  { tag: "Security-first", title: "Your keys. Your control.", text: "Keys are encrypted and never leave your device. Face ID / biometrics and a passcode protect every session and transaction.", chips: ["On-device keys", "Face ID", "Passcode"] },
  { tag: "Multi-currency", title: "See value in AED", text: "Choose a primary currency (e.g. AED) for portfolio values and a secondary one (e.g. USD) for reference.", chips: ["Primary · AED", "Secondary · USD"] },
  { tag: "Multi-wallet", title: "Organise every wallet", text: "Create or import multiple wallets and switch instantly — personal, business, trading and investments stay separate.", chips: ["Personal", "Business", "Trading", "Investments"] },
];

const steps = {
  extension: ["Open the official Chrome Web Store link above", "Click “Add to Chrome” and pin INFRA Wallet", "Create a new wallet or import an existing one", "Write down your recovery phrase and store it offline"],
  android: ["Open the official Google Play link above", "Tap “Install” and open INFRA Wallet", "Create or import a wallet and set a passcode", "Enable biometrics and back up your recovery phrase"],
};

/** Wallet download page composition. */
export default function WalletPage() {
  return (
    <>
      <IconSprite />
      <JsonLd data={[{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "INFRA Wallet",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Android, Chrome, Brave, Edge",
        description: "Self-custodial multi-chain wallet for INFRA, Ethereum, BNB Chain and TRON with in-wallet swaps and cross-chain bridge.",
        url: abs("/wallet"),
        image: abs("/wallet/infra-wallet-logo.png"),
        publisher: { "@id": `${SITE_URL}/#org` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }, breadcrumbJsonLd("INFRA Wallet", "/wallet")]} />
      <Effects />
      <Navigation />
      <main id="top">
        {/* Hero */}
        <section className="wrap hero">
          <div className="tile w-hero">
            <div className="w-hero-grid">
              <div className="w-copy">
                <span className="w-badge">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOGO} alt="" width={28} height={28} /> INFRA Wallet
                </span>
                <h1>
                  One wallet.
                  <br />
                  <span className="bl">Multiple networks.</span>
                  <br />
                  One seamless experience.
                </h1>
                <p className="sub">
                  A self-custodial wallet for reAED and the INFRA network — plus Ethereum, BNB Chain and TRON. Send, swap and
                  bridge without juggling multiple wallets, exchanges or bridging sites.
                </p>
                <div className="stores" id="download">
                  <StoreBtn href={WALLET_LINKS.chrome} kind="chrome" sub="Get the extension for" title="Chrome & Brave" />
                  <StoreBtn href={WALLET_LINKS.android} kind="android" sub="Get it on" title="Google Play" />
                </div>
                <p className="w-note">Browser extension for Chromium browsers and Android app. No web app — your keys stay on your device.</p>
              </div>
              <div className="w-stage">
                <div className="w-ring" aria-hidden="true" />
                <Phone screen="home" className="p-main" />
                <Phone screen="swap" className="p-side" />
                <div className="w-chip c1"><span className="dot" />reAED received <b>+110.00</b></div>
                <div className="w-chip c2">Swap · 10 reAED fee</div>
                <div className="w-chip c3">Bridge · INFRA → BNB Chain</div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="wrap sec" id="platforms">
          <div className="bento">
            <div className="tile c12 rv" style={{ gap: 8 }}>
              <Lbl blue>Download</Lbl>
              <h2 className="st2">Choose your platform.</h2>
              <p>Only install INFRA Wallet from the official links on this page.</p>
            </div>
            <div className="tile c6 dark rv w-plat">
              <Lbl>Browser extension</Lbl>
              <h3 className="w-h3">INFRA Wallet for desktop</h3>
              <p>Works with Chrome, Brave, Edge and other Chromium browsers. Connect to dApps on INFRA and EVM networks.</p>
              <div className="stores">
                <StoreBtn href={WALLET_LINKS.chrome} kind="chrome" sub="Available on the" title="Chrome Web Store" />
              </div>
              <ol className="w-steps">{steps.extension.map((s) => <li key={s}>{s}</li>)}</ol>
            </div>
            <div className="tile c6 blue rv w-plat">
              <Lbl>Mobile</Lbl>
              <h3 className="w-h3">INFRA Wallet for Android</h3>
              <p>Full wallet on your phone: Face ID / biometrics, swaps, bridge, activity and reID Connect.</p>
              <div className="stores">
                <StoreBtn href={WALLET_LINKS.android} kind="android" sub="Get it on" title="Google Play" />
                {WALLET_LINKS.apk && <StoreBtn href={WALLET_LINKS.apk} kind="apk" sub="Direct download" title="Android APK" />}
                <StoreBtn href={WALLET_LINKS.ios} kind="ios" sub="Download on the" title="App Store" />
              </div>
              <ol className="w-steps">{steps.android.map((s) => <li key={s}>{s}</li>)}</ol>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="wrap" id="features">
          <div className="bento">
            {features.map((f) => (
              <div key={f.tag} className="tile c6 rv w-feat">
                <Lbl blue>{f.tag}</Lbl>
                <h3 className="w-h3">{f.title}</h3>
                <p>{f.text}</p>
                <div className="w-chips push">{f.chips.map((c, k) => <span key={c} style={{ animationDelay: `${k * 0.4}s` }}>{c}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Screens */}
        <section className="wrap sec" id="screens">
          <div className="tile rv" style={{ gap: 8, marginBottom: "var(--gap)" }}>
            <Lbl blue>Inside the app</Lbl>
            <h2 className="st2">Fewer steps. Faster execution.</h2>
            <p>From opening the wallet to completing a swap or bridge, every step is designed to reduce friction.</p>
          </div>
          <div className="w-gallery rv">
            {(["home", "swap", "bridge", "activity", "settings"] as const).map((s) => (
              <figure key={s}>
                <Phone screen={s} />
                <figcaption>{s === "home" ? "Portfolio" : s[0].toUpperCase() + s.slice(1)}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Roadmap + white label */}
        <section className="wrap">
          <div className="bento">
            <div className="tile c7 rv">
              <Lbl blue>INFRA platform</Lbl>
              <h3 className="w-h3">Designed for the next generation of Web3.</h3>
              <div className="w-road">
                <div><small>Today</small><b>INFRA, Ethereum, BNB Chain, TRON</b><span>Live in one decentralized app.</span></div>
                <div><small>Next</small><b>Additional chains</b><span>New networks and assets on the same architecture.</span></div>
                <div><small>Future</small><b>Multi-chain finance</b><span>A broader interconnected financial ecosystem.</span></div>
              </div>
            </div>
            <div className="tile c5 dark rv">
              <Lbl>White label</Lbl>
              <h3 className="w-h3">Launch your own branded wallet.</h3>
              <p>INFRA Wallet is white-label ready: your brand, your networks and your pegged stablecoin, on a production-tested self-custodial wallet.</p>
              <Btn href={BUILD_FORM_URL} label="Build your white-label wallet" variant="w" className="push" />
            </div>
            <div className="tile c12 rv w-safe">
              <b>Stay safe:</b> INFRA will never ask for your recovery phrase or private key. Only download INFRA Wallet from the
              links on this page. See our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms">Terms &amp; Conditions</a>.
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
