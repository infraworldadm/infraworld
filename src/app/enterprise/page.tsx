// /enterprise — enterprise tokenization and custom stablecoin programmes on INFRA.
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { EnterpriseProgramStructure } from "@/components/sections/enterprise/EnterpriseProgramStructure";
import { TokenTypes } from "@/components/sections/enterprise/TokenTypes";
import { Contact } from "@/components/sections/shared/Contact";
import { Effects } from "@/components/common/Effects";
import { IconSprite, Lbl } from "@/components/common/ui";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Enterprise Tokenization & Custom Stablecoins",
  description: "Issue loyalty points, internal credits, asset-backed units or a branded stablecoin on INFRA's shared infrastructure, with your own fee and reward logic.",
  alternates: { canonical: "/enterprise" },
  openGraph: { title: "Enterprise Tokenization on INFRA", description: "Custom tokens and stablecoins for enterprises on shared infrastructure.", url: "/enterprise", images: ["/opengraph-image"] },
};

/** Enterprise page composition. */
export default function EnterprisePage() {
  return (
    <>
      <IconSprite />
      <JsonLd data={breadcrumbJsonLd("Enterprise", "/enterprise")} />
      <Effects />
      <Navigation />
      <main id="top" className="subtop">
        <section className="wrap page-intro">
          <Lbl blue>Enterprise</Lbl>
          <h1>Tokenization for enterprises.</h1>
          <p>Launch loyalty, credits, asset-backed units or your own branded stablecoin — settling on INFRA.</p>
        </section>
        <EnterpriseProgramStructure />
        <TokenTypes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
