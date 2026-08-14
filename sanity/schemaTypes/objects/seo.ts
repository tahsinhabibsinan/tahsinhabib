import { defineField, defineType } from "sanity";
import { SearchIcon } from "@sanity/icons";

/**
 * Reusable SEO field group, attached to Project, Article, About, and
 * Site Settings. Every field is optional and falls back to the document's
 * own title/description/thumbnail on the frontend if left blank.
 */
export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      description: "Overrides the page title used for search engines and social sharing. Keep under ~60 characters.",
      validation: (Rule) => Rule.max(60).warning("Longer titles get truncated in search results."),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Overrides the meta description. Keep under ~155 characters.",
      validation: (Rule) => Rule.max(155).warning("Longer descriptions get truncated in search results."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "cloudinary.asset",
      description: "Used for Open Graph / Twitter cards. Falls back to the document's own image if left blank. Recommended 1200×630.",
    }),
  ],
});
