import type { Experiment } from "@/types/content";

export const experiments: Experiment[] = [
  {
    id: "1",
    sortOrder: 1,
    publishedAt: "2026-01-01",
    gallery: [],
    title: "Local AI Assistant",
    slug: "local-ai-assistant",
    description:
      "A locally-run assistant for querying project docs and code without sending anything to a third-party API.",
    technology: ["Local LLM", "Node.js", "CLI"],
    image: "/images/lab/local-ai-assistant.svg",
    featured: true,
  },
  {
    id: "2",
    sortOrder: 2,
    publishedAt: "2026-02-01",
    gallery: [],
    title: "AI Web Agent",
    slug: "ai-web-agent",
    description:
      "An experimental agent that fills forms and navigates simple flows on a page from a natural-language instruction.",
    technology: ["Playwright", "LLM APIs"],
    image: "/images/lab/ai-web-agent.svg",
    featured: true,
  },
  {
    id: "3",
    sortOrder: 3,
    publishedAt: "2026-03-01",
    gallery: [],
    title: "Creative Coding Sketches",
    slug: "creative-coding",
    description: "Generative typography and motion studies built with GSAP and canvas.",
    technology: ["GSAP", "Canvas", "WebGL"],
    image: "/images/lab/creative-coding.svg",
    featured: true,
  },
  {
    id: "4",
    sortOrder: 4,
    publishedAt: "2026-04-01",
    gallery: [],
    title: "AI Website Generator",
    slug: "ai-website-generator",
    description:
      "A prototype that turns a short brief into a structured, editable page layout — the kind of tool that helped shape this site's own content pipeline.",
    technology: ["LLM APIs", "Next.js"],
    image: "/images/lab/ai-website-generator.svg",
    featured: true,
  },
  {
    id: "5",
    sortOrder: 5,
    publishedAt: "2026-05-01",
    gallery: [],
    title: "Computer Vision Sketchbook",
    slug: "computer-vision-sketchbook",
    description: "Small experiments in pose tracking and gesture-driven interfaces.",
    technology: ["TensorFlow.js", "MediaPipe"],
    image: "/images/lab/computer-vision.svg",
    featured: false,
  },
  {
    id: "6",
    sortOrder: 6,
    publishedAt: "2026-06-01",
    gallery: [],
    title: "Experimental Interfaces",
    slug: "experimental-interfaces",
    description: "Interaction studies that didn't make it into production — kept here because they were worth trying.",
    technology: ["React", "Framer Motion"],
    image: "/images/lab/experimental-interfaces.svg",
    featured: false,
  },
];

export function getFeaturedExperiments(): Experiment[] {
  return experiments.filter((e) => e.featured);
}
