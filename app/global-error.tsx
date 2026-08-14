"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center text-[#f5f5f5]">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a8a]">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-medium">
          {error.message || "An unexpected error occurred."}
        </h1>
        <button
          type="button"
          onClick={reset}
          className="mt-8 border-b border-[#f5f5f5] pb-1 text-lg font-medium"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
