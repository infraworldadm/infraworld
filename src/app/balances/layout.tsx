import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "reAED Fee Pool Balances (Live)",
  description: "Live on-chain reAED balances of the six INFRA fee-distribution pools: Validators, Cashback, Dividend, Tank, Team and Reserve.",
  keywords: ["reAED pool balances", "INFRA fee distribution", "on-chain transparency"],
  alternates: { canonical: "/balances" },
  openGraph: { title: "reAED Fee Pool Balances (Live)", description: "Live on-chain reAED balances of the six INFRA fee-distribution pools: Validators, Cashback, Dividend, Tank, Team and Reserve.", url: "/balances", images: ["/opengraph-image"] },
};

export default function BalancesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
