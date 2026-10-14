"use client";

// /balances — live reAED balances of the fee pools; polls /api/infra/balances every 30s.

import { useCallback, useEffect, useState } from "react";
import { SubPage } from "@/components/layout/SubPage";
import { Lbl } from "@/components/common/ui";
import { POOLS } from "@/config/pools";

type Payload = { pools: Record<string, string>; feeManager: string; updatedAt: string };

/** Formats a wei string as reAED with up to 4 decimals (BigInt-safe). */
function fmt(wei?: string): string {
  if (!wei) return "--";
  const v = BigInt(wei);
  const unit = BigInt("1000000000000000000");
  const whole = v / unit;
  const frac = Number((v % unit) / BigInt("100000000000000")) / 10000;
  const n = Number(whole) + frac;
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

/** Live pool balances page. */
export default function BalancesPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [load]);

  const total = data ? POOLS.reduce((s, p) => s + BigInt(data.pools[p.key] || "0"), BigInt(0)).toString() : undefined;
  /** Display helper: "…" while first loading, "Unavailable" on error, else formatted value. */
  const show = (v?: string) => (loading && !data ? "…" : error && !data ? "Unavailable" : fmt(v));

  return (
    <SubPage>
      <div className="sp-head">
        <div>
          <Lbl blue>On-chain · reAED network</Lbl>
          <h1>Pool Balances</h1>
          <p>Real-time reAED balances across the six INFRA fee-distribution pools, read directly from the network.</p>
        </div>
        <button className="refresh" onClick={load} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <div className="tile dark sp-total">
        <Lbl>Total across pools</Lbl>
        <b className="tn" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 600, letterSpacing: "-.03em" }}>
          {show(total)} <small style={{ fontSize: ".45em", opacity: 0.7 }}>reAED</small>
        </b>
      </div>

      <div className="pools">
        {POOLS.map((p) => (
          <div key={p.key} className="tile pool">
            <div className="row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Lbl>{p.label}</Lbl>
              <span className="share">{p.share}%</span>
            </div>
            <b className="tn">
              {show(data?.pools[p.key])} <small style={{ fontSize: ".55em", color: "var(--t3)" }}>reAED</small>
            </b>
            <span className="addr push">{p.address}</span>
          </div>
        ))}
      </div>

      <p className="sp-meta">
        {error && data ? "Latest refresh failed — showing last known values. " : ""}
        {data ? `Updated ${new Date(data.updatedAt).toLocaleString()}` : ""} · Auto-refreshes every 30s
      </p>
    </SubPage>
  );
}
