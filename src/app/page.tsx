// / — INFRA Global home page (platform overview, networks, technology, FAQ, contact).
import { Navigation } from "@/components/layout/Navigation";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL, abs, faqJsonLd } from "@/lib/seo";

import { Footer } from "@/components/layout/Footer";
import { GlobalHero } from "@/components/sections/home/GlobalHero";
import { Infra } from "@/components/sections/home/Infra";
import { EnterpriseProgramStructure } from "@/components/sections/home/EnterpriseProgramStructure";
import { RiskAlignment } from "@/components/sections/home/RiskAlignment";
import { InfrastructureChallenges } from "@/components/sections/home/InfrastructureChallenges";
import { Technology } from "@/components/sections/home/Technology";
import { FAQ } from "@/components/sections/shared/FAQ";
import { globalFaq } from "@/content/faq";
import { Contact } from "@/components/sections/shared/Contact";
import { Effects } from "@/components/common/Effects";
import { IconSprite } from "@/components/common/ui";

/** Home page composition. Effects mounts all scroll/intro animations for this page. */
export default function Home() {
  return (
    <>
      <IconSprite />
      <JsonLd data={[faqJsonLd(globalFaq), {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Stablecoin network infrastructure (white label)",
        serviceType: "Stablecoin-as-a-Service",
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: "Worldwide",
        audience: { "@type": "BusinessAudience", audienceType: "Banks, fintechs, payment providers, exchanges, governments and enterprises" },
        description: "Launch a 1:1 currency-pegged stablecoin network on INFRA's EVM Layer 1 with fixed fees, configurable fee distribution, validators and white-label wallets.",
        url: abs("/build"),
      }]} />
      <Effects />
      <Navigation />
      <main id="top">
        <GlobalHero />
        <Infra />
        <EnterpriseProgramStructure />
        <RiskAlignment />
        <InfrastructureChallenges />
        <Technology />
        <FAQ items={globalFaq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
