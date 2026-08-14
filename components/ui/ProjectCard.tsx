import Link from "next/link";
import type { Project } from "@/types/content";
import ProjectImage from "./ProjectImage";

interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: boolean;
}

export default function ProjectCard({ project, index, priority }: ProjectCardProps) {
  return (
    <article className="group border-t border-border py-14 first:border-t-0 md:py-20">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        {/* Metadata column */}
        <div className="flex flex-row items-baseline justify-between gap-4 md:col-span-4 md:flex-col md:items-start md:justify-start">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")} / {project.year}
          </span>

          <div>
            <Link
              href={`/work/${project.slug}`}
              data-cursor="view"
              className="block text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.05] transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">{project.category}</p>
          </div>

          <p className="hidden font-mono text-xs uppercase tracking-[0.15em] text-muted md:block">
            {project.technologies.slice(0, 4).join(" · ")}
          </p>

          <div className="hidden items-center gap-5 md:flex">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
            >
              Case study →
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
              >
                Live site ↗
              </a>
            )}
          </div>
        </div>

        {/* Large visual */}
        <Link
          href={`/work/${project.slug}`}
          data-cursor="view"
          className="block md:col-span-8"
        >
          <ProjectImage src={project.thumbnail} alt={project.title} priority={priority} />
        </Link>

        {/* Mobile-only actions (no hover dependency) */}
        <div className="flex items-center gap-5 md:hidden">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            {project.technologies.slice(0, 3).join(" · ")}
          </span>
        </div>
        <div className="flex items-center gap-5 md:hidden">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-foreground"
          >
            Case study →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted"
            >
              Live site ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
