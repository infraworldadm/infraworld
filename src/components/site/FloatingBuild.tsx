"use client";

import { useEffect, useState } from "react";
import { BUILD_FORM_URL } from "@/lib/links";

/** Small floating "Build with INFRA" pill that appears after the visitor scrolls past the hero. */
export function FloatingBuild() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 700;
      setShow(window.scrollY > 700 && !nearEnd);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a className={`fab-build${show ? " on" : ""}`} href={BUILD_FORM_URL} aria-hidden={!show} tabIndex={show ? 0 : -1}>
      <span className="fb-dot" />
      Build with INFRA
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </a>
  );
}
