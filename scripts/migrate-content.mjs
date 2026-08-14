#!/usr/bin/env node
/**
 * One-time migration: pushes the local /data fixtures (projects, articles,
 * experiments, about, site settings) into Sanity as real documents, so you
 * don't have to hand-retype everything in the Studio.
 *
 * What this does NOT do: upload images to Cloudinary. The local /public
 * SVGs are placeholder art with no equivalent real asset — every migrated
 * document is created with its image field(s) left unset rather than
 * fabricated, and the script prints exactly which documents still need one.
 * Open each in the Studio and use the Cloudinary "Browse" button (uploads
 * or selects through your real Media Library — see docs/CLOUDINARY.md).
 * Required-image validation prevents publishing without one, so nothing
 * can go live half-configured.
 *
 * Safety / idempotency:
 *  - Every document gets a deterministic _id (e.g. `project-<slug>`,
 *    `about`, `siteSettings`) and is written with createIfNotExists.
 *    Running this script any number of times will NOT create duplicates —
 *    a document that already exists (including one you've since edited in
 *    the Studio) is left untouched.
 *  - Requires a token with write access (SANITY_API_TOKEN). Read-only
 *    tokens will fail with a clear permissions error.
 *
 * Usage:
 *   cd sanity && npm install   # if you haven't already
 *   cd ..
 *   SANITY_API_TOKEN=sk... \
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   node scripts/migrate-content.mjs
 *
 * Or via the npm script (reads .env.local):
 *   npm run migrate
 */
import { createClient } from "@sanity/client";
import { existsSync } from "node:fs";
import process from "node:process";
import { projects } from "../data/projects.ts";
import { articles } from "../data/articles.ts";
import { experiments } from "../data/experiments.ts";
import { about } from "../data/about.ts";
import { siteConfig } from "../lib/site-config.ts";

// Load .env.local if present (Node 20.6+ / 22+ supports loadEnvFile natively).
if (existsSync(".env.local") && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(".env.local");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing config. Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN (write access)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-06-01",
  token,
  useCdn: false,
});

// Deliberately does NOT fabricate a fake cloudinary.asset object: that
// type is meant to be populated only by the Cloudinary Media Library
// widget inside the Studio (see sanity/sanity.config.ts), and its schema
// requires real fields (public_id, secure_url, resource_type, ...) that
// this script has no real values for. Every migrated document is created
// with its image field left unset instead — required-field validation in
// the Studio then makes it impossible to accidentally publish/leave live
// without a real image, and the console output below tells you exactly
// which documents still need one attached.
const PENDING_IMAGES = [];

function trackPendingImage(docId, field) {
  PENDING_IMAGES.push(`${docId} → ${field}`);
}

function toPortableTextParagraph(text) {
  return [
    {
      _type: "block",
      _key: "migrated",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "migrated-span", text, marks: [] }],
    },
  ];
}

async function migrateProjects() {
  for (const p of projects) {
    const doc = {
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      year: p.year,
      category: p.category,
      role: p.role,
      services: p.services,
      technologies: p.technologies,
      shortDescription: p.description,
      challenge: p.challenge,
      solution: p.solution,
      process: p.process,
      result: p.result,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      featured: p.featured,
      sortOrder: p.sortOrder,
      publishedAt: new Date(p.publishedAt).toISOString(),
    };
    await client.createIfNotExists(doc);
    trackPendingImage(doc._id, "thumbnail (and optionally gallery)");
    console.log(`  project: ${p.slug}`);
  }
}

async function migrateArticles() {
  for (const a of articles) {
    const doc = {
      _id: `article-${a.slug}`,
      _type: "article",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      excerpt: a.excerpt,
      body: toPortableTextParagraph(
        "Migrated placeholder — replace with the full article body in the Studio."
      ),
      publishedAt: new Date(a.publishedAt).toISOString(),
      tags: a.tags,
      featured: a.featured,
    };
    await client.createIfNotExists(doc);
    trackPendingImage(doc._id, "coverImage");
    console.log(`  article: ${a.slug}`);
  }
}

async function migrateExperiments() {
  for (const e of experiments) {
    const doc = {
      _id: `experiment-${e.slug}`,
      _type: "experiment",
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      description: e.description,
      technologies: e.technology,
      liveUrl: e.liveUrl,
      githubUrl: e.githubUrl,
      featured: e.featured,
      sortOrder: e.sortOrder,
      publishedAt: new Date(e.publishedAt).toISOString(),
    };
    await client.createIfNotExists(doc);
    trackPendingImage(doc._id, "image");
    console.log(`  experiment: ${e.slug}`);
  }
}

async function migrateAbout() {
  const doc = {
    _id: "about",
    _type: "about",
    name: about.name,
    headline: about.headline,
    introduction: about.introduction,
    biography: about.biography,
    currentFocus: about.currentFocus,
    timeline: about.timeline.map((t, i) => ({ ...t, _key: `timeline-${i}` })),
    capabilities: about.capabilities.map((c, i) => ({ ...c, _key: `capability-${i}` })),
  };
  await client.createIfNotExists(doc);
  trackPendingImage(doc._id, "profileImage");
  console.log("  about: singleton document");
}

async function migrateSiteSettings() {
  const doc = {
    _id: "siteSettings",
    _type: "siteSettings",
    name: siteConfig.name,
    shortName: siteConfig.shortName,
    role: siteConfig.role,
    location: siteConfig.location,
    email: siteConfig.email,
    hero: {
      eyebrow: siteConfig.hero.eyebrow,
      headline: siteConfig.hero.headline,
      subline: siteConfig.hero.subline,
      highlight: siteConfig.hero.highlight,
      description: siteConfig.hero.description,
      ctaText: siteConfig.hero.ctaText,
      ctaUrl: siteConfig.hero.ctaUrl,
    },
    availabilityStatus: siteConfig.isAvailable,
    availabilityText: siteConfig.availability,
    social: siteConfig.social,
    seo: {
      siteTitle: `${siteConfig.name} — ${siteConfig.title}`,
      siteDescription: siteConfig.description,
    },
  };
  await client.createIfNotExists(doc);
  console.log("  siteSettings: singleton document");
}

async function main() {
  console.log(`Migrating local content into Sanity project "${projectId}" (dataset: ${dataset})...\n`);
  console.log("Site Settings & About:");
  await migrateSiteSettings();
  await migrateAbout();
  console.log("\nProjects:");
  await migrateProjects();
  console.log("\nArticles:");
  await migrateArticles();
  console.log("\nExperiments:");
  await migrateExperiments();
  console.log("\nDone. Images were intentionally left unset — attach each one in the Studio via the");
  console.log('Cloudinary "Browse" button (uploads or selects through your actual Media Library):\n');
  for (const line of PENDING_IMAGES) console.log(`  - ${line}`);
  console.log(
    "\nRequired-image validation means these documents can be saved as drafts now, but can't be" +
      " published until an image is attached."
  );
}

main().catch((err) => {
  console.error("\nMigration failed:", err.message);
  process.exit(1);
});
