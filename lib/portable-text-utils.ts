import type { PortableTextBlock } from "@portabletext/types";

/**
 * Wraps a plain string into a single-paragraph Portable Text block. Used
 * only by the local /data fallback so Article.body can stay typed as
 * PortableTextBlock[] everywhere, even before Sanity is connected.
 */
export function toPortableText(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: "fallback",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "fallback-span", text, marks: [] }],
    },
  ];
}
