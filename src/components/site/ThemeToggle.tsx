"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

/** Light / dark switch. Light is the default; the choice is remembered per browser. */
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "dark", () => false);
  const toggle = () => {
    const next = !dark;
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("infra-theme", next ? "dark" : "light"); } catch {}
    window.setTimeout(() => root.classList.remove("theme-anim"), 500);
  };
  return (
    <button className="theme-tg" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
      <svg className="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      <svg className="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
    </button>
  );
}
