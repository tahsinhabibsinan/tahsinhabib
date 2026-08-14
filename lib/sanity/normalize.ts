/**
 * Maps raw Sanity documents (lib/sanity/types.ts) onto the CMS-agnostic
 * shapes the app renders (types/content.ts) — resolving every Cloudinary
 * reference to a real URL along the way. lib/content.ts is the only caller.
 */
import type { Project, Article, Experiment, About, SiteSettings, Testimonial, SEO } from "@/types/content";
import type {
  SanityProject,
  SanityArticle,
  SanityExperiment,
  SanityAbout,
  SanitySiteSettings,
  SanityTestimonial,
  SanitySeo,
} from "./types";
import { resolveImage, resolveImages, resolveVideo } from "./image";

function normalizeSeo(seo?: SanitySeo): SEO | undefined {
  if (!seo) return undefined;
  return {
    title: seo.title,
    description: seo.description,
    ogImage: resolveImage(seo.ogImage) || undefined,
  };
}

export function normalizeProject(doc: SanityProject): Project {
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug.current,
    year: doc.year,
    category: doc.category,
    role: doc.role,
    services: doc.services ?? [],
    technologies: doc.technologies ?? [],
    description: doc.shortDescription,
    challenge: doc.challenge,
    solution: doc.solution,
    process: doc.process,
    result: doc.result,
    thumbnail: resolveImage(doc.thumbnail),
    gallery: resolveImages(doc.gallery),
    video: resolveVideo(doc.video),
    liveUrl: doc.liveUrl,
    githubUrl: doc.githubUrl,
    featured: doc.featured ?? false,
    sortOrder: doc.sortOrder ?? 0,
    publishedAt: doc.publishedAt ?? new Date().toISOString(),
    seo: normalizeSeo(doc.seo),
  };
}

export function normalizeArticle(doc: SanityArticle): Article {
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug.current,
    excerpt: doc.excerpt,
    cover: resolveImage(doc.coverImage),
    body: doc.body ?? [],
    author: doc.author,
    publishedAt: doc.publishedAt,
    updatedAt: doc.updatedAt,
    tags: doc.tags ?? [],
    featured: doc.featured ?? false,
    seo: normalizeSeo(doc.seo),
  };
}

export function normalizeExperiment(doc: SanityExperiment): Experiment {
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug.current,
    description: doc.description,
    technology: doc.technologies ?? [],
    image: resolveImage(doc.image),
    gallery: resolveImages(doc.gallery),
    liveUrl: doc.liveUrl,
    githubUrl: doc.githubUrl,
    featured: doc.featured ?? false,
    sortOrder: doc.sortOrder ?? 0,
    publishedAt: doc.publishedAt ?? new Date().toISOString(),
  };
}

export function normalizeAbout(doc: SanityAbout): About {
  return {
    name: doc.name,
    headline: doc.headline,
    introduction: doc.introduction,
    biography: doc.biography ?? [],
    profileImage: resolveImage(doc.profileImage),
    currentFocus: doc.currentFocus ?? [],
    timeline: doc.timeline ?? [],
    capabilities: doc.capabilities ?? [],
    seo: normalizeSeo(doc.seo),
  };
}

export function normalizeSiteSettings(doc: SanitySiteSettings): SiteSettings {
  return {
    name: doc.name,
    shortName: doc.shortName,
    role: doc.role,
    location: doc.location,
    email: doc.email,
    heroEyebrow: doc.hero?.eyebrow ?? doc.role,
    heroHeadline: doc.hero?.headline ?? "",
    heroSubline: doc.hero?.subline ?? "",
    heroHighlight: doc.hero?.highlight ?? "",
    heroDescription: doc.hero?.description ?? "",
    heroImage: resolveImage(doc.hero?.image),
    heroImageAlt: doc.hero?.imageAlt || `Portrait of ${doc.name}`,
    ctaText: doc.hero?.ctaText ?? "Get in touch",
    ctaUrl: doc.hero?.ctaUrl ?? "/contact",
    availability: doc.availabilityText ?? "Available for select projects",
    isAvailable: doc.availabilityStatus ?? true,
    social: {
      github: doc.social?.github,
      linkedin: doc.social?.linkedin,
      instagram: doc.social?.instagram,
      twitter: doc.social?.twitter,
      youtube: doc.social?.youtube,
    },
    siteTitle: doc.seo?.siteTitle ?? doc.name,
    siteDescription: doc.seo?.siteDescription ?? "",
    ogImage: resolveImage(doc.seo?.ogImage) || undefined,
  };
}

export function normalizeTestimonial(doc: SanityTestimonial): Testimonial {
  return {
    id: doc._id,
    name: doc.name,
    role: doc.role,
    company: doc.company,
    avatar: resolveImage(doc.avatar) || undefined,
    quote: doc.quote,
    rating: doc.rating,
    featured: doc.featured ?? false,
    sortOrder: doc.sortOrder ?? 0,
  };
}
