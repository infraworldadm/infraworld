import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/reaed", 0.9, "weekly"],
    ["/build", 0.9, "monthly"],
    ["/wallet", 0.8, "monthly"],
    ["/balances", 0.6, "daily"],
    ["/privacy-policy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
  ];
  return pages.map(([p, priority, changeFrequency]) => ({ url: abs(p), lastModified: now, changeFrequency, priority }));
}
