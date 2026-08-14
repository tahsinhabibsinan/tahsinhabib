import Link from "next/link";
import type { Article } from "@/types/content";
import Reveal from "@/components/animation/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function JournalPreview({ articles }: { articles: Article[] }) {
  return (
    <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="06 — Journal" title="Writing on process & product" />
        <Link
          href="/journal"
          className="mb-1 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          Read the journal <span aria-hidden="true">→</span>
        </Link>
      </Reveal>

      <div className="mt-14">
        {articles.slice(0, 3).map((article, i) => (
          <Reveal key={article.id} delay={i * 0.04}>
            <Link
              href={`/journal/${article.slug}`}
              className="group grid gap-2 border-t border-border py-8 first:border-t-0 md:grid-cols-[120px_1fr] md:items-baseline md:gap-10"
            >
              <span className="font-mono text-xs text-muted">
                {formatDate(article.publishedAt)}
              </span>
              <div>
                <h3 className="text-xl font-medium transition-colors group-hover:text-accent md:text-2xl">
                  {article.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-muted">{article.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
