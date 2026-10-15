// /technology — how INFRA works: network profile, fixed fees vs gas, oversight, tech stack, validators, economics, full FAQ.
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatIsInfra } from "@/components/sections/technology/WhatIsInfra";
import { InfrastructureChallenges } from "@/components/sections/technology/InfrastructureChallenges";
import { RiskAlignment } from "@/components/sections/technology/RiskAlignment";
import { Technology } from "@/components/sections/technology/Technology";
import { EconomicModel } from "@/components/sections/technology/EconomicModel";
import { FAQ } from "@/components/sections/shared/FAQ";
import { Contact } from "@/components/sections/shared/Contact";
import { Effects } from "@/components/common/Effects";
import { IconSprite, Lbl } from "@/components/common/ui";
import { JsonLd } from "@/components/common/JsonLd";
import { globalFaq } from "@/content/faq";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Technology — EVM Layer 1, Fixed Fees, PoSA Validators",
  description: "How INFRA works: an EVM-compatible Layer 1 with protocol-enforced fixed fees, a qualified PoSA validator set, auditable flows and a usage-based economic model.",
  alternates: { canonical: "/technology" },
  openGraph: { title: "INFRA Technology", description: "EVM Layer 1 with fixed fees, PoSA validators and auditable flows.", url: "/technology", images: ["/opengraph-image"] },
};

/** Technology page composition. */
export default function TechnologyPage() {
  return (
    <>
      <IconSprite />
      <JsonLd data={breadcrumbJsonLd("Technology", "/technology")} />
      <Effects />
      <Navigation />
      <main id="top" className="subtop">
        <section className="wrap page-intro">
          <Lbl blue>Technology</Lbl>
          <h1>How INFRA works.</h1>
          <p>The Layer 1, the fee model, governance and validator economics behind every INFRA currency network.</p>
        </section>
        <WhatIsInfra />
        <InfrastructureChallenges />
        <RiskAlignment />
        <Technology />
        <EconomicModel />
        <FAQ items={globalFaq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
