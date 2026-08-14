import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder art is SVG; allow it through the optimizer with
    // a strict CSP so this stays safe if remote SVGs are ever added.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
