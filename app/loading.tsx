export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div
        aria-label="Loading"
        className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground motion-reduce:animate-none"
      />
    </div>
  );
}
