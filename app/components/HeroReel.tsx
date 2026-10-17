"use client";

import { useEffect, useRef } from "react";
import Showreel from "./Showreel";
import { site } from "@/app/lib/content";

/**
 * Title card with the portrait on the right. On wide screens the hero pins while you scroll,
 * and the portrait grows into the showreel frame and dissolves into it. Narrow screens and
 * reduced motion get a plain stacked layout (handled in CSS; this only feeds the variables).
 */
export default function HeroReel({ children }: { children: React.ReactNode }) {
  const stage = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current, st = sticky.current, s = slot.current;
    if (!el || !st || !s) return;
    const mq = matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const video = el.querySelector("video");
    let raf = 0;

    const measure = () => {
      if (!mq.matches) { el.classList.remove("ready", "full"); return; }
      const box = st.getBoundingClientRect();
      const r = s.getBoundingClientRect();
      const grid = s.parentElement!;
      const pad = parseFloat(getComputedStyle(grid).paddingLeft);
      const nav = 72;
      const w1 = Math.min(grid.clientWidth - pad * 2, ((box.height - nav - 56) * 16) / 9);
      const h1 = (w1 * 9) / 16;
      const v = {
        x0: r.left - box.left, y0: r.top - box.top, w0: r.width, h0: r.height,
        x1: (box.width - w1) / 2, y1: nav + (box.height - nav - h1) / 2, w1, h1,
      };
      for (const [k, n] of Object.entries(v)) el.style.setProperty(`--${k}`, `${n}px`);
      el.classList.add("ready");
      update();
    };

    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const travel = el.offsetHeight - innerHeight;
      const t = Math.min(Math.max(-el.getBoundingClientRect().top / travel, 0), 1);
      const p = t * t * (3 - 2 * t); // ease in and out
      el.style.setProperty("--p", p.toFixed(4));
      el.classList.toggle("full", p > 0.98);
      if (p < 0.9 && video && !video.paused) video.pause();
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    measure();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);

  return (
    <header className="hero" id="top" ref={stage}>
      <div className="hero-sticky" ref={sticky}>
        <div className="wrap hero-grid">
          <div className="hero-copy">{children}</div>
          <div className="hero-slot" ref={slot}>
            <img src="/portrait.webp" alt="Vishnu Sanjay" width={1086} height={1448} />
          </div>
        </div>
        <div className="morph wrap">
          <Showreel />
          <img className="morph-portrait" src="/portrait.webp" alt="" aria-hidden="true" />
        </div>
        <span className="cue label">{site.hero.cue}</span>
      </div>
    </header>
  );
}
