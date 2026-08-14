import type { Metadata } from "next";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animation/Reveal";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from Tahsin Habib — web platforms, marketplaces, and AI-powered products.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <div className="px-6 py-32 md:px-10">
      <Reveal>
        <SectionHeading eyebrow="Work" title="Everything I've shipped" />
      </Reveal>

      <div className="mt-14">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.04}>
            <ProjectCard project={project} index={i} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
