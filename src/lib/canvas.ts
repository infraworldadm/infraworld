/* Canvas renderers for the INFRA site. Each returns a cleanup function. */

type FieldOpts = { cols: number; rows: number; packets: number; horizon: number; cx: number; width: number; dark: boolean };

/** Perspective dot terrain with blue transaction streaks; ripples toward the pointer. */
export function dotField(cv: HTMLCanvasElement, opt: FieldOpts, reduced: boolean): () => void {
  const x = cv.getContext("2d");
  if (!x) return () => {};
  let W = 0, H = 0, run = true, alive = true, raf = 0, t = 0;
  let mx = -9, my = -9, tmx = -9, tmy = -9;
  const D = Math.min(window.devicePixelRatio || 1, window.matchMedia("(pointer:coarse)").matches ? 1.5 : 2);
  let lastW = -1, lastH = -1;
  const size = () => {
    const b = cv.getBoundingClientRect();
    if (b.width === lastW && b.height === lastH) return;
    lastW = b.width; lastH = b.height;
    W = b.width; H = b.height; cv.width = W * D; cv.height = H * D; x.setTransform(D, 0, 0, D, 0, 0);
  };
  size();
  const host = cv.parentElement!;
  const onMove = (e: PointerEvent) => { const b = cv.getBoundingClientRect(); tmx = (e.clientX - b.left) / W; tmy = (e.clientY - b.top) / H; };
  const onLeave = () => { tmx = tmy = -9; };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  // ResizeObserver catches layout changes (fonts/images loading) that never fire window "resize" — esp. iOS Safari.
  const ro = new ResizeObserver(() => { size(); if (reduced) draw(); });
  ro.observe(cv);
  const io = new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run && reduced) draw(); });
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
    alive = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
    host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
  };
}

/** Isometric settlement chain: transactions stream into a slot, a block drops and seals, the chain slides on. */
export function settlementChain(cv: HTMLCanvasElement, reduced: boolean, onSeal: (height: number, tx: number) => void): () => void {
  const x = cv.getContext("2d");
  if (!x) return () => {};
  let W = 0, H = 0, s = 60, run = true, alive = true, raf = 0;
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  const D = Math.min(window.devicePixelRatio || 1, window.matchMedia("(pointer:coarse)").matches ? 1.5 : 2);
  let lastW = -1, lastH = -1;
  const size = () => { const b = cv.getBoundingClientRect(); if (b.width === lastW && b.height === lastH) return; lastW = b.width; lastH = b.height; W = b.width; H = b.height; cv.width = W * D; cv.height = H * D; s = Math.min(W * 0.115, H * 0.17); };
  size();
  const ro = new ResizeObserver(() => { size(); if (reduced && started) frame(performance.now()); });
  ro.observe(cv);
  let started = false;
  const io = new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run && reduced && started) frame(performance.now()); });
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
  const start = () => { if (started || !alive) return; started = true; raf = requestAnimationFrame(frame); };
  // iOS Safari's document.fonts.ready can stay pending — never block the animation on it.
  document.fonts?.ready.then(start);
  window.setTimeout(start, 400);
  return () => {
    alive = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
    host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
  };
}

/** INFRA Global: dotted globe; the INFRA core fans out to a pegged stablecoin network per currency. */
export function globe(cv: HTMLCanvasElement, reduced: boolean): () => void {
  const x = cv.getContext("2d");
  if (!x) return () => {};
  const coarse = window.matchMedia("(pointer:coarse)").matches;
  const D = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
  let W = 0, H = 0, run = true, alive = true, raf = 0, lastW = -1, lastH = -1;
  let px = 0, py = 0, tpx = 0, tpy = 0;
  const size = () => {
    const b = cv.getBoundingClientRect();
    if (b.width === lastW && b.height === lastH) return;
    lastW = b.width; lastH = b.height; W = b.width; H = b.height;
    cv.width = W * D; cv.height = H * D;
  };
  size();
  const ro = new ResizeObserver(() => { size(); if (reduced) frame(performance.now()); });
  ro.observe(cv);
  const io = new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run && reduced) frame(performance.now()); });
  io.observe(cv);
  const host = cv.parentElement!;
  const onMove = (e: PointerEvent) => { const b = cv.getBoundingClientRect(); tpx = (e.clientX - b.left) / W - 0.5; tpy = (e.clientY - b.top) / H - 0.5; };
  const onLeave = () => { tpx = tpy = 0; };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);

  const cs = getComputedStyle(document.body);
  const FS = cs.getPropertyValue("--font-geist-sans").trim() || "system-ui, sans-serif";
  const FM = cs.getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace";
  const RAD = Math.PI / 180;
  // Simplified continent outlines (lon, lat) — enough to read as a world map in dot form.
  const LAND: number[][][] = [
    [[-168,65],[-140,70],[-95,72],[-80,63],[-60,55],[-55,47],[-70,43],[-76,35],[-81,25],[-97,26],[-97,18],[-87,15],[-79,8],[-92,15],[-105,20],[-117,32],[-124,40],[-125,49],[-135,58],[-150,60],[-165,60]],
    [[-50,60],[-20,70],[-20,82],[-60,82],[-73,76]],
    [[-79,8],[-60,10],[-50,0],[-35,-7],[-40,-22],[-48,-28],[-58,-38],[-65,-55],[-72,-50],[-71,-30],[-80,-5]],
    [[-10,36],[-9,43],[-2,48],[-5,58],[5,62],[15,69],[28,71],[40,67],[45,55],[40,45],[28,41],[23,37],[12,38],[5,43],[-5,36]],
    [[-6,50],[2,51],[-2,58],[-6,57]],
    [[-17,15],[-17,21],[-8,35],[10,37],[32,31],[35,28],[43,12],[51,12],[40,-15],[35,-25],[20,-35],[15,-25],[10,-5],[8,4],[-8,5]],
    [[28,41],[40,45],[45,55],[40,67],[60,70],[80,73],[110,77],[140,72],[170,68],[180,65],[160,55],[140,52],[130,42],[122,30],[120,22],[108,20],[105,10],[100,3],[98,15],[90,22],[80,8],[73,20],[62,25],[57,25],[52,27],[48,30],[35,35]],
    [[35,28],[39,22],[43,13],[52,16],[59,22],[56,26],[51,26],[48,30],[36,33]],
    [[114,-22],[122,-18],[131,-12],[142,-11],[146,-18],[153,-26],[150,-37],[140,-38],[130,-32],[115,-35]],
    [[95,5],[105,-6],[120,-9],[140,-8],[130,-2],[118,5],[108,2]],
    [[130,31],[141,36],[142,45],[139,40]],
  ];
  const inPoly = (lon: number, lat: number, poly: number[][]) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const N = coarse ? 1800 : 3200;
  const dots: { v: readonly [number, number, number]; land: boolean }[] = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), th = Math.PI * (3 - Math.sqrt(5)) * i;
    const v = [Math.cos(th) * r, y, Math.sin(th) * r] as const;
    const lat = Math.asin(v[1]) / RAD, lon = Math.atan2(v[0], v[2]) / RAD;
    const land = LAND.some((pl) => inPoly(lon, lat, pl));
    if (land || i % 4 === 0) dots.push({ v, land });
  }
  const v3 = (lat: number, lon: number) => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)] as const;
  // Currency networks INFRA can launch. side: label placement (-1 left, 1 right).
  const nodes = [
    { sym: "reAED", city: "UAE · Live", v: v3(25.2, 55.3), live: true, side: 1 },
    { sym: "reSAR", city: "Saudi Arabia", v: v3(24.7, 46.7), side: -1 },
    { sym: "reINR", city: "India", v: v3(19.1, 72.9), side: 1 },
    { sym: "reEUR", city: "Eurozone", v: v3(50.1, 8.7), side: 1 },
    { sym: "reGBP", city: "United Kingdom", v: v3(51.5, -0.1), side: -1 },
    { sym: "reUSD", city: "United States", v: v3(40.7, -74), side: -1 },
    { sym: "reSGD", city: "Singapore", v: v3(1.35, 103.8), side: 1 },
    { sym: "reJPY", city: "Japan", v: v3(35.7, 139.7), side: 1 },
    { sym: "Your currency", city: "Any fiat peg", v: v3(-23.5, -46.6), you: true, side: 1 },
    { sym: "Your currency", city: "Any fiat peg", v: v3(-26.2, 28), you: true, side: 1 },
    { sym: "Your currency", city: "Any fiat peg", v: v3(-33.9, 151.2), you: true, side: -1 },
  ] as { sym: string; city: string; v: readonly number[]; live?: boolean; you?: boolean; side: number }[];
  let t = 0, last = performance.now();
  const frame = (now: number) => {
    if (!alive) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (run && W > 0) {
      if (!reduced) t += dt;
      px += (tpx - px) * 0.05; py += (tpy - py) * 0.05;
      const rot = (-(30 + Math.sin(t * 0.1) * 80) + px * 25) * RAD, tilt = (22 + py * 10) * RAD;
      const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
      const R = Math.min(W, H) * 0.38, cx = W * 0.5, cy = H * 0.57;
      const P = (v: readonly number[], lift = 1) => {
        const X = v[0] * cr + v[2] * sr, Z0 = -v[0] * sr + v[2] * cr;
        const Y = v[1] * ct - Z0 * st, Z = v[1] * st + Z0 * ct;
        return [cx + X * R * lift, cy - Y * R * lift, Z] as const;
      };
      x.setTransform(D, 0, 0, D, 0, 0);
      x.clearRect(0, 0, W, H);
      // atmosphere
      const g = x.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.35);
      g.addColorStop(0, "rgba(31,91,255,.10)"); g.addColorStop(0.75, "rgba(31,91,255,.06)"); g.addColorStop(1, "rgba(31,91,255,0)");
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R * 1.35, 0, 7); x.fill();
      const body = x.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "#ffffff"); body.addColorStop(1, "#E9EEF9");
      x.fillStyle = body; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();
      x.strokeStyle = "rgba(31,91,255,.22)"; x.lineWidth = 1; x.stroke();
      // dots
      for (const d of dots) {
        const p = P(d.v);
        if (p[2] <= 0) continue;
        if (d.land) {
          x.fillStyle = `rgba(10,11,14,${0.18 + p[2] * 0.6})`;
          const s = 1 + p[2] * 1.4;
          x.fillRect(p[0] - s / 2, p[1] - s / 2, s, s);
        } else {
          x.fillStyle = `rgba(31,91,255,${0.08 + p[2] * 0.14})`;
          x.fillRect(p[0] - 0.6, p[1] - 0.6, 1.2, 1.2);
        }
      }
      // INFRA core sits in front of the globe; links fan out to each visible currency network.
      const hs = Math.max(24, R * 0.13), hx = cx, hy = cy - R - hs * 0.35;
      const pts = nodes.map((n) => ({ n, p: P(n.v) }));
      pts.forEach(({ n, p }, i) => {
        if (p[2] < 0.12) return;
        const a = Math.min(1, (p[2] - 0.12) * 3);
        const mx = (hx + p[0]) / 2, my = (hy + p[1]) / 2;
        const dx = p[0] - hx, dy = p[1] - hy, L = Math.hypot(dx, dy) || 1;
        const qx = mx - (dy / L) * L * 0.18, qy = my + (dx / L) * L * 0.18 - L * 0.12;
        x.globalAlpha = a;
        x.beginPath(); x.moveTo(hx, hy); x.quadraticCurveTo(qx, qy, p[0], p[1]);
        x.strokeStyle = n.live ? "rgba(31,91,255,.85)" : n.you ? "rgba(10,11,14,.25)" : "rgba(31,91,255,.4)";
        x.lineWidth = n.live ? 2 : 1.2;
        x.setLineDash(n.live ? [] : [4, 4]); x.stroke(); x.setLineDash([]);
        if (!n.you) {
          for (let k = 0; k < (n.live ? 3 : 1); k++) {
            const u = (t * (n.live ? 0.55 : 0.35) + i * 0.17 + k / 3) % 1, iu = 1 - u;
            const bx = iu * iu * hx + 2 * iu * u * qx + u * u * p[0], by = iu * iu * hy + 2 * iu * u * qy + u * u * p[1];
            x.fillStyle = "rgba(31,91,255,.18)"; x.beginPath(); x.arc(bx, by, 6, 0, 7); x.fill();
            x.fillStyle = "#1F5BFF"; x.beginPath(); x.arc(bx, by, 2.4, 0, 7); x.fill();
          }
        }
        x.globalAlpha = 1;
      });
      // markers + labels
      const pulse = (t * 0.8) % 1;
      const label = (p: readonly number[], n: (typeof nodes)[number]) => {
        if (p[2] < 0.12) return;
        x.globalAlpha = Math.min(1, (p[2] - 0.12) * 3);
        if (n.live) { x.strokeStyle = `rgba(31,91,255,${0.6 * (1 - pulse)})`; x.lineWidth = 1.5; x.beginPath(); x.arc(p[0], p[1], 5 + pulse * 18, 0, 7); x.stroke(); }
        x.fillStyle = n.live ? "#1F5BFF" : n.you ? "#9AA3B2" : "#0A0B0E"; x.beginPath(); x.arc(p[0], p[1], n.live ? 5 : 3.5, 0, 7); x.fill();
        x.fillStyle = "#fff"; x.beginPath(); x.arc(p[0], p[1], n.live ? 2 : 1.3, 0, 7); x.fill();
        const top = n.you ? "+ " + n.sym : n.sym;
        x.font = `600 12px ${FS}`; const w1 = x.measureText(top).width;
        x.font = `500 9px ${FM}`; const w2 = x.measureText(n.city.toUpperCase()).width;
        const bw = Math.max(w1, w2) + 18, bh = 34;
        const bx = Math.max(4, Math.min(W - bw - 4, n.side < 0 ? p[0] - bw - 9 : p[0] + 9)), by = Math.max(4, Math.min(H - bh - 4, p[1] - bh / 2));
        x.fillStyle = n.live ? "#1F5BFF" : "rgba(255,255,255,.96)";
        x.strokeStyle = n.live ? "#1F5BFF" : n.you ? "rgba(10,11,14,.25)" : "rgba(10,11,14,.1)";
        x.setLineDash(n.you ? [3, 3] : []);
        x.beginPath();
        const r = 8;
        x.moveTo(bx + r, by); x.arcTo(bx + bw, by, bx + bw, by + bh, r); x.arcTo(bx + bw, by + bh, bx, by + bh, r); x.arcTo(bx, by + bh, bx, by, r); x.arcTo(bx, by, bx + bw, by, r);
        x.closePath(); x.fill(); x.stroke(); x.setLineDash([]);
        x.fillStyle = n.live ? "#fff" : n.you ? "#1F5BFF" : "#0A0B0E"; x.font = `600 12px ${FS}`; x.fillText(top, bx + 9, by + 15);
        x.fillStyle = n.live ? "rgba(255,255,255,.78)" : "rgba(10,11,14,.5)"; x.font = `500 9px ${FM}`; x.fillText(n.city.toUpperCase(), bx + 9, by + 27);
        x.globalAlpha = 1;
      };
      [...pts].sort((a, b) => a.p[2] - b.p[2]).forEach(({ n, p }) => label(p, n));
      // INFRA core badge
      x.save(); x.translate(hx, hy);
      x.strokeStyle = `rgba(31,91,255,${0.5 * (1 - pulse)})`; x.lineWidth = 1.5;
      x.beginPath(); x.arc(0, 0, hs * (1.1 + pulse * 0.9), 0, 7); x.stroke();
      x.rotate(Math.PI / 4);
      x.fillStyle = "#0A0B0E"; x.strokeStyle = "rgba(31,91,255,.7)"; x.lineWidth = 1.5;
      x.beginPath();
      const rr = hs * 0.28, e = hs * 0.82;
      x.moveTo(-e + rr, -e); x.arcTo(e, -e, e, e, rr); x.arcTo(e, e, -e, e, rr); x.arcTo(-e, e, -e, -e, rr); x.arcTo(-e, -e, e, -e, rr);
      x.closePath(); x.fill(); x.stroke();
      x.restore();
      x.fillStyle = "#fff"; x.textAlign = "center";
      x.font = `700 ${Math.round(hs * 0.42)}px ${FS}`; x.fillText("INFRA", hx, hy + hs * 0.08);
      x.fillStyle = "rgba(255,255,255,.6)"; x.font = `500 ${Math.max(7, Math.round(hs * 0.2))}px ${FM}`; x.fillText("CORE · L1", hx, hy + hs * 0.38);
      x.textAlign = "start";
    }
    if (!reduced) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => {
    alive = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
    host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
  };
}
