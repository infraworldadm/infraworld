"use client";

// "Stake & earn reAED" section (used on /reaed and /balances).
// Preview widget for staking reAED; the actual staking happens on the staking dApp (STAKE_URL).

import { useEffect, useState } from "react";
import { Ic, Lbl } from "@/components/common/ui";
import { DirhamIcon } from "@/components/common/DirhamIcon";
import { POOLS } from "@/config/pools";

/** Staking dApp. */
const STAKE_URL = "https://staking.infraworld.org";
const LOCKS = ["Flexible", "30 days", "90 days", "180 days"] as const;
const DIVIDEND = POOLS.find((p) => p.key === "dividend")!;

/** Wei string → reAED number. */
const toReaed = (wei?: string) => (wei ? Number(BigInt(wei) / BigInt("10000000000000000")) / 100 : 0);

/** Staking widget + how-it-works steps. */
export function Staking({ id = "stake" }: { id?: string }) {
  const [amount, setAmount] = useState("1000");
  const [lock, setLock] = useState<(typeof LOCKS)[number]>("90 days");
  const [pool, setPool] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    /** Reads the live Dividend pool balance (the source of staking rewards). */
    const load = async () => {
      try {
        const r = await fetch("/api/infra/balances", { cache: "no-store" });
        const j = await r.json();
        if (alive && j?.success) setPool(toReaed(j.data.pools[DIVIDEND.key]));
      } catch {}
    };
    load();
    return () => { alive = false; };
  }, []);

  const amt = Math.max(0, Number(amount.replace(/,/g, "")) || 0);

  return (
    <section className="wrap stake-sec" id={id}>
      <div className="bento">
        {/* Left: pitch + live reward source + steps */}
        <div className="tile c6 dark stake-info rv">
          <Lbl>Stake &amp; earn</Lbl>
          <h2 className="st2">Stake reAED. Earn from network fees.</h2>
          <p>Stakers share the Dividend pool, which receives {DIVIDEND.share}% of every INFRA network fee. Rewards come from real usage, not inflation.</p>
          <div className="stake-src">
            <span className="stake-coin"><DirhamIcon /></span>
            <div>
              <small>Dividend pool · live</small>
              <b className="tn">{pool === null ? "—" : pool.toLocaleString(undefined, { maximumFractionDigits: 2 })} <em>reAED</em></b>
            </div>
            <span className="live-badge"><i />Live</span>
          </div>
          <ol className="stake-steps">
            <li><b>Stake</b><span>Connect your wallet and lock reAED</span></li>
            <li><b>Earn</b><span>Rewards accrue from the Dividend pool</span></li>
            <li><b>Claim</b><span>Claim rewards or unstake after the lock</span></li>
          </ol>
        </div>

        {/* Right: staking widget */}
        <div className="tile c6 stake-card rv">
          <div className="stake-head">
            <b>Stake reAED</b>
            <span className="live-badge"><i />Live</span>
          </div>

          <label className="stake-in">
            <span>Amount</span>
            <div className="stake-field">
              <input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))} aria-label="Amount of reAED to stake" />
              <span className="stake-tok"><span className="stake-coin sm"><DirhamIcon /></span>reAED</span>
            </div>
            <div className="stake-quick">
              {[100, 1000, 10000].map((v) => (
                <button key={v} type="button" onClick={() => setAmount(String(v))}>{v.toLocaleString()}</button>
              ))}
            </div>
          </label>

          <div className="stake-lock" role="radiogroup" aria-label="Lock period">
            <span>Lock period</span>
            <div>
              {LOCKS.map((l) => (
                <button key={l} type="button" role="radio" aria-checked={lock === l} className={lock === l ? "on" : ""} onClick={() => setLock(l)}>{l}</button>
              ))}
            </div>
          </div>

          <dl className="stake-sum">
            <div><dt>You stake</dt><dd className="tn">{amt.toLocaleString(undefined, { maximumFractionDigits: 2 })} reAED</dd></div>
            <div><dt>Lock</dt><dd>{lock}{lock === "Flexible" ? " · unstake anytime" : ""}</dd></div>
            <div><dt>Reward source</dt><dd>Dividend pool · {DIVIDEND.share}% of fees</dd></div>
            <div><dt>Rewards</dt><dd>Pro-rata share of the pool, claimable</dd></div>
          </dl>

          <a className="stake-btn" href={`${STAKE_URL}/?amount=${amt}&lock=${encodeURIComponent(lock)}`} target="_blank" rel="noopener noreferrer">
            Stake now <Ic n="arrow" />
          </a>
          <p className="stake-fine">Opens staking.infraworld.org. Final terms, lock options and reward rates are shown there before you sign. Digital assets carry risk.</p>
        </div>
      </div>
    </section>
  );
}
