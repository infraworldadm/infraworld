// / — INFRA Global home page: short and visual. Detail lives on /technology and /enterprise.
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { GlobalHero } from "@/components/sections/home/GlobalHero";
import { Networks } from "@/components/sections/home/Networks";
import { Pillars } from "@/components/sections/home/Pillars";
import { UseCases } from "@/components/sections/home/UseCases";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { Proof } from "@/components/sections/home/Proof";
import { FAQ } from "@/components/sections/shared/FAQ";
import { Contact } from "@/components/sections/shared/Contact";
import { Effects } from "@/components/common/Effects";
import { IconSprite } from "@/components/common/ui";
import { JsonLd } from "@/components/common/JsonLd";
import { homeFaq } from "@/content/faq";
import { SITE_URL, abs, faqJsonLd } from "@/lib/seo";

/** Home page composition. Effects mounts all scroll/intro animations for this page. */
export default function Home() {
  return (
    <>
      <IconSprite />
      <JsonLd
        data={[
          faqJsonLd(homeFaq),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Stablecoin network infrastructure (white label)",
            serviceType: "Stablecoin-as-a-Service",
            provider: { "@id": `${SITE_URL}/#org` },
            areaServed: "Worldwide",
            audience: { "@type": "BusinessAudience", audienceType: "Banks, fintechs, payment providers, exchanges, governments and enterprises" },
            description: "Launch a 1:1 currency-pegged stablecoin network on INFRA's EVM Layer 1 with fixed fees, configurable fee distribution, validators and white-label wallets.",
            url: abs("/build"),
          },
        ]}
      />
      <Effects />
      <Navigation />
      <main id="top">
        <GlobalHero />
        <Networks />
        <Pillars />
        <UseCases />
        <HowItWorks />
        <Proof />
        <FAQ items={homeFaq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
