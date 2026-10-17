"use client";

import { useEffect, useRef } from "react";

/** Page-wide motion: scroll reveals, count-up numbers and the film-grain overlay. */
export default function Effects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // reveal on scroll
    const rv = document.querySelectorAll<HTMLElement>(".rv");
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      rv.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
        else io.observe(el);
      });
      cleanups.push(() => io.disconnect());

      // count-up numbers
      const co = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const to = Number(el.dataset.count);
          let t0: number | null = null;
          co.unobserve(el);
          const step = (ts: number) => {
            if (t0 === null) t0 = ts;
            const p = Math.min((ts - t0) / 1400, 1);
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }),
        { threshold: 0.6 },
      );
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight) { el.textContent = "0"; co.observe(el); }
      });
      cleanups.push(() => co.disconnect());
    } else {
      rv.forEach((el) => el.classList.add("in"));
    }

    // grain: one still, faint frame (no flicker)
    const c = canvasRef.current;
    const x = c?.getContext("2d");
    if (c && x) {
      let resizeTimer: ReturnType<typeof setTimeout> | undefined;
      const size = () => {
        // A frame can start out zero-sized (e.g. inside a preview); wait for the resize.
        if (!innerWidth || !innerHeight) return;
        const d = x.createImageData((c.width = Math.ceil(innerWidth / 2)), (c.height = Math.ceil(innerHeight / 2)));
        const a = d.data;
        for (let j = 0; j < a.length; j += 4) {
          a[j] = a[j + 1] = a[j + 2] = Math.random() * 255;
          a[j + 3] = 255;
        }
        x.putImageData(d, 0, 0);
      };
      size();
      const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(size, 200); };
      addEventListener("resize", onResize);
      cleanups.push(() => { removeEventListener("resize", onResize); clearTimeout(resizeTimer); });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <canvas id="grain" ref={canvasRef} aria-hidden="true" />;
}
