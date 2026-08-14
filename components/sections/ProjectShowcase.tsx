import Link from "next/link";
import type { Project } from "@/types/content";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animation/Reveal";

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <SectionHeading eyebrow="02 — Selected Work" title="Recent projects" />
      </Reveal>

      <div className="mt-14">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.04}>
            <ProjectCard project={project} index={i} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          View all work <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
