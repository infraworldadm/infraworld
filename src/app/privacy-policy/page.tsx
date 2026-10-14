import type { Metadata } from "next";
import { SubPage } from "@/components/layout/SubPage";
import { Lbl } from "@/components/site/ui";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How INFRA handles information in the INFRA Wallet app, browser extension and infraworld.org.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title: "Privacy Policy", description: "How INFRA handles information in the INFRA Wallet app, browser extension and infraworld.org.", url: "/privacy-policy", images: ["/opengraph-image"] },
};

const { entity: E, product: P, email: M, site: S } = LEGAL;

export default function PrivacyPolicy() {
  return (
    <SubPage>
      <div className="sp-head">
        <div>
          <Lbl blue>Legal</Lbl>
          <h1>Privacy Policy</h1>
          <p>Effective date: {LEGAL.effective}</p>
        </div>
      </div>

      <article className="legal">
        <div className="callout">
          <p>
            <strong>Summary:</strong> {P} is a <strong>self-custodial</strong> wallet. Your private keys and recovery
            phrase are generated and encrypted on your device and are <strong>never</strong> sent to us. We do not
            require an account, we do not sell your data, and we do not track you for advertising.
          </p>
        </div>

        <ul className="toc">
          <li><a href="#scope">1. Scope</a></li>
          <li><a href="#not-collected">2. Information we do not collect</a></li>
          <li><a href="#collected">3. Information we process</a></li>
          <li><a href="#permissions">4. Device permissions</a></li>
          <li><a href="#blockchain">5. Public blockchain data</a></li>
          <li><a href="#use">6. How we use information</a></li>
          <li><a href="#sharing">7. Sharing &amp; third parties</a></li>
          <li><a href="#tracking">8. Cookies, analytics &amp; tracking</a></li>
          <li><a href="#retention">9. Retention</a></li>
          <li><a href="#security">10. Security</a></li>
          <li><a href="#rights">11. Your rights</a></li>
          <li><a href="#data-deletion">12. Data deletion</a></li>
          <li><a href="#children">13. Children</a></li>
          <li><a href="#transfers">14. International transfers</a></li>
          <li><a href="#changes">15. Changes</a></li>
          <li><a href="#contact">16. Contact</a></li>
        </ul>

        <h2 id="scope">1. Scope</h2>
        <p>
          This Privacy Policy explains how {E} (&quot;INFRA&quot;, &quot;we&quot;, &quot;us&quot;) handles
          information when you use the {P} mobile application for iOS and Android, the {P} browser extension, and the
          website at {S} (together, the &quot;Services&quot;). By using the Services you agree to this Policy. It
          should be read together with our <a href="/terms">Terms &amp; Conditions</a>.
        </p>

        <h2 id="not-collected">2. Information we do not collect</h2>
        <ul>
          <li>Your private keys, recovery (seed) phrase, or wallet password/PIN. These are encrypted and stored only on your device (for example using AES-GCM encryption and the device secure storage such as iOS Keychain / Android Keystore).</li>
          <li>Your biometric data. Face ID, Touch ID or fingerprint unlock is handled entirely by your device operating system; we only receive a success/failure result.</li>
          <li>Your name, email, phone number or government ID — no account or registration is required to use {P}.</li>
          <li>Your contacts, photos, precise location, or browsing history.</li>
        </ul>
        <p>Because we never hold your keys or recovery phrase, <strong>we cannot recover your wallet or reverse transactions</strong> if they are lost or compromised.</p>

        <h2 id="collected">3. Information we process</h2>
        <div className="tbl">
          <table>
            <thead>
              <tr><th>Category</th><th>Examples</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td>Public wallet addresses</td><td>Addresses you create or import</td><td>Fetch balances, token data and transaction history; broadcast transactions you sign</td></tr>
              <tr><td>Network request data</td><td>IP address, request time, RPC method, user agent</td><td>Operate RPC nodes and APIs, prevent abuse, keep the network secure</td></tr>
              <tr><td>Diagnostics (optional)</td><td>Crash logs, app version, device model, OS version</td><td>Fix bugs and improve stability. Not linked to your identity</td></tr>
              <tr><td>Settings stored on device</td><td>Selected network, currency, language, address book labels</td><td>Remember your preferences. Stored locally, not sent to us</td></tr>
              <tr><td>Support communications</td><td>Email address and message content you send us</td><td>Respond to your request</td></tr>
              <tr><td>Website usage</td><td>Aggregated, cookieless page-view statistics</td><td>Understand website performance</td></tr>
            </tbody>
          </table>
        </div>
        <p>We do not use this information to identify you personally, and we do not combine it with data from other sources to build profiles.</p>

        <h2 id="permissions">4. Device permissions</h2>
        <p>{P} may ask for the following permissions. Each is optional and used only for the feature described; you can revoke them in your device settings at any time.</p>
        <ul>
          <li><strong>Camera</strong> — to scan QR codes for wallet addresses and connection requests (e.g. WalletConnect). Images are processed on the device and are not stored or uploaded.</li>
          <li><strong>Biometrics</strong> — to unlock the app and approve transactions.</li>
          <li><strong>Notifications</strong> — to alert you about incoming transfers and transaction status.</li>
          <li><strong>Internet access</strong> — to communicate with the INFRA network and other supported blockchains.</li>
        </ul>

        <h2 id="blockchain">5. Public blockchain data</h2>
        <p>
          Transactions on INFRA and other blockchains (such as Ethereum, BNB Smart Chain and Tron, when using
          bridges) are recorded on public ledgers. Wallet addresses, amounts and timestamps are visible to anyone and
          cannot be changed or deleted by us or by you. Please consider this before transacting.
        </p>

        <h2 id="use">6. How we use information</h2>
        <ul>
          <li>To provide, maintain and secure the Services and the INFRA network;</li>
          <li>To display balances, prices and transaction history and to broadcast transactions you authorise;</li>
          <li>To detect, prevent and investigate fraud, abuse and security incidents;</li>
          <li>To diagnose technical problems and improve the Services;</li>
          <li>To respond to support requests;</li>
          <li>To comply with applicable laws, regulations and lawful requests from authorities.</li>
        </ul>
        <p>We do <strong>not</strong> sell, rent or trade personal information, and we do not use it for targeted advertising.</p>

        <h2 id="sharing">7. Sharing &amp; third parties</h2>
        <p>We share limited information only as follows:</p>
        <ul>
          <li><strong>Infrastructure providers</strong> — hosting, RPC node and crash-reporting providers who process data on our behalf under confidentiality obligations.</li>
          <li><strong>Blockchain networks</strong> — signed transactions you submit are broadcast publicly.</li>
          <li><strong>Third-party services you choose to use</strong> — such as decentralised applications (dApps), bridges, swap or liquidity providers, and partner apps (for example reID). These services have their own privacy policies, and we are not responsible for their practices.</li>
          <li><strong>Legal requirements</strong> — where required by law, court order or a competent authority in the UAE or elsewhere, or to protect the rights, property or safety of INFRA, our users or the public.</li>
          <li><strong>Business transfers</strong> — in connection with a merger, acquisition or sale of assets, subject to this Policy.</li>
        </ul>

        <h2 id="tracking">8. Cookies, analytics &amp; tracking</h2>
        <p>
          The website uses privacy-friendly, cookieless analytics (Vercel Analytics) that do not track you across
          sites. The {P} app does not use advertising identifiers (IDFA/AAID) and does not track you across apps or
          websites owned by other companies.
        </p>

        <h2 id="retention">9. Retention</h2>
        <p>
          Server request logs are retained for up to 90 days unless needed longer for security investigations or legal
          obligations. Crash diagnostics are retained for up to 12 months. Support emails are retained for as long as
          needed to resolve your request and for a reasonable period afterwards. Data stored on your device stays there
          until you delete it.
        </p>

        <h2 id="security">10. Security</h2>
        <p>
          We use industry-standard measures including on-device encryption, encrypted transport (HTTPS/TLS), and
          access controls. No system is completely secure. You are responsible for keeping your device, password and
          recovery phrase safe. INFRA will <strong>never</strong> ask for your recovery phrase or private key — anyone
          who does is attempting a scam.
        </p>

        <h2 id="rights">11. Your rights</h2>
        <p>
          Depending on where you live (including under the UAE Federal Decree-Law No. 45 of 2021 on the Protection of
          Personal Data, the DIFC Data Protection Law, and the EU/UK GDPR where applicable), you may have the right to
          access, correct, delete, restrict or object to processing of your personal data, to data portability, and to
          withdraw consent. To exercise these rights, email <a href={`mailto:${M}`}>{M}</a>. We will respond within 30
          days. You may also lodge a complaint with your local data protection authority.
        </p>

        <h2 id="data-deletion">12. Data deletion</h2>
        <p>Because {P} does not use accounts, most of your data exists only on your device. You can delete it at any time:</p>
        <ul>
          <li><strong>In the app:</strong> Settings → Security → Remove wallet (or Reset app). This permanently erases your encrypted keys, settings and local history from the device.</li>
          <li><strong>Uninstall:</strong> removing the app or browser extension deletes its local data.</li>
          <li><strong>Server-side data:</strong> to request deletion of any logs, diagnostics or support data associated with you, email <a href={`mailto:${M}?subject=Data%20deletion%20request`}>{M}</a> with the subject &quot;Data deletion request&quot;. We will confirm deletion within 30 days, except where we must retain data by law.</li>
        </ul>
        <p>
          <strong>Important:</strong> make sure you have backed up your recovery phrase before removing a wallet. Data
          recorded on public blockchains cannot be deleted.
        </p>

        <h2 id="children">13. Children</h2>
        <p>
          The Services are not intended for anyone under 18 years of age (or the age of majority where you live). We do
          not knowingly collect information from children. If you believe a child has provided us with information,
          contact us and we will delete it.
        </p>

        <h2 id="transfers">14. International transfers</h2>
        <p>
          We are based in the United Arab Emirates. Our service providers may process information in other countries.
          Where we transfer personal data internationally, we take steps to ensure it receives an adequate level of
          protection in line with applicable law.
        </p>

        <h2 id="changes">15. Changes to this Policy</h2>
        <p>
          We may update this Policy from time to time. The &quot;Effective date&quot; above shows the latest version.
          Material changes will be announced on this page or in the app. Continued use after changes take effect means
          you accept the updated Policy.
        </p>

        <h2 id="contact">16. Contact</h2>
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
