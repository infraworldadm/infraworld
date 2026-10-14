import { Navigation } from "@/components/layout/Navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { SITE_URL, abs, faqJsonLd } from "@/lib/seo";

import { Footer } from "@/components/layout/Footer";
import { GlobalHero } from "@/components/sections/GlobalHero";
import { Infra } from "@/components/sections/Infra";
import { EnterpriseProgramStructure } from "@/components/sections/EnterpriseProgramStructure";
import { RiskAlignment } from "@/components/sections/RiskAlignment";
import { InfrastructureChallenges } from "@/components/sections/InfrastructureChallenges";
import { Technology } from "@/components/sections/Technology";
import { FAQ } from "@/components/sections/FAQ";
import { globalFaq } from "@/lib/faq";
import { Contact } from "@/components/sections/Contact";
import { Effects } from "@/components/site/Effects";
import { IconSprite } from "@/components/site/ui";

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
