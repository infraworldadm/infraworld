"use client";

import { useState } from "react";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** Illustrative revenue: fixed 10 AED fee × daily volume (log-scaled slider). */
export function Calculator() {
  const [v, setV] = useState(56);
  const tx = Math.max(100, Math.round(Math.pow(10, 2 + (v / 100) * 5) / 100) * 100);
  const day = tx * 10;
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
      <div className="big3 push">
        <div><small>Daily</small><b className="tn">{fmt(day)} AED</b></div>
        <div><small>Monthly</small><b className="tn">{fmt(day * 30)} AED</b></div>
        <div><small>Yearly</small><b className="tn">{fmt(day * 365)} AED</b></div>
      </div>
      <p className="note" id="calcNote">
        Illustrative: fixed 10 AED fee × transaction volume. Monthly uses 30 days.
      </p>
    </div>
  );
}
