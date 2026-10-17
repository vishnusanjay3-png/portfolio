import Ext from "./Ext";

export type Video = { id: string; title: string; note?: string };

/** A YouTube thumbnail that opens the video in a new tab. */
export default function Thumb({ v, big }: { v: Video; big?: boolean }) {
  return (
    <a className={big ? "thumb big" : "thumb"} href={`https://youtu.be/${v.id}`} target="_blank" rel="noopener">
      <span className="shot">
        <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
        <span className="play" aria-hidden="true" />
      </span>
      <span className="tt">{v.title}<Ext /></span>
      {v.note && <span className="label note">{v.note}</span>}
    </a>
  );
}
