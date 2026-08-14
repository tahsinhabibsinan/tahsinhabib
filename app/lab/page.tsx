import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectImage from "@/components/ui/ProjectImage";
import Reveal from "@/components/animation/Reveal";
import { getAllExperiments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experimental projects and technical exploration from Tahsin Habib.",
};

export default async function LabPage() {
  const experiments = await getAllExperiments();

  return (
    <div className="px-6 py-32 md:px-10">
      <Reveal>
        <SectionHeading
          eyebrow="Lab"
          title="Experiments & technical exploration"
          description="Small, self-contained builds — each one testing a single idea end to end. Not every experiment ships, but every one teaches something the main projects use later."
        />
      </Reveal>

      <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
        {experiments.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 0.04}>
            <article className="group">
              <ProjectImage src={exp.image} alt={exp.title} />
              <h2 className="mt-4 text-xl font-medium">{exp.title}</h2>
              <p className="mt-2 text-sm text-muted">{exp.description}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                {exp.technology.join(" · ")}
              </p>
              {(exp.liveUrl || exp.githubUrl) && (
                <div className="mt-3 flex gap-4 text-xs">
                  {exp.liveUrl && (
                    <a
                      href={exp.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      Live ↗
                    </a>
                  )}
                  {exp.githubUrl && (
                    <a
                      href={exp.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
