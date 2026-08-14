import Reveal from "@/components/animation/Reveal";

export default function Intro() {
  return (
    <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          01 — Intro
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-balance text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.25]">
            I&apos;m Tahsin — a developer, designer and AI engineer focused on
            building products that work in the real world, not just in a demo.
            I combine design, code and applied AI to take ideas from a rough
            brief to something people actually use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
