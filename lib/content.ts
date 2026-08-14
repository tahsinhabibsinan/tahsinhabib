/**
 * Content abstraction layer.
 *
 * Every page/component imports from here — never directly from /data or
 * from lib/sanity/*. When Sanity is configured (NEXT_PUBLIC_SANITY_PROJECT_ID
 * + NEXT_PUBLIC_SANITY_DATASET are set), each function fetches from the
 * Sanity Content Lake and normalizes the result. Otherwise — or if a
 * Sanity request fails — it falls back to the local /data fixtures so the
 * site always renders something rather than a broken page.
 *
 *   components -> lib/content.ts -> lib/sanity/* -> Sanity
 *                                \-> /data          (fallback)
 */

import type {
  Project,
  Article,
  Experiment,
  About,
  SiteSettings,
  Testimonial,
} from "@/types/content";
import { isSanityConfigured, SANITY_STRICT_MODE, sanityFetch } from "@/lib/sanity/client";
import {
  allProjectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  allArticlesQuery,
  articleBySlugQuery,
  allExperimentsQuery,
  featuredExperimentsQuery,
  aboutQuery,
  siteSettingsQuery,
  allTestimonialsQuery,
  featuredTestimonialsQuery,
} from "@/lib/sanity/queries";
import {
  normalizeProject,
  normalizeArticle,
  normalizeExperiment,
  normalizeAbout,
  normalizeSiteSettings,
  normalizeTestimonial,
} from "@/lib/sanity/normalize";
import type {
  SanityProject,
  SanityArticle,
  SanityExperiment,
  SanityAbout,
  SanitySiteSettings,
  SanityTestimonial,
} from "@/lib/sanity/types";

import {
  projects as localProjects,
  getFeaturedProjects as _getFeaturedProjects,
  getProjectBySlug as _getProjectBySlug,
  getAdjacentProjects as _getAdjacentProjects,
} from "@/data/projects";
import { articles as localArticles, getArticleBySlug as _getArticleBySlug } from "@/data/articles";
import {
  experiments as localExperiments,
  getFeaturedExperiments as _getFeaturedExperiments,
} from "@/data/experiments";
import { about as localAbout } from "@/data/about";
import { siteConfig } from "@/lib/site-config";

export { isSanityConfigured, SANITY_STRICT_MODE };

// ---- Projects ----

export async function getAllProjects(): Promise<Project[]> {
  const docs = await sanityFetch<SanityProject[]>(allProjectsQuery, {}, ["project"]);
  if (docs && docs.length > 0) return docs.map(normalizeProject);
  return [...localProjects].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const docs = await sanityFetch<SanityProject[]>(featuredProjectsQuery, {}, ["project"]);
  if (docs && docs.length > 0) return docs.map(normalizeProject);
  return _getFeaturedProjects().sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const doc = await sanityFetch<SanityProject | null>(projectBySlugQuery, { slug }, ["project"]);
  if (doc) return normalizeProject(doc);
  if (isSanityConfigured()) return undefined; // Sanity is the source of truth; don't silently mix in stale local content.
  return _getProjectBySlug(slug);
}

export async function getAdjacentProjects(
  slug: string
): Promise<{ prev: Project | null; next: Project | null }> {
  if (isSanityConfigured()) {
    const all = await getAllProjects();
    const index = all.findIndex((p) => p.slug === slug);
    if (index === -1) return { prev: null, next: null };
    const prev = index === 0 ? all[all.length - 1] : all[index - 1];
    const next = index === all.length - 1 ? all[0] : all[index + 1];
    return { prev, next };
  }
  return _getAdjacentProjects(slug);
}

// ---- Articles ----

export async function getAllArticles(): Promise<Article[]> {
  const docs = await sanityFetch<SanityArticle[]>(allArticlesQuery, {}, ["article"]);
  if (docs && docs.length > 0) return docs.map(normalizeArticle);
  return [...localArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const doc = await sanityFetch<SanityArticle | null>(articleBySlugQuery, { slug }, ["article"]);
  if (doc) return normalizeArticle(doc);
  if (isSanityConfigured()) return undefined;
  return _getArticleBySlug(slug);
}

// ---- Experiments ----

export async function getAllExperiments(): Promise<Experiment[]> {
  const docs = await sanityFetch<SanityExperiment[]>(allExperimentsQuery, {}, ["experiment"]);
  if (docs && docs.length > 0) return docs.map(normalizeExperiment);
  return [...localExperiments].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedExperiments(): Promise<Experiment[]> {
  const docs = await sanityFetch<SanityExperiment[]>(featuredExperimentsQuery, {}, ["experiment"]);
  if (docs && docs.length > 0) return docs.map(normalizeExperiment);
  return _getFeaturedExperiments().sort((a, b) => a.sortOrder - b.sortOrder);
}

// ---- About ----

export async function getAbout(): Promise<About> {
  const doc = await sanityFetch<SanityAbout | null>(aboutQuery, {}, ["about"]);
  if (doc) return normalizeAbout(doc);
  return localAbout;
}

// ---- Site settings ----

function localSiteSettings(): SiteSettings {
  return {
    name: siteConfig.name,
    shortName: siteConfig.shortName,
    role: siteConfig.role,
    location: siteConfig.location,
    email: siteConfig.email,
    heroEyebrow: siteConfig.hero.eyebrow,
    heroHeadline: siteConfig.hero.headline,
    heroSubline: siteConfig.hero.subline,
    heroHighlight: siteConfig.hero.highlight,
    heroDescription: siteConfig.hero.description,
    heroImage: siteConfig.hero.image,
    heroImageAlt: siteConfig.hero.imageAlt,
    ctaText: siteConfig.hero.ctaText,
    ctaUrl: siteConfig.hero.ctaUrl,
    availability: siteConfig.availability,
    isAvailable: siteConfig.isAvailable,
    social: siteConfig.social,
    siteTitle: `${siteConfig.name} — ${siteConfig.title}`,
    siteDescription: siteConfig.description,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await sanityFetch<SanitySiteSettings | null>(siteSettingsQuery, {}, ["siteSettings"]);
  if (doc) {
    // Merge over local defaults so a partially-filled Sanity document
    // (e.g. an editor hasn't set social links yet) never blanks out
    // fields the site depends on.
    const fallback = localSiteSettings();
    const remote = normalizeSiteSettings(doc);
    return {
      ...fallback,
      ...remote,
      social: { ...fallback.social, ...remote.social },
    };
  }
  return localSiteSettings();
}

// ---- Testimonials ----

export async function getTestimonials(): Promise<Testimonial[]> {
  const docs = await sanityFetch<SanityTestimonial[]>(allTestimonialsQuery, {}, ["testimonial"]);
  return docs ? docs.map(normalizeTestimonial) : [];
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const docs = await sanityFetch<SanityTestimonial[]>(featuredTestimonialsQuery, {}, ["testimonial"]);
  return docs ? docs.map(normalizeTestimonial) : [];
}
