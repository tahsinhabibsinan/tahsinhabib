import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animation/Reveal";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Contact",
    description: `Get in touch with ${settings.name} about a project or collaboration.`,
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const links = [
    { label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    settings.social.github && {
      label: "GitHub",
      value: settings.social.github.replace(/^https?:\/\/(www\.)?github\.com\//, "@"),
      href: settings.social.github,
    },
    settings.social.linkedin && {
      label: "LinkedIn",
      value: settings.social.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, ""),
      href: settings.social.linkedin,
    },
    settings.social.instagram && {
      label: "Instagram",
      value: settings.social.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@"),
      href: settings.social.instagram,
    },
  ].filter((l): l is { label: string; value: string; href: string } => Boolean(l));

  return (
    <div className="px-6 py-32 md:px-10">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Have an idea? Let's build something useful."
          description={`Currently ${settings.isAvailable ? "available for select projects" : "not taking new projects"}. Based in ${settings.location}, working with clients everywhere.`}
        />
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-0 md:grid-cols-2 md:max-w-2xl">
        {links.map((link, i) => (
          <Reveal key={link.label} delay={i * 0.05}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              data-cursor={link.href.startsWith("mailto:") ? "email" : "visit"}
              className="group flex items-baseline justify-between gap-4 border-t border-border py-6 first:border-t-0"
            >
              <span className="text-sm uppercase tracking-[0.15em] text-muted">
                {link.label}
              </span>
              <span className="text-lg font-medium transition-colors group-hover:text-accent">
                {link.value}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
