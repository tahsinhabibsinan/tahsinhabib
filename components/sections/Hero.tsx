import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/content";
import Reveal from "@/components/animation/Reveal";
import { cn } from "@/lib/cn";

/**
 * Homepage hero. Renders a large portrait beside/above the headline when
 * one is configured in Sanity (Site Settings → Hero → Hero portrait) or in
 * the local /data fallback (lib/site-config.ts). With no image configured
 * it degrades to a clean, text-only hero — the image is an enhancement,
 * never a requirement, so a half-filled CMS document can't break the page.
 */
export default async function Hero() {
  const settings = await getSiteSettings();
  const hasImage = Boolean(settings.heroImage);
  const hasCta = Boolean(settings.ctaText && settings.ctaUrl);

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24">
      <Reveal as="p" className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {settings.heroEyebrow}
      </Reveal>

      <div
        className={cn(
          hasImage && "grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-14 lg:gap-20"
        )}
      >
        {hasImage && (
          <Reveal
            delay={0.05}
            y={32}
            className="group relative order-1 aspect-[4/5] w-full overflow-hidden border border-border bg-white/5 sm:aspect-[16/11] md:order-2 md:aspect-[4/5]"
          >
            <Image
              src={settings.heroImage}
              alt={settings.heroImageAlt}
              fill
              priority
              sizes="(min-width: 768px) 44vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 border border-border/80 bg-background/60 px-3 py-1.5 backdrop-blur-sm">
              {settings.isAvailable && (
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground">
                {settings.role}
              </span>
            </div>
          </Reveal>
        )}

        <div className={cn(hasImage && "order-2 md:order-1")}>
          <Reveal delay={0.1}>
            <h1
              className={cn(
                "text-balance font-medium leading-[0.95]",
                hasImage
                  ? "text-[clamp(2.5rem,7.5vw,6rem)]"
                  : "text-[clamp(2.75rem,10vw,9rem)]"
              )}
            >
              {settings.heroHeadline}
              <br />
              {settings.heroSubline}{" "}
              <span className="italic text-accent">{settings.heroHighlight}</span>
            </h1>
          </Reveal>

          <Reveal
            delay={0.2}
            className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          >
            <p className="max-w-sm text-base text-muted">{settings.heroDescription}</p>
            {hasCta && (
              <Link
                href={settings.ctaUrl}
                className="group inline-flex shrink-0 items-center gap-2 border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {settings.ctaText}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            )}
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 text-muted md:right-10 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-14 w-px bg-border" />
      </div>
    </section>
  );
}
