import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/content";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/animation/SmoothScroll";
import CustomCursor from "@/components/animation/CustomCursor";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.siteTitle || `${settings.name} — ${siteConfig.title}`;
  const description = settings.siteDescription || siteConfig.description;
  const ogImage = settings.ogImage || "/og-image.png";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s — ${settings.name}`,
    },
    description,
    keywords: [
      settings.name,
      "developer",
      "designer",
      "AI engineer",
      "creative technologist",
      "Next.js developer",
      "AI agents",
    ],
    authors: [{ name: settings.name, url: siteConfig.url }],
    creator: settings.name,
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title,
      description,
      siteName: settings.name,
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: settings.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: siteConfig.url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: settings.name,
        url: siteConfig.url,
        jobTitle: settings.role,
        email: settings.email,
        sameAs: Object.values(settings.social).filter(Boolean),
      },
      {
        "@type": "WebSite",
        name: settings.name,
        url: siteConfig.url,
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <CustomCursor />
          <Navbar
            siteSettings={{
              shortName: settings.shortName,
              isAvailable: settings.isAvailable,
              availability: settings.availability,
            }}
          />
          <main id="main-content" className="flex-1 pt-[73px]">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
