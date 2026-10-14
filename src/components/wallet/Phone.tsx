/* HTML recreations of INFRA Wallet screens — crisp at any size, animatable, and easy to re-brand (white-label). */
const LOGO = "/wallet/infra-wallet-logo.png";

type TokKey = "reAED" | "WreAED" | "USDT" | "USDC" | "BNB";

function Tok({ k }: { k: TokKey }) {
  if (k === "reAED") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={LOGO} alt="" className="tk" />;
  }
  const m: Record<Exclude<TokKey, "reAED">, [string, string]> = {
    WreAED: ["#24262c", "W"],
    USDT: ["#26A17B", "₮"],
    USDC: ["#2775CA", "$"],
    BNB: ["#F3BA2F", "B"],
  };
  return <span className="tk" style={{ background: m[k][0] }}>{m[k][1]}</span>;
}

const Bar = () => (
  <div className="ph-bar"><b>9:41</b><span className="ph-isl" /><i /></div>
);

const Nav = ({ on }: { on: number }) => (
  <div className="ph-nav">
    {["▣", "◷", "⇄", "◎", "⚙"].map((c, i) => (
      <span key={i} className={i === 2 ? "mid" : i === on ? "on" : ""}>{c}</span>
    ))}
  </div>
);

const Net = ({ label, big = false }: { label: string; big?: boolean }) => (
  <span className={`ph-net${big ? " lg" : ""}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={LOGO} alt="" />
    {label}
  </span>
);

function Home() {
  const toks: [TokKey, string, string, string][] = [
    ["reAED", "132 reAED", "AED 132.00", "$35.94"],
    ["USDT", "725.89 USDT", "AED 2,665.86", "$725.90"],
    ["WreAED", "47 WreAED", "AED 47.00", "$12.80"],
    ["USDC", "2.63 USDC", "AED 9.68", "$2.64"],
  ];
  return (
    <>
      <div className="ph-card">
        <div className="ph-row">
          <Net label="INFRA ⌄" />
          <span className="ph-acc"><b>Account 1 ⌄</b><small>0x09E9…4AcF</small></span>
        </div>
        <small className="ph-mut">Balance</small>
        <b className="ph-bal tn">AED 2,854.54</b>
        <small className="ph-mut">$777.28</small>
      </div>
      <div className="ph-acts">
        {["Send", "Receive", "Swap", "Bridge"].map((a, i) => (
          <span key={a}><i>{["↑", "↓", "⇄", "⟳"][i]}</i>{a}</span>
        ))}
      </div>
      <div className="ph-tabs"><b>Tokens</b><span>NFTs</span></div>
      <div className="ph-list">
        {toks.map(([k, a, v, u], i) => (
          <div key={k} className="ph-tok" style={{ animationDelay: `${0.25 + i * 0.12}s` }}>
            <Tok k={k} /><span><b>{k}</b><small>{a}</small></span><span className="r"><b>{v}</b><small>{u}</small></span>
          </div>
        ))}
      </div>
      <Nav on={0} />
    </>
  );
}

function Swap() {
  return (
    <>
      <h4 className="ph-h">Swap</h4>
      <div className="ph-box"><small className="ph-mut">YOU PAY</small><div className="ph-row"><b className="ph-amt tn">20.00</b><span className="ph-pill"><Tok k="reAED" />reAED ⌄</span></div><small className="ph-mut">Balance: 132.0000</small></div>
      <div className="ph-flip">⇅</div>
      <div className="ph-box"><small className="ph-mut">YOU RECEIVE</small><div className="ph-row"><b className="ph-amt tn ph-count">5.449</b><span className="ph-pill"><Tok k="USDT" />USDT ⌄</span></div><small className="ph-mut">Balance: 725.8990</small></div>
      <div className="ph-box ph-kv">
        <div><span>Provider</span><b className="blue">INFRA DEX</b></div>
        <div><span>Price</span><b>1 reAED ≈ 0.2724 USDT</b></div>
        <div><span>Network fee</span><b>10 reAED</b></div>
        <div><span>Slippage</span><b>0.5%</b></div>
      </div>
      <div className="ph-cta">Confirm swap</div>
      <Nav on={2} />
    </>
  );
}

function Bridge() {
  return (
    <>
      <h4 className="ph-h">Bridge</h4>
      <div className="ph-seg"><b>Transfer</b><span>Liquidity</span></div>
      <div className="ph-box"><small className="ph-mut">FROM</small><div className="ph-row"><Net label="INFRA" big /><span>⌄</span></div></div>
      <div className="ph-box"><small className="ph-mut">TOKEN &amp; AMOUNT</small><div className="ph-row"><span className="ph-pill"><Tok k="USDT" />USDT ⌄</span><b className="ph-amt tn">250</b></div><small className="ph-mut">Network fee: up to 4 reAED</small></div>
      <div className="ph-route"><i /><i /><i /></div>
      <div className="ph-box"><small className="ph-mut">TO</small><div className="ph-row"><span className="ph-net lg"><Tok k="BNB" />BNB Chain</span><span>⌄</span></div></div>
      <div className="ph-box"><small className="ph-mut">RECEIVE (ESTIMATED)</small><div className="ph-row"><span className="ph-pill"><Tok k="USDT" />USDT</span><b className="ph-amt tn">249.6</b></div></div>
      <div className="ph-cta">Bridge</div>
    </>
  );
}

function Activity() {
  const rows = [
    ["Sent reAED", "To: 0xd965…fc94", "−20.00", "reAED"],
    ["Swap", "reAED → USDT", "20.00", "reAED"],
    ["Swap", "reAED → WreAED", "2.00", "reAED"],
    ["Received reAED", "From: 0xd839…af0e", "+110.00", "reAED"],
    ["Received USDT", "From: 0xd839…af0e", "+32.00", "USDT"],
    ["Bridge", "INFRA → BNB Chain", "250.00", "USDT"],
  ];
  return (
    <>
      <h4 className="ph-h">Activity</h4>
      <small className="ph-mut ph-date">Today</small>
      <div className="ph-list">
        {rows.map(([t, s, a, u], i) => {
          const inc = a.startsWith("+");
          return (
            <div key={i} className="ph-tok" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
              <span className={`ph-ico${inc ? " in" : ""}`}>{t.startsWith("Swap") ? "⇄" : t.startsWith("Bridge") ? "⟳" : inc ? "↓" : "↑"}</span>
              <span><b>{t}</b><small>{s}</small></span>
              <span className="r"><b className={inc ? "pos" : ""}>{a}</b><small>{u}</small></span>
            </div>
          );
        })}
      </div>
      <Nav on={1} />
    </>
  );
}

function Settings() {
  const items = [["Wallet management", "Imported 2"], ["Address book", ""], ["reID Connect", ""], ["Networks", "INFRA Network"], ["Primary currency", "AED"], ["Secondary currency", "USD"], ["Face ID & passcode", "On"], ["Language", "English"]];
  return (
    <>
      <h4 className="ph-h">Settings</h4>
      <div className="ph-box ph-row"><span className="ph-av" /><span style={{ flex: 1 }}><b>Account 1</b><small className="ph-mut" style={{ display: "block" }}>AED 2,854.54</small></span>›</div>
      <small className="ph-mut ph-date">General</small>
      <div className="ph-box ph-set">
        {items.map(([k, v]) => <div key={k}><span>{k}</span><small>{v} ›</small></div>)}
      </div>
      <Nav on={4} />
    </>
  );
}

const screens = { home: Home, swap: Swap, bridge: Bridge, activity: Activity, settings: Settings };

export function Phone({ screen, className = "" }: { screen: keyof typeof screens; className?: string }) {
  const S = screens[screen];
  return (
    <div className={`phone ${className}`} aria-hidden="true">
      <div className="ph-scr">
        <Bar />
        <S />
      </div>
    </div>
  );
}
