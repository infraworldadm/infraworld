import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Reaed } from "@/components/sections/Reaed";
import { FAQ } from "@/components/sections/FAQ";
import { reaedFaq } from "@/lib/faq";
import { Contact } from "@/components/sections/Contact";
import { Effects } from "@/components/site/Effects";
import { IconSprite } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "reAED \u2014 Dirham-Pegged Stablecoin (AED) on INFRA",
  description: "reAED is a fully collateralised stablecoin pegged 1:1 to the UAE Dirham (AED) with a fixed 10 AED transaction fee \u2014 built for payments, B2B settlement and tokenization in the UAE and MENA.",
  keywords: ["reAED", "AED stablecoin", "Dirham stablecoin", "UAE stablecoin", "dirham-backed token", "UAE digital dirham payments"],
  alternates: { canonical: "/reaed" },
  openGraph: { title: "reAED \u2014 Dirham-Pegged Stablecoin (AED) on INFRA", description: "reAED is a fully collateralised stablecoin pegged 1:1 to the UAE Dirham (AED) with a fixed 10 AED transaction fee \u2014 built for payments, B2B settlement and tokenization in the UAE and MENA.", url: "/reaed", images: ["/opengraph-image"] },
};

export default function ReaedPage() {
  return (
    <>
      <IconSprite />
      <JsonLd data={[faqJsonLd(reaedFaq), breadcrumbJsonLd("reAED", "/reaed")]} />
      <Effects />
      <Navigation />
      <main id="top">
        <Hero />
        <Reaed />
        <FAQ items={reaedFaq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
