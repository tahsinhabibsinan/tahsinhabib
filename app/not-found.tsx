import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-start justify-center px-6 md:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-4 text-balance text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.05]">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&apos;re looking for may have moved or never existed. Head back to
        the homepage to keep exploring.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-lg font-medium transition-opacity hover:opacity-70"
      >
        Back to home <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
