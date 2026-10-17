import Thumb from "./Thumb";
import { site } from "@/app/lib/content";

const { feature, shorts } = site.films;

export default function Films() {
  return (
    <section className="wrap" id="films">
      <div className="head rv">
        <h2 className="bill">{site.films.heading}</h2>
        <span className="label">{site.films.label}</span>
      </div>
      <div className="films">
        <div className="rv"><Thumb v={feature} big /></div>
        <div className="thumbs shorts-grid rv">
          {shorts.map((v) => <Thumb key={v.id} v={v} />)}
        </div>
      </div>
    </section>
  );
}
