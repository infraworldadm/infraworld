import { Navigation } from "@/components/layout/Navigation";
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
      <footer className="site wrap">
        <div className="foot">
          <a href="#top" className="brand" aria-label="INFRA home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo/infra-logo-light.svg" alt="INFRA" width={80} height={24} />
          </a>
          <span>Pegged stablecoin network infrastructure. reAED for the Dirham economy.</span>
          <nav aria-label="Footer">
            <a href="#infra">INFRA</a>
            <a href="#networks">Networks</a>
            <a href="#reaed">reAED</a>
            <a href="#risk">Risk &amp; alignment</a>
            <a href="#technology">Technology</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <span>© INFRA. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
