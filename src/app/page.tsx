import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Infra } from "@/components/sections/Infra";
import { Reaed } from "@/components/sections/Reaed";
import { EnterpriseProgramStructure } from "@/components/sections/EnterpriseProgramStructure";
import { RiskAlignment } from "@/components/sections/RiskAlignment";
import { InfrastructureChallenges } from "@/components/sections/InfrastructureChallenges";
import { Technology } from "@/components/sections/Technology";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Effects } from "@/components/site/Effects";
import { IconSprite } from "@/components/site/ui";

export default function Home() {
  return (
    <>
      <IconSprite />
      <Effects />
      <Navigation />
      <main id="top">
        <Hero />
        <Infra />
        <Reaed />
        <EnterpriseProgramStructure />
        <RiskAlignment />
        <InfrastructureChallenges />
        <Technology />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
