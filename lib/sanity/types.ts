/**
 * Raw Sanity document shapes, as returned by GROQ (see queries.ts).
 * These mirror the schemas in /sanity/schemaTypes and are only used inside
 * lib/sanity — everything else in the app consumes the normalized types in
 * /types/content.ts. Keeping the two separate means a Sanity schema change
 * never leaks into every component that renders content.
 */
import type { PortableTextBlock } from "@portabletext/types";

/**
 * Shape of the `cloudinary.asset` object type registered by
 * sanity-plugin-cloudinary (see sanity/sanity.config.ts). Editors select
 * this through the Cloudinary Media Library widget inside the Studio —
 * public_id, dimensions, and format are captured automatically, no manual
 * entry. Only the fields this app actually reads are declared here.
 */
export interface SanityCloudinaryAsset {
  _type: "cloudinary.asset";
  public_id: string;
  secure_url?: string;
  resource_type?: "image" | "video" | "raw";
  format?: string;
  width?: number;
  height?: number;
}

export interface SanitySeo {
  title?: string;
  description?: string;
  ogImage?: SanityCloudinaryAsset;
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  year: string;
  category: string;
  role: string;
  services?: string[];
  technologies?: string[];
  shortDescription: string;
  challenge: string;
  solution: string;
  process: string;
  result: string;
  thumbnail: SanityCloudinaryAsset;
  gallery?: SanityCloudinaryAsset[];
  video?: SanityCloudinaryAsset;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  sortOrder?: number;
  publishedAt?: string;
  seo?: SanitySeo;
}

export interface SanityArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: SanityCloudinaryAsset;
  body: PortableTextBlock[];
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  featured?: boolean;
  seo?: SanitySeo;
}

export interface SanityExperiment {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  technologies?: string[];
  image: SanityCloudinaryAsset;
  gallery?: SanityCloudinaryAsset[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  sortOrder?: number;
  publishedAt?: string;
}

export interface SanityAbout {
  _id: string;
  name: string;
  headline: string;
  introduction: string;
  biography: PortableTextBlock[];
  profileImage: SanityCloudinaryAsset;
  currentFocus?: string[];
  timeline?: { year: string; label: string; detail: string }[];
  capabilities?: { label: string; detail: string }[];
  experience?: { role: string; org: string; period: string; detail?: string }[];
  skills?: string[];
  seo?: SanitySeo;
}

export interface SanitySiteSettings {
  _id: string;
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  hero?: {
    eyebrow?: string;
    headline?: string;
    subline?: string;
    highlight?: string;
    description?: string;
    image?: SanityCloudinaryAsset;
    imageAlt?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  availabilityStatus?: boolean;
  availabilityText?: string;
  social?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  seo?: {
    siteTitle?: string;
    siteDescription?: string;
    ogImage?: SanityCloudinaryAsset;
  };
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: SanityCloudinaryAsset;
  quote: string;
  rating?: number;
  featured?: boolean;
  sortOrder?: number;
}
