# Vishnu Sanjay portfolio

Personal portfolio site. Next.js 16 (App Router), React 19, TypeScript, plain CSS. Fully static; deployed on Vercel from `main` of github.com/vishnusanjay3-png/portfolio.

Worked on from more than one computer. GitHub is the source of truth: `git pull` before starting, commit and push when done.

Live site: https://vishnusanjay-port.vercel.app

@AGENTS.md

## Where things are

All the site's writing (and the links, images and ids that go with it) lives in `content/site.json`, typed and loaded by `app/lib/content.tsx`. Text conventions: `{words}` marks the accent (red; outlined in the closing title), a line break becomes `<br>`.

To edit the write-ups: `npm run dev`, open http://localhost:3000/edit. Every text field is an open box with the live site beside it; typing saves to `content/site.json` and the preview updates. URLs, images, logos, ids and colours are deliberately left out of the form. `/edit` and `/api/content` only exist in dev (404 in production). New text fields added to the JSON show up in the form automatically.

- `app/page.tsx`: page order and nav.
- `app/components/Work.tsx`: work cards, the story dialog and the numbers row.
- `app/components/Backstory.tsx`: the timeline rows; `Post.tsx` is the post-thumbnail card, `Thumb.tsx` the YouTube card.
- `app/components/Films.tsx`, `Contact.tsx` (contact tiles stay in code), `HeroReel.tsx` (hero + showreel), `Effects.tsx` (reveals, count-ups, grain).
- `app/globals.css`: design tokens (`:root`) and all styles.
- `public/`: media served from the site root: `intro.mp4`, `poster.jpg`, `portrait.webp`, `logos/`, `films/`, `story/`.

## Design rules

- One type family, Archivo, in three voices: `.bill` (condensed 62%, uppercase display), `.label` (small caps-style labels), body text.
- Dark only. One accent colour, `--safelight` (#d23a2e).
- Must stay clean from 320px to 1920px wide: no horizontal scroll, no text overlapping. Big display text is sized to its column with container query units (`cqi`); keep that pattern for any new big numbers or names.

## Media

- Compress video before adding it (H.264 MP4, ideally under ~20 MB). GitHub rejects files over 100 MB.
- Give each video a poster JPG.

## Commands

- `npm install`, `npm run dev` (localhost:3000), `npm run build`.
