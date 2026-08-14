import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";
import { requiredEmail, optionalHttpUrl } from "./validation";

/**
 * Singleton document — global identity, hero copy, contact info, social
 * links, and default SEO. Pinned to a single entry in structure.ts.
 */
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "contact", title: "Contact & Social" },
    { name: "seo", title: "Global SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", group: "identity", validation: (Rule) => Rule.required().max(120) }),
    defineField({ name: "shortName", title: "Short name", type: "string", group: "identity", description: "Used in the navbar logo.", validation: (Rule) => Rule.required().max(30) }),
    defineField({ name: "role", title: "Role / title", type: "string", group: "identity", validation: (Rule) => Rule.required().max(160) }),
    defineField({ name: "location", title: "Location", type: "string", group: "identity" }),
    defineField({ name: "email", title: "Email", type: "string", group: "identity", validation: requiredEmail }),

    defineField({
      name: "hero",
      title: "Hero section",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", description: "Small label above the headline." }),
        defineField({ name: "headline", title: "Headline — line 1", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subline", title: "Headline — line 2 (lead text)", type: "string" }),
        defineField({ name: "highlight", title: "Headline — highlighted text", type: "string", description: "Rendered in italic accent color at the end of line 2." }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        defineField({
          name: "image",
          title: "Hero portrait",
          type: "cloudinary.asset",
          description:
            "Large portrait/photo shown at the top of the homepage. Recommended: a vertical (portrait-orientation) photo, at least 1200×1500px. Leave empty to fall back to a text-only hero.",
        }),
        defineField({
          name: "imageAlt",
          title: "Hero portrait — alt text",
          type: "string",
          description: "Describe the photo for screen readers, e.g. \"Portrait of Tahsin Habib\". Falls back to the site name if left blank.",
        }),
        defineField({ name: "ctaText", title: "CTA text", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
      ],
    }),

    defineField({ name: "availabilityStatus", title: "Currently available", type: "boolean", group: "contact", initialValue: true }),
    defineField({ name: "availabilityText", title: "Availability text", type: "string", group: "contact", description: "Shown in the navbar and Contact page." }),
    defineField({
      name: "social",
      title: "Social links",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "github", title: "GitHub", type: "url", validation: optionalHttpUrl }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url", validation: optionalHttpUrl }),
        defineField({ name: "instagram", title: "Instagram", type: "url", validation: optionalHttpUrl }),
        defineField({ name: "twitter", title: "X / Twitter", type: "url", validation: optionalHttpUrl }),
        defineField({ name: "youtube", title: "YouTube", type: "url", validation: optionalHttpUrl }),
      ],
    }),

    defineField({
      name: "seo",
      title: "Global SEO defaults",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "siteTitle", title: "Default site title", type: "string" }),
        defineField({ name: "siteDescription", title: "Default site description", type: "text", rows: 3 }),
        defineField({ name: "ogImage", title: "Default social share image", type: "cloudinary.asset", description: "Recommended 1200×630." }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
