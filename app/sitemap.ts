import type { MetadataRoute } from "next";
import {
  blogCategories,
  encodeBlogSlug,
  getBlogPosts,
  getPostsForCategory,
} from "@/lib/blog";
import { SITE_URL, STATIC_PUBLIC_ROUTES } from "@/lib/site";

// Metadata routes are cached by default in Next.js 16. The CMS is external and
// publishes independently of application deployments, so the sitemap must be
// evaluated at request time. The Marble webhook also invalidates this path.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATIC_LAST_MODIFIED = new Date("2026-07-23T00:00:00.000Z");

function staticPriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/blog" || path === "/products" || path === "/services") return 0.9;
  if (path.startsWith("/services/") || path === "/products/capinsta") return 0.85;
  return 0.7;
}
function staticFrequency(
  path: string,
): "daily" | "weekly" | "monthly" | "yearly" {
  if (path === "/blog") return "daily";
  if (path === "/" || path === "/products" || path === "/services") return "weekly";
  if (
    path === "/privacy-policy" ||
    path === "/terms" ||
    path === "/disclaimer" ||
    path === "/cookie-policy"
  ) {
    return "yearly";
  }
  return "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PUBLIC_ROUTES.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: staticFrequency(path),
    priority: staticPriority(path),
  }));

  try {
    const posts = await getBlogPosts({ fresh: true });

    const categoryEntries: MetadataRoute.Sitemap = blogCategories
      .filter((category) => getPostsForCategory(posts, category.slug).length > 0)
      .map((category) => {
        const categoryPosts = getPostsForCategory(posts, category.slug);
        const newestUpdate = categoryPosts
          .map((post) => post.updatedAt || post.publishedAt)
          .filter((value): value is string => Boolean(value))
          .sort()
          .at(-1);

        return {
          url: `${SITE_URL}/blog/category/${category.slug}`,
          lastModified: newestUpdate ? new Date(newestUpdate) : STATIC_LAST_MODIFIED,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        };
      });

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
      const updated = post.updatedAt || post.publishedAt;
      const parsedUpdate = updated ? new Date(updated) : null;
      const lastModified =
        parsedUpdate && !Number.isNaN(parsedUpdate.getTime())
          ? parsedUpdate
          : STATIC_LAST_MODIFIED;

      return {
        url: `${SITE_URL}/blog/${encodeBlogSlug(post.slug)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        ...(post.coverImage?.url ? { images: [post.coverImage.url] } : {}),
      };
    });

    return [...staticEntries, ...categoryEntries, ...postEntries];
  } catch (error) {
    console.error("Failed to generate CMS sitemap entries:", error);
    return staticEntries;
  }
}
