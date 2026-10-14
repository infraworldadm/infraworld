// Generated social preview image for X/Twitter cards (same design as opengraph-image).
import { ImageResponse } from "next/og";

export const alt = "INFRA — Launch a pegged stablecoin network";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Renders the social card with next/og (JSX → PNG at build time). */
export default function OG() {
  const tickers = ["reAED · LIVE", "reUSD", "reEUR", "reGBP", "reINR", "reSAR", "+ yours"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#0A0B0E 0%,#0A0B0E 55%,#1F5BFF 140%)", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>INFRA<span style={{ fontSize: 22, fontWeight: 500, color: "#7EA0FF", letterSpacing: 4 }}>STABLECOIN INFRASTRUCTURE</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>One Layer 1. A stable network for every currency.</div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,.72)" }}>Fixed fees · 1:1 currency pegs · EVM · White-label wallets</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tickers.map((t, i) => (
            <div key={t} style={{ display: "flex", padding: "10px 20px", borderRadius: 99, fontSize: 24, background: i === 0 ? "#1F5BFF" : "transparent", border: i === 0 ? "2px solid #1F5BFF" : "2px solid rgba(255,255,255,.25)" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
