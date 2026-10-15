"use client";

import { useState } from "react";

/** Formats a number with thousands separators. */
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** Revenue estimate: network fee (adjustable, default 10 AED) × daily volume (log-scaled slider). */
export function Calculator() {
  const [v, setV] = useState(56);
  const [fee, setFee] = useState(10); // AED per transaction — the live fee is set by governance and can change
  const tx = Math.max(100, Math.round(Math.pow(10, 2 + (v / 100) * 5) / 100) * 100);
  const day = tx * fee;
  return (
    <div className="tile c7 dark calc rv" data-cursor="Drag">
      <span className="lbl sc"><i />Fee × volume · reAED network</span>
      <label htmlFor="txr">
        Transactions per day <b className="tn">{fmt(tx)}</b>
      </label>
      <input
        id="txr"
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(+e.target.value)}
        style={{ ["--p" as string]: `${v}%` }}
        aria-describedby="calcNote"
      />
      <label htmlFor="feer">
        Network fee per transaction <b className="tn">{fee} AED</b>
      </label>
      <input
        id="feer"
        type="range"
        min={1}
        max={50}
        value={fee}
        onChange={(e) => setFee(+e.target.value)}
        style={{ ["--p" as string]: `${((fee - 1) / 49) * 100}%` }}
        aria-describedby="calcNote"
      />
      <div className="big3 push">
        <div><small>Daily</small><b className="tn">{fmt(day)} AED</b></div>
        <div><small>Monthly</small><b className="tn">{fmt(day * 30)} AED</b></div>
        <div><small>Yearly</small><b className="tn">{fmt(day * 365)} AED</b></div>
      </div>
      <p className="note" id="calcNote">
        Fee × transaction volume. The live fee is set by network governance (currently 10 AED) and can be adjusted. Monthly uses 30 days.
      </p>
    </div>
  );
}
