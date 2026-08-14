"use client";

/**
 * App Router error boundary. Under normal operation this never renders —
 * it only appears if a page throws, which happens by design when
 * SANITY_STRICT_MODE=true and a Sanity request fails (see
 * lib/sanity/client.ts). Kept minimal and on-brand rather than showing
 * Next's default error screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">Something went wrong</p>
      <h1 className="mt-4 max-w-lg text-2xl font-medium">
        This page couldn&apos;t load its content.
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "Please try again in a moment."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
      >
        Try again
      </button>
    </div>
  );
}
