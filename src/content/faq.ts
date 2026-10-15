// FAQ content shared by the FAQ section and the FAQPage structured data.
export type FaqItem = { question: string; answer: string };
type Item = FaqItem;

export const globalFaq: Item[] = [
  {
    question: "What is INFRA?",
    answer:
      "INFRA is an EVM-compatible Layer 1 that provides pegged stablecoin networks: each network has a 1:1 currency-pegged unit of account, fixed transaction fees and auditable flows.",
  },
  {
    question: "Is INFRA only for reAED?",
    answer:
      "No. reAED is INFRA's first project. INFRA provides pegged stablecoin network infrastructure, and the same model can support networks such as reUSD, reEUR and reGBP.",
  },
];

export const reaedFaq: Item[] = [
  {
    question: "What is reAED?",
    answer: "reAED is a Dirham-pegged stablecoin used for transaction fees, payments, settlement, and on-chain operations on INFRA.",
  },
  {
    question: "How is reAED kept stable?",
    answer: "Through a fully collateralized mint-and-burn model tied to reserve deposits and redemptions.",
  },
  {
    question: "What does a transaction cost?",
    answer: "Every transaction pays a fixed 10 AED (10 reAED) network fee, enforced by the protocol.",
  },
  {
    question: "How do I get reAED?",
    answer: "Convert USDC/USDT to reAED through the controlled mint process; redemption back to USDC/USDT follows a burn-and-release process.",
  },
  {
    question: "Where can I see the fee-distribution pools?",
    answer: "Live reAED balances of the six fee-distribution pools are published on the Pool Balances page.",
  },
];

const globalRest: Item[] = [
  {
    question: "Who is INFRA for?",
    answer: "Institutions, enterprises, fintechs, and platforms that need predictable settlement and transparent flows.",
  },
  {
    question: "Can businesses issue their own tokens?",
    answer: "Yes—enterprise tokens can use familiar standards and define their own fee/reward logic, settling in reAED.",
  },
  {
    question: "How do institutions participate?",
    answer: "Through infrastructure roles such as validators and strategic network participation.",
  },
  {
    question: "Is this production-ready?",
    answer: "INFRA is designed with production infrastructure requirements and operational roles in mind.",
  },
  {
    question: "How do we start?",
    answer: "Request a pilot to define the integration approach, onboarding, and rollout plan.",
  },
];

globalFaq.push(
  { question: "Which currencies can INFRA support?", answer: "Any fiat currency with a reserve-backed peg. reAED (UAE Dirham) is live; reUSD, reEUR and reGBP are available on request." },
  ...globalRest,
);


/** Short FAQ for the home page (the full list stays on the technology page). */
const HOME_Q = ["What is INFRA?", "Is INFRA only for reAED?", "Which currencies can INFRA support?", "Who is INFRA for?", "How do we start?"];
export const homeFaq: FaqItem[] = HOME_Q.map((q) => globalFaq.find((f) => f.question === q)).filter((f): f is FaqItem => Boolean(f));
