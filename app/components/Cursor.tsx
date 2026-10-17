"use client";

import { useEffect, useRef } from "react";

/* Two cursor touches, mouse/trackpad only and off for reduced motion:
   - the torch: a soft safelight glow that trails the pointer, like moving a lamp in a darkroom
   - the ring: follows the pointer and becomes a labelled pill over things you can act on.
   The native cursor stays as it is. */

const LABELS: [string, string][] = [
  [".intro", "Roll"],
  [".reel button, .post-play, a.thumb:not(.post)", "Play"],
  [".card", "Open"],
  ["a[target=_blank]", "Visit ↗"],
];

export default function Cursor() {
  const torch = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ok = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;
    const t = torch.current!, r = ring.current!, label = text.current!;
    document.documentElement.classList.add("has-cursor");

    let x = innerWidth / 2, y = innerHeight / 2;       // pointer
    let tx = x, ty = y, rx = x, ry = y;                // eased positions
    let raf = 0, shown = false;

    const tick = () => {
      tx += (x - tx) * 0.08; ty += (y - ty) * 0.08;
      rx += (x - rx) * 0.22; ry += (y - ry) * 0.22;
      t.style.transform = `translate(${tx}px, ${ty}px)`;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = Math.abs(x - tx) + Math.abs(y - ty) > 0.3 ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; tx = rx = x; ty = ry = y; t.classList.add("on"); r.classList.add("on"); }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const over = (e: PointerEvent) => {
      const el = e.target as Element;
      const hit = LABELS.find(([sel]) => el.closest(sel));
      if (hit) { label.textContent = hit[1]; r.dataset.state = "label"; }
      else if (el.closest("a, button, [role=button], textarea, input")) r.dataset.state = "hover";
      else delete r.dataset.state;
    };

    const leave = () => { shown = false; t.classList.remove("on"); r.classList.remove("on"); };
    const down = () => r.classList.add("down");
    const up = () => r.classList.remove("down");

    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerover", over, { passive: true });
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={torch} className="torch" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span ref={text} /></div>
    </>
  );
}
