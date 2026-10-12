import Effects from "./components/Effects";
import Clapboard from "./components/Clapboard";
import Showreel from "./components/Showreel";
import ContactRow from "./components/ContactRow";

const crafts = [
  "Creative Direction", "Writing", "Directing", "Assistant Directing", "Scripts", "Editing", "Producing",
  "Storyboards", "Performance", "Photography", "Illustration", "Brand Narrative", "Podcasts",
];

const cuts = [
  { when: "Dec 2025", title: "Yes, I was an Olympian", views: "11,691", href: "https://www.linkedin.com/posts/ukaoma_yes-i-was-an-olympian-if-you-have-been-share-7404171303663902720-QRKg" },
  { when: "Sep 2025", title: "The INBOUND '25 recap", views: "4,350", href: "https://www.linkedin.com/posts/ukaoma_hopping-on-the-inbound-25-recap-train-a-ugcPost-7371567790832467968-cTAz" },
  { when: "Aug 2025", title: "INBOUND 2025, the announcement film", views: "4,177", href: "https://www.linkedin.com/posts/ukaoma_inbound-ugcPost-7366140097991200769-WPF5" },
  { when: "Jan 2026", title: "The name Claude Code might make you think…", views: "2,383", href: "https://www.linkedin.com/posts/ukaoma_the-name-claude-code-might-make-you-think-ugcPost-7417585110046228480-hlGI" },
  { when: "Feb 2026", title: "Give me 100K to start a company", views: "2,205", href: "https://www.linkedin.com/posts/ukaoma_give-me-100k-to-start-a-company-and-the-ugcPost-7432832683875016706-tGA4" },
];

const made = [
  { title: "The INBOUND 2025 film", body: "How he speaks, what he says, how he addresses the room. Directed, written and cut." },
  { title: "A written voice", body: "Pillars, rules and a post library that turn his transcripts into posts that sound like him." },
  { title: "Weekly content", body: "Research, script, edit, publish and read the numbers, every week from December 2025." },
  { title: "CrispyMile", body: "His podcast with Chris DuBois, from the show format to the recording and the edit." },
];

const shorts = [
  {
    name: "GotCOS",
    meta: "Product launch · 2026",
    body: "An open-source AI chief of staff, built by an Olympian. I built the content strategy around one line, “high performers build better systems”, and made the product videos that went out with it.",
    credits: ["Strategy", "Campaigns", "Script", "Edit"],
    big: <>350</>,
    result: "active users today, 200+ new since May 2026",
  },
  {
    name: "Hermitcrabs",
    meta: "HubSpot agency · Aug 2025 → present",
    body: "A HubSpot agency with 300+ websites behind it and almost nothing on camera. I put its people and its work on screen: the INBOUND 2025 films, two films for UNBOUND 2026, and product walkthroughs like the Prialto client portal.",
    credits: ["Concept", "Script", "Voice-over", "Edit", "Motion"],
    big: <>INBOUND<i>·</i><wbr />UNBOUND</>,
    result: "event films, two years running",
  },
  {
    name: "Forward Company",
    meta: "AI agency · Co-founder · 2026",
    body: "Five people, five accounts and zero followers on launch day. I own the brand story: the launch campaigns, the voice, and a rule that the team shows the system working before anyone pitches it.",
    credits: ["Brand narrative", "Campaigns", "Writing", "Design"],
    big: <>0<i>→</i>1</>,
    result: "a brand built from launch day",
  },
];

const beats = [
  { when: "Before", title: <>Visual Communication, a camera, and film sets</>, body: "Years of photography, including clothing brands, alongside acting, writing and directing on shorts, features and ad films." },
  { when: "2024", key: true, title: <><i>The Silent Prayer</i>, assistant director</>, body: "At Palampur Talkies. Ran costume, art department and locations. Premiered at the Red Lorry Film Festival.", tag: "Streaming on Apple TV" },
  { when: "2025", title: <>Creative Head, Grekam Academy</>, body: "Shipped a run of videos for a learning academy in Coimbatore." },
  { when: "Aug 2025", key: true, title: <>Hermitcrabs, and the first film for Miles</>, body: "Joined full time as writer, editor and producer. The INBOUND 2025 film went out the same month." },
  { when: "Dec 2025", title: <>Miles goes weekly</>, body: "After three months of groundwork, his posts and videos ship every week." },
  { when: "Jun 2026", key: true, title: <>Forward Company</>, body: "Co-founded an AI-first agency and took on the brand and the story." },
  { when: "Next", title: <>More stories, made in person</>, body: "Writing, directing and producing on set, for brands and for my own short films and series." },
];

function Credits({ items }: { items: string[] }) {
  return <div className="credits label">{items.map((c) => <span key={c}>{c}</span>)}</div>;
}

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
        </div>
      </nav>

      <header className="hero wrap" id="top">
        <div className="label"><span>Writer</span><span>Director</span><span>Editor</span><span>Photographer</span></div>
        <h1 className="bill">Vishnu<span>Sanjay</span></h1>
        <div className="hero-row">
          <div className="bill">Creative<br /><em>Director</em></div>
          <p>I started out on film sets and behind a camera. Now I make founders, products and brands worth watching, from the first idea to the final cut and the numbers after it.</p>
        </div>
        <Showreel />
      </header>

      <div className="marquee" aria-label="Crafts">
        <div className="track">
          {crafts.map((c) => <span key={c}>{c}</span>)}
          {crafts.map((c) => <span key={`dup-${c}`} aria-hidden="true">{c}</span>)}
        </div>
      </div>

      <section className="wrap" id="numbers">
        <p className="thesis rv">Whether it&apos;s an actor on a set, an Olympian on LinkedIn or a product nobody has heard of yet, the job is the same. <b>Make people want to watch.</b></p>
        <div className="stats">
          <div className="stat rv"><div className="n">4.4K<i>→</i>11.2K</div><p>A founder&apos;s audience, across the year I made his content.</p></div>
          <div className="stat rv"><div className="n" data-count="350">350</div><p>People running GotCOS, 200+ of them signed up since May 2026.</p></div>
          <div className="stat rv"><div className="n" data-count="12">12</div><p>Campaigns pitched for four brands.</p></div>
          <div className="stat rv"><div className="n">2024</div><p><i>The Silent Prayer</i>, a feature film, as assistant director.</p></div>
        </div>
      </section>

      <section className="wrap" id="work">
        <div className="head rv">
          <h2 className="bill">The feature</h2>
          <span className="label">Aug 2025 → present</span>
        </div>
        <article className="feature">
          <div className="side rv">
            <span className="label">Founder brand · LinkedIn · Podcast</span>
            <h3 className="bill">Miles Ukaoma</h3>
            <p>Rio 2016 Olympian. SVP of Marketing at Quilt. Building an AI chief of staff.</p>
            <Credits items={["Research", "Script", "Direction", "Edit", "Publish", "Analytics"]} />
          </div>
          <div className="main">
            <p className="logline rv">An Olympian with a sharp mind on AI and a quiet LinkedIn. The job was to make him sound like himself on camera and on the page, every week, and let the audience find him.</p>
            <div className="made rv">
              {made.map((m) => <div key={m.title}><b>{m.title}</b><p>{m.body}</p></div>)}
            </div>
            <div className="rv">
              <div className="label" style={{ marginBottom: 12 }}>Most watched · LinkedIn impressions</div>
              <div className="cuts">
                {cuts.map((c) => (
                  <a key={c.href} className="cut" href={c.href} target="_blank" rel="noopener">
                    <span className="label">{c.when}</span><span className="t">{c.title}</span><span className="v">{c.views}</span>
                  </a>
                ))}
              </div>
            </div>
            <p className="rv" style={{ fontSize: 15, color: "var(--dim)" }}>He crossed 10,000 followers on June 18, 2026. July was his best month for engagement, at 3.4%.</p>
          </div>
        </article>
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="head rv">
          <h2 className="bill">Also showing</h2>
          <span className="label">Brands &amp; products</span>
        </div>
        <div className="shorts">
          {shorts.map((s) => (
            <article key={s.name} className="short rv">
              <div><h3 className="bill">{s.name}</h3><span className="label meta">{s.meta}</span></div>
              <div>
                <p>{s.body}</p>
                <Credits items={s.credits} />
              </div>
              <div className="result"><div className="big">{s.big}</div><p>{s.result}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap" id="story">
        <div className="head rv">
          <h2 className="bill">The backstory</h2>
          <span className="label">How it led here</span>
        </div>
        <div className="timeline">
          {beats.map((b) => (
            <div key={b.when} className={b.key ? "beat key rv" : "beat rv"}>
              <span className="when">{b.when}</span>
              <div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
                {b.tag && <span className="tag label">{b.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="end wrap">
        <span className="label">That&apos;s a wrap</span>
        <h2 className="bill" style={{ marginTop: 22 }}>Let&apos;s make<br /><span>the next one</span></h2>
        <div className="contact">
          <ContactRow label="Email" href="mailto:vishnu.sanjay3@gmail.com" value="vishnu.sanjay3@gmail.com" />
          <ContactRow label="Phone" href="tel:+918754069029" value="+91 87540 69029" />
        </div>
      </section>

      <footer className="wrap label">
        <span>Vishnu Sanjay · Creative Director</span>
        <span>© 2026</span>
      </footer>
    </>
  );
}
