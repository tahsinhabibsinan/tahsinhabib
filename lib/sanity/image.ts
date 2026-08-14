/**
 * Resolves a `cloudinary.asset` object (as stored in Sanity via
 * sanity-plugin-cloudinary — see sanity/sanity.config.ts) into a
 * ready-to-render, optimized CDN URL. This is the seam between "Sanity
 * stores a reference" and "Cloudinary serves the bytes": everything
 * downstream of lib/content.ts just gets a plain string.
 */
import { cloudinaryImageUrl, cloudinaryVideoUrl } from "@/lib/cloudinary";
import type { SanityCloudinaryAsset } from "./types";

export function resolveImage(
  asset: SanityCloudinaryAsset | undefined | null,
  width?: number
): string {
  if (!asset?.public_id) return "";
  return cloudinaryImageUrl(asset.public_id, width ? { width } : {});
}

export function resolveImages(assets: SanityCloudinaryAsset[] | undefined | null): string[] {
  if (!assets) return [];
  return assets.map((asset) => resolveImage(asset)).filter(Boolean);
}

export function resolveVideo(asset: SanityCloudinaryAsset | undefined | null): string | undefined {
  if (!asset?.public_id) return undefined;
  // The Cloudinary Media Library records resource_type on upload/select —
  // trust it when present, but still resolve if a video was mistakenly
  // saved without one rather than silently dropping it.
  if (asset.resource_type && asset.resource_type !== "video") return undefined;
  return cloudinaryVideoUrl(asset.public_id);
}
