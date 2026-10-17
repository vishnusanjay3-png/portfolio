"use client";

import { useEffect, useRef, useState } from "react";
import Ext from "./Ext";
import { site, rich, type Project } from "@/app/lib/content";

const { projects, stats } = site.work;
const w = site.work;

const brandVars = (x: Project) => ({ "--brand": x.brand[0], "--brand2": x.brand[1] }) as React.CSSProperties;

function Credits({ items }: { items: string[] }) {
  return <div className="credits label">{items.map((c) => <span key={c}>{c}</span>)}</div>;
}

export default function Work() {
  const dlg = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const p = open === null ? null : projects[open];

  useEffect(() => {
    const d = dlg.current;
    if (d && p && !d.open) { d.showModal(); d.scrollTop = 0; }
  }, [p]);

  const close = () => dlg.current?.close();

  return (
    <section className="wrap" id="work">
      <div className="head rv">
        <h2 className="bill">{w.heading}</h2>
        <span className="label">{w.label}</span>
      </div>

      <div className="cards">
        {projects.map((x, i) => (
          <button key={x.name} type="button" className="card rv" onClick={() => setOpen(i)} aria-haspopup="dialog" style={brandVars(x)}>
            <img className="logo" src={x.logo} alt="" />
            <span className="details">
              <span className="label meta">{x.meta}</span>
              <span className="bill name">{x.name}</span>
              <span className="hook">{x.hook}</span>
              <span className="foot">
                <span className="big">{rich(x.big)}</span>
                <span className="cap">{x.bigCaption}</span>
              </span>
              <span className="more label">{w.readMore} <span className="arr" aria-hidden="true">→</span></span>
            </span>
          </button>
        ))}
      </div>

      <div className="tally rv">
        <span className="label">{w.numbersLabel}</span>
        <div className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat"><div className="n">{rich(s.n)}</div><p>{s.p}</p></div>
          ))}
        </div>
      </div>

      <dialog
        ref={dlg}
        className="story"
        aria-labelledby="story-title"
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === dlg.current) close(); }}
      >
        {p && (
          <article style={brandVars(p)}>
            <header>
              <div>
                <img className="story-logo" src={p.logo} alt="" />
                <span className="label">{p.meta}</span>
                <h3 className="bill" id="story-title">{p.name}</h3>
              </div>
              <button type="button" className="x" onClick={close} aria-label="Close">×</button>
            </header>
            <div className="headline">
              <span className="big">{rich(p.big)}</span>
              <span className="cap">{p.bigCaption}</span>
            </div>
            <h4 className="label">{w.situation}</h4>
            <p>{p.brief}</p>
            <h4 className="label">{w.did}</h4>
            <div className="made">
              {p.did.map((m) => <div key={m.title}><b>{m.title}</b><p>{m.body}</p></div>)}
            </div>
            <h4 className="label">{w.result}</h4>
            <p className="outcome">{p.result}</p>
            {p.links && (
              <>
                <h4 className="label">{p.links.label}</h4>
                <div className="cuts">
                  {p.links.items.map((c) => (
                    <a key={c.href} className="cut" href={c.href} target="_blank" rel="noopener">
                      <span className="label">{c.when}</span>
                      <span className="t">{c.title} <Ext /></span>
                    </a>
                  ))}
                </div>
              </>
            )}
            <Credits items={p.credits} />
          </article>
        )}
      </dialog>
    </section>
  );
}
