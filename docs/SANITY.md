# Sanity setup

## 1. Create a project

1. Go to https://www.sanity.io/manage and sign in (or create an account).
2. Click **Create new project**. Name it whatever you like — the display
   name doesn't affect the app.
3. Copy the **Project ID** shown on the project overview page.
4. Under **Datasets**, confirm a `production` dataset exists (created by
   default). Public/private visibility: keep it **public** — reads in this
   app are unauthenticated, so a private dataset will return nothing.

## 2. Configure the Studio

```bash
cd sanity
npm install
cp .env.example .env
```

Edit `sanity/.env`:

```
SANITY_STUDIO_PROJECT_ID=<your project id>
SANITY_STUDIO_DATASET=production
```

```bash
npm run dev
```

Studio runs at `http://localhost:3333`. Sign in with the same account you
used to create the project.

## 3. Configure the Next.js app

In the repo root, copy `.env.example` to `.env.local` and set:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<same project id>
NEXT_PUBLIC_SANITY_DATASET=production
```

Restart `npm run dev`. Pages now fetch from Sanity; if a document doesn't
exist yet, that page falls back to local `/data` content (or, for detail
pages, 404s if Sanity is configured but has no matching document — see
`lib/content.ts`).

## 4. Content model

| Document | Purpose |
|---|---|
| `siteSettings` | Singleton. Identity, hero copy, contact, social links, global SEO. |
| `about` | Singleton. Bio, timeline, capabilities. |
| `project` | Case studies shown on `/work`. |
| `article` | Journal posts shown on `/journal`, Portable Text body. |
| `experiment` | Lab entries shown on `/lab`. |
| `testimonial` | Optional — not currently rendered on the site, but ready to wire into a future testimonials section via `getTestimonials()` / `getFeaturedTestimonials()` in `lib/content.ts`. |

Reusable object types: `seo` (attached to project/article/about/siteSettings)
and `cloudinary.asset` (registered globally by `sanity-plugin-cloudinary` —
see `docs/CLOUDINARY.md` for the Media Library-driven image/video workflow).

`siteSettings` and `about` are true singletons — not just "please don't
create a second one" by convention. `sanity/structure.ts` pins each to one
document in the desk pane, and `sanity/sanity.config.ts` additionally
removes both types from the global "new document" search/command palette
and strips their Duplicate/Delete actions (`document.newDocumentOptions` /
`document.actions`). The desk-pane restriction alone doesn't stop the
global "+" menu from creating a second copy — both layers together do.

Every document schema also has field-level validation: required fields,
slug format (lowercase/hyphens only), URL scheme checks (http/https only),
string length bounds, and SEO title/description length warnings. Sanity
Studio will block publishing content that violates a `required` /
`.error()` rule and warn (but not block) on `.warning()` rules.

## 5. Deploying the Studio

Two options:

**A. `sanity deploy` (recommended, simplest)**

```bash
cd sanity
npm run deploy
```

Choose a studio hostname when prompted (e.g. `tahsin-portfolio` →
`https://tahsin-portfolio.sanity.studio`). This is a free static hosting
service Sanity provides — no separate Vercel project needed.

**B. As a second Vercel project**

Import the same repo into a *second* Vercel project, set **Root
Directory** to `sanity`, **Build Command** to `npm run build`, **Output
Directory** to `dist`. Set `SANITY_STUDIO_PROJECT_ID` and
`SANITY_STUDIO_DATASET` as environment variables on that project. Point a
subdomain (e.g. `studio.yourdomain.com`) at it.

## 6. CORS

Studio and any future preview features need your frontend origin allowed:

1. https://www.sanity.io/manage → your project → **API** → **CORS Origins**.
2. Add `http://localhost:3000` (dev) and your production domain
   (`https://yourdomain.com`), each **without** a trailing slash.
3. If you deployed the Studio itself to a custom domain, add that too.

## 7. Authentication / access

Studio access is controlled by Sanity project membership (invite
collaborators under **Manage → Members**), not by anything in this repo.
Reads from the Next.js app are unauthenticated by design (public dataset).
Writes (the migration script) require a token — see §8.

## 8. API tokens

Only needed for `scripts/migrate-content.mjs` (or future authenticated
features like draft previews):

1. https://www.sanity.io/manage → your project → **API** → **Tokens**.
2. **Add API token** → permission **Editor** (write access) →copy the
   token immediately (shown once).
3. Set as `SANITY_API_TOKEN` — server-side only, never commit it, never
   prefix it `NEXT_PUBLIC_`.

## 9. Fallback behavior in production

By default, if a Sanity request ever fails (outage, bad dataset, network
issue), the site logs the failure and falls back to the local `/data`
content rather than showing an error — the failure is always logged, but
the site stays up. Set `SANITY_STRICT_MODE=true` if you'd rather a Sanity
outage fail loudly instead: this re-throws on fetch failure, which fails
the request (and fails the Vercel build outright for statically-generated
pages) instead of silently drifting on stale fallback content. See
`lib/sanity/client.ts` and the "Fallback behavior" section of the root
README.
