import Link from "next/link";
import { getSiteSettings } from "@/lib/content";

export default async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  const socialLinks = [
    { label: "GitHub", href: settings.social.github },
    { label: "LinkedIn", href: settings.social.linkedin },
    { label: "Instagram", href: settings.social.instagram },
    { label: "X", href: settings.social.twitter },
    { label: "YouTube", href: settings.social.youtube },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05]">
              Let&apos;s build something useful.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>

          <nav aria-label="Social links" className="flex gap-6 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.name}. All rights reserved.
          </p>
          <p>{settings.location}</p>
        </div>
      </div>
    </footer>
  );
}
