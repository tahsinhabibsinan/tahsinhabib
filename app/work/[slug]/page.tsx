import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProjectBySlug, getAdjacentProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import ProjectImage from "@/components/ui/ProjectImage";
import Reveal from "@/components/animation/Reveal";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = project.seo?.title ?? project.title;
  const description = project.seo?.description ?? project.description;
  const canonical = `${siteConfig.url}/work/${project.slug}`;
  const ogImage = project.seo?.ogImage ?? project.thumbnail;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.thumbnail || undefined,
    datePublished: project.publishedAt,
    creator: { "@type": "Person", name: siteConfig.name },
    url: `${siteConfig.url}/work/${project.slug}`,
  };

  return (
    <article className="px-6 py-32 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{project.description}</p>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-1 text-sm text-muted">
          <span>{project.role}</span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Visit live site ↗
            </a>
          )}
        </Reveal>
      </header>

      <Reveal delay={0.1} className="mt-14">
        <ProjectImage src={project.thumbnail} alt={project.title} priority sizes="100vw" />
      </Reveal>

      <div className="mt-16 grid gap-14 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <div className="flex flex-col gap-8 text-sm">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.15em] text-muted">Services</p>
              <p>{project.services.join(", ")}</p>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.15em] text-muted">Technologies</p>
              <p>{project.technologies.join(", ")}</p>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-12">
          {[
            { label: "Challenge", body: project.challenge },
            { label: "Solution", body: project.solution },
            { label: "Process", body: project.process },
            { label: "Result", body: project.result },
          ].map((section, i) => (
            <Reveal key={section.label} delay={i * 0.04}>
              <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
                {section.label}
              </h2>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed">{section.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <nav className="mt-24 grid grid-cols-2 gap-6 border-t border-border pt-10">
        {prev && (
          <Link href={`/work/${prev.slug}`} className="group">
            <p className="text-xs uppercase tracking-[0.15em] text-muted">← Previous</p>
            <p className="mt-2 text-xl font-medium transition-colors group-hover:text-accent">
              {prev.title}
            </p>
          </Link>
        )}
        {next && (
          <Link href={`/work/${next.slug}`} className="group text-right">
            <p className="text-xs uppercase tracking-[0.15em] text-muted">Next →</p>
            <p className="mt-2 text-xl font-medium transition-colors group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        )}
      </nav>
    </article>
  );
}
