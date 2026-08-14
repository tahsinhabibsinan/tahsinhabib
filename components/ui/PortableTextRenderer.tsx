import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { resolveImage } from "@/lib/sanity/image";
import type { SanityCloudinaryAsset } from "@/lib/sanity/types";

/**
 * Renders Sanity Portable Text (article bodies, the About biography) with
 * styling that matches the site's existing typography instead of the
 * library's unstyled defaults. Kept as one shared component so article and
 * about content render consistently.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 text-2xl font-medium leading-tight first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-medium leading-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-accent pl-6 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 ml-5 list-disc space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 ml-5 list-decimal space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noreferrer noopener" : undefined}
        className="underline underline-offset-4 hover:text-accent"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
    ),
  },
  types: {
    image: ({ value }: { value: SanityCloudinaryAsset }) => {
      const src = resolveImage(value, 1200);
      if (!src) return null;
      return (
        <span className="relative my-10 block aspect-[16/9] w-full overflow-hidden bg-white/5">
          <Image src={src} alt="" fill sizes="768px" className="object-cover" />
        </span>
      );
    },
    code: ({ value }: { value: { code?: string; language?: string } }) => (
      <pre className="my-8 overflow-x-auto rounded-md bg-white/5 p-4 font-mono text-sm leading-relaxed">
        <code>{value?.code}</code>
      </pre>
    ),
  },
};

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
