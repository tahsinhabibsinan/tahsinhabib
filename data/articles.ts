import type { Article } from "@/types/content";
import { toPortableText } from "@/lib/portable-text-utils";

export const articles: Article[] = [
  {
    id: "1",
    title: "What I Learned Migrating DesignHive BD Onto a Real CMS",
    slug: "designhive-cms-migration",
    excerpt:
      "Three rewrites in, the lesson wasn't about the framework — it was about knowing what the studio actually needed to operate day to day.",
    cover: "/images/projects/designhive-bd.svg",
    body: toPortableText(
      "Full article content goes here. Connect Sanity via the Journal / Article schema to replace this local placeholder with real Portable Text content."
    ),
    publishedAt: "2026-07-20",
    tags: ["Next.js", "Sanity", "Case Study"],
    featured: true,
  },
  {
    id: "2",
    title: "Designing a Marketplace Where the Match Isn't Automatic",
    slug: "mediated-marketplace-design",
    excerpt:
      "Why Progoti Shikkha routes every tutor-student match through a human — and what that means for how AI gets introduced later.",
    cover: "/images/projects/progoti-shikkha.svg",
    body: toPortableText(
      "Full article content goes here. Connect Sanity via the Journal / Article schema to replace this local placeholder with real Portable Text content."
    ),
    publishedAt: "2026-06-14",
    tags: ["Product Design", "Marketplaces"],
    featured: false,
  },
  {
    id: "3",
    title: "Building AI Agents That Explain Themselves",
    slug: "explainable-ai-agents",
    excerpt:
      "Notes from prototyping an assistive matching agent — and why explainable output mattered more than raw accuracy.",
    cover: "/images/projects/ai-matching-agent.svg",
    body: toPortableText(
      "Full article content goes here. Connect Sanity via the Journal / Article schema to replace this local placeholder with real Portable Text content."
    ),
    publishedAt: "2026-05-02",
    tags: ["AI Engineering", "Agents"],
    featured: false,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
