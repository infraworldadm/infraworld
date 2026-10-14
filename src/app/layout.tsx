import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { KEYWORDS, SITE_URL, orgJsonLd, siteJsonLd } from "@/lib/seo";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "INFRA — Launch a Pegged Stablecoin Network | Stablecoin Infrastructure",
    template: "%s | INFRA",
  },
  description:
    "INFRA is stablecoin infrastructure for banks, fintechs and governments: an EVM-compatible Layer 1 with fixed fees and 1:1 currency-pegged networks. reAED (UAE Dirham) is live — launch reUSD, reEUR, reINR or your own currency, plus white-label wallets.",
  keywords: KEYWORDS,
  applicationName: "INFRA",
  authors: [{ name: "INFRA", url: SITE_URL }],
  creator: "INFRA",
  publisher: "INFRA",
  category: "Finance",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "INFRA",
    locale: "en_US",
    url: "/",
    title: "INFRA — Launch a Pegged Stablecoin Network",
    description: "Stablecoin infrastructure with fixed fees and 1:1 currency pegs. reAED is live; launch your own currency network or white-label wallet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "INFRA — Launch a Pegged Stablecoin Network",
    description: "Stablecoin infrastructure with fixed fees and 1:1 currency pegs. reAED is live; launch your own currency network.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } } : {}),
};

export const viewport: Viewport = { themeColor: "#1F5BFF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var d=document.documentElement;try{if(localStorage.getItem("infra-theme")==="dark")d.dataset.theme="dark"}catch(e){}if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&(location.pathname==="/"||location.pathname==="/reaed")){d.classList.add("intro");setTimeout(function(){d.classList.remove("intro")},2500)}})()` }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <JsonLd data={[orgJsonLd, siteJsonLd]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
