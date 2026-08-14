# Tahsin Habib — Portfolio

A CMS-driven personal branding site built with Next.js, React, TypeScript,
and Tailwind CSS — content managed through Sanity Studio, media served via
Cloudinary, deployed on Vercel.

## 1. Overview

This site runs in two modes:

- **Zero-config mode** — `NEXT_PUBLIC_SANITY_PROJECT_ID` unset. The site
  reads from local fixtures in `/data` and works immediately after
  `npm install`. This is what you get out of the box.
- **CMS mode** — Sanity env vars set. Every page fetches from the Sanity
  Content Lake instead, with the local fixtures kept only as an emergency
  fallback if a Sanity request ever fails.

You never edit component code to change content — only `lib/content.ts`
functions know where content comes from, everything else just calls
`getAllProjects()`, `getAbout()`, etc.

## 2. Tech stack

- **Next.js 16** (App Router, Server Components, Turbopack)
- **React 19**, **TypeScript**, **Tailwind CSS 4**
- **Sanity.io** — headless CMS, structured content + Portable Text
- **Cloudinary** — image/video CDN and optimization
- **GSAP** + **Lenis** — animation and smooth scroll (unchanged from the
  original design)
- **Vercel** — hosting for the Next.js app (and optionally the Studio)

## 3. Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. With no `.env.local`, this runs entirely on
local `/data` fixtures — no Sanity or Cloudinary account needed to preview
the site.

## 4. Sanity setup

See [`docs/SANITY.md`](docs/SANITY.md) for full step-by-step instructions:
creating a project, running the Studio, deploying it, and setting CORS.

Quick version:

```bash
cd sanity
npm install
cp .env.example .env      # fill in your project ID
npm run dev                # Studio at http://localhost:3333
```

Then, in the repo root, add the same project ID/dataset to `.env.local`
(see `.env.example`) and restart `npm run dev` — the Next.js app will
start pulling from Sanity instead of `/data`.

## 5. Cloudinary setup

See [`docs/CLOUDINARY.md`](docs/CLOUDINARY.md) for the full workflow. In
short: connect your Cloudinary account once inside the Studio's
**Cloudinary** settings tool, then click **Browse** on any image/video
field to search, upload, or select through Cloudinary's real Media
Library widget — no manual ID copy-pasting.

## 6. Environment variables

See [`.env.example`](.env.example) (Next.js app) and
[`sanity/.env.example`](sanity/.env.example) (Studio). Every variable
listed there is read somewhere in the code — nothing speculative.

## 7. Sanity Studio deployment

The Studio is a standalone project in `/sanity` with its own
`package.json` — it does not share dependencies with the Next.js app.

```bash
cd sanity
npm run deploy
```

This publishes the Studio to `https://<your-chosen-name>.sanity.studio`.
Full details, including CORS setup, in [`docs/SANITY.md`](docs/SANITY.md).

## 8. Vercel deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). Short version: import the
repo into Vercel, set the environment variables from `.env.example`, set
the **Root Directory** to the repo root (not `/sanity`), deploy.

The Studio can optionally be deployed as a *second*, separate Vercel
project with Root Directory `sanity` — or published via `sanity deploy`
to `*.sanity.studio` instead, which is simpler and doesn't consume a
Vercel project. Either way, see `docs/DEPLOYMENT.md`.

## 9. Content migration

If you want to seed Sanity with the existing local content instead of
retyping everything:

```bash
cd sanity && npm install && cd ..
npm run migrate
```

See the comment header in [`scripts/migrate-content.mjs`](scripts/migrate-content.mjs)
for exactly what this does and does not do (it does **not** upload images
to Cloudinary for you — see the script's notes).

## 10. How to create a project

In the Studio → **Projects** → **+ Create** → fill in the fields. Required:
title, slug, year, category, short description, challenge/solution/process/
result, and a thumbnail (Cloudinary Image — see §5). Set **Featured** to
show it on the homepage. **Sort order** controls display order (lower =
first).

## 11. How to publish an article

Studio → **Journal Articles** → **+ Create**. The body field is rich text
(Portable Text) — headings, lists, links, blockquotes, images, and code
blocks are all supported directly in the editor toolbar.

## 12. How to manage images

Upload the asset in Cloudinary (or click **Browse** → **Upload** directly
inside the Studio field), select it, and it's linked. See
[`docs/CLOUDINARY.md`](docs/CLOUDINARY.md).

## 13. How to update About

Studio → **About** (a single pinned document, not a list). Edit headline,
biography, profile image, timeline, and capabilities directly — no code
changes needed, and the homepage "Capabilities" section pulls from the
same document.

## 14. How to update social links

Studio → **Site Settings** → **Contact & Social**. Updates the footer,
navbar, and Contact page everywhere at once.

## 14b. How to change the homepage hero portrait

Studio → **Site Settings** → **Hero** → **Hero portrait**. Click **Browse**
to select or upload a photo through the Cloudinary Media Library widget
(recommended: a vertical/portrait photo, at least 1200×1500px), then set
**Hero portrait — alt text** to describe it for screen readers. No code
changes, no redeploy — the change appears after the 60s cache window (or
immediately after a redeploy). Leaving the field empty is safe: the
homepage falls back to a clean, text-only hero rather than showing a
broken image.

## 15. Fallback behavior

By default, if a Sanity request fails in production (outage, bad dataset,
network issue), the failure is logged and the site falls back to local
`/data` content rather than breaking — every failure is always logged
loudly, whichever mode is active. Set `SANITY_STRICT_MODE=true` to make a
Sanity outage fail loudly instead of silently serving stale fallback
content indefinitely: this re-throws on fetch failure, which fails the
request (and fails the Vercel build outright for statically-generated
pages). See `lib/sanity/client.ts` and `docs/SANITY.md` §9.

## 16. Troubleshooting

- **Site shows old/local content after publishing in Sanity** — content is
  cached for 60s (`revalidate: 60` in `lib/sanity/client.ts`). Wait a
  minute, or trigger a redeploy for an immediate refresh.
- **Images not loading** — confirm `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is
  set and that the asset was actually selected via the Studio's Browse
  button (an empty/never-attached field renders nothing, by design).
- **Build succeeds but pages show local fallback content** — check the
  build logs for `[sanity] fetch failed, falling back to local content`,
  which prints the real error (bad project ID, dataset typo, network
  policy blocking `api.sanity.io`, etc).
- **Studio won't start** — the Studio has its own `node_modules`; run
  `npm install` inside `/sanity`, not the repo root.
- **404 on a project/article page** — check the slug in Sanity matches the
  URL, and that the document is actually published (not just saved as a
  draft).
