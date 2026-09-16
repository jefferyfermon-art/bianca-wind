import type { MetadataRoute } from "next";

import { footerNav } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const lastModified = new Date();

  return footerNav.map((item) => ({
    url: item.href === "/" ? origin : `${origin}${item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
