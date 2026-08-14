/**
 * Cloudinary URL builder.
 *
 * Sanity stores only a Cloudinary `publicId` (plus a few known-at-upload-time
 * fields like width/height/format) — the actual bytes live on Cloudinary's
 * CDN. This module is the single place that turns a publicId into an
 * optimized, responsive delivery URL. Components and pages never construct
 * Cloudinary URLs by hand.
 *
 * Only `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is needed for delivery URLs —
 * Cloudinary's fetch/delivery API is public by design (it's a CDN). Any
 * Cloudinary API secret (used only by an upload workflow, never by the
 * website) must stay server-only and is intentionally not referenced here.
 */

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  crop?: "fill" | "fit" | "scale" | "thumb" | "crop";
  gravity?: "auto" | "face" | "center";
}

/**
 * Builds a delivery URL for a Cloudinary image publicId.
 * Falls back to returning the publicId unchanged if it is already a full
 * URL (useful for local/placeholder content that hasn't been migrated yet).
 */
export function cloudinaryImageUrl(
  publicId: string | undefined | null,
  options: CloudinaryTransformOptions = {}
): string {
  if (!publicId) return "";
  if (publicId.startsWith("http://") || publicId.startsWith("https://") || publicId.startsWith("/")) {
    // Already a resolved URL (local /public asset or external URL) — pass through.
    return publicId;
  }
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn(
      "[cloudinary] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set; cannot resolve publicId:",
      publicId
    );
    return "";
  }

  const { width, height, quality = "auto", format = "auto", crop = "fill", gravity = "auto" } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    crop && `c_${crop}`,
    width && `w_${width}`,
    height && `h_${height}`,
    (width || height) && gravity && `g_${gravity}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

/** Builds a delivery URL for a Cloudinary-hosted video publicId. */
export function cloudinaryVideoUrl(
  publicId: string | undefined | null,
  options: { quality?: "auto" | number; format?: "auto" | "mp4" | "webm" } = {}
): string {
  if (!publicId) return "";
  if (publicId.startsWith("http://") || publicId.startsWith("https://") || publicId.startsWith("/")) {
    return publicId;
  }
  if (!CLOUDINARY_CLOUD_NAME) return "";
  const { quality = "auto", format = "auto" } = options;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_${format},q_${quality}/${publicId}`;
}

/** Generates a responsive `sizes`-friendly srcSet for common breakpoints. */
export function cloudinarySrcSet(
  publicId: string | undefined | null,
  widths: number[] = [480, 768, 1024, 1440, 1920]
): string {
  if (!publicId || !CLOUDINARY_CLOUD_NAME) return "";
  if (publicId.startsWith("http") || publicId.startsWith("/")) return "";
  return widths
    .map((w) => `${cloudinaryImageUrl(publicId, { width: w })} ${w}w`)
    .join(", ");
}
