"use client";

// Home: live proof — total reAED in the fee pools (from /api/infra/balances) + links to reAED, pools and wallet.
import { useEffect, useState } from "react";
import { Ic, Lbl } from "@/components/common/ui";

/** Sums pool balances (wei strings) into whole reAED. */
function totalReaed(pools: Record<string, string>): number {
  const wei = Object.values(pools).reduce((s, v) => s + BigInt(v || "0"), BigInt(0));
  return Number(wei / BigInt("1000000000000000")) / 1000;
}

/** Live network tile + three link tiles. */
export function Proof() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    /** Loads pool balances once; leaves the placeholder if the RPC is unreachable. */
    const load = async () => {
      try {
        const r = await fetch("/api/infra/balances", { cache: "no-store" });
        const j = await r.json();
        if (alive && j?.success) setTotal(totalReaed(j.data.pools));
      } catch {}
    };
    load();
    return () => { alive = false; };
  }, []);

  return (
    <section className="wrap" id="live">
      <div className="bento">
        <div className="tile c6 dark rv proof-live">
          <span className="live"><i />Live on INFRA</span>
          <b className="tn">{total === null ? "—" : total.toLocaleString(undefined, { maximumFractionDigits: 2 })}<small> reAED</small></b>
          <p>Fees collected and distributed across six on-chain pools — verifiable by anyone.</p>
        </div>
        <a href="/reaed" className="tile c2 app rv"><span className="go"><Ic n="arrow" /></span><Lbl>Network</Lbl><h3 className="push">reAED is live</h3><p>1:1 UAE Dirham</p></a>
        <a href="/balances" className="tile c2 app rv"><span className="go"><Ic n="arrow" /></span><Lbl>Transparency</Lbl><h3 className="push">Pool balances</h3><p>Real-time</p></a>
        <a href="/wallet" className="tile c2 app rv"><span className="go"><Ic n="arrow" /></span><Lbl>Wallet</Lbl><h3 className="push">INFRA Wallet</h3><p>Extension · Android</p></a>
      </div>
    </section>
  );
}
