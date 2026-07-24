import { EDITORIAL_REVIEW_CUTOFF } from "../site";
import type { BlogPost } from "./types";

const LEGACY_NEWS_DATE_SUFFIX = /-(\d{4}-\d{2}-\d{2})$/;

function plainText(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function countPostWords(post: BlogPost): number {
  const text = plainText(post.contentHtml || post.contentMarkdown || "");
  return text ? text.split(/\s+/).length : 0;
}

export function isLegacyAutomatedNewsPost(post: BlogPost): boolean {
  if (post.id.startsWith("local-")) return false;

  const cutoff = process.env.LEGACY_NEWS_REVIEW_CUTOFF || EDITORIAL_REVIEW_CUTOFF;
  const publicationDate = post.publishedAt?.slice(0, 10);
  if (publicationDate && publicationDate <= cutoff) return true;

  const match = post.slug.match(LEGACY_NEWS_DATE_SUFFIX);
  if (!match) return false;

  return match[1] <= cutoff;
}

export function getEditorialStatus(post: BlogPost): "published" | "needs-review" {
  return isIndexableBlogPost(post) ? "published" : "needs-review";
}

export function isIndexableBlogPost(post: BlogPost): boolean {
  if (!post.slug || !post.title.trim() || !post.description.trim()) return false;
  if (isLegacyAutomatedNewsPost(post)) return false;

  const minimumWords = Number(process.env.MIN_INDEXABLE_BLOG_WORDS || 600);
  return countPostWords(post) >= minimumWords;
}
