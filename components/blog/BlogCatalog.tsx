"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Compass } from "lucide-react";
import { gsap, useGSAP } from "../animations/gsap-client";
import { BlogPost } from "@/lib/blog/types";
import { AnimatedBlogCard } from "./AnimatedBlogCard";
import { SafeBlogCoverImage } from "./SafeBlogCoverImage";
import { blogCategories, getEffectiveCategory } from "@/lib/blog/categories";

interface BlogCatalogProps {
  posts: BlogPost[];
}

const categoryStyleMap: Record<string, { color: string; border: string; glow: string }> = {
  "AI Automation": {
    color: "from-blue-600/20 to-indigo-900/30",
    border: "group-hover:border-blue-500/30",
    glow: "bg-blue-500/10",
  },
  "AI Voice Agents": {
    color: "from-purple-600/20 to-pink-900/30",
    border: "group-hover:border-purple-500/30",
    glow: "bg-purple-500/10",
  },
  "WhatsApp Automation": {
    color: "from-emerald-600/20 to-teal-900/30",
    border: "group-hover:border-emerald-500/30",
    glow: "bg-emerald-500/10",
  },
  "CRM & Sales Systems": {
    color: "from-cyan-600/20 to-blue-900/30",
    border: "group-hover:border-cyan-500/30",
    glow: "bg-cyan-500/10",
  },
  "Cinematic Websites": {
    color: "from-rose-600/20 to-purple-900/30",
    border: "group-hover:border-rose-500/30",
    glow: "bg-rose-500/10",
  },
  "Business Strategy": {
    color: "from-amber-600/20 to-red-900/30",
    border: "group-hover:border-amber-500/30",
    glow: "bg-amber-500/10",
  },
  "Web Development": {
    color: "from-teal-600/20 to-blue-900/30",
    border: "group-hover:border-teal-500/30",
    glow: "bg-teal-500/10",
  },
};

function makeThumbnailTitle(fullTitle: string): string {
  const words = fullTitle.split(/\s+/).filter((word) => word.length > 2);
  if (words.length <= 4) return fullTitle;
  return `${words.slice(0, 4).join(" ")}...`;
}

function formatPostDate(dateStr: string | null | undefined, month: "short" | "long" = "short") {
  if (!dateStr) return "Recent";

  try {
    const date = new Date(dateStr);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", { month, day: "numeric", year: "numeric" });
    }
  } catch {
    return "Recent";
  }

  return "Recent";
}

function BlogVisual({ post, className = "aspect-[16/10]" }: { post: BlogPost; className?: string }) {
  const imageUrl = post.coverImage?.url || null;
  const title = post.title || "Untitled article";
  const category = getEffectiveCategory(post).name;

  if (imageUrl) {
    return (
      <div className={`blog-card-visual relative overflow-hidden rounded-2xl border border-white/5 ${className}`}>
        <SafeBlogCoverImage
          src={imageUrl}
          alt={post.coverImage?.alt || title}
          className="blog-card-image w-full h-full object-cover"
        />
        <div className="blog-card-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0" />
      </div>
    );
  }

  const hash = (title.length + category.length) % 5;
  const gradients = [
    "from-blue-950 via-indigo-950 to-black",
    "from-purple-950 via-slate-950 to-black",
    "from-cyan-950 via-emerald-950 to-black",
    "from-rose-950 via-purple-950 to-black",
    "from-violet-950 via-fuchsia-950 to-black",
  ];
  const glows = [
    { bg1: "bg-cyan-500/10", bg2: "bg-purple-500/10" },
    { bg1: "bg-purple-500/10", bg2: "bg-pink-500/10" },
    { bg1: "bg-blue-500/10", bg2: "bg-teal-500/10" },
    { bg1: "bg-rose-500/10", bg2: "bg-violet-500/10" },
    { bg1: "bg-emerald-500/10", bg2: "bg-indigo-500/10" },
  ];

  return (
    <div className={`blog-card-visual relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[hash]} p-6 border border-white/5 flex flex-col justify-between ${className}`}>
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${glows[hash].bg1} blur-2xl`} />
      <div className={`absolute -bottom-12 -left-12 h-36 w-36 rounded-full ${glows[hash].bg2} blur-2xl`} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div className="flex justify-between items-start">
          <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase text-white/80 backdrop-blur-sm">
            {category}
          </span>
          <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
            Insight
          </span>
        </div>

        <h3 className="blog-card-title max-w-[95%] text-xl md:text-2xl font-bold leading-snug text-white tracking-tight">
          {makeThumbnailTitle(title)}
        </h3>

        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/30">
            Huygen Studios
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const title = post.title || "Untitled article";
  const description = post.description || "";
  const category = getEffectiveCategory(post).name;
  const readingTime = post.readingTime || "3 min read";

  return (
    <AnimatedBlogCard post={post} className="flex flex-col gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
      <BlogVisual post={post} className="aspect-[16/10] w-full" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-xs font-mono text-[#93969e]">
          <span className="text-blue-400 font-bold">{category}</span>
          <span>&bull;</span>
          <span>{formatPostDate(post.publishedAt)}</span>
          <span>&bull;</span>
          <span>{readingTime}</span>
        </div>
        <h3 className="blog-card-title text-xl font-bold text-white leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-[#b8bac1] text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </AnimatedBlogCard>
  );
}

function CompactBlogCard({ post }: { post: BlogPost }) {
  const title = post.title || "Untitled article";
  const category = getEffectiveCategory(post).name;
  const readingTime = post.readingTime || "3 min read";

  return (
    <AnimatedBlogCard post={post} className="flex gap-4 text-left items-start pb-4 border-b border-white/5 last:border-0 last:pb-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
      <BlogVisual post={post} className="w-24 h-16 md:w-32 md:h-20 flex-shrink-0" />
      <div className="flex flex-col gap-1 justify-center min-w-0">
        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">{category}</span>
        <h4 className="blog-card-title text-sm font-bold text-white line-clamp-2 leading-snug font-sans">
          {title}
        </h4>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#93969e]">
          <span>{formatPostDate(post.publishedAt)}</span>
          <span>&bull;</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </AnimatedBlogCard>
  );
}

export function BlogCatalog({ posts }: BlogCatalogProps) {
  const catalogRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const curatedCategories = useMemo(
    () => [
      "All",
      ...blogCategories
        .filter((category) =>
          posts.some((post) => getEffectiveCategory(post).slug === category.slug),
        )
        .map((category) => category.name),
    ],
    [posts],
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter(
      (post) => getEffectiveCategory(post).name.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [posts, activeCategory]);

  const { featuredPost, secondaryFeatured } = useMemo(() => {
    if (posts.length === 0) return { featuredPost: null, secondaryFeatured: [] };

    const featured = posts.find((post) => post.tags.some((tag) => tag.name.toLowerCase() === "featured")) || posts[0];
    const others = posts.filter((post) => post.id !== featured.id).slice(0, 2);

    return {
      featuredPost: featured,
      secondaryFeatured: others,
    };
  }, [posts]);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".blog-card");
    const media = gsap.matchMedia();

    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        const { motion, reduced } = conditions ?? {};
        gsap.set(cards, { opacity: 1, y: 0 });
        if (reduced || !motion) return;

        gsap.fromTo(
          cards,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.055,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
      },
    );

    return () => media.revert();
  }, {
    scope: catalogRef,
    dependencies: [filteredPosts.length, activeCategory],
    revertOnUpdate: true,
  });

  return (
    <div ref={catalogRef} className="space-y-16">
      <div className="border-y border-white/5 py-8">
        <div className="flex items-center gap-2 mb-6 text-neutral-400 text-xs font-mono tracking-widest uppercase">
          <Compass size={14} className="text-blue-400" />
          <span>Explore by Category</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {curatedCategories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            const categoryDefinition = blogCategories.find((category) => category.name === cat);
            const config = categoryStyleMap[cat] || {
              color: "from-neutral-800 to-neutral-900/60",
              border: "group-hover:border-neutral-500/20",
              glow: "bg-neutral-500/5",
            };

            return (
              <Link
                key={cat}
                href={categoryDefinition ? `/blog/category/${categoryDefinition.slug}` : "/blog"}
                onClick={() => setActiveCategory(cat)}
                className={`relative overflow-hidden rounded-2xl p-4 text-left border transition-all duration-300 h-24 group flex flex-col justify-between ${
                  isActive
                    ? "border-blue-500 bg-white/5 ring-1 ring-blue-500"
                    : "border-white/5 bg-neutral-950/40 hover:border-white/10 hover:bg-neutral-900/30"
                }`}
              >
                <div className={`absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br ${config.color} opacity-40 blur-lg group-hover:scale-125 transition-transform duration-500`} />
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">Select</span>
                <h4 className="text-xs md:text-sm font-bold text-white relative z-10 transition-colors group-hover:text-blue-400">
                  {cat}
                </h4>
              </Link>
            );
          })}
        </div>
      </div>

      {activeCategory === "All" && featuredPost && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xs font-mono text-[#93969e] tracking-widest uppercase">Featured Insights</h2>
            <span className="h-px bg-white/10 flex-grow mx-4 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <div className="lg:col-span-2 flex">
              <AnimatedBlogCard
                post={featuredPost}
                className="flex flex-col gap-6 p-6 rounded-3xl border border-white/5 bg-neutral-950/20 w-full justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
              >
                <BlogVisual post={featuredPost} className="aspect-[16/9] w-full" />
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#93969e]">
                    <span className="px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                      {getEffectiveCategory(featuredPost).name}
                    </span>
                    <span>&bull;</span>
                    <span>{formatPostDate(featuredPost.publishedAt, "long")}</span>
                    <span>&bull;</span>
                    <span>{featuredPost.readingTime}</span>
                  </div>
                  <h3 className="blog-card-title text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
                    {featuredPost.title}
                  </h3>
                  {featuredPost.description && (
                    <p className="text-[#b8bac1] text-sm md:text-base leading-relaxed">
                      {featuredPost.description}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-white font-bold pt-2">
                    Read Article <ArrowUpRight size={16} className="blog-card-arrow ml-1" />
                  </div>
                </div>
              </AnimatedBlogCard>
            </div>

            <div className="flex flex-col justify-between gap-6 p-6 rounded-3xl border border-white/5 bg-neutral-950/20">
              <div className="space-y-6">
                <span className="text-[10px] font-mono tracking-wider text-[#93969e] uppercase block pb-3 border-b border-white/5">
                  Trending Research
                </span>
                <div className="flex flex-col gap-6">
                  {secondaryFeatured.map((post) => (
                    <CompactBlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="text-[11px] font-mono text-neutral-500 leading-normal">
                  Published articles are selected for practical usefulness and reviewed against our sourcing and editorial standards.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xs font-mono text-[#93969e] tracking-widest uppercase">
            {activeCategory === "All" ? "All Technical Articles" : `${activeCategory} Articles`}
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-neutral-950/10">
            <span className="text-neutral-500 block mb-4 text-sm font-mono">No articles found in this category.</span>
            <button
              onClick={() => setActiveCategory("All")}
              className="px-4 py-2 text-xs font-mono border border-white/10 rounded-full text-white hover:bg-white/5 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
