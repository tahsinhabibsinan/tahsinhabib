import Reveal from "@/components/animation/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAbout } from "@/lib/content";

export default async function Capabilities() {
  const about = await getAbout();

  return (
    <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <SectionHeading eyebrow="04 — Capabilities" title="What I bring to a project" />
      </Reveal>

      <div className="mt-14 grid gap-x-10 gap-y-0 md:grid-cols-2">
        {about.capabilities.map((cap, i) => (
          <Reveal key={cap.label} delay={i * 0.03}>
            <div className="flex gap-6 border-t border-border py-8">
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-medium">{cap.label}</h3>
                <p className="mt-2 max-w-sm text-sm text-muted">{cap.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
