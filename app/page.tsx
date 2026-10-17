import Effects from "./components/Effects";
import Clapboard from "./components/Clapboard";
import HeroReel from "./components/HeroReel";
import Contact from "./components/Contact";
import Work from "./components/Work";
import Backstory from "./components/Backstory";
import Films from "./components/Films";

const crafts = [
  "Creative Direction", "Brand Design", "Writing", "Directing", "Scripts", "Editing", "Producing",
  "Storyboards", "Performance", "Photography", "Illustration", "Brand Narrative", "Podcasts",
];

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
        <div className="bill eyebrow">Creative <em>Director</em></div>
        <h1 className="bill">Vishnu<span>Sanjay</span></h1>
        <p className="lead">I make things worth watching.</p>
        <p>Started out on film sets. Now I make founders, brands and products hard to scroll past. Same job, really.</p>
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
        <span className="label">That&apos;s a wrap</span>
        <h2 className="bill" style={{ marginTop: 22 }}>Let&apos;s make<br /><span>the next one</span></h2>
        <Contact />
      </section>

      <footer className="wrap label">
        <span>Vishnu Sanjay · Creative Director</span>
        <span>© 2026</span>
      </footer>
    </>
  );
}
