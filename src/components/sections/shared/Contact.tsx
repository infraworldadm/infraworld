"use client";

// Contact section (used on home, reAED and wallet pages).

import { useState } from "react";
import { Ic, Lbl } from "@/components/common/ui";

const EMAIL = "info@infraworld.com";

/** Contact card with copy-email button. */
export function Contact() {
  const [msg, setMsg] = useState("");
  /** Copies the email address to the clipboard. */
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setMsg("Email copied to clipboard.");
    } catch {
      setMsg(`Copy failed. The address is ${EMAIL}.`);
    }
  };
  return (
    <section className="wrap" id="contact">
      <div className="tile dark glow t-contact rv">
        <canvas id="cgrid" aria-hidden="true" />
        <Lbl>Get in Touch</Lbl>
        <h2>
          Start a pilot
          <br />
          on <span>INFRA.</span>
        </h2>
        <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
          <p>For partnerships, validator participation, or a technical brief, please reach out. Contact us at:</p>
          <div className="mail">
            <a className="addr" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button className="btn btn-b" type="button" onClick={copy}>
              <Ic n="copy" />
              <span className="tx"><span>Copy email</span><span aria-hidden="true">Copy email</span></span>
            </button>
          </div>
          <p className="copied" aria-live="polite">{msg}</p>
          <p style={{ fontSize: ".9rem" }}>
            Include your name, company, and whether you are requesting a demo, technical brief, or validator participation details.
          </p>
        </div>
      </div>
    </section>
  );
}
