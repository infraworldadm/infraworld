// /reaed — reAED (Dirham-pegged stablecoin) page: hero, overview, reAED FAQ, contact.
import type { Metadata } from "next";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ReaedHero } from "@/components/sections/reaed/ReaedHero";
import { Reaed } from "@/components/sections/reaed/Reaed";
import { FAQ } from "@/components/sections/shared/FAQ";
import { reaedFaq } from "@/content/faq";
import { Contact } from "@/components/sections/shared/Contact";
import { Effects } from "@/components/common/Effects";
import { IconSprite } from "@/components/common/ui";

export const metadata: Metadata = {
  title: "reAED \u2014 Dirham-Pegged Stablecoin (AED) on INFRA",
  description: "reAED is a fully collateralised stablecoin pegged 1:1 to the UAE Dirham (AED) with a fixed 10 AED transaction fee \u2014 built for payments, B2B settlement and tokenization in the UAE and MENA.",
  keywords: ["reAED", "AED stablecoin", "Dirham stablecoin", "UAE stablecoin", "dirham-backed token", "UAE digital dirham payments"],
  alternates: { canonical: "/reaed" },
  openGraph: { title: "reAED \u2014 Dirham-Pegged Stablecoin (AED) on INFRA", description: "reAED is a fully collateralised stablecoin pegged 1:1 to the UAE Dirham (AED) with a fixed 10 AED transaction fee \u2014 built for payments, B2B settlement and tokenization in the UAE and MENA.", url: "/reaed", images: ["/opengraph-image"] },
};

/** reAED page composition. */
export default function ReaedPage() {
  return (
    <>
      <IconSprite />
      <JsonLd data={[faqJsonLd(reaedFaq), breadcrumbJsonLd("reAED", "/reaed")]} />
      <Effects />
      <Navigation />
      <main id="top">
        <ReaedHero />
        <Reaed />
        <FAQ items={reaedFaq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
