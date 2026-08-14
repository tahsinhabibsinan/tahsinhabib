import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectImage from "@/components/ui/ProjectImage";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import Reveal from "@/components/animation/Reveal";
import { getAbout } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  return {
    title: "About",
    description: about.seo?.description ?? `About ${about.name} — ${about.headline}`,
  };
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="px-6 py-32 md:px-10">
      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        <Reveal>
          <SectionHeading eyebrow="About" title={about.headline} description={about.introduction} />
          <div className="mt-10 flex flex-col gap-4 text-base leading-relaxed text-muted">
            <PortableTextRenderer value={about.biography} />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ProjectImage src={about.profileImage} alt={about.name} priority />
        </Reveal>
      </div>

      <div className="mt-24">
        <Reveal>
          <SectionHeading eyebrow="Currently" title="What I'm building" />
        </Reveal>
        <div className="mt-10">
          {about.timeline.map((item, i) => (
            <Reveal key={`${item.label}-${i}`} delay={i * 0.05}>
              <div className="grid gap-2 border-t border-border py-8 first:border-t-0 md:grid-cols-[160px_1fr] md:gap-10">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-xl font-medium">{item.label}</h3>
                  <p className="mt-2 max-w-xl text-sm text-muted">{item.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
