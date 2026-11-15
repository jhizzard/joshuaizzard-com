import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://joshuaizzard.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter((p) => !p.draft);
  const newest = posts[0]?.date ? new Date(posts[0].date) : undefined;

  return [
    { url: SITE, lastModified: newest },
    { url: `${SITE}/blog`, lastModified: newest },
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : undefined,
    })),
  ];
}
