/**
 * Central configuration for personal/site information.
 * Change everything here — name, links, availability, SEO defaults —
 * without touching component code.
 */

export const siteConfig = {
  name: "Tahsin Habib",
  shortName: "Tahsin",
  title: "Developer, Designer & AI Engineer",
  tagline: "I build digital experiences with AI.",
  description:
    "Tahsin Habib is a developer, designer and AI engineer building digital experiences, intelligent web applications and AI-powered products.",
  role: "Developer · Designer · AI Engineer",
  location: "Dhaka, Bangladesh",
  availability: "Available for select projects",
  isAvailable: true,

  hero: {
    eyebrow: "Developer · Designer · AI Engineer",
    headline: "I build digital",
    subline: "experiences with",
    highlight: "AI.",
    description:
      "Tahsin Habib — building web products, interfaces and AI-powered tools from Dhaka, Bangladesh.",
    image:
      "https://res.cloudinary.com/xtfirntj/image/upload/f_auto,q_auto,w_960,h_1200,c_fill,g_face/v1786034069/progoti-shikkha/profiles/xngua5vraxzjn8lmi0u4.jpg",
    imageAlt: "Portrait of Tahsin Habib",
    ctaText: "Get in touch",
    ctaUrl: "/contact",
  },

  // Used for canonical URLs, sitemap, OpenGraph. Overridden by
  // NEXT_PUBLIC_SITE_URL in production — see .env.example.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  email: "hello@tahsinhabib.com",

  social: {
    github: "https://github.com/tahsinhabib",
    linkedin: "https://linkedin.com/in/tahsinhabib",
    instagram: "https://instagram.com/tahsinhabib",
  },

  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Lab", href: "/lab" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
