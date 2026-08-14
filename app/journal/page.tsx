import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animation/Reveal";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "Writing on process, product, and building with AI, from Tahsin Habib.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function JournalPage() {
  const articles = await getAllArticles();

  return (
    <div className="px-6 py-32 md:px-10">
      <Reveal>
        <SectionHeading eyebrow="Journal" title="Notes on process & product" />
      </Reveal>

      <div className="mt-14">
        {articles.map((article, i) => (
          <Reveal key={article.id} delay={i * 0.04}>
            <Link
              href={`/journal/${article.slug}`}
              className="group grid gap-2 border-t border-border py-10 first:border-t-0 md:grid-cols-[140px_1fr] md:items-baseline md:gap-10"
            >
              <span className="font-mono text-xs text-muted">
                {formatDate(article.publishedAt)}
              </span>
              <div>
                <h2 className="text-2xl font-medium transition-colors group-hover:text-accent md:text-3xl">
                  {article.title}
                </h2>
                <p className="mt-3 max-w-2xl text-muted">{article.excerpt}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                  {article.tags.join(" · ")}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
