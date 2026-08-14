# Deployment

This repo contains two independently-deployable things: the Next.js site
(repo root) and the Sanity Studio (`/sanity`). They are deployed
separately and have separate dependency trees.

## 1. Deploy the Next.js site to Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New → Project** → import the repo.
3. **Root Directory**: leave as the repo root (not `sanity`).
4. Framework preset: Next.js (auto-detected).
5. Set environment variables (Project Settings → Environment Variables) —
   see `.env.example` for the full list and what each does. Minimum for a
   working zero-config deploy: none required at all — the site runs on
   local `/data` fixtures with nothing set. To connect Sanity + Cloudinary,
   set:
   - `NEXT_PUBLIC_SITE_URL` — your real production domain
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
6. Deploy.

The build (`npm run build`) does not require any secret to succeed —
`NEXT_PUBLIC_*` values are safe to be present at build time, and if the
Sanity variables are unset entirely the build never attempts a network
call. If they're set but a Sanity request fails, the build still succeeds
by falling back to local content (unless `SANITY_STRICT_MODE=true` — see
`docs/SANITY.md` §9).

## 2. Content revalidation

Sanity queries are cached for 60 seconds (`revalidate: 60` in
`lib/sanity/client.ts`) via Next.js's data cache. A publish in the Studio
shows up on the live site within a minute automatically — no webhook or
manual redeploy required. For instant updates, you can optionally wire a
Sanity webhook to Vercel's Deploy Hook to trigger a full redeploy on
publish, but this isn't required for the site to work.

## 3. Deploy the Sanity Studio

Two options — pick one:

**A. `sanity deploy` (recommended)** — publishes to Sanity's own free
static hosting at `https://<name>.sanity.studio`:

```bash
cd sanity
npm install
npm run deploy
```

No Vercel project needed for this option.

**B. As a second Vercel project**, e.g. to serve it at
`studio.yourdomain.com`:

1. Vercel: **Add New → Project** → import the same repo again.
2. **Root Directory**: `sanity`.
3. **Build Command**: `npm run build`.
4. **Output Directory**: `dist`.
5. Environment variables: `SANITY_STUDIO_PROJECT_ID`,
   `SANITY_STUDIO_DATASET`.
6. Deploy, then point your subdomain at it in Vercel's domain settings.

Either way, make sure the Studio's origin is added to your Sanity
project's CORS origins (`docs/SANITY.md` §6) or the Studio won't be able
to read/write content.

## 4. Custom domain

Set `NEXT_PUBLIC_SITE_URL` to the final domain (with `https://`, no
trailing slash) before or right after attaching it in Vercel — this value
drives canonical URLs, the sitemap, robots.txt, and Open Graph URLs.
Redeploy after changing it (env var changes require a redeploy to take
effect, they aren't picked up live).

## 5. Rollbacks

Standard Vercel behavior applies — every deploy is immutable and
instantly rollback-able from the Vercel dashboard. Sanity content is
separate from code deploys: rolling back a Vercel deploy does not affect
already-published Sanity content, and publishing in Sanity does not
require a new Vercel deploy (see §2).
