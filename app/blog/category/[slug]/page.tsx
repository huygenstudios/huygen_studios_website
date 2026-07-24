import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import {
  blogCategories,
  encodeBlogSlug,
  getBlogPosts,
  getCategoryBySlug,
  getPostsForCategory,
} from "@/lib/blog";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;
export const revalidate = 300;

export function generateStaticParams() {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} Articles`,
    description: category.description,
    alternates: { canonical: `/blog/category/${category.slug}` },
    openGraph: {
      title: `${category.name} Articles | Huygen Studios`,
      description: category.description,
      url: `https://www.huygenstudios.com/blog/category/${category.slug}`,
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsForCategory(await getBlogPosts(), category.slug);
  if (posts.length === 0) notFound();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Articles`,
    description: category.description,
    url: `https://www.huygenstudios.com/blog/category/${category.slug}`,
    isPartOf: {
      "@type": "Blog",
      name: "Huygen Studios Blog",
      url: "https://www.huygenstudios.com/blog",
    },
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://www.huygenstudios.com/blog/${encodeBlogSlug(post.slug)}`,
      datePublished: post.publishedAt || undefined,
    })),
  };

  return (
    <SecondaryPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <section className="chapter">
        <div className="shell">
          <Link href="/blog" className="text-sm text-[#93969e] hover:text-white">
            &larr; All articles
          </Link>
          <header className="max-w-[850px] mt-10 mb-14">
            <span className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase block mb-4">
              Blog category
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">
              {category.name}
            </h1>
            <p className="text-lg text-[#b8bac1] leading-relaxed">{category.description}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {posts.map((post) => (
              <article key={post.slug} className="bg-[#0c0d10] p-7 md:p-10">
                <div className="text-xs font-mono text-[#93969e] mb-4">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Huygen Studios"}
                  {" · "}
                  {post.readingTime}
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">
                  <Link
                    className="hover:text-[#4a79ff]"
                    href={`/blog/${encodeBlogSlug(post.slug)}`}
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-[#b8bac1] leading-relaxed mb-6">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${encodeBlogSlug(post.slug)}`}
                  className="text-sm underline hover:text-[#4a79ff]"
                >
                  Read article &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}

