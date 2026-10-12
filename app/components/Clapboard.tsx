"use client";

import { useEffect, useState } from "react";

/** The VS clapboard mark; its arm snaps once on load. */
export default function Clapboard() {
  const [snap, setSnap] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let close: ReturnType<typeof setTimeout> | undefined;
    const open = setTimeout(() => {
      setSnap(true);
      close = setTimeout(() => setSnap(false), 260);
    }, 600);
    return () => { clearTimeout(open); clearTimeout(close); };
  }, []);

  return (
    <svg className={snap ? "clap snap" : "clap"} viewBox="0 0 40 36" aria-hidden="true">
      <defs>
        <clipPath id="armclip"><rect x="2" y="5" width="36" height="7" rx="1" /></clipPath>
      </defs>
      <rect x="2" y="13" width="36" height="21" rx="1.5" fill="#ecebe7" />
      <rect x="2" y="13" width="36" height="5" fill="#0c0c0d" />
      <path d="M8 13l-4 5M16 13l-4 5M24 13l-4 5M32 13l-4 5M40 13l-4 5" stroke="#ecebe7" strokeWidth="2.4" />
      <text x="20" y="31" textAnchor="middle" style={{ fontFamily: "var(--f)", fontStretch: "62%" }} fontWeight="800" fontSize="11" fill="#0c0c0d" letterSpacing=".5">VS</text>
      <g className="arm">
        <g clipPath="url(#armclip)">
          <rect x="2" y="5" width="36" height="7" fill="#0c0c0d" />
          <path d="M6 12l5-7M14 12l5-7M22 12l5-7M30 12l5-7M38 12l5-7" stroke="#ecebe7" strokeWidth="2.6" />
        </g>
        <rect x="2" y="5" width="36" height="7" rx="1" fill="none" stroke="#ecebe7" strokeWidth="1" />
        <circle cx="3.5" cy="11" r="1.6" fill="#d23a2e" />
      </g>
    </svg>
  );
}
