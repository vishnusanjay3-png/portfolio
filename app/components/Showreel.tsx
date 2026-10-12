"use client";

import { useRef, useState } from "react";

export default function Showreel() {
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    vid.current?.play().catch(() => {});
  };

  const ended = () => {
    setPlaying(false);
    vid.current?.load();
  };

  return (
    <div className="reel">
      <video
        ref={vid}
        src="/intro.mp4"
        poster="/poster.jpg"
        preload="metadata"
        playsInline
        controls={playing}
        onEnded={ended}
      />
      <button type="button" aria-label="Play the showreel with sound" hidden={playing} onClick={play}>
        <span className="go">
          <span className="disc" aria-hidden="true" />
          <span>Showreel<small>0:25 · Sound on</small></span>
        </span>
        <span className="label" style={{ color: "#d9d7d1" }}>Scene 01 · Take 01</span>
      </button>
    </div>
  );
}
