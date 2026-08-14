import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required().max(120) }),
    defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.max(120) }),
    defineField({ name: "company", title: "Company", type: "string", validation: (Rule) => Rule.max(120) }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "cloudinary.asset",
      description: "Click Browse to search, upload, or select an image from your Cloudinary Media Library.",
    }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (Rule) => Rule.required().min(10).max(600) }),
    defineField({ name: "rating", title: "Rating (1–5)", type: "number", validation: (Rule) => Rule.integer().min(1).max(5) }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0, validation: (Rule) => Rule.integer() }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "quote", media: "avatar" },
  },
});
