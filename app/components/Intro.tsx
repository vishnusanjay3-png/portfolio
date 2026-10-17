"use client";

import { useEffect, useRef, useState } from "react";
import Clapboard from "./Clapboard";
import { clap, unlock } from "@/app/lib/clap";
import { site } from "@/app/lib/content";

/* The title card before the site: an open clapboard. Click (or Enter / Space) and it claps with sound,
   flies into its place in the nav, and the page comes into frame. It plays on every visit: that click is
   what lets the browser play the clap on every later hover. (Skipped only inside the /edit preview,
   where layout.tsx's head script adds `booted landed skip-intro`.) */

const SHUT_MS = 140;  // arm comes down
const HOLD_MS = 240;  // beat after the clap before it flies
const FLY_MS = 700;

export default function Intro() {
  const [gone, setGone] = useState(false);
  const mark = useRef<HTMLSpanElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const rolling = useRef(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("skip-intro")) { setGone(true); return; }
    // The intro always opens onto the title card, not wherever a reload left the page.
    history.scrollRestoration = "manual";
    scrollTo(0, 0);
    btn.current?.focus({ preventScroll: true });
  }, []);

  const roll = () => {
    if (rolling.current) return;
    rolling.current = true;
    unlock();
    const root = document.documentElement;
    const gate = btn.current!;
    const svg = mark.current!.querySelector(".clap")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    svg.classList.remove("open");
    svg.classList.add("shut");
    clap(SHUT_MS / 1000 - 0.02, 0.7);
    gate.classList.add("rolled");

    const finish = () => {
      root.classList.add("landed");
      setGone(true);
    };

    setTimeout(() => {
      root.classList.add("booted");
      if (reduce) { gate.classList.add("fade"); setTimeout(finish, 350); return; }
      const from = mark.current!.getBoundingClientRect();
      const to = document.querySelector("#nav")!.getBoundingClientRect();
      const s = to.width / from.width;
      mark.current!.style.transition = `transform ${FLY_MS}ms cubic-bezier(.7,0,.18,1)`;
      mark.current!.style.transform = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${s})`;
      gate.classList.add("flying");
      setTimeout(finish, FLY_MS);
    }, SHUT_MS + HOLD_MS);
  };

  if (gone) return null;

  return (
    <button ref={btn} type="button" className="intro" onClick={roll} aria-label={`${site.intro.title}. ${site.intro.hint}`}>
      <span className="intro-stage">
        <span ref={mark} className="intro-mark"><Clapboard id="intro" className="open" /></span>
        <span className="intro-title bill">{site.intro.title}</span>
        <span className="intro-hint label">{site.intro.hint}</span>
      </span>
    </button>
  );
}
