import type { FaqItem } from "@/lib/faq";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://infraworld.org").replace(/\/$/, "");
export const SITE_NAME = "INFRA";

// Commercial-intent keywords for global B2B leads (banks, fintechs, governments, enterprises).
export const KEYWORDS = [
  "stablecoin infrastructure",
  "launch your own stablecoin",
  "white label stablecoin",
  "stablecoin as a service",
  "pegged stablecoin network",
  "fiat-backed stablecoin platform",
  "local currency stablecoin",
  "AED stablecoin",
  "Dirham stablecoin",
  "reAED",
  "white label blockchain",
  "white label crypto wallet",
  "EVM Layer 1 blockchain",
  "PoSA blockchain",
  "fixed transaction fee blockchain",
  "tokenization platform",
  "enterprise tokenization",
  "cross-border payments blockchain",
  "B2B settlement",
  "CBDC alternative",
  "stablecoin for banks",
  "VARA",
  "UAE blockchain",
  "MENA blockchain infrastructure",
];

export const abs = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs("/Logo/INFRA_Logo%20on%20Light%20bg.png"),
  email: "info@infraworld.com",
  description:
    "INFRA is an EVM-compatible Layer 1 that launches pegged stablecoin networks with fixed fees — starting with reAED, pegged 1:1 to the UAE Dirham.",
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "info@infraworld.com", areaServed: "Worldwide", availableLanguage: ["English"] }],
};

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#org` },
  inLanguage: "en",
};

export const faqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
});

export const breadcrumbJsonLd = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "INFRA", item: SITE_URL },
    { "@type": "ListItem", position: 2, name, item: abs(path) },
  ],
});
