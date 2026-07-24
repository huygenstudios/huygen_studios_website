import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog";
import { encodeBlogSlug } from "@/lib/blog/normalize";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = "https://www.huygenstudios.com";
const SITE_NAME = "Huygen Studios Blog";
const SITE_DESCRIPTION =
  "Practical insights on AI systems, automation workflows, voice agents, cinematic web strategy, and technical implementations.";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts = await getBlogPosts({ fresh: true }).catch(() => []);
  // Sort by published date descending, most recent first
  posts = posts
    .filter((p) => p && p.slug && p.publishedAt)
    .sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return db - da;
    })
    .slice(0, 50); // RSS readers typically only want the latest N items

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${encodeBlogSlug(post.slug)}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date().toUTCString();
      const title = escapeXml(post.title || "Untitled Article");
      const description = escapeXml(post.description || "");
      const author = escapeXml(post.authors[0]?.name || "Huygen Team");
      const category = escapeXml(post.category?.name || "AI Automation");

      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <author>hello@huygenstudios.com (${author})</author>
      <category>${category}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/Huygen%20Studios%20logo%20Black%20horizontal.png</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}/blog</link>
    </image>${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=UTF-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
