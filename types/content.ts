/**
 * Shared content types used across the frontend.
 *
 * These shapes are CMS-agnostic on purpose: `lib/content.ts` normalizes both
 * Sanity documents and the local `/data` fallback into exactly these types,
 * so components never need to know where the content came from.
 *
 * Image/video fields are always resolved, ready-to-render CDN URLs by the
 * time they reach a component (Cloudinary in production, local /public
 * paths in the zero-config fallback) — never raw Sanity asset refs.
 */

import type { PortableTextBlock } from "@portabletext/types";

export interface SEO {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  role: string;
  services: string[];
  technologies: string[];
  description: string;
  challenge: string;
  solution: string;
  process: string;
  result: string;
  thumbnail: string;
  gallery: string[];
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  sortOrder: number;
  publishedAt: string;
  seo?: SEO;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover: string;
  body: PortableTextBlock[];
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  seo?: SEO;
}

export interface Experiment {
  id: string;
  title: string;
  slug: string;
  description: string;
  technology: string[];
  image: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  sortOrder: number;
  publishedAt: string;
}

export interface TimelineItem {
  year: string;
  label: string;
  detail: string;
}

export interface About {
  name: string;
  headline: string;
  introduction: string;
  biography: PortableTextBlock[];
  profileImage: string;
  currentFocus: string[];
  timeline: TimelineItem[];
  capabilities: { label: string; detail: string }[];
  seo?: SEO;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

export interface SiteSettings {
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubline: string;
  heroHighlight: string;
  heroDescription: string;
  /** Resolved, ready-to-render portrait image URL for the homepage hero. Empty string when unset — components must handle the no-image case gracefully. */
  heroImage: string;
  heroImageAlt: string;
  ctaText: string;
  ctaUrl: string;
  availability: string;
  isAvailable: boolean;
  social: SocialLinks;
  siteTitle: string;
  siteDescription: string;
  ogImage?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  quote: string;
  rating?: number;
  featured: boolean;
  sortOrder: number;
}
