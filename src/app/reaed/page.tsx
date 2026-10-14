import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Reaed } from "@/components/sections/Reaed";
import { FAQ, reaedFaq } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Effects } from "@/components/site/Effects";
import { IconSprite } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "reAED - Dirham-Pegged Stablecoin Network | INFRA",
  description:
    "reAED is INFRA's first network: a stablecoin pegged 1:1 to the UAE Dirham with a fixed 10 AED transaction fee, PoSA consensus and EVM compatibility.",
};

export default function ReaedPage() {
  return (
    <>
      <IconSprite />
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
