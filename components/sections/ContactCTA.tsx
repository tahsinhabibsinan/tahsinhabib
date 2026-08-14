import Link from "next/link";
import Reveal from "@/components/animation/Reveal";

export default function ContactCTA() {
  return (
    <section className="border-t border-border px-6 py-28 text-center md:px-10 md:py-40">
      <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        07 — Contact
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mx-auto mt-6 max-w-4xl text-balance text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[1]">
          Have an idea? Let&apos;s build something useful.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <Link
          href="/contact"
          data-cursor="view"
          className="mt-10 inline-flex items-center gap-3 border-b border-foreground pb-1 text-lg font-medium transition-opacity hover:opacity-70"
        >
          Get in touch <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
