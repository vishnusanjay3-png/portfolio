# Vishnu Sanjay — portfolio

Next.js (App Router) build of the portfolio page. Fully static; no env vars required.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

Either push this folder to a GitHub repo and import it at vercel.com/new (framework is auto-detected as Next.js), or from this folder:

```bash
npx vercel --prod
```

## Layout

- `app/page.tsx` — all page content (crafts, cuts, shorts, backstory are data arrays at the top)
- `app/globals.css` — the design tokens and styles
- `app/components/` — client pieces: showreel player, clapboard mark, copy-to-clipboard contact rows, scroll reveals / count-ups / film grain
- `public/intro.mp4`, `public/poster.jpg` — showreel media
