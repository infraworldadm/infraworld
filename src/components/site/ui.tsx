import type { ReactNode } from "react";

/** SVG icon sprite. Render once per page; reference icons with <Ic n="name" />. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
      <symbol id="check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></symbol>
      <symbol id="store" viewBox="0 0 24 24"><path d="M3 9l1.5-5h15L21 9M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0zM5 13v8h14v-8" /></symbol>
      <symbol id="swap" viewBox="0 0 24 24"><path d="M4 7h14l-4-4M20 17H6l4 4" /></symbol>
      <symbol id="gift" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="5" rx="1" /><path d="M5 13v8h14v-8M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z" /></symbol>
      <symbol id="code" viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></symbol>
      <symbol id="wave" viewBox="0 0 24 24"><path d="M2 14l4-6 4 9 4-12 4 10 4-4" /></symbol>
      <symbol id="ledger" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h4" /></symbol>
      <symbol id="clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></symbol>
      <symbol id="cpu" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></symbol>
      <symbol id="menu" viewBox="0 0 24 24"><path d="M4 9h16M4 15h16" /></symbol>
      <symbol id="close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
      <symbol id="copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5H5v11h3" /></symbol>
      <symbol id="plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></symbol>
    </svg>
  );
}

export function Ic({ n, className = "i" }: { n: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${n}`} />
    </svg>
  );
}

/** Button with rolling label and fill-on-hover. */
export function Btn({
  href,
  label,
  variant = "k",
  arrow = true,
  mag = true,
  className = "",
  style,
  external = false,
}: {
  href: string;
  label: string;
  variant?: "k" | "o" | "b" | "w";
  arrow?: boolean;
  mag?: boolean;
  className?: string;
  style?: React.CSSProperties;
  external?: boolean;
}) {
  return (
    <a className={`btn btn-${variant}${mag ? " mag" : ""} ${className}`} href={href} style={style} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="tx"><span>{label}</span><span aria-hidden="true">{label}</span></span>
      {arrow && <Ic n="arrow" />}
    </a>
  );
}

export function Lbl({ children, blue = false }: { children: ReactNode; blue?: boolean }) {
  return (
    <span className={`lbl sc${blue ? " b" : ""}`}>
      <i />
      {children}
    </span>
  );
}
