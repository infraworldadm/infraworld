"use client";

// /balances — live reAED balances of the six fee-distribution pools.
// Polls /api/infra/balances every 30s; shows total, actual vs target split, and one card per pool.

import { useCallback, useEffect, useRef, useState } from "react";
import { SubPage } from "@/components/layout/SubPage";
import { Ic, Lbl } from "@/components/common/ui";
import { POOLS } from "@/config/pools";
import { Staking } from "@/components/common/Staking";

type Payload = { pools: Record<string, string>; feeManager: string; updatedAt: string };
const REFRESH_S = 30;

/** Converts a wei string to a reAED number (4-decimal precision, BigInt-safe). */
function toReaed(wei?: string): number {
  if (!wei) return 0;
  const v = BigInt(wei);
  return Number(v / BigInt("100000000000000")) / 10000;
}

/** Formats a reAED amount for display. */
const fmt = (n: number, d = 2) => n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });

/** Shortens an address to 0x1234…abcd. */
const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

/** Animates a number from its previous value to `value` (ease-out, ~0.9s). */
function useCountUp(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now(), a = from.current, b = value;
    let raf = 0;
    /** One animation frame. */
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 900), e = 1 - Math.pow(1 - k, 3);
      setShown(a + (b - a) * e);
      if (k < 1) raf = requestAnimationFrame(step);
      else from.current = b;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return shown;
}

/** Copy-to-clipboard button for a pool address. */
function CopyAddr({ address }: { address: string }) {
  const [ok, setOk] = useState(false);
  /** Copies the full address and shows a short confirmation. */
  const copy = async () => {
    try { await navigator.clipboard.writeText(address); setOk(true); setTimeout(() => setOk(false), 1400); } catch {}
  };
  return (
    <button className={`pb-addr${ok ? " ok" : ""}`} onClick={copy} title={address} aria-label={`Copy address ${address}`}>
      <span className="tn">{short(address)}</span>
      {ok ? <Ic n="check" /> : <Ic n="copy" />}
    </button>
  );
}

/** Live pool balances page. */
export default function BalancesPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [left, setLeft] = useState(REFRESH_S);
  const [hover, setHover] = useState<string | null>(null);

  /** Loads balances from the API; keeps last good values if a refresh fails. */
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/infra/balances", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error();
      setData(json.data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setLeft(REFRESH_S);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // countdown to the next automatic refresh
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { if (left === 0 && !loading) load(); }, [left, loading, load]);

  const rows = POOLS.map((p) => ({ ...p, amount: toReaed(data?.pools[p.key]) }));
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const shownTotal = useCountUp(total);
  const ready = Boolean(data);

  return (
    <SubPage>
      <div className="sp-head">
        <div>
          <Lbl blue>On-chain · reAED network</Lbl>
          <h1>Fee Pool Balances</h1>
          <p>Every transaction fee on INFRA is split across six on-chain pools. Balances are read live from the network.</p>
        </div>
        <div className="pb-ctrl">
          <span className={`live-badge${error ? " off" : ""}`}><i />{error ? "Offline" : "Live"}</span>
          <span className="pb-timer" style={{ ["--k" as string]: `${(left / REFRESH_S) * 100}%` }} aria-label={`Next refresh in ${left} seconds`}>
            <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" pathLength={100} /></svg>
            <b className="tn">{left}s</b>
          </span>
          <button className="refresh" onClick={load} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</button>
        </div>
      </div>

      {/* Total + distribution */}
      <div className="tile dark pb-hero">
        <div className="pb-total">
          <Lbl>Total across pools</Lbl>
          <b className="tn">
            {ready ? fmt(shownTotal) : error ? "Unavailable" : "…"} <small>reAED</small>
          </b>
          {data && <span className="pb-upd">Updated {new Date(data.updatedAt).toLocaleTimeString()}{error ? " · showing last known values" : ""}</span>}
        </div>

        <div className="pb-bars">
          <div className="pb-barlbl"><span>Actual balance split</span></div>
          <div className="pb-bar" role="img" aria-label="Actual split of balances across pools">
            {rows.map((r) => (
              <i
                key={r.key}
                className={hover && hover !== r.key ? "dim" : ""}
                style={{ flexGrow: ready && total > 0 ? r.amount : r.share, ["--c" as string]: r.color, ["--cd" as string]: r.darkColor }}
                onMouseEnter={() => setHover(r.key)}
                onMouseLeave={() => setHover(null)}
                title={`${r.label}: ${fmt(r.amount)} reAED (${total ? ((r.amount / total) * 100).toFixed(1) : 0}%)`}
              />
            ))}
          </div>
          <div className="pb-barlbl"><span>Target split</span></div>
          <div className="pb-bar thin" role="img" aria-label="Target split configured in the fee manager">
            {rows.map((r) => (
              <i key={r.key} className={hover && hover !== r.key ? "dim" : ""} style={{ flexGrow: r.share, ["--c" as string]: r.color, ["--cd" as string]: r.darkColor }} title={`${r.label}: ${r.share}% target`} />
            ))}
          </div>
          <ul className="pb-legend">
            {rows.map((r) => (
              <li key={r.key} onMouseEnter={() => setHover(r.key)} onMouseLeave={() => setHover(null)} className={hover === r.key ? "on" : ""}>
                <i style={{ ["--c" as string]: r.color, ["--cd" as string]: r.darkColor }} />
                {r.label} <span>{r.share}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* One card per pool */}
      <div className="pb-grid">
        {rows.map((r) => {
          const pct = total > 0 ? (r.amount / total) * 100 : 0;
          return (
            <div
              key={r.key}
              className={`tile pb-card${hover === r.key ? " hl" : ""}`}
              style={{ ["--c" as string]: r.color, ["--cd" as string]: r.darkColor }}
              onMouseEnter={() => setHover(r.key)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="pb-top">
                <span className="pb-name"><i />{r.label}</span>
                <span className="pb-share">{r.share}% target</span>
              </div>
              <b className="pb-amt tn">
                {ready ? fmt(r.amount) : error ? "—" : "…"} <small>reAED</small>
              </b>
              <div className="pb-prog" aria-label={`${pct.toFixed(1)}% of total, target ${r.share}%`}>
                <span style={{ width: `${pct}%` }} />
                <em style={{ left: `${r.share}%` }} title={`Target ${r.share}%`} />
              </div>
              <div className="pb-meta">
                <span>{ready ? `${pct.toFixed(1)}% of total` : " "}</span>
                <CopyAddr address={r.address} />
              </div>
              <p className="pb-note">{r.note}</p>
            </div>
          );
        })}
      </div>

      <div className="pb-stake"><Staking /></div>

      {/* How it works */}
      <div className="tile pb-flow">
        <Lbl blue>How distribution works</Lbl>
        <ol>
          <li><b>Transaction</b><span>Every transfer pays the fixed network fee</span></li>
          <li><b>Fee Manager</b><span>Smart contract collects each fee</span></li>
          <li><b>Six pools</b><span>Split automatically by the target shares</span></li>
        </ol>
      </div>
    </SubPage>
  );
}
