import type { BlogPost } from "./types";

export const blogCategories = [
  {
    name: "AI Automation",
    slug: "ai-automation",
    description:
      "Practical implementation guidance for AI agents, workflow automation, handoffs, measurement, and operational reliability.",
    terms: ["ai automation", "automation", "agent", "agents", "workflow", "inference", "model"],
  },
  {
    name: "AI Voice Agents",
    slug: "ai-voice-agents",
    description:
      "Voice-agent architecture, call handling, appointment booking, qualification, latency, and human escalation.",
    terms: ["voice agent", "voice agents", "receptionist", "call", "speech", "transcription"],
  },
  {
    name: "WhatsApp Automation",
    slug: "whatsapp-automation",
    description:
      "Consent-aware WhatsApp workflows for lead qualification, follow-up, CRM updates, and customer communication.",
    terms: ["whatsapp"],
  },
  {
    name: "CRM & Sales Systems",
    slug: "crm-sales-systems",
    description:
      "CRM design, lead routing, sales follow-up, pipeline stages, conversion measurement, and operational reporting.",
    terms: ["crm", "sales", "lead", "pipeline", "conversion", "follow-up", "follow up"],
  },
  {
    name: "Cinematic Websites",
    slug: "cinematic-websites",
    description:
      "Frontend engineering, motion, performance, WebGL, accessibility, and conversion-focused website systems.",
    terms: ["website", "webgl", "next.js", "nextjs", "frontend", "motion", "design", "seo"],
  },
  {
    name: "Business Strategy",
    slug: "business-strategy",
    description:
      "Decision frameworks for choosing, governing, and measuring technology and creative-production investments.",
    terms: ["business", "strategy", "roi", "governance", "operations", "infrastructure"],
  },
] as const;

export type BlogCategoryDefinition = (typeof blogCategories)[number];

export function categorySlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategoryBySlug(slug: string): BlogCategoryDefinition | null {
  return blogCategories.find((category) => category.slug === categorySlug(slug)) ?? null;
}

export function getEffectiveCategory(post: BlogPost): BlogCategoryDefinition {
  const assignedName = post.category?.name?.trim() ?? "";
  const assignedSlug = post.category?.slug?.trim() ?? categorySlug(assignedName);
  const assigned = blogCategories.find(
    (category) =>
      category.slug === assignedSlug ||
      category.name.toLowerCase() === assignedName.toLowerCase(),
  );
  if (assigned) return assigned;

  const text = `${post.title} ${post.description} ${post.slug}`.toLowerCase();
  let best: BlogCategoryDefinition = blogCategories[0];
  let bestScore = -1;

  for (const category of blogCategories) {
    const score = category.terms.reduce(
      (total, term) => total + (text.includes(term) ? Math.max(1, term.split(" ").length) : 0),
      0,
    );
    if (score > bestScore) {
      best = category;
      bestScore = score;
    }
  }

  return best;
}

export function getPostsForCategory(posts: BlogPost[], slug: string): BlogPost[] {
  return posts.filter((post) => getEffectiveCategory(post).slug === categorySlug(slug));
}
