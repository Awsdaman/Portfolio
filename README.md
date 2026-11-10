# Aous Damanhoori, portfolio

A one-page bilingual portfolio. Vite, React, TypeScript and plain CSS with design tokens. No backend and no trackers.

## Run it

```bash
npm install
```

```bash
npm run dev
```

`npm run dev` shows dashed "to confirm" markers wherever a fact is still missing. Production builds never show them.

```bash
npm run build
```

```bash
npm run preview
```

`npm run preview` serves the production build with the same security headers as `vercel.json`, so a Content-Security-Policy problem appears locally first.

## Change the content

All text lives in `src/content.ts`. Almost every string is a pair, `{ en: '…', ar: '…' }`. Fill in both.

### Add a project

Add an entry to the `projects` array:

```ts
{
  name: { en: 'Name', ar: 'الاسم' },
  body: { en: 'One short paragraph.', ar: 'فقرة قصيرة.' },
  repo: 'https://github.com/Awsdaman/name',
  live: 'https://example.vercel.app',                 // optional
  image: { src: 'projects/name.webp', alt: { en: '…', ar: '…' } }, // optional
  colors: { bg: '#123456', text: '#ffffff' },         // optional, the card's colour
}
```

Put the image in `public/projects/`. It should be a phone screenshot, 390 by 690 or larger at the same ratio. Without `colors`, the card uses the neutral surface. `live` adds the "Play it live" link and the hover badge.

### Add a certificate

Choose the tier by what it actually is:

- A certification goes in `headlineCert`. Set `verifyUrl` to add the verify link.
- A national or major programme goes in `programmes.items`.
- A course, bootcamp or workshop goes in `courses`.

Call attendance attendance, and a course a course.

### Fill in a missing fact

Search `src/content.ts` for `Pending`, `pending` or `verifyUrl`, then replace the marker with the real value. For example, replace `datePending` with `date` once you have the date.

### Add the CV

Put the file at `public/Aous-Damanhoori-CV.pdf`, then set `cvAvailable` to `true` in `src/content.ts`.

## Change the look

Colours, radii and typefaces are tokens in `src/styles/tokens.css`. To change the Arabic typeface, edit `--font-ar` and load the font in `src/main.tsx`. The site has a strict Content-Security-Policy, so fonts must be self-hosted.

## The games version

`/games/` is a page aimed at game programmes. It reuses the projects from `src/content.ts`, and its own copy lives in `src/games/GamesPage.tsx`. The reel is `public/games/reel.mp4`.

To publish it as its own website, create a second Vercel project from this repository and set the environment variable `VITE_SITE` to `games`. The games page then becomes the home page, with no link back to the security portfolio.

## Publish to GitHub Pages

Builds both websites and publishes them to the `gh-pages` branch. Run it after pushing changes to `main`.

```bash
bash scripts/deploy-pages.sh
```

The portfolio is at `https://awsdaman.github.io/Portfolio/` and the games version on its own is at `https://awsdaman.github.io/Portfolio/bootcamp/`. GitHub Pages cannot send custom response headers, so the Content-Security-Policy is delivered through a meta tag there. Vercel sends the full header set.

## Deploy to Vercel

Import the repository into Vercel and deploy from `main`. The framework is detected from `vercel.json`, which also sets the security headers.
