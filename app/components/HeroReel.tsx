"use client";

import { useEffect, useRef } from "react";
import Showreel from "./Showreel";

/**
 * Title card + portrait that becomes the showreel as you scroll.
 * Wide screens: the stage is one screen tall, pins at once, and the portrait grows into the reel.
 * Phones: the stage is taller than the screen, so the page scrolls until the portrait (full width,
 * the same width as the reel) is centred, then pins there and the portrait's height eases into 16:9.
 * Reduced motion gets a plain stacked layout (CSS). This only measures and feeds CSS variables.
 */
const TRAVEL = 1.25; // screens of scrolling spent on the morph

export default function HeroReel({ children }: { children: React.ReactNode }) {
  const stage = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const geo = useRef({ travel: 1, start: 0 });

  useEffect(() => {
    const el = stage.current, st = sticky.current, s = slot.current;
    if (!el || !st || !s) return;
    const mq = matchMedia("(prefers-reduced-motion: no-preference)");
    const video = el.querySelector("video");
    let raf = 0;

    const measure = () => {
      if (!mq.matches) { el.classList.remove("ready", "full"); el.style.removeProperty("height"); return; }
      const vh = innerHeight;
      const nav = (document.querySelector("nav")?.getBoundingClientRect().height ?? 64) + 8;
      el.style.removeProperty("--stick");
      const stageH = st.offsetHeight;
      const grid = s.parentElement!;
      const pad = parseFloat(getComputedStyle(grid).paddingLeft);
      // portrait position inside the stage, independent of the current scroll
      const slotTop = s.getBoundingClientRect().top - st.getBoundingClientRect().top;
      const slotLeft = s.getBoundingClientRect().left - st.getBoundingClientRect().left;
      const w0 = s.offsetWidth, h0 = s.offsetHeight;
      // where the stage pins: at the top when it fits the screen, else with the portrait centred
      const stick = stageH <= vh + 1 ? 0 : Math.min(0, nav + (vh - nav - h0) / 2 - slotTop);
      const w1 = Math.min(grid.clientWidth - pad * 2, ((vh - nav - 56) * 16) / 9);
      const h1 = (w1 * 9) / 16;
      const travel = vh * TRAVEL;
      el.style.height = `${stageH + travel}px`;
      el.style.setProperty("--stick", `${stick}px`);
      const v = {
        x0: slotLeft, y0: slotTop, w0, h0,
        x1: (st.clientWidth - w1) / 2, y1: -stick + nav + (vh - nav - h1) / 2, w1, h1,
      };
      for (const [k, n] of Object.entries(v)) el.style.setProperty(`--${k}`, `${n}px`);
      geo.current = { travel, start: -stick };
      el.classList.add("ready");
      update();
    };

    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const { travel, start } = geo.current;
      const scrolled = -el.getBoundingClientRect().top;
      const t = Math.min(Math.max((scrolled - start) / travel, 0), 1);
      const p = t * t * (3 - 2 * t); // ease in and out
      el.style.setProperty("--p", p.toFixed(4));
      el.classList.toggle("full", p > 0.98);
      if (p < 0.9 && video && !video.paused) video.pause();
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    // phones resize the viewport as the browser bar shows/hides; only re-measure on real size changes
    let lastW = innerWidth, lastH = innerHeight;
    const onResize = () => {
      if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 120) return;
      lastW = innerWidth; lastH = innerHeight; measure();
    };
    measure();
    document.fonts?.ready.then(measure);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    mq.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
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
      </div>
    </header>
  );
}
