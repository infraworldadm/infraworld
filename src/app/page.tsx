import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { GlobalHero } from "@/components/sections/GlobalHero";
import { Infra } from "@/components/sections/Infra";
import { EnterpriseProgramStructure } from "@/components/sections/EnterpriseProgramStructure";
import { RiskAlignment } from "@/components/sections/RiskAlignment";
import { InfrastructureChallenges } from "@/components/sections/InfrastructureChallenges";
import { Technology } from "@/components/sections/Technology";
import { FAQ, globalFaq } from "@/components/sections/FAQ";
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
