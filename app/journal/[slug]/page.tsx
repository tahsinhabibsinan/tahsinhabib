import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import ProjectImage from "@/components/ui/ProjectImage";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import Reveal from "@/components/animation/Reveal";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  const title = article.seo?.title ?? article.title;
  const description = article.seo?.description ?? article.excerpt;
  const canonical = `${siteConfig.url}/journal/${article.slug}`;
  const ogImage = article.seo?.ogImage ?? article.cover;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.cover || undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: article.author ? { "@type": "Person", name: article.author } : { "@type": "Person", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/journal/${article.slug}`,
  };

  return (
    <article className="px-6 py-32 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {formatDate(article.publishedAt)} · {article.tags.join(", ")}
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05]">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-muted">{article.excerpt}</p>
        </Reveal>

        {article.cover && (
          <Reveal delay={0.08} className="mt-12">
            <ProjectImage src={article.cover} alt={article.title} priority sizes="768px" />
          </Reveal>
        )}

        <Reveal delay={0.14} className="mt-12 max-w-none text-lg text-foreground/90">
          <PortableTextRenderer value={article.body} />
        </Reveal>
      </div>
    </article>
  );
}
