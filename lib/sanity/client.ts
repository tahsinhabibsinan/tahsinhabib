/**
 * Sanity client.
 *
 * Reads are unauthenticated (public dataset, CDN-backed) and safe to run at
 * build time and on the edge. No token is required for read-only queries
 * against a public dataset, so nothing here needs a secret to work.
 *
 * `SANITY_API_TOKEN` is optional and only used if you later add previews
 * or authenticated writes — it is never bundled into client code because
 * this file only ever runs on the server (Server Components / build time).
 */
import { createClient, type ClientConfig } from "@sanity/client";

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";

export function isSanityConfigured(): boolean {
  return Boolean(SANITY_PROJECT_ID && SANITY_DATASET);
}

/**
 * Controls what happens when a configured Sanity fetch fails (network
 * error, bad dataset, temporary outage).
 *
 *  - false (default): log the failure loudly, then fall back to local
 *    /data content so the site stays up. Safe default for a personal
 *    portfolio where uptime matters more than catching a stale-content
 *    edge case immediately.
 *  - true: re-throw instead of falling back. A Sanity outage then fails
 *    the request (and, for statically-generated pages, fails the Vercel
 *    build outright) instead of silently serving old fallback content
 *    indefinitely — the failure shows up in Vercel's build/function logs
 *    right away. Set SANITY_STRICT_MODE=true to enable.
 */
export const SANITY_STRICT_MODE = process.env.SANITY_STRICT_MODE === "true";

const config: ClientConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  // Read from the CDN in production for speed; go direct to the API in
  // development so content edits show up immediately without waiting on
  // CDN propagation.
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  token: process.env.SANITY_API_TOKEN,
};

/**
 * Lazily-created singleton. Only call this when `isSanityConfigured()` is
 * true — constructing a client without a projectId throws.
 */
let _client: ReturnType<typeof createClient> | null = null;

export function sanityClient() {
  if (!isSanityConfigured()) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET."
    );
  }
  if (!_client) {
    _client = createClient(config);
  }
  return _client;
}

/**
 * Fetch helper with configurable failure handling — see SANITY_STRICT_MODE
 * above. Either way, every failure is logged loudly (not swallowed) so it
 * shows up in Vercel's logs regardless of which mode is active.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T | null> {
  if (!isSanityConfigured()) return null;
  try {
    const client = sanityClient();
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(
      `[sanity] fetch failed (tags: ${tags.join(", ") || "none"}): ${reason}`,
      SANITY_STRICT_MODE
        ? "SANITY_STRICT_MODE is on — re-throwing instead of falling back to local content."
        : "Falling back to local content. Set SANITY_STRICT_MODE=true to make this fail loudly instead."
    );
    if (SANITY_STRICT_MODE) {
      throw error instanceof Error ? error : new Error(reason);
    }
    return null;
  }
}
