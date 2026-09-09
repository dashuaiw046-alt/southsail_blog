import type { MetadataRoute } from "next";

import { getContent } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/articles", "/ctf", "/projects", "/about"].map(
    (path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified: new Date(),
    }),
  );

  const articles = getContent("articles").map((item) => ({
    url: `${site.url}/articles/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
  }));

  const writeups = getContent("ctf").map((item) => ({
    url: `${site.url}/ctf/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
  }));

  return [...staticRoutes, ...articles, ...writeups];
}
