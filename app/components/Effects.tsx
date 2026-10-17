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

    // In-page links (nav, "the full story is in the work"): smooth-scroll, then once the scroll settles,
    // finish the trip if anything above shifted on the way (images loading, the hero's measured height).
    const pad = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    let settle: ReturnType<typeof setTimeout> | undefined;
    const onLink = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const id = a?.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!a || !target || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
      target.scrollIntoView({ behavior });
      let last = -1, tries = 0;
      clearTimeout(settle);
      const check = () => {
        const y = scrollY;
        if (y !== last) { last = y; settle = setTimeout(check, 180); return; }   // still moving
        const off = target.getBoundingClientRect().top - pad();
        const atEnd = y >= document.documentElement.scrollHeight - innerHeight - 2;
        if (Math.abs(off) > 6 && !atEnd && tries++ < 3) { target.scrollIntoView({ behavior }); last = -1; settle = setTimeout(check, 180); }
      };
      settle = setTimeout(check, 180);
    };
    document.addEventListener("click", onLink);
    cleanups.push(() => { document.removeEventListener("click", onLink); clearTimeout(settle); });

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
