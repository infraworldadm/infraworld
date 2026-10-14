// /build — "Build with INFRA" configurator (multi-step lead form, see components/build/BuildForm).
import type { Metadata } from "next";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL, abs, breadcrumbJsonLd } from "@/lib/seo";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { IconSprite } from "@/components/common/ui";
import { BuildForm } from "@/components/build/BuildForm";

export const metadata: Metadata = {
  title: "Launch Your Own Stablecoin or White-label Wallet",
  description: "Configure your stablecoin network on INFRA in 4 minutes: currency peg, fee logic, pool distribution, validators, Android / iOS / extension wallets, bridge and more. For banks, fintechs, governments and enterprises worldwide.",
  keywords: ["launch your own stablecoin", "white label stablecoin", "stablecoin as a service", "white label wallet", "create a stablecoin", "custom blockchain for banks"],
  alternates: { canonical: "/build" },
  openGraph: { title: "Launch Your Own Stablecoin or White-label Wallet", description: "Configure your stablecoin network on INFRA in 4 minutes: currency peg, fee logic, pool distribution, validators, Android / iOS / extension wallets, bridge and more. For banks, fintechs, governments and enterprises worldwide.", url: "/build", images: ["/opengraph-image"] },
};

/** Build page: renders the configurator form without the site-wide Build CTA. */
export default function BuildPage() {
  return (
    <>
      <IconSprite />
      <JsonLd data={[{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Stablecoin network infrastructure (white label)",
        serviceType: "Stablecoin-as-a-Service",
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: "Worldwide",
        audience: { "@type": "BusinessAudience", audienceType: "Banks, fintechs, payment providers, exchanges, governments and enterprises" },
        description: "Launch a 1:1 currency-pegged stablecoin network on INFRA's EVM Layer 1 with fixed fees, configurable fee distribution, validators and white-label wallets.",
        url: abs("/build"),
      }, breadcrumbJsonLd("Build with INFRA", "/build")]} />
      <Navigation />
      <main className="wrap bf-wrap">
        <BuildForm />
      </main>
      <Footer cta={false} />
    </>
  );
}
