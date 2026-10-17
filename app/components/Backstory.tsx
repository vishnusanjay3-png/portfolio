import Ext from "./Ext";
import Thumb, { type Video } from "./Thumb";
import PostCard, { type Post } from "./Post";

type Beat = {
  when: string;
  org: string;
  role: string;
  logo?: string;
  mark?: string;
  body: string;
  crafts?: string[];
  videos?: Video[];
  posts?: Post[];
  /** Pill buttons for the main external calls to action. */
  ctas?: { label: string; href: string }[];
  /** Small in-page links. */
  links?: { label: string; href: string }[];
  /** A picture beside the text. `halo` gives it the gold treatment (Palampur). */
  shot?: { src: string; alt: string; caption?: string; halo?: boolean };
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
    shot: { src: "/films/with-ilaiyaraaja.jpg", alt: "Vishnu Sanjay with Maestro Ilaiyaraaja in the studio", caption: "With Maestro Ilaiyaraaja, in the studio.", halo: true },
    ctas: [
      { label: "Watch the trailer", href: "https://www.youtube.com/watch?v=jyjW3q2A1As" },
      { label: "Stream on BookMyShow", href: "https://in.bookmyshow.com/movies/mumbai/the-silent-prayer/ET00392620" },
    ],
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
    shot: { src: "/story/mellow-stickers.jpg", alt: "A spread of Mellow stickers: Less Goo, Slay!, Wut?, OMG, Srsly and others", caption: "A few from the Mellow sticker sets." },
  },
  {
    when: "Jun – Oct 2025",
    org: "Grekam Academy",
    role: "Creative Head",
    logo: "/logos/grekam.png",
    body: "Ran the creative side of a learning academy in Coimbatore: the concepts for marketing and branding, the videos, the posters and social posts, and regular workshops to train the junior designers and interns.",
    posts: [
      { title: "Contrast", platform: "Instagram", note: "A design-principles reel for Grekam", href: "https://www.instagram.com/reel/DLzXHuHMEt4/", art: "contrast" },
    ],
  },
  {
    when: "Aug 2025 → now",
    org: "Hermitcrabs",
    role: "Brand Designer – Growth",
    logo: "/logos/hermitcrabs.png",
    body: "Started making the agency's films in August, the INBOUND 2025 film among them, and joined full time in October as Brand Designer on the growth team. It's also where the work with Miles began.",
    posts: [
      { title: "Prialto", platform: "LinkedIn", note: "Client portal walkthrough", href: "https://lnkd.in/p/gzDd2HGC", img: "/story/prialto.jpg" },
      { title: "HubCat portal", platform: "LinkedIn", note: "Project portal walkthrough", href: "https://lnkd.in/p/gtrFx7kp", img: "/story/hubcat.jpg" },
    ],
    links: [{ label: "The full story is in the work", href: "#work" }],
  },
  {
    when: "Jun 2026 → now",
    org: "Forward Company",
    role: "Brand Designer",
    logo: "/logos/forward-company.png",
    body: "Campaign ideas, poster designs, launch videos and LinkedIn copy for a new AI-first agency, from launch day.",
    posts: [
      { title: "Launch film", platform: "Forward Company", note: "The launch video · 0:36", video: "/story/fc-launch.mp4", img: "/story/fc-launch.jpg", tint: { bg: "#def649", ink: "#2321ff" } },
    ],
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
  return (
    <section className="wrap" id="story">
      <div className="head rv">
        <h2 className="bill">The backstory</h2>
        <span className="label">How it led here</span>
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
                    <img src={b.shot.src} alt={b.shot.alt} loading="lazy" />
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
