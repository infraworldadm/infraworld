import type { Metadata } from "next";
import { SubPage } from "@/components/layout/SubPage";
import { Lbl } from "@/components/site/ui";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions | INFRA",
  description: `Terms governing use of the ${LEGAL.product} app, browser extension, INFRA network and infraworld.org.`,
};

const { entity: E, product: P, email: M, site: S } = LEGAL;

export default function Terms() {
  return (
    <SubPage>
      <div className="sp-head">
        <div>
          <Lbl blue>Legal</Lbl>
          <h1>Terms &amp; Conditions</h1>
          <p>Effective date: {LEGAL.effective}</p>
        </div>
      </div>

      <article className="legal">
        <div className="callout">
          <p>
            <strong>Please read carefully.</strong> {P} is self-custodial software. You alone control your private
            keys and recovery phrase. If you lose them, <strong>no one — including INFRA — can recover your
            assets</strong>. Blockchain transactions are final and irreversible.
          </p>
        </div>

        <ul className="toc">
          <li><a href="#acceptance">1. Acceptance</a></li>
          <li><a href="#eligibility">2. Eligibility</a></li>
          <li><a href="#services">3. The Services</a></li>
          <li><a href="#self-custody">4. Self-custody &amp; security</a></li>
          <li><a href="#transactions">5. Transactions &amp; fees</a></li>
          <li><a href="#reaed">6. reAED &amp; digital assets</a></li>
          <li><a href="#third-party">7. Third-party services</a></li>
          <li><a href="#prohibited">8. Prohibited use</a></li>
          <li><a href="#risks">9. Risk disclosure</a></li>
          <li><a href="#no-advice">10. No financial advice</a></li>
          <li><a href="#ip">11. Intellectual property &amp; licence</a></li>
          <li><a href="#disclaimers">12. Disclaimers</a></li>
          <li><a href="#liability">13. Limitation of liability</a></li>
          <li><a href="#indemnity">14. Indemnity</a></li>
          <li><a href="#termination">15. Suspension &amp; termination</a></li>
          <li><a href="#app-stores">16. App store terms</a></li>
          <li><a href="#law">17. Governing law &amp; disputes</a></li>
          <li><a href="#general">18. General</a></li>
          <li><a href="#contact">19. Contact</a></li>
        </ul>

        <h2 id="acceptance">1. Acceptance of these Terms</h2>
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) form a binding agreement between you and {E}
          (&quot;INFRA&quot;, &quot;we&quot;, &quot;us&quot;) governing your use of the {P} mobile application, the {P}
          browser extension, the website at {S}, and related tools and interfaces to the INFRA network (the
          &quot;Services&quot;). By downloading, installing or using the Services you agree to these Terms and to our{" "}
          <a href="/privacy-policy">Privacy Policy</a>. If you do not agree, do not use the Services.
        </p>

        <h2 id="eligibility">2. Eligibility</h2>
        <ul>
          <li>You must be at least 18 years old (or the age of majority where you live) and have full legal capacity to enter into these Terms.</li>
          <li>You must not be located in, or a citizen or resident of, any country or territory subject to comprehensive sanctions, and you must not be listed on any sanctions list maintained by the UAE, the United Nations, the United States (OFAC), the European Union or the United Kingdom.</li>
          <li>You are responsible for ensuring that your use of the Services is lawful in your jurisdiction. Certain features may be unavailable in some regions.</li>
        </ul>

        <h2 id="services">3. The Services</h2>
        <p>{P} is non-custodial software that lets you:</p>
        <ul>
          <li>create or import wallets and manage your own private keys locally on your device;</li>
          <li>view balances and history and send or receive reAED and other supported tokens on the INFRA network and supported networks;</li>
          <li>connect to decentralised applications (dApps) and third-party services such as bridges and swap providers;</li>
          <li>view public on-chain information, such as INFRA fee-distribution pool balances.</li>
        </ul>
        <p>
          INFRA does <strong>not</strong> hold, custody, control or have access to your assets or keys; does not act as
          your broker, agent, intermediary, bank, exchange or fiduciary; and does not execute transactions on your
          behalf. All transactions are initiated and signed by you. We may add, change or remove features at any time.
        </p>

        <h2 id="self-custody">4. Self-custody &amp; security</h2>
        <ul>
          <li>You are solely responsible for safeguarding your device, password/PIN, private keys and recovery phrase.</li>
          <li>Write down your recovery phrase and store it offline in a secure place. Never share it with anyone. INFRA will <strong>never</strong> ask for it.</li>
          <li>If you lose your recovery phrase, or it is stolen, your assets may be permanently lost. INFRA cannot reset passwords, restore access, or recover funds.</li>
          <li>You are responsible for keeping the app and your device operating system up to date and free of malware.</li>
        </ul>

        <h2 id="transactions">5. Transactions &amp; fees</h2>
        <ul>
          <li>Blockchain transactions are <strong>irreversible</strong>. Always verify the recipient address, network and amount before confirming.</li>
          <li>Network fees apply to transactions. On the INFRA network the applicable fee is displayed before you confirm. Fees on other networks are set by those networks and may vary.</li>
          <li>Third-party services (such as bridges or swap providers) may charge their own fees, which are shown by them.</li>
          <li>INFRA does not guarantee that a transaction will be confirmed, or confirmed within any particular time.</li>
          <li>Sending assets to an incorrect address or unsupported network may result in permanent loss.</li>
        </ul>

        <h2 id="reaed">6. reAED &amp; digital assets</h2>
        <p>
          reAED is a digital token designed to track the value of the UAE Dirham (AED) on a 1:1 basis on the INFRA
          network. reAED is <strong>not</strong> legal tender, is not issued by the Central Bank of the UAE, and is not a
          bank deposit or protected by any deposit insurance scheme. The availability of reAED, and of any issuance,
          redemption, conversion or other virtual-asset activity, is subject to applicable laws and regulations,
          including those of the Virtual Assets Regulatory Authority (VARA) and other competent UAE authorities, and
          may be limited or unavailable in your jurisdiction. Displayed fiat values are estimates only.
        </p>

        <h2 id="third-party">7. Third-party services</h2>
        <p>
          The Services may let you access dApps, bridges, liquidity pools, partner applications (such as reID) and
          other third-party products. These are not operated or controlled by INFRA. Your use of them is at your own
          risk and subject to their terms. INFRA does not endorse and is not responsible for any third-party service,
          content, smart contract or loss arising from its use.
        </p>

        <h2 id="prohibited">8. Prohibited use</h2>
        <p>You agree not to use the Services to:</p>
        <ul>
          <li>violate any law or regulation, including anti-money-laundering, counter-terrorist-financing and sanctions laws;</li>
          <li>engage in fraud, scams, phishing, market manipulation or other deceptive activity;</li>
          <li>finance or facilitate terrorism, human trafficking, illegal drugs, weapons, gambling where unlawful, or other illegal activities;</li>
          <li>infringe the intellectual property or other rights of others;</li>
          <li>reverse engineer, decompile, modify, or distribute modified versions of the app except as permitted by law or an applicable open-source licence;</li>
          <li>interfere with, attack, overload or disrupt the Services, the INFRA network or its nodes, or attempt unauthorised access to any system.</li>
        </ul>

        <h2 id="risks">9. Risk disclosure</h2>
        <p>Using digital assets and blockchain technology involves significant risks, including:</p>
        <ul>
          <li>loss of funds due to lost keys, user error, device compromise, phishing or malicious software;</li>
          <li>software bugs, vulnerabilities or failures in wallets, smart contracts, bridges or networks;</li>
          <li>de-pegging risk — a pegged token may trade at or be redeemable for less than its target value;</li>
          <li>network congestion, forks, outages, validator failures or changes in protocol rules;</li>
          <li>regulatory changes that may restrict or prohibit the use of digital assets or the Services;</li>
          <li>price volatility of digital assets other than pegged tokens.</li>
        </ul>
        <p>You should only use the Services if you understand these risks and can afford potential losses.</p>

        <h2 id="no-advice">10. No financial advice</h2>
        <p>
          Nothing in the Services, including information on {S}, constitutes investment, financial, legal or tax advice,
          or an offer or solicitation to buy or sell any asset. Any figures, projections or calculators are for general
          information only. Consult qualified professionals before making decisions.
        </p>

        <h2 id="ip">11. Intellectual property &amp; licence</h2>
        <p>
          The Services, including the INFRA name, logos, designs and software, are owned by INFRA or its licensors.
          Subject to these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable licence to
          install and use the app on devices you own or control, for your personal, lawful use. Open-source components
          are governed by their respective licences.
        </p>

        <h2 id="disclaimers">12. Disclaimers</h2>
        <p>
          THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT, ACCURACY OR UNINTERRUPTED AVAILABILITY, TO THE MAXIMUM EXTENT PERMITTED BY LAW. We do not
          warrant that the Services will be error-free, secure or free of harmful components, or that balances, prices
          or other data displayed will be accurate or current.
        </p>

        <h2 id="liability">13. Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, INFRA AND ITS AFFILIATES, DIRECTORS, EMPLOYEES AND PARTNERS SHALL NOT
          BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF DIGITAL
          ASSETS, PROFITS, DATA OR GOODWILL, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICES, INCLUDING LOSS OF
          KEYS, UNAUTHORISED ACCESS, USER ERROR, THIRD-PARTY SERVICES OR NETWORK FAILURES. OUR TOTAL AGGREGATE
          LIABILITY SHALL NOT EXCEED USD 100 (OR ITS EQUIVALENT IN AED). Nothing in these Terms limits liability that
          cannot be limited under applicable law.
        </p>

        <h2 id="indemnity">14. Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless INFRA and its affiliates from any claims, losses, liabilities and
          expenses (including reasonable legal fees) arising from your use of the Services, your breach of these Terms,
          or your violation of any law or third-party right.
        </p>

        <h2 id="termination">15. Suspension &amp; termination</h2>
        <p>
          You may stop using the Services at any time by removing your wallet and uninstalling the app. We may suspend
          or restrict access to any part of the Services we operate (such as RPC endpoints or website features) if
          required by law or if we reasonably believe you have breached these Terms. Because the wallet is
          self-custodial, you can always access your assets on-chain using your recovery phrase with compatible
          software.
        </p>

        <h2 id="app-stores">16. App store terms</h2>
        <p>
          If you download {P} from the Apple App Store or Google Play, you acknowledge that these Terms are between you
          and INFRA only, not Apple Inc. or Google LLC (&quot;Store Providers&quot;). INFRA, not the Store Provider, is
          solely responsible for the app, its content, maintenance, support, warranty (to the extent not disclaimed),
          and for addressing any claims relating to the app, including product liability, legal or regulatory
          compliance, consumer protection and intellectual property claims. Store Providers have no obligation to
          provide maintenance or support. In the event of any failure of the app to conform to an applicable warranty,
          you may notify Apple, and Apple will refund the purchase price (if any); to the maximum extent permitted by
          law, Apple has no other warranty obligation. You represent that you are not located in a country subject to a
          U.S. Government embargo or designated as a &quot;terrorist supporting&quot; country, and are not on any U.S.
          Government list of prohibited or restricted parties. Apple and its subsidiaries are third-party beneficiaries
          of these Terms and may enforce them against you. You must also comply with the applicable Store Provider&apos;s
          terms of service.
        </p>

        <h2 id="law">17. Governing law &amp; disputes</h2>
        <p>
          These Terms are governed by the laws of the United Arab Emirates as applied in {LEGAL.jurisdiction}. Any
          dispute arising from or relating to these Terms or the Services shall be subject to the exclusive jurisdiction
          of the courts of Dubai, UAE, unless mandatory consumer protection law in your country of residence provides
          otherwise. Before starting proceedings, please contact us so we can try to resolve the matter informally.
        </p>

        <h2 id="general">18. General</h2>
        <ul>
          <li><strong>Changes:</strong> we may update these Terms. The effective date above shows the current version. Material changes will be announced on this page or in the app; continued use means acceptance.</li>
          <li><strong>Severability:</strong> if any provision is found unenforceable, the rest remain in effect.</li>
          <li><strong>No waiver:</strong> failure to enforce a provision is not a waiver.</li>
          <li><strong>Assignment:</strong> you may not assign these Terms; we may assign them in connection with a reorganisation or sale.</li>
          <li><strong>Entire agreement:</strong> these Terms and the Privacy Policy are the entire agreement between you and INFRA regarding the Services.</li>
          <li><strong>Language:</strong> if these Terms are translated, the English version prevails.</li>
        </ul>

        <h2 id="contact">19. Contact</h2>
        <p>
          {E}
          <br />
          Dubai, United Arab Emirates
          <br />
          Email: <a href={`mailto:${M}`}>{M}</a>
          <br />
          Website: <a href={S}>{S}</a>
        </p>
      </article>
    </SubPage>
  );
}
