"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { dotField, globe, settlementChain } from "@/lib/canvas";

const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
const HEX = "0123456789abcdef";
const hex = (n: number) => Array.from({ length: n }, () => HEX[(Math.random() * 16) | 0]).join("");
const SCR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·";

/**
 * All page motion lives here: smooth scroll, cursor, reveals, scroll-scrubbed
 * effects, live illustrative feeds and canvas renderers. Mounted once on the page.
 */
export function Effects() {
  useEffect(() => {
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FINE = window.matchMedia("(pointer:fine)").matches;
    const MOBILE = !FINE || window.innerWidth < 760;
    const cleanups: (() => void)[] = [];
    const intervals: number[] = [];
    gsap.registerPlugin(ScrollTrigger);
    // Mobile: ignore address-bar show/hide resizes (they re-layout every trigger and cause jank).
    ScrollTrigger.config({ ignoreMobileResize: true });

    /* ---- smooth scroll ---- */
    let lenis: Lenis | null = null;
    if (!RM && !MOBILE) {
      lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4), wheelMultiplier: 0.9 });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => { gsap.ticker.remove(tick); lenis!.destroy(); });
    }
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.replace(/^\//, "");
      const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -76, duration: 1.6, force: true });
      else window.scrollTo({ top: target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - 76, behavior: RM ? "auto" : "smooth" });
    };
    document.addEventListener("click", onAnchor);
    cleanups.push(() => document.removeEventListener("click", onAnchor));

    /* ---- cursor, border spotlight, magnetic buttons ---- */
    if (FINE && !RM) {
      document.documentElement.classList.add("has-cursor");
      const d = $("#cd")!, r = $("#cr")!, l = $("#cl")!;
      let x = -100, y = -100, rx = x, ry = y, raf = 0;
      const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px)`; };
      const loop = () => { rx += (x - rx) * 0.14; ry += (y - ry) * 0.14; r.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
      loop();
      const over = (e: PointerEvent) => {
        const t = (e.target as Element).closest<HTMLElement>("a,button,input,[data-cursor]");
        r.classList.remove("h", "l"); l.textContent = "";
        if (!t) return;
        if (t.matches("a,button,input")) { r.classList.add("h"); return; }
        l.textContent = t.dataset.cursor || ""; r.classList.add("l");
      };
      const spot = (e: PointerEvent) => {
        const t = (e.target as Element).closest<HTMLElement>(".tile");
        if (!t) return;
        const b = t.getBoundingClientRect();
        t.style.setProperty("--mx", `${e.clientX - b.left}px`);
        t.style.setProperty("--my", `${e.clientY - b.top}px`);
      };
      const mag = (e: PointerEvent) => {
        const b = (e.target as Element).closest<HTMLElement>(".mag");
        if (!b) return;
        const q = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - q.left - q.width / 2) * 0.12}px,${(e.clientY - q.top - q.height / 2) * 0.22}px)`;
      };
      const magOut = (e: PointerEvent) => {
        const b = (e.target as Element).closest<HTMLElement>(".mag");
        if (b && !b.contains(e.relatedTarget as Node)) { b.style.transition = "transform .7s cubic-bezier(.16,1,.3,1)"; b.style.transform = ""; window.setTimeout(() => (b.style.transition = ""), 700); }
      };
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over);
      document.addEventListener("pointermove", spot, { passive: true });
      document.addEventListener("pointermove", mag, { passive: true });
      document.addEventListener("pointerout", magOut);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.removeEventListener("pointermove", spot);
        document.removeEventListener("pointermove", mag);
        document.removeEventListener("pointerout", magOut);
      });
    }

    /* ---- label scramble ---- */
    const scramble = (el: HTMLElement) => {
      if (RM || el.dataset.done) return;
      el.dataset.done = "1";
      const tn = Array.from(el.childNodes).find((n) => n.nodeType === 3 && n.textContent!.trim());
      if (!tn) return;
      const fin = tn.textContent!;
      let f = 0;
      const id = window.setInterval(() => {
        f += 1.4;
        tn.textContent = fin.split("").map((c, i) => (i < f || c === " " ? c : SCR[(Math.random() * SCR.length) | 0])).join("");
        if (f >= fin.length) { tn.textContent = fin; clearInterval(id); }
      }, 28);
      intervals.push(id);
    };

    /* ---- odometer ---- */
    $$("[data-odo] i").forEach((c, k) => {
      const set = () => { c.style.transitionDelay = `${k * 0.12}s`; c.style.transform = `translateY(-${c.dataset.d}em)`; };
      if (RM) set(); else window.setTimeout(set, 500);
    });

    /* ---- GSAP choreography ---- */
    // Un-hide the hero in the same task GSAP sets each tween's start state, so nothing flashes.
    document.documentElement.classList.remove("intro");
    const ctx = gsap.context(() => {
      if (RM) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".t-hero", { clipPath: "inset(6% 4% 6% 4% round 16px)", duration: 1.6, ease: "expo.inOut" })
        .from("#h1 .ln>span", { yPercent: 110, duration: 1.3, stagger: 0.09 }, "-=.9")
        .from(".hi", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, "-=1")
        .from(".hstats>div", { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, "-=.9")
        .add(() => $$(".hero .sc").forEach(scramble), "-=1.2");
      gsap.fromTo(".t-hero h1 .bl", { "--u": 0 }, { "--u": 1, duration: 1.4, ease: "expo.inOut", delay: 1.2 });
      gsap.from(".fc", { opacity: 0, y: 20, scale: 0.9, duration: 1.1, ease: "expo.out", stagger: 0.15, delay: 1.3 });
      gsap.to(".fc1", { y: -10, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".fc2", { y: 8, duration: 3.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".fc3", { y: -7, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" });

      ScrollTrigger.batch(".rv", {
        start: MOBILE ? "top 95%" : "top 90%",
        once: true,
        onEnter: (b) => {
          gsap.from(b, { y: MOBILE ? 32 : 60, opacity: 0.2, duration: MOBILE ? 0.9 : 1.3, ease: "expo.out", stagger: 0.09, clearProps: "transform,opacity" });
          (b as HTMLElement[]).forEach((t) => t.querySelectorAll<HTMLElement>(".sc").forEach(scramble));
        },
      });
      $$(".st2").forEach((h) => gsap.from(h, { y: 24, opacity: 0.2, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 90%" } }));
      if ($("#scrub")) gsap.to("#scrub .wd", { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: "#scrub", start: "top 80%", end: "bottom 40%", scrub: true } });
      gsap.to(".hero-in", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".t-hero", start: "top top", end: "bottom top", scrub: true } });

      /* pinned reAED steps */
      const steps = $$("#steps .step"), rail = $("#rail"), pb = $$("#path b");
      $("#steps")?.classList.add("live");
      const upd = (p: number) => {
        rail?.style.setProperty("--s", p.toFixed(3));
        const n = Math.min(3, Math.floor(p * 3.999));
        steps.forEach((s, i) => s.classList.toggle("on", i <= n));
        pb.forEach((b) => b.classList.toggle("on", +b.dataset.k! === n || (n === 2 && b.dataset.k === "1")));
      };
      if (steps.length) upd(0);
      const mm = gsap.matchMedia();
      if ($("#howTile")) {
      mm.add("(min-width:1081px)", () => { ScrollTrigger.create({ trigger: "#howTile", start: "top 96px", end: "+=1400", pin: "#howWrap", scrub: true, onUpdate: (s) => upd(s.progress) }); });
      mm.add("(max-width:1080px)", () => { ScrollTrigger.create({ trigger: "#howTile", start: "top 70%", end: "bottom 40%", scrub: true, onUpdate: (s) => upd(s.progress) }); });
      }

      /* chart draw */
      ([["#volPath", 2.2, 0], ["#flatPath", 1.4, 1.4]] as const).forEach(([sel, d, dl]) => {
        const p = $<SVGPathElement>(sel);
        if (!p) return;
        const L = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: d, delay: dl, ease: "power3.inOut", scrollTrigger: { trigger: "#challenges", start: "top 70%" } });
      });
      gsap.to(".vdot", { attr: { cx: 220 }, duration: 3.2, repeat: -1, ease: "none" });
    });
    cleanups.push(() => ctx.revert());
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") requestAnimationFrame(refresh);
    else { window.addEventListener("load", refresh, { once: true }); cleanups.push(() => window.removeEventListener("load", refresh)); }
    document.fonts?.ready.then(refresh);
    window.addEventListener("infra:refresh", refresh);
    cleanups.push(() => window.removeEventListener("infra:refresh", refresh));
    if (RM) $$(".pk").forEach((e) => e.remove());

    /* ---- illustrative live feeds ---- */
    const lbody = $("#lbody");
    if (lbody) {
      const types = ["Merchant payment", "B2B settlement", "Loyalty issuance", "Token transfer", "Settlement batch"];
      const mk = () => {
        const r = document.createElement("div");
        r.className = "lrow";
        r.innerHTML = `<span class="t">${new Date().toTimeString().slice(0, 8)}</span><span>0x${hex(6)}…${hex(4)}</span><span class="ty">${types[(Math.random() * types.length) | 0]}</span><span class="f">10.00 reAED</span><span class="s"><i></i>Final</span>`;
        return r;
      };
      lbody.replaceChildren(...Array.from({ length: 6 }, mk));
      if (!RM) intervals.push(window.setInterval(() => {
        const r = mk();
        lbody.prepend(r);
        gsap.from(r, { height: 0, opacity: 0, duration: 0.7, ease: "expo.out" });
        gsap.from(r.children, { y: -10, opacity: 0, stagger: 0.04, duration: 0.6, ease: "expo.out" });
        if (lbody.children.length > 7) lbody.lastElementChild!.remove();
      }, 1800));
    }
    const hashes = $("#hashes");
    if (hashes) {
      const mk = () => { const d = document.createElement("div"); d.innerHTML = `<span>0x${hex(4)}…${hex(4)}</span><b>verified</b>`; return d; };
      hashes.replaceChildren(...Array.from({ length: 6 }, mk));
      if (!RM) intervals.push(window.setInterval(() => {
        const d = mk();
        hashes.prepend(d);
        gsap.from(d, { y: -12, opacity: 0, duration: 0.6, ease: "expo.out" });
        if (hashes.children.length > 6) hashes.lastElementChild!.remove();
      }, 1400));
    }
    const use = $("#useCnt");
    if (use && !RM) {
      let n = 12480;
      intervals.push(window.setInterval(() => { n += 1 + ((Math.random() * 4) | 0); use.textContent = `${n.toLocaleString("en-US")} tx`; }, 900));
    }
    const peg = $<SVGPathElement>("#pegLine");
    if (peg && !RM) {
      let t = 0, raf = 0;
      const f = () => {
        t += 0.016;
        const pts: string[] = [];
        for (let i = 0; i <= 60; i++) pts.push(`${i * 5} ${(60 + Math.sin(i * 0.9 + t * 3) * 0.6 * Math.exp(-((60 - i) / 30))).toFixed(2)}`);
        peg.setAttribute("d", "M" + pts.join(" L"));
        raf = requestAnimationFrame(f);
      };
      f();
      cleanups.push(() => cancelAnimationFrame(raf));
    }
    const mq = $("#mq2");
    if (mq && !RM) {
      let ly = window.scrollY;
      const dir = () => { const d = window.scrollY - ly; ly = window.scrollY; mq.querySelectorAll<HTMLElement>(":scope>div").forEach((r) => (r.style.animationDirection = d < 0 ? "reverse" : "normal")); };
      window.addEventListener("scroll", dir, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", dir));
    }

    /* ---- canvases (deferred so the intro animation gets the first frames) ---- */
    let canvasTimer = 0;
    const startCanvases = () => {
      const terrain = $<HTMLCanvasElement>("#terrain");
      if (terrain) cleanups.push(dotField(terrain, { cols: MOBILE ? 44 : 84, rows: MOBILE ? 16 : 24, packets: MOBILE ? 6 : 12, horizon: 0.5, cx: 0.5, width: 1.35, dark: false }, RM));
      const cgrid = $<HTMLCanvasElement>("#cgrid");
      if (cgrid) cleanups.push(dotField(cgrid, { cols: MOBILE ? 32 : 56, rows: MOBILE ? 14 : 22, packets: MOBILE ? 4 : 8, horizon: 0.35, cx: 0.7, width: 1.1, dark: true }, RM));
      const glb = $<HTMLCanvasElement>("#globe");
      if (glb) cleanups.push(globe(glb, RM));
      const chain = $<HTMLCanvasElement>("#chain");
      if (chain) {
        const blk = $("#fcBlk"), txc = $("#fcTx");
        cleanups.push(settlementChain(chain, RM, (h, tx) => {
          if (blk) blk.textContent = `#${h.toLocaleString("en-US")}`;
          if (txc) txc.textContent = String(tx);
          if (!RM) gsap.fromTo([".fc1", ".fc2"], { scale: 0.94 }, { scale: 1, duration: 0.8, ease: "elastic.out(1,.5)", stagger: 0.08 });
        }));
      }
    };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) canvasTimer = ric(startCanvases, { timeout: 450 });
    else canvasTimer = window.setTimeout(startCanvases, 120);
    cleanups.push(() => {
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (ric && cic) cic(canvasTimer); else clearTimeout(canvasTimer);
    });

    return () => {
      intervals.forEach(clearInterval);
      cleanups.reverse().forEach((c) => c());
    };
  }, []);

  return (
    <>
      <div className="cur" id="cd" aria-hidden="true" />
      <div className="cur" id="cr" aria-hidden="true"><span id="cl" /></div>
      <div className="amb" aria-hidden="true"><i /><i /></div>
    </>
  );
}
