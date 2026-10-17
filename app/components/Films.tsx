import Thumb, { type Video } from "./Thumb";

const feature: Video = { id: "Q3N-oOjJQ8U", title: "Vindhya Victim Verdict V3", note: "Feature film debut · Cast · Official trailer" };

const shorts: Video[] = [
  { id: "sFmAIdfOnMg", title: "Luv", note: "Written, directed, edited & acted" },
  { id: "s2daHoJaBqo", title: "Favourite Medicine", note: "Production manager · DOP · Art" },
  { id: "nTZSMuOqzlk", title: "Ugavar", note: "Cast" },
  { id: "uHmMFmvOfas", title: "Perspective", note: "Cast" },
  { id: "uC02-eP1a9g", title: "The Arrival", note: "Cast · Shot on iPhone" },
  { id: "Vv3zDKbDRAU", title: "The Visitor", note: "Cast" },
];

export default function Films() {
  return (
    <section className="wrap" id="films">
      <div className="head rv">
        <h2 className="bill">Films</h2>
        <span className="label">On screen &amp; behind it</span>
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
