import Effects from "./components/Effects";
import Clapboard from "./components/Clapboard";
import HeroReel from "./components/HeroReel";
import Contact from "./components/Contact";
import Work from "./components/Work";
import Backstory from "./components/Backstory";
import Films from "./components/Films";
import { site, rich } from "./lib/content";

const { hero, crafts, closing, footer } = site;


export default function Home() {
  return (
    <>
      <Effects />

      <nav>
        <a className="brand" href="#top" aria-label="Vishnu Sanjay, home">
          <Clapboard />
          <span className="name">Vishnu Sanjay</span>
        </a>
        <div className="navlinks label">
          <a href="#work">Work</a>
          <a href="#story">Story</a>
          <a href="#films">Films</a>
        </div>
      </nav>

      <HeroReel>
        <div className="bill eyebrow">{rich(hero.eyebrow, "em")}</div>
        <h1 className="bill">Vishnu<span>Sanjay</span></h1>
        <p className="lead">{hero.lead}</p>
        <p>{hero.intro}</p>
      </HeroReel>

      <div className="marquee" aria-label="Crafts">
        <div className="track">
          {crafts.map((c) => <span key={c}>{c}</span>)}
          {crafts.map((c) => <span key={`dup-${c}`} aria-hidden="true">{c}</span>)}
        </div>
      </div>

      <Work />
      <Backstory />
      <Films />

      <section className="end wrap">
        <span className="label">{closing.label}</span>
        <h2 className="bill" style={{ marginTop: 22 }}>{rich(closing.title, "span")}</h2>
        <Contact />
      </section>

      <footer className="wrap label">
        <span>{footer.left}</span>
        <span>{footer.right}</span>
      </footer>
    </>
  );
}
