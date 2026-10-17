import Ext from "./Ext";
import Thumb from "./Thumb";
import PostCard from "./Post";
import { site } from "@/app/lib/content";

const { beats } = site.story;

export default function Backstory() {
  return (
    <section className="wrap" id="story">
      <div className="head rv">
        <h2 className="bill">{site.story.heading}</h2>
        <span className="label">{site.story.label}</span>
      </div>
      <ol className="beats">
        {beats.map((b) => (
          <li key={b.org} className={b.shot?.halo ? "beat2 rv halo" : "beat2 rv"}>
            <div className="beat-head">
              <span className="label when">{b.when}</span>
              <span className="mark">{b.logo ? <img src={b.logo} alt="" /> : <span className="mono">{b.mark}</span>}</span>
              <h3 className="who">
                <span className="org">{b.org}</span>
                <span className="role">{b.role}</span>
              </h3>
            </div>
            <div className="beat-body">
              <div className={b.shot ? "beat-grid with-shot" : "beat-grid"}>
                <div className="beat-text">
                  <p>{b.body}</p>
                  {b.crafts && <div className="credits label">{b.crafts.map((c) => <span key={c}>{c}</span>)}</div>}
                  {b.ctas && (
                    <div className="ctas">
                      {b.ctas.map((c) => (
                        <a key={c.href} className="cta label" href={c.href} target="_blank" rel="noopener">
                          {c.label}<Ext />
                        </a>
                      ))}
                    </div>
                  )}
                  {b.links && (
                    <div className="beat-links">
                      {b.links.map((l) => (
                        <a key={l.href} className="label" href={l.href}>
                          {l.label} <span className="arr" aria-hidden="true">→</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {b.shot && (
                  <figure className={b.shot.halo ? "beat-shot halo-shot" : "beat-shot"}>
                    <img src={b.shot.src} alt={b.shot.alt} width={b.shot.w} height={b.shot.h} loading="lazy" />
                    {b.shot.caption && <figcaption className="label">{b.shot.caption}</figcaption>}
                  </figure>
                )}
              </div>
              {(b.videos || b.posts) && (
                <div className="thumbs">
                  {b.videos?.map((v) => <Thumb key={v.id} v={v} />)}
                  {b.posts?.map((p) => <PostCard key={p.title} p={p} />)}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
