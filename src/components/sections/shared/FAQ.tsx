"use client";

// FAQ accordion. Content lives in content/faq.ts (also used for FAQPage structured data).

import { useState } from "react";
import { Btn, Lbl } from "@/components/common/ui";

import { globalFaq, type FaqItem as Item } from "@/content/faq";


/** Accordion; `items` defaults to the global FAQ. */
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
