"use client";

import { useEffect, useRef, useState } from "react";
import Ext from "./Ext";

type Piece = { title: string; body: string };
type Link = { when: string; title: string; href: string };
type Project = {
  name: string;
  meta: string;
  hook: string;
  big: React.ReactNode;
  bigCaption: string;
  brief: string;
  did: Piece[];
  result: string;
  links?: { label: string; items: Link[] };
  credits: string[];
  logo: string;
  brand: [string, string];
};

const projects: Project[] = [
  {
    name: "Miles Ukaoma",
    meta: "Founder brand · LinkedIn · Podcast · Aug 2025 → now",
    hook: "An Olympian with a lot to say about AI and a quiet LinkedIn. Not anymore.",
    big: <>+8K</>,
    bigCaption: "new followers, and counting",
    brief: "Rio 2016 Olympian, SVP of Marketing at Quilt, building an AI chief of staff. Sharp mind, great stories, barely posting. The job: make him sound like himself on camera and on the page, every single week, and let the audience find him.",
    did: [
      { title: "The INBOUND 2025 film", body: "Wrote, directed and cut it around how he actually talks and holds a room. It went out the month I started." },
      { title: "A written voice", body: "Turned his transcripts into pillars, rules and a library of past posts, so everything reads like him and not a ghostwriter." },
      { title: "Weekly content", body: "Since December 2025 I run the whole loop: research, script, edit, publish, read the numbers, do it again better." },
      { title: "CrispyMile", body: "His podcast with Chris DuBois. Shaped the format, then the recordings and the edit." },
    ],
    result: "More reach, and a voice that's unmistakably his. Miles now shows up as the AI thinker and innovator he set out to be, and the audience keeps growing with him.",
    links: {
      label: "Top posts on LinkedIn",
      items: [
        { when: "Dec 2025", title: "Yes, I was an Olympian", href: "https://www.linkedin.com/posts/ukaoma_yes-i-was-an-olympian-if-you-have-been-share-7404171303663902720-QRKg" },
        { when: "Sep 2025", title: "The INBOUND '25 recap", href: "https://www.linkedin.com/posts/ukaoma_hopping-on-the-inbound-25-recap-train-a-ugcPost-7371567790832467968-cTAz" },
        { when: "Aug 2025", title: "INBOUND 2025, the announcement film", href: "https://www.linkedin.com/posts/ukaoma_inbound-ugcPost-7366140097991200769-WPF5" },
      ],
    },
    credits: ["Research", "Script", "Direction", "Edit", "Publish", "Analytics"],
    logo: "/logos/miles.png",
    brand: ["#3d6bff", "#8fa9ff"],
  },
  {
    name: "GotCOS",
    meta: "Product launch · 2026",
    hook: "An open-source AI chief of staff. One line carried the whole launch.",
    big: <>350+</>,
    bigCaption: "people running it today",
    brief: "An open-source AI chief of staff, built by an Olympian. Easy to explain, hard to make anyone care about. It needed a reason to exist in people's heads, not just a feature list.",
    did: [
      { title: "The idea", body: "Built the content strategy around one line: “high performers build better systems”. Everything hangs off that." },
      { title: "The launch videos", body: "Scripted and cut the product videos that went out with it." },
      { title: "The campaigns", body: "Ran the campaigns built on that line." },
    ],
    result: "350+ people run their week on it now, and most of them showed up after the launch.",
    credits: ["Strategy", "Campaigns", "Script", "Edit"],
    logo: "/logos/gotcos.png",
    brand: ["#c08537", "#e6b062"],
  },
  {
    name: "Hermitcrabs",
    meta: "HubSpot agency · Aug 2025 → now",
    hook: "300+ websites built and almost nothing on camera. Fixed that.",
    big: <>INBOUND<i>·</i><wbr />UNBOUND</>,
    bigCaption: "event films, two years running",
    brief: "A HubSpot CMS development and design agency with 300+ websites behind it. Seriously good work that nobody could actually see.",
    did: [
      { title: "INBOUND 2025", body: "The event films: concept, script, voice-over, edit and motion." },
      { title: "UNBOUND 2026", body: "Two more films for the next year's event." },
      { title: "Product walkthroughs", body: "Videos like the Prialto client portal, showing clients exactly what they're getting." },
      { title: "Brand design", body: "Full time since October 2025 as Brand Designer on the growth team." },
    ],
    result: "The agency's people and work are on screen now, with event films two years running.",
    credits: ["Concept", "Script", "Voice-over", "Edit", "Motion"],
    logo: "/logos/hermitcrabs.png",
    brand: ["#ff5537", "#ff9a6b"],
  },
  {
    name: "Forward Company",
    meta: "AI agency · Brand Designer · Jun 2026 → now",
    hook: "Five people, zero followers, launch day. Built the brand from there.",
    big: <>0<i>→</i>1</>,
    bigCaption: "a brand built from launch day",
    brief: "An AI-first agency. Five people, five accounts and zero followers on launch day. No story yet, just the work.",
    did: [
      { title: "Campaign ideas", body: "Came up with the campaigns the agency launches with, built around one rule: show the system working before anyone pitches it." },
      { title: "Poster designs", body: "The look of the launch, poster by poster." },
      { title: "Launch videos", body: "Scripted and cut the videos that introduce the company." },
      { title: "LinkedIn copy", body: "Wrote the posts for the team's accounts, so five people sound like one company." },
    ],
    result: "A brand with a story, a look and a voice from day one, and a launch lined up and ready to go live.",
    credits: ["Campaign ideas", "Poster design", "Launch videos", "Copywriting"],
    logo: "/logos/forward-company.png",
    brand: ["#d7f53c", "#ecfba0"],
  },
];

const stats = [
  { n: <><i>~</i>8K</>, p: "New followers grown." },
  { n: <><i>~</i>30K</>, p: "Impressions." },
  { n: <>350<i>+</i></>, p: "New sign-ups." },
  { n: <>50<i>+</i></>, p: "Pieces of content shared." },
  { n: <>4</>, p: "Campaigns live across the brands." },
];

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
        <h2 className="bill">The work</h2>
        <span className="label">Last 12 months</span>
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
                <span className="big">{x.big}</span>
                <span className="cap">{x.bigCaption}</span>
              </span>
              <span className="more label">Read the story <span className="arr" aria-hidden="true">→</span></span>
            </span>
          </button>
        ))}
      </div>

      <div className="tally rv">
        <span className="label">The numbers</span>
        <div className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat"><div className="n">{s.n}</div><p>{s.p}</p></div>
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
              <span className="big">{p.big}</span>
              <span className="cap">{p.bigCaption}</span>
            </div>
            <h4 className="label">The situation</h4>
            <p>{p.brief}</p>
            <h4 className="label">What I did</h4>
            <div className="made">
              {p.did.map((m) => <div key={m.title}><b>{m.title}</b><p>{m.body}</p></div>)}
            </div>
            <h4 className="label">What happened</h4>
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
