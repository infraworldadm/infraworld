import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";


export const metadata: Metadata = {
  title: "INFRA - Pegged Stablecoin Network Infrastructure",
  description:
    "INFRA is digital transaction infrastructure for pegged stablecoin networks: fixed fees, stable value and auditable flows. reAED, pegged 1:1 to the UAE Dirham, is INFRA's first network.",
  keywords: "blockchain, stablecoin, pegged stablecoin, reAED, dirham, infrastructure, payments, settlement",
  authors: [{ name: "INFRA" }],
  openGraph: {
    title: "INFRA - Pegged Stablecoin Network Infrastructure",
    description: "Digital transaction infrastructure for pegged stablecoin networks, starting with reAED for the Dirham economy.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
