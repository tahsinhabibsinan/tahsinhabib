import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import AboutPreview from "@/components/sections/AboutPreview";
import Capabilities from "@/components/sections/Capabilities";
import LabPreview from "@/components/sections/LabPreview";
import JournalPreview from "@/components/sections/JournalPreview";
import ContactCTA from "@/components/sections/ContactCTA";
import { getFeaturedProjects, getFeaturedExperiments, getAllArticles } from "@/lib/content";

export default async function Home() {
  const [projects, experiments, articles] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedExperiments(),
    getAllArticles(),
  ]);

  return (
    <>
      <Hero />
      <Intro />
      <ProjectShowcase projects={projects} />
      <AboutPreview />
      <Capabilities />
      <LabPreview experiments={experiments} />
      <JournalPreview articles={articles} />
      <ContactCTA />
    </>
  );
}
