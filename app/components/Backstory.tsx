"use client";

import { useState } from "react";
import Ext from "./Ext";
import Thumb, { type Video } from "./Thumb";

type Beat = {
  when: string;
  org: string;
  role: string;
  logo?: string;
  mark?: string;
  body: string;
  crafts?: string[];
  videos?: Video[];
  links?: { label: string; href: string; ext?: boolean }[];
  halo?: { src: string; caption: string; tag: string };
};

const beats: Beat[] = [
  {
    when: "2020 – 2023",
    org: "Clusters Institute",
    role: "Visual Communication",
    logo: "/logos/clusters.png",
    body: "Three years of photography, film and video at the Clusters Institute of Media and Technology, Coimbatore. On the side: shooting for clothing brands, and writing, directing and acting on shorts, features and ad films.",
    links: [{ label: "See the films", href: "#films" }],
  },
  {
    when: "2022",
    org: "Nakkalites",
    role: "Cast",
    logo: "/logos/nakkalites.png",
    body: "Four months in the cast of the Tamil comedy channel. Time on the other side of the camera that I still lean on when I'm directing someone else.",
    videos: [
      { id: "N9lPL9tGJR4", title: "Ouija Board Alaparaigal" },
      { id: "a5GP5bGOP4s", title: "Semester End Alaparaigal" },
      { id: "2LIgcz4R_iI", title: "Street Games Alaparaigal" },
      { id: "XmkixhWMR18", title: "Proposal Alaparaigal" },
    ],
  },
  {
    when: "Dec 2022 – Jul 2023",
    org: "Palampur Talkies",
    role: "Assistant Creative Director",
    logo: "/logos/palampur.png",
    body: "On The Silent Prayer, a feature scored by Maestro Ilaiyaraaja. I led the storyboards, shaped the set, prop and visual direction, ran costume, art department and locations, and worked with the director and art team on the film's marketing. It premiered at the Red Lorry Film Festival.",
    halo: { src: "/films/with-ilaiyaraaja.jpg", caption: "With Maestro Ilaiyaraaja, in the studio.", tag: "Music by Ilaiyaraaja" },
    links: [{ label: "Watch The Silent Prayer on BookMyShow Stream", href: "https://in.bookmyshow.com/movies/mumbai/the-silent-prayer/ET00392620", ext: true }],
  },
  {
    when: "Aug 2023 → now",
    org: "NotSoFlashy",
    role: "Freelance",
    logo: "/logos/notsoflashy.png",
    body: "NotSoFlashy is the name I freelance under. Brands bring me in for photography, cinematography, scripts, voice-overs and edits: sometimes one of those, usually all of them, from the first idea to the final file. Most of that work is under NDA, so it stays off this page. The showreel at the top is cut from it, and these two I can show.",
    crafts: ["Photography", "DOP", "Scriptwriting", "Voice-over", "Editing"],
    videos: [
      { id: "SXTfQDBoODo", title: "VetNet · The Artist" },
      { id: "8m3uzn6MGj4", title: "Coke ad (spec)" },
    ],
  },
  {
    when: "Jan – Jun 2025",
    org: "Mellow",
    role: "Visual Designer",
    logo: "/logos/mellow.png",
    body: "Designed bright, playful sticker sets that became part of how people interact in the app.",
  },
  {
    when: "Jun – Oct 2025",
    org: "Grekam Academy",
    role: "Creative Head",
    logo: "/logos/grekam.png",
    body: "Ran the creative side of a learning academy in Coimbatore: the concepts for marketing and branding, the videos, the posters and social posts, and regular workshops to train the junior designers and interns.",
    links: [{ label: "Watch a Grekam reel on Instagram", href: "https://www.instagram.com/reel/DLzXHuHMEt4/", ext: true }],
  },
  {
    when: "Aug 2025 → now",
    org: "Hermitcrabs",
    role: "Brand Designer – Growth",
    logo: "/logos/hermitcrabs.png",
    body: "Started making the agency's films in August, the INBOUND 2025 film among them, and joined full time in October as Brand Designer on the growth team. It's also where the work with Miles began.",
    links: [
      { label: "LinkedIn post", href: "https://lnkd.in/p/gzDd2HGC", ext: true },
      { label: "LinkedIn post", href: "https://lnkd.in/p/gtrFx7kp", ext: true },
      { label: "The full story is in the work", href: "#work" },
    ],
  },
  {
    when: "Jun 2026 → now",
    org: "Forward Company",
    role: "Brand Designer",
    logo: "/logos/forward-company.png",
    body: "Campaign ideas, poster designs, launch videos and LinkedIn copy for a new AI-first agency, from launch day.",
    links: [{ label: "The full story is in the work", href: "#work" }],
  },
  {
    when: "Next",
    org: "More stories, made in person",
    role: "Writing, directing, producing",
    mark: "→",
    body: "On set, for brands and for my own short films and series.",
  },
];

export default function Backstory() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <section className="wrap" id="story">
      <div className="head rv">
        <h2 className="bill">The backstory</h2>
        <span className="label">How it led here</span>
      </div>
      <ol className="beats">
        {beats.map((b, i) => {
          const isOpen = open.has(i);
          return (
            <li key={b.org} className={b.halo ? "beat2 rv halo" : "beat2 rv"} data-open={isOpen || undefined}>
              <button type="button" className="beat-head" aria-expanded={isOpen} aria-controls={`beat-${i}`} onClick={() => toggle(i)}>
                <span className="label when">{b.when}</span>
                <span className="mark">{b.logo ? <img src={b.logo} alt="" /> : <span className="mono">{b.mark}</span>}</span>
                <span className="who">
                  <span className="org">{b.org}</span>
                  <span className="role">{b.role}</span>
                </span>
                {b.halo && <span className="label halo-tag">{b.halo.tag}</span>}
                <span className="pm" aria-hidden="true" />
              </button>
              <div className="beat-body" id={`beat-${i}`} role="region" aria-label={b.org} inert={!isOpen}>
                <div className="beat-inner">
                  <div className={b.halo ? "beat-grid with-halo" : "beat-grid"}>
                    <div className="beat-text">
                      <p>{b.body}</p>
                      {b.crafts && <div className="credits label">{b.crafts.map((c) => <span key={c}>{c}</span>)}</div>}
                      {b.links && (
                        <div className="beat-links">
                          {b.links.map((l) => (
                            <a key={l.href} className="label" href={l.href} {...(l.ext ? { target: "_blank", rel: "noopener" } : {})}>
                              {l.label} {l.ext ? <Ext /> : <span aria-hidden="true">→</span>}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    {b.halo && (
                      <figure className="halo-shot">
                        <img src={b.halo.src} alt="Vishnu Sanjay with Maestro Ilaiyaraaja in the studio" loading="lazy" />
                        <figcaption className="label">{b.halo.caption}</figcaption>
                      </figure>
                    )}
                  </div>
                  {b.videos && (
                    <div className="thumbs">
                      {b.videos.map((v) => <Thumb key={v.id} v={v} />)}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
