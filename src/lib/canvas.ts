/* Canvas renderers for the INFRA site. Each returns a cleanup function. */

type FieldOpts = { cols: number; rows: number; packets: number; horizon: number; cx: number; width: number; dark: boolean };

/** Perspective dot terrain with blue transaction streaks; ripples toward the pointer. */
export function dotField(cv: HTMLCanvasElement, opt: FieldOpts, reduced: boolean): () => void {
  const x = cv.getContext("2d");
  if (!x) return () => {};
  let W = 0, H = 0, run = true, alive = true, raf = 0, t = 0;
  let mx = -9, my = -9, tmx = -9, tmy = -9;
  const D = Math.min(window.devicePixelRatio || 1, 2);
  const size = () => {
    const b = cv.getBoundingClientRect();
    W = b.width; H = b.height; cv.width = W * D; cv.height = H * D; x.setTransform(D, 0, 0, D, 0, 0);
  };
  size();
  const host = cv.parentElement!;
  const onMove = (e: PointerEvent) => { const b = cv.getBoundingClientRect(); tmx = (e.clientX - b.left) / W; tmy = (e.clientY - b.top) / H; };
  const onLeave = () => { tmx = tmy = -9; };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  window.addEventListener("resize", size);
  const io = new IntersectionObserver(([e]) => { run = e.isIntersecting; });
  io.observe(cv);
  const { cols: COLS, rows: ROWS } = opt;
  const pk = Array.from({ length: opt.packets }, () => ({ r: (Math.random() * ROWS) | 0, c: Math.random() * COLS, s: 0.08 + Math.random() * 0.18 }));
  const height = (u: number, z: number, px: number, py0: number) => {
    let h = Math.sin(u * 7 + t) * 0.5 + Math.sin(z * 6 - t * 1.3) * 0.5 + Math.sin((u + z) * 4 + t * 0.7) * 0.4;
    const dx = px / W - mx, dy = py0 / H - my;
    h += Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) * 5) * 2.2;
    return h;
  };
  const draw = () => {
    if (!alive) return;
    if (run) {
      t += reduced ? 0 : 0.012;
      mx += (tmx - mx) * 0.08; my += (tmy - my) * 0.08;
      x.clearRect(0, 0, W, H);
      const hz = H * opt.horizon, base = H * 1.05;
      for (let r = 0; r < ROWS; r++) {
        const z = r / (ROWS - 1), zz = Math.pow(z, 1.6), py0 = hz + (base - hz) * zz, spread = 0.35 + zz * 1.1;
        for (let c = 0; c < COLS; c++) {
          const u = c / (COLS - 1), px = W * opt.cx + (u - 0.5) * W * spread * opt.width;
          if (px < 0 || px > W) continue;
          const py = py0 - height(u, z, px, py0) * (6 + zz * 22), a = 0.12 + zz * 0.55, s = 0.6 + zz * 1.6;
          x.fillStyle = opt.dark ? `rgba(255,255,255,${a * 0.6})` : `rgba(10,11,14,${a})`;
          x.fillRect(px - s / 2, py - s / 2, s, s);
        }
      }
      for (const p of pk) {
        p.c += reduced ? 0 : p.s;
        if (p.c > COLS) { p.c = 0; p.r = (Math.random() * ROWS) | 0; }
        const z = p.r / (ROWS - 1), zz = Math.pow(z, 1.6), py0 = hz + (base - hz) * zz, spread = 0.35 + zz * 1.1;
        for (let k = 0; k < 14; k++) {
          const cc = p.c - k * 0.35;
          if (cc < 0) break;
          const u = cc / (COLS - 1), px = W * opt.cx + (u - 0.5) * W * spread * opt.width;
          const py = py0 - height(u, z, px, py0) * (6 + zz * 22), s = (1.2 + zz * 2.4) * (1 - k / 14);
          x.fillStyle = `rgba(31,91,255,${(1 - k / 14) * (0.4 + zz * 0.6)})`;
          x.beginPath(); x.arc(px, py, s, 0, 7); x.fill();
        }
      }
    }
    if (!reduced) raf = requestAnimationFrame(draw);
  };
  draw();
  return () => {
    alive = false; cancelAnimationFrame(raf); io.disconnect();
    window.removeEventListener("resize", size);
    host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
  };
}

/** Isometric settlement chain: transactions stream into a slot, a block drops and seals, the chain slides on. */
export function settlementChain(cv: HTMLCanvasElement, reduced: boolean, onSeal: (height: number, tx: number) => void): () => void {
  const x = cv.getContext("2d");
  if (!x) return () => {};
  let W = 0, H = 0, s = 60, run = true, alive = true, raf = 0;
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  const D = Math.min(window.devicePixelRatio || 1, 2);
  const size = () => { const b = cv.getBoundingClientRect(); W = b.width; H = b.height; cv.width = W * D; cv.height = H * D; s = Math.min(W * 0.115, H * 0.17); };
  size();
  window.addEventListener("resize", size);
  const io = new IntersectionObserver(([e]) => { run = e.isIntersecting; });
  io.observe(cv);
  const host = cv.parentElement!;
  const onMove = (e: PointerEvent) => { const b = cv.getBoundingClientRect(); tmx = (e.clientX - b.left) / W - 0.5; tmy = (e.clientY - b.top) / H - 0.5; };
  const onLeave = () => { tmx = tmy = 0; };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);

  const cs = getComputedStyle(document.body);
  const FS = cs.getPropertyValue("--font-geist-sans").trim() || "system-ui, sans-serif";
  const FM = cs.getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace";
  const C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6), G = 1.62, N = 5;
  let ox = 0, oy = 0;
  const P = (X: number, Y: number, Z: number): [number, number] => [ox + (X - Y) * C * s, oy + (X + Y) * S * s - Z * s];
  let hgt = 1284512;
  let blocks = Array.from({ length: N }, (_, j) => ({ h: hgt - (N - 1) + j, X: (j - (N - 1)) * G }));
  const parts: { x: number; y: number; t: number; sp: number }[] = [];
  let tx = 0, cyc = 0, phase = 0, dropZ = 3.4, slide = 0;
  const ez = (t: number) => 1 - Math.pow(1 - t, 3);
  const eb = (t: number) => { const c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

  const poly = (pts: [number, number][], fill: string, stroke: string) => {
    x.beginPath(); x.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0], pts[i][1]);
    x.closePath(); x.fillStyle = fill; x.fill(); x.strokeStyle = stroke; x.lineWidth = 1; x.stroke();
  };
  const cube = (X: number, z: number, blue: boolean, a: number, label: number) => {
    x.globalAlpha = a;
    const st = blue ? "rgba(255,255,255,.28)" : "rgba(10,11,14,.16)";
    poly([P(X, 1, z), P(X + 1, 1, z), P(X + 1, 1, z + 1), P(X, 1, z + 1)], blue ? "#1546D6" : "#E8EDF7", st);
    poly([P(X + 1, 0, z), P(X + 1, 1, z), P(X + 1, 1, z + 1), P(X + 1, 0, z + 1)], blue ? "#0E36AE" : "#D3DCEF", st);
    poly([P(X, 0, z + 1), P(X + 1, 0, z + 1), P(X + 1, 1, z + 1), P(X, 1, z + 1)], blue ? "#2F68FF" : "#FFFFFF", st);
    x.strokeStyle = blue ? "rgba(255,255,255,.14)" : "rgba(10,11,14,.07)";
    for (let k = 1; k < 4; k++) {
      const zz = z + k / 4, a1 = P(X, 1, zz), b1 = P(X + 1, 1, zz), a2 = P(X + 1, 0, zz);
      x.beginPath(); x.moveTo(a1[0], a1[1]); x.lineTo(b1[0], b1[1]); x.moveTo(a2[0], a2[1]); x.lineTo(b1[0], b1[1]); x.stroke();
    }
    const o = P(X, 0, z + 1);
    x.save();
    x.setTransform((D * C * s) / 100, (D * S * s) / 100, (-D * C * s) / 100, (D * S * s) / 100, o[0] * D, o[1] * D);
    x.textAlign = "center";
    x.fillStyle = blue ? "#fff" : "rgba(10,11,14,.78)";
    x.font = `500 15px ${FM}`;
    x.fillText("#" + String(label).slice(-4), 50, 46);
    x.fillStyle = blue ? "#fff" : "#1F5BFF";
    x.font = `600 19px ${FS}`;
    x.fillText("10 AED", 50, 70);
    x.restore();
    x.setTransform(D, 0, 0, D, 0, 0);
    x.globalAlpha = 1;
  };
  const link = (X1: number, a: number) => {
    x.globalAlpha = a;
    const p1 = P(X1 + 1, 0.5, 0.5), p2 = P(X1 + G, 0.5, 0.5);
    x.strokeStyle = "rgba(10,11,14,.35)"; x.lineWidth = 1.4; x.setLineDash([3, 3]);
    x.beginPath(); x.moveTo(p1[0], p1[1]); x.lineTo(p2[0], p2[1]); x.stroke(); x.setLineDash([]);
    x.globalAlpha = 1;
  };
  const ghost = (X: number, t: number) => {
    x.strokeStyle = `rgba(31,91,255,${0.35 + Math.sin(t * 6) * 0.2})`; x.lineWidth = 1.2; x.setLineDash([4, 4]);
    const e: [number, number, number][][] = [
      [[X, 0, 0], [X + 1, 0, 0]], [[X + 1, 0, 0], [X + 1, 1, 0]], [[X + 1, 1, 0], [X, 1, 0]], [[X, 1, 0], [X, 0, 0]],
      [[X, 0, 1], [X + 1, 0, 1]], [[X + 1, 0, 1], [X + 1, 1, 1]], [[X + 1, 1, 1], [X, 1, 1]], [[X, 1, 1], [X, 0, 1]],
      [[X, 1, 0], [X, 1, 1]], [[X + 1, 1, 0], [X + 1, 1, 1]], [[X + 1, 0, 0], [X + 1, 0, 1]],
    ];
    x.beginPath();
    for (const [a, b] of e) { const p = P(...a), q = P(...b); x.moveTo(p[0], p[1]); x.lineTo(q[0], q[1]); }
    x.stroke(); x.setLineDash([]);
  };
  const floor = () => {
    x.strokeStyle = "rgba(10,11,14,.06)"; x.lineWidth = 1;
    for (let i = -9; i <= 4; i++) { const a = P(i * G * 0.5, -1.5, 0), b = P(i * G * 0.5, 2.5, 0); x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); }
    for (let j = -1; j <= 2; j++) { const a = P(-8.5, j, 0), b = P(3.5, j, 0); x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); }
  };

  let last = performance.now();
  const frame = (now: number) => {
    if (!alive) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (run) {
      mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      const midX = (-(N - 1) * G + G + 1) / 2;
      ox = W * 0.5 - (midX - 0.5) * C * s + mx * 18;
      oy = H * 0.56 - (midX + 0.5) * S * s + my * 12;
      if (!reduced) cyc += dt;
      if (cyc < 1.8) {
        phase = 0;
        if (!reduced && Math.random() < 0.55) { parts.push({ x: W * (0.15 + Math.random() * 0.7), y: -10 - Math.random() * 40, t: 0, sp: 0.9 + Math.random() * 0.6 }); tx++; }
      } else if (cyc < 2.4) {
        if (phase === 0) { phase = 1; dropZ = 3.4; }
        dropZ = 3.4 * (1 - eb(Math.min(1, (cyc - 1.8) / 0.6)));
      } else if (cyc < 3.1) {
        if (phase === 1) { phase = 2; hgt++; onSeal(hgt, tx); }
        slide = ez(Math.min(1, (cyc - 2.4) / 0.7));
      } else {
        blocks = [...blocks.slice(1), { h: hgt, X: 0 }].map((b, j) => ({ ...b, X: (j - (N - 1)) * G }));
        cyc = 0; phase = 0; slide = 0; dropZ = 3.4; tx = 0;
      }
      x.setTransform(D, 0, 0, D, 0, 0);
      x.clearRect(0, 0, W, H);
      floor();
      const sh = P(-2.2, 0.5, 0);
      const g = x.createRadialGradient(sh[0], sh[1] + s * 0.2, 0, sh[0], sh[1] + s * 0.2, s * 4.2);
      g.addColorStop(0, "rgba(31,91,255,.10)"); g.addColorStop(1, "rgba(31,91,255,0)");
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      const off = -G * slide;
      blocks.forEach((b, j) => {
        const X = b.X + off, a = j === 0 ? 1 - slide : 1;
        cube(X, 0, j === N - 1 && phase < 2, a, b.h);
        if (j < N - 1) link(X, a);
      });
      const fx = G + off;
      if (phase === 0) ghost(fx, cyc);
      if (phase >= 1) { link(blocks[N - 1].X + off, 1); cube(fx, phase === 1 ? dropZ : 0, true, 1, hgt + (phase === 1 ? 1 : 0)); }
      const tgt = P(G + 0.5, 0.5, 1.05);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.t += dt * p.sp;
        const e = ez(Math.min(1, p.t)), px = p.x + (tgt[0] - p.x) * e, py = p.y + (tgt[1] - p.y) * e;
        x.fillStyle = `rgba(31,91,255,${0.25 + 0.75 * (1 - e)})`; x.fillRect(px - 2.5, py - 2.5, 5, 5);
        const e0 = Math.max(0, e - 0.15);
        x.strokeStyle = `rgba(31,91,255,${0.18 * (1 - e)})`;
        x.beginPath(); x.moveTo(p.x + (tgt[0] - p.x) * e0, p.y + (tgt[1] - p.y) * e0); x.lineTo(px, py); x.stroke();
        if (p.t >= 1) parts.splice(i, 1);
      }
    }
    if (!reduced) raf = requestAnimationFrame(frame);
  };
  const start = () => { if (alive) raf = requestAnimationFrame(frame); };
  if (document.fonts?.ready) document.fonts.ready.then(start); else start();
  return () => {
    alive = false; cancelAnimationFrame(raf); io.disconnect();
    window.removeEventListener("resize", size);
    host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
  };
}
