# Cloudinary setup

## How this actually works

Every image/video field in the Studio (Project thumbnail/gallery/video,
Article cover image and inline body images, Lab image/gallery, About
profile image, Testimonial avatar, and every SEO social-share image) is a
real **`cloudinary.asset`** field, powered by
[`sanity-plugin-cloudinary`](https://www.npmjs.com/package/sanity-plugin-cloudinary).
Editors click **Browse** on the field and get Cloudinary's own Media
Library widget — search your existing assets, upload a new one, or crop —
directly inside the Studio. Public ID, dimensions, and format are captured
automatically. There is no manual copy-pasting of IDs.

Sanity stores only that reference (`public_id`, `resource_type`, `format`,
`width`, `height`). The actual image/video bytes live on Cloudinary's CDN
and are never uploaded to or stored by Sanity. `lib/cloudinary.ts` is the
single place in the Next.js app that turns a `public_id` into an
optimized, responsive delivery URL — no component ever constructs a
Cloudinary URL by hand:

```
Sanity content (public_id) → lib/sanity/image.ts → lib/cloudinary.ts
    → https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,.../<public_id>
    → Next.js <Image>
```

## 1. Create a Cloudinary account

https://cloudinary.com → sign up (the free tier is enough for a
portfolio). From the dashboard, copy your **Cloud name**.

## 2. Configure the Next.js app

In `.env.local` (and in Vercel):

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your cloud name>
```

This is the only Cloudinary variable the Next.js app needs. Cloudinary
delivery URLs are public/CDN URLs by design — there's no secret to
protect on the frontend.

## 3. Connect Cloudinary inside the Studio (one-time)

The Media Library widget needs its own connection, separate from the step
above:

1. Open the Studio (`npm run dev` inside `/sanity`, or your deployed
   Studio URL).
2. Open the **Cloudinary** settings tool in the Studio's top navigation
   (added automatically by the plugin).
3. Enter your Cloudinary **Cloud name** and **API key** (find both on
   your Cloudinary dashboard).
4. This is stored as a private document in your Sanity dataset — **not**
   in this repository, and not readable through the public read API.

Do this once per dataset (e.g. once for `production`). Every editor with
Studio access then gets the Browse button working automatically.

## 4. Attaching media to content

1. Open any document with an image/video field (a Project, Article, etc.)
   in the Studio.
2. Click **Browse** on the field.
3. Search your Cloudinary library, or switch to the Upload tab to add a
   new asset directly.
4. Select it — the field now shows a thumbnail preview and the asset is
   linked.

No alt-text field exists on the asset itself in this setup — alt text for
photos comes from the surrounding content instead (e.g. a project's image
uses the project title), matching how the original design already
labeled images. Add a dedicated caption/alt field to a schema if you
later want per-image alt text independent of its context.

## 5. How delivery URLs are built

`lib/cloudinary.ts` exports:

- `cloudinaryImageUrl(publicId, { width, height, quality, format, crop })`
  — builds one optimized URL. Defaults: `f_auto` (best format for the
  requesting browser), `q_auto` (automatic quality), `c_fill` crop.
- `cloudinarySrcSet(publicId, widths)` — a responsive `srcset` across
  common breakpoints.
- `cloudinaryVideoUrl(publicId)` — the video equivalent.

`lib/sanity/image.ts` calls these to resolve every `cloudinary.asset`
object coming back from a Sanity query into a plain URL string before it
ever reaches a component — `<ProjectImage src={project.thumbnail} />`
never needs to know Cloudinary or Sanity exist.

## 6. Local placeholder art

The zero-config fallback (`/data/*.ts`) points at local SVGs in
`/public/images/...` instead of Cloudinary. `cloudinaryImageUrl()`
detects a path starting with `/` or `http` and passes it through
unchanged, so local and Cloudinary images render through the exact same
component code.

## 7. Videos

`project.video` is a `cloudinary.asset` field, resolved end-to-end
(`resolveVideo()` in `lib/sanity/image.ts` checks `resource_type` and
builds a video delivery URL). No page currently renders a `<video>`
element, since the original design didn't have one — the data is ready;
add `<video src={project.video} controls />` (or similar) to
`app/work/[slug]/page.tsx` if/when you want to use it.
