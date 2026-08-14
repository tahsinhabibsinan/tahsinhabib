import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import { requiredSlug, requiredTitle } from "./validation";

export default defineType({
  name: "article",
  title: "Journal Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta & SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: requiredTitle }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: requiredSlug,
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Shown on the Journal listing and used as the default SEO description.",
      validation: (Rule) => Rule.required().min(10).max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "cloudinary.asset",
      group: "content",
      description: "Click Browse to search, upload, or select an image from your Cloudinary Media Library.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) => Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        { type: "cloudinary.asset", title: "Image" },
        {
          type: "object",
          name: "code",
          title: "Code block",
          fields: [
            { name: "language", type: "string", title: "Language" },
            { name: "code", type: "text", title: "Code", rows: 10, validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: "language", subtitle: "code" },
          },
        },
      ],
    }),
    defineField({ name: "author", title: "Author", type: "string", group: "content", validation: (Rule) => Rule.max(80) }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "updatedAt", title: "Updated at", type: "datetime", group: "meta" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], group: "meta", validation: (Rule) => Rule.max(8) }),
    defineField({ name: "featured", title: "Featured", type: "boolean", group: "meta", initialValue: false }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "meta" }),
  ],
  orderings: [
    { title: "Published date, new to old", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "coverImage" },
  },
});
