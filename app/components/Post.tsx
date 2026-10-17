"use client";

import { useState } from "react";
import Ext from "./Ext";

export type Post = {
  /** Big title set on the thumbnail. */
  title: string;
  /** Where it lives, shown on the thumbnail and under it, e.g. "LinkedIn". */
  platform: string;
  /** One line under the thumbnail. */
  note: string;
  /** External post: the card opens it in a new tab. */
  href?: string;
  /** Local video: the card plays it in place. */
  video?: string;
  /** Thumbnail image (and the video poster). */
  img?: string;
  /** Typographic thumbnail instead of the image: a flat brand colour with the title in `ink`. */
  tint?: { bg: string; ink: string };
  /** A drawn typographic thumbnail. */
  art?: "contrast";
};

function Shot({ p, play }: { p: Post; play?: boolean }) {
  return (
    <span
      className={`shot post-shot${p.art ? ` art-${p.art}` : ""}${p.tint ? " tinted" : ""}`}
      style={p.tint ? ({ "--tint-bg": p.tint.bg, "--tint-ink": p.tint.ink } as React.CSSProperties) : undefined}
    >
      {p.img && !p.tint && <img src={p.img} alt="" loading="lazy" />}
      {p.art === "contrast" && (
        <span className="contrast-art" aria-hidden="true"><span>Con</span><span>trast</span></span>
      )}
      <span className="post-chip label">{p.platform}</span>
      <span className="post-title">{p.title}</span>
      {play && <span className="play" aria-hidden="true" />}
    </span>
  );
}

/** A post thumbnail card: opens an external post, or plays a local video in place. */
export default function PostCard({ p }: { p: Post }) {
  const [playing, setPlaying] = useState(false);

  if (p.video) {
    return (
      <div className="thumb post">
        {playing ? (
          <span className="shot">
            <video src={p.video} poster={p.img} controls autoPlay playsInline onEnded={() => setPlaying(false)} />
          </span>
        ) : (
          <button type="button" className="post-play" onClick={() => setPlaying(true)} aria-label={`Play ${p.title}`}>
            <Shot p={p} play />
          </button>
        )}
        <span className="label note">{p.note}</span>
      </div>
    );
  }

  return (
    <a className="thumb post" href={p.href} target="_blank" rel="noopener">
      <Shot p={p} />
      <span className="label note">{p.note}<Ext /></span>
    </a>
  );
}
