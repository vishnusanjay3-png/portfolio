"use client";

import { useRef, useState } from "react";

type Props = { label: string; href: string; value: string };

/** One contact line with a copy button; falls back to selecting the text when the clipboard is blocked. */
export default function ContactRow({ label, href, value }: Props) {
  const link = useRef<HTMLAnchorElement>(null);
  const [state, setState] = useState("Copy");

  const flash = (text: string) => {
    setState(text);
    setTimeout(() => setState("Copy"), 1600);
  };

  const select = () => {
    if (!link.current) return;
    const r = document.createRange();
    r.selectNodeContents(link.current);
    const s = getSelection();
    s?.removeAllRanges();
    s?.addRange(r);
    flash("Selected");
  };

  const copy = () => {
    try {
      navigator.clipboard.writeText(value).then(() => flash("Copied"), select);
    } catch {
      select();
    }
  };

  return (
    <div className="ci">
      <span className="label">{label}</span>
      <a className="cv" ref={link} href={href}>{value}</a>
      <button className="cp label" type="button" onClick={copy}>{state}</button>
    </div>
  );
}
