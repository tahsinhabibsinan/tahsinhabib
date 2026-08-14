import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

/**
 * Singleton document — the Studio structure (structure.ts) pins this to
 * one editable entry rather than letting editors create multiple About
 * pages.
 */
export default defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: UserIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "timeline", title: "Timeline & Capabilities" },
    { name: "meta", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", group: "content", validation: (Rule) => Rule.required().max(120) }),
    defineField({ name: "headline", title: "Headline", type: "string", group: "content", validation: (Rule) => Rule.required().max(160) }),
    defineField({ name: "introduction", title: "Introduction", type: "text", rows: 3, group: "content" }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "cloudinary.asset",
      group: "content",
      description: "Click Browse to search, upload, or select an image from your Cloudinary Media Library.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "currentFocus", title: "Current focus", type: "array", of: [{ type: "string" }], group: "content" }),

    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      group: "timeline",
      description: "Shown in the 'What I'm building' section of the About page.",
      of: [
        {
          type: "object",
          name: "timelineItem",
          fields: [
            { name: "year", type: "string", title: "Year / label", validation: (Rule) => Rule.required() },
            { name: "label", type: "string", title: "Title", validation: (Rule) => Rule.required() },
            { name: "detail", type: "text", title: "Detail", rows: 2 },
          ],
          preview: { select: { title: "label", subtitle: "year" } },
        },
      ],
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      group: "timeline",
      description: "Shown in the homepage 'What I bring to a project' section.",
      of: [
        {
          type: "object",
          name: "capability",
          fields: [
            { name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() },
            { name: "detail", type: "text", title: "Detail", rows: 2 },
          ],
          preview: { select: { title: "label", subtitle: "detail" } },
        },
      ],
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      group: "timeline",
      of: [
        {
          type: "object",
          name: "experienceItem",
          fields: [
            { name: "role", type: "string", title: "Role" },
            { name: "org", type: "string", title: "Organization" },
            { name: "period", type: "string", title: "Period" },
            { name: "detail", type: "text", title: "Detail", rows: 2 },
          ],
          preview: { select: { title: "role", subtitle: "org" } },
        },
      ],
    }),
    defineField({ name: "skills", title: "Skills", type: "array", of: [{ type: "string" }], group: "timeline" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "meta" }),
  ],
  preview: {
    select: { title: "name", subtitle: "headline", media: "profileImage" },
  },
});
