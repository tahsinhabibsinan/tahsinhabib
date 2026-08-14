import type { About } from "@/types/content";
import { toPortableText } from "@/lib/portable-text-utils";
import { siteConfig } from "@/lib/site-config";

export const about: About = {
  name: siteConfig.name,
  headline: "Developer, designer, and AI engineer.",
  introduction:
    "I work across the full stack of building a digital product — the interface, the code underneath it, and increasingly, the AI that powers it.",
  biography: toPortableText(
    `I'm ${siteConfig.name}, based in ${siteConfig.location}. My work sits at the intersection of front-end engineering, product design, and applied AI — I care as much about how an interface feels as I do about what's running underneath it. Most of what I build starts as a real problem for a real user — a design studio that needs a working storefront, a tuition market that needs a trustworthy way to match students and tutors — rather than a technology looking for an application.`
  ),
  profileImage: "/images/profile/tahsin.svg",
  currentFocus: ["AI Engineering", "Applied LLM Product Design"],
  timeline: [
    {
      year: "Ongoing",
      label: "Founder, DesignHive BD",
      detail: "Digital design agency — web and graphic design, built and run end to end.",
    },
    {
      year: "Ongoing",
      label: "Founder, Progoti Shikkha",
      detail: "Tuition marketplace connecting students and tutors across South Asia.",
    },
    {
      year: "Current focus",
      label: "AI Engineering",
      detail: "Applying LLMs and agent design to real product problems, not demos.",
    },
  ],
  capabilities: [
    { label: "Web Development", detail: "Next.js, React, TypeScript — built for production, not demos." },
    { label: "UI/UX Design", detail: "Interfaces designed around how the product actually gets used." },
    { label: "AI Engineering", detail: "LLM integration, agent design, applied model tooling." },
    { label: "AI Agents", detail: "Assistive, explainable agents — not black-box automation." },
    { label: "Product Development", detail: "From a rough brief to something people rely on." },
    { label: "Creative Technology", detail: "Motion, generative interfaces, and interaction prototyping." },
  ],
};
