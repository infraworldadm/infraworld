"use client";

import { useState } from "react";
import { Btn, Lbl } from "@/components/site/ui";

type Item = { question: string; answer: string };

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

export function FAQ({ items = globalFaq }: { items?: Item[] }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="wrap sec" id="faq">
      <div className="bento">
        <div className="tile c4 rv" style={{ alignSelf: "start" }}>
          <Lbl blue>FAQ</Lbl>
          <h2 className="st2">Frequently Asked Questions</h2>
          <Btn href="#contact" label="Ask us directly" style={{ alignSelf: "flex-start", marginTop: 10 }} />
        </div>
        <div className="tile c8 rv">
          <div>
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.question} className={`q${isOpen ? " open" : ""}`}>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => {
                      setOpen(isOpen ? -1 : i);
                      setTimeout(() => window.dispatchEvent(new Event("infra:refresh")), 650);
                    }}
                  >
                    {item.question}
                    <span className="pm" />
                  </button>
                  <div className="a" id={`faq-a-${i}`}>
                    <div><p>{item.answer}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
