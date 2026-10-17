"use client";

import { useState } from "react";

type Way = {
  name: string;
  value: string;
  href: string;
  copy?: string;
  external?: boolean;
  icon: React.ReactNode;
};

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ways: Way[] = [
  {
    name: "Email",
    value: "vishnu.sanjay3@gmail.com",
    href: "mailto:vishnu.sanjay3@gmail.com",
    copy: "vishnu.sanjay3@gmail.com",
    icon: <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5" {...stroke} /><path d="m4 7 8 6 8-6" {...stroke} /></svg>,
  },
  {
    name: "WhatsApp",
    value: "+91 87540 69029",
    href: "https://wa.me/918754069029",
    copy: "+918754069029",
    external: true,
    icon: <svg viewBox="0 0 24 24"><path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" {...stroke} /><path d="M9.2 8.6c.3-.6.7-.6 1-.2l.8 1.3c.2.3.1.6-.1.9l-.4.5c.5 1.1 1.4 2 2.5 2.5l.5-.4c.3-.2.6-.3.9-.1l1.3.8c.4.3.4.7-.2 1-1 .6-2 .5-3-.1a8.4 8.4 0 0 1-3.4-3.4c-.6-1-.7-2-.1-3Z" fill="currentColor" /></svg>,
  },
  {
    name: "LinkedIn",
    value: "in/aham-v",
    href: "https://www.linkedin.com/in/aham-v/",
    external: true,
    icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" {...stroke} /><path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" {...stroke} /></svg>,
  },
  {
    name: "YouTube",
    value: "@vizsan3",
    href: "https://www.youtube.com/@vizsan3",
    external: true,
    icon: <svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4" {...stroke} /><path d="M10.2 9.4v5.2l4.4-2.6Z" fill="currentColor" /></svg>,
  },
];

/** Contact tiles: the tile opens mail / chat / profile; Email and WhatsApp also have a copy button. */
export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (w: Way) => {
    const done = () => { setCopied(w.name); setTimeout(() => setCopied(null), 1600); };
    try {
      navigator.clipboard.writeText(w.copy!).then(done, () => {});
    } catch {}
  };

  return (
    <div className="ways">
      {ways.map((w) => (
        <div key={w.name} className="way">
          <a href={w.href} {...(w.external ? { target: "_blank", rel: "noopener" } : {})} aria-label={`${w.name}: ${w.value}${w.external ? " (opens in a new tab)" : ""}`}>
            <span className="ico" aria-hidden="true">{w.icon}</span>
            <span className="label">{w.name}</span>
            <span className="val">{w.value}</span>
          </a>
          {w.copy && (
            <button type="button" className="cp label" onClick={() => copy(w)} aria-label={`Copy ${w.name === "Email" ? "email address" : "phone number"}`}>
              {copied === w.name ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
