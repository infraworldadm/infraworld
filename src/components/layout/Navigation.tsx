"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Btn, Ic } from "@/components/site/ui";
import { BUILD_FORM_URL } from "@/lib/links";

// "local": pages that contain that section, so the link anchors in-page there.
const navigation = [
  { name: "Overview", href: "/#overview" },
  { name: "Networks", href: "/#networks" },
  { name: "reAED", href: "/reaed" },
  { name: "Challenges", href: "/#challenges" },
  { name: "Technology", href: "/#technology" },
  { name: "FAQ", href: "/#faq", local: ["/", "/reaed"] },
  { name: "Pools", href: "/balances" },
  { name: "Contact", href: "/#contact", local: ["/", "/reaed", "/wallet"] },
];
const SECTION_PAGES = ["/", "/reaed", "/wallet"];

type LenisLike = { stop: () => void; start: () => void } | undefined;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (item: (typeof navigation)[number]) =>
    "local" in item && item.local?.includes(pathname) ? item.href.slice(1) : item.href;
  const [active, setActive] = useState(isHome ? "overview" : pathname);

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
      if (!SECTION_PAGES.includes(window.location.pathname)) return;
      let current = window.location.pathname === "/" ? "overview" : window.location.pathname;
      for (const item of navigation) {
        if (!item.href.startsWith("/#")) continue;
        if (window.location.pathname !== "/" && !("local" in item && item.local?.includes(window.location.pathname))) continue;
        const el = document.getElementById(item.href.slice(2));
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = item.href.slice(2);
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
          <a href={isHome ? "#top" : "/"} className="brand" aria-label="INFRA home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo/infra-logo-light.svg" alt="INFRA" width={86} height={26} />
          </a>
          <nav className="links" aria-label="Primary">
            {navigation.map((item) => (
              <a key={item.name} href={hrefFor(item)} className={active === item.href.slice(2) || active === item.href ? "on" : ""}>
                {item.name}
              </a>
            ))}
          </nav>
          <a href="/wallet" className={`nav-wallet${pathname === "/wallet" ? " on" : ""}`} aria-label="Get INFRA Wallet">
            <span className="nw-ic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/wallet/infra-wallet-logo.png" alt="" width={22} height={22} />
            </span>
            <span className="nw-tx"><span className="nw-get">Get </span><b>Wallet</b></span>
            <svg className="nw-dl" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19h14" /></svg>
          </a>
          <Btn href={BUILD_FORM_URL} external label="Build with INFRA" mag={false} />
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
          <a key={item.name} href={hrefFor(item)} onClick={() => setOpen(false)}>
            {item.name}
            <small>{String(i + 1).padStart(2, "0")}</small>
          </a>
        ))}
        <a href="/wallet" className="drawer-wallet" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wallet/infra-wallet-logo.png" alt="" width={36} height={36} />
          Get INFRA Wallet
          <small>Extension · Android</small>
        </a>
      </div>
    </>
  );
}
