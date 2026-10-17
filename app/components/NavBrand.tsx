"use client";

import { useEffect, useRef, useState } from "react";
import Clapboard from "./Clapboard";
import { clap, unlock } from "@/app/lib/clap";
import { site } from "@/app/lib/content";

// One scene per part of the page, in order; the slate shows the one in the middle of the screen.
const SECTIONS = ["#top", "#work", "#story", "#films", ".end"];
const CLAP_MS = 320;
const IMPACT_S = 0.23; // when the arm meets the slate in the `clap` keyframes

/** Brand mark in the nav: the clapboard (claps with sound on hover / tap) and a live scene slate. */
export default function NavBrand() {
  const svg = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const [scene, setScene] = useState(0);

  // Sound needs one gesture anywhere on the page first.
  useEffect(() => {
    const go = () => unlock();
    addEventListener("pointerdown", go, { once: true });
    addEventListener("keydown", go, { once: true });
    return () => { removeEventListener("pointerdown", go); removeEventListener("keydown", go); };
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.querySelector(s));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setScene(els.indexOf(e.target)); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const doClap = () => {
    const el = svg.current?.querySelector(".clap");
    if (!el || busy.current) return;
    busy.current = true;
    el.classList.remove("clapping");
    void (el as SVGElement).getBoundingClientRect();
    el.classList.add("clapping");
    clap(IMPACT_S);
    setTimeout(() => { el.classList.remove("clapping"); busy.current = false; }, CLAP_MS);
  };

  const scenes = site.nav.scenes;
  const [num, ...rest] = (scenes[scene] ?? scenes[0] ?? "").split(" · ");

  return (
    <a
      className="brand"
      href="#top"
      aria-label="Vishnu Sanjay, back to the top"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") doClap(); }}
      onPointerDown={(e) => { if (e.pointerType !== "mouse") { unlock(); doClap(); } }}
    >
      <span ref={svg} className="brand-mark"><Clapboard id="nav" /></span>
      <span className="slate label" aria-live="polite">
        <span key={scene} className="slate-roll">
          <b>{num}</b>{rest.length > 0 && <span className="slate-t"> · {rest.join(" · ")}</span>}
        </span>
      </span>
    </a>
  );
}
