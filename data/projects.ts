import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "1",
    sortOrder: 1,
    title: "DesignHive BD",
    slug: "designhive-bd",
    year: "2026",
    publishedAt: "2026-01-01",
    category: "Web Platform",
    role: "Founder · Full-Stack Developer",
    services: ["Product Strategy", "Web Development", "Brand System"],
    technologies: ["Next.js", "Sanity CMS", "Cloudinary", "Tailwind CSS", "Node.js"],
    description:
      "A digital design agency built from the ground up — brand, storefront, and the systems behind it — offering web and graphic design services to clients across Bangladesh.",
    challenge:
      "Independent creative studios rarely have the tooling that larger agencies take for granted: a real content pipeline, a way to manage portfolio and pricing without redeploying, and a workflow clients can trust.",
    solution:
      "Built a schema-driven Next.js storefront on Sanity CMS with Cloudinary-backed media, an authenticated admin dashboard for portfolio, pricing, and testimonial management, and bilingual (Bangla/English) routing so the studio could speak to its actual market.",
    process:
      "Started as a static site with a hand-rolled Node/Express backend, then migrated in stages — first to a React SPA, then to Next.js with a proper CMS layer — each pass driven by what the studio actually needed to operate, not a rewrite for its own sake.",
    result:
      "A production storefront the studio runs day to day: portfolio and pricing update without a deploy, testimonials move through an approval queue, and the whole thing ships on Vercel.",
    thumbnail: "/images/projects/designhive-bd.svg",
    gallery: ["/images/projects/designhive-bd.svg"],
    liveUrl: "https://designhive-lac.vercel.app/en",
    githubUrl: undefined,
    featured: true,
  },
  {
    id: "2",
    sortOrder: 2,
    title: "Progoti Shikkha",
    slug: "progoti-shikkha",
    year: "2026",
    publishedAt: "2026-01-01",
    category: "Marketplace",
    role: "Founder · Product Engineer",
    services: ["Product Design", "Full-Stack Development", "Marketplace Architecture"],
    technologies: ["React", "Node.js", "REST APIs", "Role-Based Auth"],
    description:
      "A tuition marketplace connecting students with verified tutors across South Asia, with a mediated application flow instead of an open bidding free-for-all.",
    challenge:
      "Tuition marketplaces usually default to students choosing tutors directly, which invites mismatched expectations and unverified profiles. The market needed a model closer to how tuition actually gets arranged locally: a trusted intermediary matching supply to demand.",
    solution:
      "Designed a role-based platform where students post tuition requests, teachers apply against a unique tuition code, and admins mediate the final match — with dedicated dashboards for each role and a profile-completion gate before teachers can apply.",
    process:
      "Evolved from a single static page into a full React SPA, layering in email/Google/Facebook/phone authentication and the request-and-apply workflow that mirrors the real-world process it was replacing.",
    result:
      "A working marketplace core with the matching logic, authentication, and role-based dashboards in place — the foundation for the AI-assisted matching and recommendation features planned next.",
    thumbnail: "/images/projects/progoti-shikkha.svg",
    gallery: ["/images/projects/progoti-shikkha.svg"],
    liveUrl: "https://www.designhiveagency.com/",
    githubUrl: undefined,
    featured: true,
  },
  {
    id: "3",
    sortOrder: 3,
    title: "AI Matching Agent",
    slug: "ai-matching-agent",
    year: "2026",
    publishedAt: "2026-01-01",
    category: "AI Agent",
    role: "AI Engineer",
    services: ["Agent Design", "LLM Integration", "Systems Prototyping"],
    technologies: ["LLM APIs", "TypeScript", "Vector Search"],
    description:
      "An in-progress agent that reads tuition requests and tutor profiles to suggest matches an admin can approve in one click, instead of scanning applications by hand.",
    challenge:
      "As a marketplace grows, manual matching stops scaling — but full automation removes the human judgment that makes the platform trustworthy in the first place.",
    solution:
      "An assistive agent, not an autonomous one: it ranks and explains candidate matches in plain language, leaving the final call with the admin.",
    process:
      "Early-stage exploration connecting an LLM API to structured tutor and request data, with an emphasis on explainable output over black-box scoring.",
    result:
      "A working prototype informing how AI gets layered into the core product without replacing the trust model it depends on.",
    thumbnail: "/images/projects/ai-matching-agent.svg",
    gallery: ["/images/projects/ai-matching-agent.svg"],
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
  },
  {
    id: "4",
    sortOrder: 4,
    title: "Field Notes — AI Web Experiments",
    slug: "ai-web-experiments",
    year: "2025",
    publishedAt: "2025-01-01",
    category: "Experimental",
    role: "Creative Technologist",
    services: ["Prototyping", "Interface Exploration"],
    technologies: ["Next.js", "AI SDKs", "Edge Functions"],
    description:
      "A running set of small, shippable experiments exploring what AI-native interfaces feel like when the model is a collaborator in the interaction, not just a chat window bolted onto a page.",
    challenge:
      "Most 'AI features' are a chatbox pasted onto an existing product. The interesting problems are in the interaction model — when to show generated content, how to keep it editable, how to fail gracefully.",
    solution:
      "A lab of small, single-purpose builds, each testing one interaction idea end to end rather than a single monolithic demo.",
    process:
      "Ongoing — new experiments ship as they're built. See the Lab for the current set.",
    result:
      "A body of prototypes that directly inform product decisions on DesignHive BD and Progoti Shikkha.",
    thumbnail: "/images/projects/ai-web-experiments.svg",
    gallery: ["/images/projects/ai-web-experiments.svg"],
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index === 0 ? projects[projects.length - 1] : projects[index - 1];
  const next = index === projects.length - 1 ? projects[0] : projects[index + 1];
  return { prev, next };
}
