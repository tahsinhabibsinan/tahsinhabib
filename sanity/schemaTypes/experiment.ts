import { defineField, defineType } from "sanity";
import { RocketIcon } from "@sanity/icons";
import { requiredSlug, requiredTitle, optionalHttpUrl } from "./validation";

export default defineType({
  name: "experiment",
  title: "Lab Experiment",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: requiredTitle }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: requiredSlug,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(280),
    }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "image",
      title: "Image",
      type: "cloudinary.asset",
      description: "Click Browse to search, upload, or select an image from your Cloudinary Media Library.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "cloudinary.asset" }] }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url", validation: optionalHttpUrl }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url", validation: optionalHttpUrl }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0, validation: (Rule) => Rule.integer() }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required() }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});
