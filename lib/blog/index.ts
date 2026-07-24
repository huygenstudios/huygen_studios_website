import { BlogPost } from "./types";
import { localFallbackPosts } from "./local-posts";
import { getMarblePosts, getMarblePostBySlug } from "../marble/posts";
import { normalizeBlogSlug } from "./normalize";
import { isIndexableBlogPost } from "./quality";

type BlogPostQueryOptions = {
  fresh?: boolean;
  includeNeedsReview?: boolean;
};

export async function getBlogPosts(options: BlogPostQueryOptions = {}): Promise<BlogPost[]> {
  const apiKey = process.env.MARBLE_API_KEY;
  let cmsPosts: BlogPost[] = [];

  if (apiKey) {
    try {
      cmsPosts = await getMarblePosts({ fresh: options.fresh });
    } catch (err) {
      console.warn("Failed to retrieve posts from Marble CMS, falling back to local posts:", err);
    }
  }

  const seenSlugs = new Set(localFallbackPosts.map((post) => post.slug));
  const posts = [
    ...localFallbackPosts,
    ...cmsPosts.filter((post) => !seenSlugs.has(post.slug)),
  ].sort((a, b) => {
    const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bDate - aDate;
  });

  return options.includeNeedsReview ? posts : posts.filter(isIndexableBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const normalizedSlug = normalizeBlogSlug(slug);
  if (!normalizedSlug) return null;

  const localPost = localFallbackPosts.find((post) => post.slug === normalizedSlug);
  if (localPost) return localPost;

  const apiKey = process.env.MARBLE_API_KEY;
  if (!apiKey) return null;

  const post = await getMarblePostBySlug(normalizedSlug);
  if (post) return post;

  return null;
}

export { localFallbackPosts };
export { encodeBlogSlug, normalizeBlogSlug, normalizeCmsPost } from "./normalize";
export { countPostWords, getEditorialStatus, isIndexableBlogPost, isLegacyAutomatedNewsPost } from "./quality";
export {
  blogCategories,
  categorySlug,
  getCategoryBySlug,
  getEffectiveCategory,
  getPostsForCategory,
} from "./categories";
