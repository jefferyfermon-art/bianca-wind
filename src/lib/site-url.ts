import { brand } from "@/content/site";

const DEV_URL = "http://localhost:3000";

/**
 * Resolve the canonical origin for absolute URLs (metadata, sitemap, robots).
 *
 * Order of preference:
 *   1. `brand.url`                     — a custom domain, once one is live
 *   2. `NEXT_PUBLIC_SITE_URL`          — explicit override
 *   3. `VERCEL_PROJECT_PRODUCTION_URL` — the stable production URL on Vercel
 *   4. localhost                       — local development
 */
export function getSiteUrl(): string {
  const candidate =
    brand.url ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);

  if (!candidate) return DEV_URL;

  const withProtocol = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  return withProtocol.replace(/\/+$/, "");
}
