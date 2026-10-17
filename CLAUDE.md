# Vishnu Sanjay portfolio

Personal portfolio site. Next.js 16 (App Router), React 19, TypeScript, plain CSS. Fully static; deployed on Vercel from `main` of github.com/vishnusanjay3-png/portfolio.

Worked on from more than one computer. GitHub is the source of truth: `git pull` before starting, commit and push when done.

Live site: https://vishnusanjay-port.vercel.app

@AGENTS.md

## Where things are

Content lives as typed data arrays at the top of each section component:

- `app/page.tsx`: page order, nav, hero copy, crafts marquee, closing section.
- `app/components/Work.tsx`: `projects` (work cards, brand colours, LinkedIn links) and `stats`.
- `app/components/Backstory.tsx`: `beats` (the timeline).
- `app/components/Films.tsx`: `feature` and `shorts` (YouTube ids), rendered through `Thumb.tsx`.
- `app/components/Contact.tsx`: `ways` (contact tiles).
- `app/components/HeroReel.tsx`: hero with the showreel. `Effects.tsx`: scroll reveals, count-ups, film grain.
- `app/globals.css`: design tokens (`:root`) and all styles.
- `public/`: media served from the site root: `intro.mp4`, `poster.jpg`, `portrait.webp`, `logos/*.png`, `films/*.jpg`.

## Design rules

- One type family, Archivo, in three voices: `.bill` (condensed 62%, uppercase display), `.label` (small caps-style labels), body text.
- Dark only. One accent colour, `--safelight` (#d23a2e).
- Must stay clean from 320px to 1920px wide: no horizontal scroll, no text overlapping. Big display text is sized to its column with container query units (`cqi`); keep that pattern for any new big numbers or names.

## Media

- Compress video before adding it (H.264 MP4, ideally under ~20 MB). GitHub rejects files over 100 MB.
- Give each video a poster JPG.

## Commands

- `npm install`, `npm run dev` (localhost:3000), `npm run build`.
