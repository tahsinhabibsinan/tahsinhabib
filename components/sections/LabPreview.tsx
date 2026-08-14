import Link from "next/link";
import type { Experiment } from "@/types/content";
import Reveal from "@/components/animation/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectImage from "@/components/ui/ProjectImage";

export default function LabPreview({ experiments }: { experiments: Experiment[] }) {
  return (
    <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="05 — Lab"
          title="Experiments & technical exploration"
          description="Small, shippable builds that test one idea end to end — the raw material for later product decisions."
        />
        <Link
          href="/lab"
          className="mb-1 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          View the Lab <span aria-hidden="true">→</span>
        </Link>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {experiments.slice(0, 3).map((exp, i) => (
          <Reveal key={exp.id} delay={i * 0.05}>
            <article className="group">
              <ProjectImage src={exp.image} alt={exp.title} />
              <h3 className="mt-4 text-lg font-medium">{exp.title}</h3>
              <p className="mt-1 text-sm text-muted">{exp.technology.join(" · ")}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
