import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { IconSprite } from "@/components/site/ui";
import { BuildForm } from "@/components/build/BuildForm";

export const metadata: Metadata = {
  title: "Build with INFRA | Launch a Stablecoin Network or White-label Wallet",
  description:
    "Configure your INFRA setup: currency network or dedicated chain, fee logic, pool distribution, Android / iOS / extension wallets and add-on modules.",
};

export default function BuildPage() {
  return (
    <>
      <IconSprite />
      <Navigation />
      <main className="wrap bf-wrap">
        <BuildForm />
      </main>
      <Footer cta={false} />
    </>
  );
}
