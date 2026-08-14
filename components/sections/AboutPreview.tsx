import Link from "next/link";
import Reveal from "@/components/animation/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const roles = ["Developer", "Designer", "AI Engineer", "Creative Technologist"];

export default function AboutPreview() {
  return (
    <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-14 md:grid-cols-2 md:gap-10">
        <Reveal>
          <SectionHeading eyebrow="03 — About" title="One person, four disciplines" />
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Read the full story <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="flex flex-col gap-4">
            {roles.map((role) => (
              <li
                key={role}
                className="border-b border-border pb-4 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium"
              >
                {role}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
