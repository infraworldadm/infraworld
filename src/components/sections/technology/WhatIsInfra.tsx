// Technology page: what INFRA is + network profile.
import { Lbl } from "@/components/common/ui";

/** Intro tile and network profile key/values. */
export function WhatIsInfra() {
  return (
      <section className="wrap" id="infra">
        <div className="bento">
          <div className="tile c7 rv">
            <Lbl blue>What is INFRA?</Lbl>
            <h2 className="st2">An EVM-compatible Layer 1 for pegged stablecoin networks.</h2>
            <p>
              INFRA is an EVM-compatible Layer 1 blockchain designed for the UAE and the wider MENA region. It provides a stable and
              transparent foundation for payments, settlement, and tokenized value flows.
            </p>
            <p>
              A qualified Proof of Staked Authority validator set provides fast confirmation, clear governance, and an operational
              model suited to commercial and regulated environments.
            </p>
          </div>
          <div className="tile c5 dark rv">
            <Lbl>Network profile</Lbl>
            <div className="kv push">
              <div><span>Type</span>Layer 1</div>
              <div><span>Runtime</span>EVM-compatible</div>
              <div><span>Consensus</span>Proof of Staked Authority</div>
              <div><span>Region</span>UAE &amp; MENA</div>
              <div><span>Unit of account</span>Pegged stablecoin</div>
              <div><span>First network</span>reAED · fixed fee / tx</div>
            </div>
          </div>
        </div>
      </section>

  );
}
