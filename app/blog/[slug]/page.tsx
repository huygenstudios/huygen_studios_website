import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";

function sanitizeHtmlSimple(html: string): string {
  if (!html) return "";
  
  // Remove script, iframe, object, embed tags and their contents
  let clean = html.replace(/<(script|iframe|object|embed)\b[^>]*>([\s\S]*?)<\/\1>/gi, "");
  // Clean unclosed/empty/self-closing tags
  clean = clean.replace(/<(script|iframe|object|embed)\b[^>]*\/?>/gi, "");

  // Remove event handlers like onload, onerror, onclick, etc.
  clean = clean.replace(/\b(on[a-z]+)\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, "");

  // Remove style attribute
  clean = clean.replace(/\bstyle\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, "");

  // Remove javascript: pseudo-protocol in href/src
  clean = clean.replace(/href\s*=\s*["']\s*javascript:[^"']*["']/gi, 'href="#"');
  clean = clean.replace(/src\s*=\s*["']\s*javascript:[^"']*["']/gi, 'src=""');

  return clean;
}
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { encodeBlogSlug, getBlogPosts, getBlogPostBySlug, normalizeBlogSlug } from "@/lib/blog";
import { BlogPost } from "@/lib/blog/types";
import { SafeBlogCoverImage } from "@/components/blog/SafeBlogCoverImage";
import {
  getEditorialStatus,
  getEffectiveCategory,
} from "@/lib/blog";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeBlogSlug(rawSlug);
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};

    const title = post.title || "Untitled Article";
    const description = post.description || "";
    const publishedTime = post.publishedAt || undefined;
    const modifiedTime = post.updatedAt || publishedTime;
    const authorName = post.authors[0]?.name || "Huygen Team";

    // Handle OpenGraph image safely
    const coverImageUrl = post.coverImage?.url || null;
    const ogImages = coverImageUrl ? [{ url: coverImageUrl }] : [];
    const canonicalSlug = encodeBlogSlug(post.slug || slug);
    const editorialStatus = getEditorialStatus(post);

    return {
      title,
      description,
      alternates: { canonical: `/blog/${canonicalSlug}` },
      robots:
        editorialStatus === "published"
          ? { index: true, follow: true }
          : { index: false, follow: true, nocache: true },
      openGraph: {
        title,
        description,
        url: `https://www.huygenstudios.com/blog/${canonicalSlug}`,
        type: "article",
        publishedTime,
        modifiedTime,
        authors: [authorName],
        images: ogImages,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(ogImages.length > 0 ? { images: [ogImages[0].url] } : {}),
        creator: "@huygenstudios",
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Failed to generate metadata for blog slug ${slug}:`, error);
    }
    return {};
  }
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug: rawSlug } = await params;
  const slug = normalizeBlogSlug(rawSlug);
  
  let post: BlogPost | null = null;
  try {
    post = await getBlogPostBySlug(slug);
  } catch (error) {
    console.error("Error loading blog post page", {
      slug,
      error,
    });
    throw error;
  }

  if (!post) {
    notFound();
  }

  // Get all posts to find related ones — prefer same category, then other posts
  let relatedPosts: BlogPost[] = [];
  try {
    const allPosts = await getBlogPosts();
    const otherPosts = allPosts.filter((p) => p && p.slug && p.slug !== slug);
    const sameCategory = otherPosts.filter(
      (p) => p.category?.name && p.category.name === post.category?.name
    );
    const different = otherPosts.filter(
      (p) => !sameCategory.some((s) => s.slug === p.slug)
    );
    relatedPosts = [...sameCategory, ...different].slice(0, 2);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to load related posts:", error);
    }
  }

  // Compile and sanitize content HTML server-side safely
  let rawContentHtml = "";
  if (post.contentHtml) {
    rawContentHtml = post.contentHtml;
  } else if (post.contentMarkdown) {
    rawContentHtml = String(marked.parse(post.contentMarkdown));
  }

  // Clean raw HTML to demote h1 to h2
  const cleanedHtml = rawContentHtml
    ? rawContentHtml
        .replace(/<h1\b([^>]*)>/gi, "<h2$1>")
        .replace(/<\/h1>/gi, "</h2>")
    : "";

  const sanitizedContentHtml = sanitizeHtmlSimple(cleanedHtml).replace(
    /<a\s+([^>]*href=["']https?:\/\/(?![^"']*huygenstudios\.com)[^>]+)>/gi,
    (match) => match.includes(" rel=") ? match : match.replace("<a ", '<a rel="noopener noreferrer" ')
  );

  // JSON-LD structured data for article indexation
  const authorName = post.authors[0]?.name || "Huygen Team";
  const title = post.title || "Untitled Article";
  const description = post.description || "";
  const publishedAt = post.publishedAt || undefined;
  const updatedAt = post.updatedAt || publishedAt;
  const canonicalSlug = encodeBlogSlug(post.slug || slug);
  const editorialStatus = getEditorialStatus(post);
  const effectiveCategory = getEffectiveCategory(post);
  const categoryName = effectiveCategory.name;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": publishedAt,
    "dateModified": updatedAt,
    "articleSection": categoryName,
    "isAccessibleForFree": true,
    "author": {
      "@type": "Organization",
      "@id": "https://www.huygenstudios.com/#organization",
      "name": authorName,
      "url": "https://www.huygenstudios.com/authors/huygen-studios-editorial-team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Huygen Studios",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.huygenstudios.com/Huygen%20Studios%20logo%20Black%20horizontal.png",
        "width": 2048,
        "height": 682
      }
    },
    "editor": {
      "@type": "Organization",
      "name": "Huygen Studios Editorial Team",
      "url": "https://www.huygenstudios.com/authors/huygen-studios-editorial-team"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.huygenstudios.com/blog/${canonicalSlug}`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.huygenstudios.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.huygenstudios.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryName,
        "item": `https://www.huygenstudios.com/blog/category/${effectiveCategory.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": title,
        "item": `https://www.huygenstudios.com/blog/${canonicalSlug}`
      }
    ]
  };

  // Safe date parsing
  let formattedDate = "";
  let formattedUpdatedDate = "";
  try {
    if (post.publishedAt) {
      const d = new Date(post.publishedAt);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric", 
          year: "numeric" 
        });
      }
    }
  } catch {
    // Ignore invalid date
  }
  try {
    if (post.updatedAt && post.updatedAt !== post.publishedAt) {
      const d = new Date(post.updatedAt);
      if (!isNaN(d.getTime())) {
        formattedUpdatedDate = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
      }
    }
  } catch {
    // Ignore invalid date
  }

  // Safe image url
  const coverImage = post.coverImage;
  return (
    <SecondaryPageLayout>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="chapter">
        <div className="shell">
          <div className="mb-8">
            <Link href="/blog" className="text-sm font-mono text-[#93969e] hover:text-[#4a79ff] transition-colors">
              &larr; Back to Blog Catalog
            </Link>
          </div>

          <header className="max-w-[900px] mb-12">
            <div className="flex gap-4 items-center text-xs text-[#93969e] font-mono mb-4">
              {formattedDate && (
                <>
                  <span>{formattedDate}</span>
                  <span>•</span>
                </>
              )}
              {formattedUpdatedDate && (
                <>
                  <span>Updated {formattedUpdatedDate}</span>
                  <span>â€¢</span>
                </>
              )}
              {post.readingTime && (
                <>
                  <span>{post.readingTime}</span>
                  <span>•</span>
                </>
              )}
              <Link
                href={`/blog/category/${effectiveCategory.slug}`}
                className="hover:text-white transition-colors"
              >
                Category: {categoryName}
              </Link>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-6">
              {title}
            </h1>
            {description && (
              <p className="text-base md:text-lg text-[#b8bac1] leading-relaxed italic border-l-2 border-[#4a79ff] pl-4">
                {description}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#93969e]">
              <span>By</span>
              <Link
                href="/authors/huygen-studios-editorial-team"
                rel="author"
                className="text-white underline hover:text-[#4a79ff]"
              >
                Huygen Studios Editorial Team
              </Link>
              <span>Reviewed by Huygen Studios Editorial Team</span>
              <span aria-hidden="true">•</span>
              <Link
                href="/editorial-standards"
                className="underline hover:text-[#4a79ff]"
              >
                How we publish
              </Link>
            </div>
          </header>

          {editorialStatus === "needs-review" ? (
            <aside className="max-w-[850px] mb-10 border border-amber-300/25 bg-amber-300/5 p-5 text-sm text-amber-100 leading-relaxed">
              <strong className="block mb-1">Archived pending editorial review</strong>
              This legacy automated news draft is available for transparency, but it is
              excluded from the blog catalog and sitemap and marked noindex until a human
              editor verifies the source fidelity, removes repeated filler, and approves it.
            </aside>
          ) : null}

          {/* Render Cover Image safely if present */}
          {coverImage && (
            <div className="max-w-[850px] mb-12 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] aspect-[16/9] relative">
              <SafeBlogCoverImage
                src={coverImage.url}
                alt={coverImage.alt || title}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          {/* Article content container with sanitization output */}
          <div 
            className="max-w-[850px] border-t border-[rgba(255,255,255,0.18)] pt-12 text-[#b8bac1] prose prose-invert leading-relaxed space-y-6 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: sanitizedContentHtml }}
          />

          <aside className="max-w-[850px] mt-10 border border-white/10 bg-white/[0.025] p-5 text-xs text-[#93969e] leading-relaxed">
            <strong className="block text-white mb-2">Editorial and AI-assistance disclosure</strong>
            Huygen Studios uses AI-assisted research, outlining, and drafting tools in its
            publishing workflow. The Huygen Studios Editorial Team remains responsible for
            source selection, topic fidelity, corrections, and the decision to publish.
            Review criteria and the corrections process are documented in our{" "}
            <Link href="/editorial-standards" className="text-white underline">
              editorial standards
            </Link>
            .
          </aside>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.08)]">
              <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((related) => (
                  <div key={related.slug} className="border border-[rgba(255,255,255,0.06)] p-6 rounded bg-[#0c0d10] hover:border-[rgba(74,121,255,0.25)] transition-all">
                    <span className="text-xs font-mono text-[#93969e] block mb-2">{getEffectiveCategory(related).name}</span>
                    <h3 className="text-lg font-bold text-white mb-3 hover:text-[#4a79ff] transition-colors">
                      <Link href={`/blog/${encodeBlogSlug(related.slug)}`}>{related.title || "Untitled Article"}</Link>
                    </h3>
                    {related.description && (
                      <p className="text-[#b8bac1] text-xs leading-relaxed mb-4 line-clamp-2">
                        {related.description}
                      </p>
                    )}
                    <Link href={`/blog/${encodeBlogSlug(related.slug)}`} className="text-white text-xs underline hover:text-[#4a79ff] transition-colors">
                      Read More &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center">
            <Link href="/blog" className="text-sm font-mono text-[#93969e] hover:text-[#4a79ff] transition-colors">
              &larr; Back to Blog
            </Link>
            <Link href="/contact" className="text-sm font-semibold underline hover:text-[#4a79ff] transition-colors">
              Contact the editorial team &rarr;
            </Link>
          </div>
        </div>
      </article>
    </SecondaryPageLayout>
  );
}
