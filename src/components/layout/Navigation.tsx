"use client";

import { useEffect, useState } from "react";
import { Btn, Ic } from "@/components/site/ui";

const navigation = [
  { name: "Overview", href: "#overview" },
  { name: "INFRA", href: "#infra" },
  { name: "Networks", href: "#networks" },
  { name: "reAED", href: "#reaed" },
  { name: "Challenges", href: "#challenges" },
  { name: "Technology", href: "#technology" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

type LenisLike = { stop: () => void; start: () => void } | undefined;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    let last = window.scrollY;
    const prog = document.getElementById("prog");
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      setScrolled(y > 10);
      setHidden(y > last && y > 400);
      last = y;
      let current = "overview";
      for (const item of navigation) {
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = item.href.slice(1);
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <>
      <div className="prog" id="prog" />
      <header className={`nav${scrolled ? " s" : ""}${hidden && !open ? " hide" : ""}`}>
        <div className="wrap">
          <a href="#top" className="brand" aria-label="INFRA home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo/infra-logo-light.svg" alt="INFRA" width={86} height={26} />
          </a>
          <nav className="links" aria-label="Primary">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className={active === item.href.slice(1) ? "on" : ""}>
                {item.name}
              </a>
            ))}
          </nav>
          <Btn href="#contact" label="Request a pilot" mag={false} />
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="drawer"
          >
            <Ic n={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <div className={`drawer${open ? " open" : ""}`} id="drawer" aria-hidden={!open}>
        {navigation.map((item, i) => (
          <a key={item.name} href={item.href} onClick={() => setOpen(false)}>
            {item.name}
            <small>{String(i + 1).padStart(2, "0")}</small>
          </a>
        ))}
      </div>
    </>
  );
}
