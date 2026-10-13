import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pool Balances | INFRA",
  description: "Real-time reAED balances across INFRA distribution pools.",
};

export default function BalancesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
