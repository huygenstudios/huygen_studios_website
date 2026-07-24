import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description:
    "How Huygen Studios selects, researches, reviews, sources, corrects, and updates technical and business articles.",
  alternates: { canonical: "/editorial-standards" },
};

export default function EditorialStandardsPage() {
  return (
    <SecondaryPageLayout>
      <article className="chapter">
        <div className="shell">
          <header className="max-w-[850px] mb-14">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">
              Last updated: July 23, 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">
              Editorial standards
            </h1>
            <p className="text-lg text-[#b8bac1] leading-relaxed">
              The Huygen Studios blog explains technical and operational subjects for
              readers who need to make, build, or evaluate something. Publication volume is
              not a quality measure; usefulness, source fidelity, and honest limitations are.
            </p>
          </header>

          <div className="max-w-[900px] border-t border-white/15 pt-12 space-y-10 text-sm text-[#b8bac1] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Ownership and bylines</h2>
              <p>
                Articles are published by the Huygen Studios Editorial Team. We use an
                organizational byline because research, technical checking, editing, and
                production may involve more than one studio contributor. We do not invent
                individual author identities. The{" "}
                <Link className="text-white underline" href="/authors/huygen-studios-editorial-team">
                  author page
                </Link>{" "}
                explains the team&apos;s scope and contact route.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Research and sources</h2>
              <p>
                News analysis must identify the actual subject in the headline and opening,
                link to the primary source when available, and link to the relevant Hacker
                News discussion when that discussion led to the article. A source title is
                not enough evidence for detailed factual claims. If the primary material
                cannot be retrieved or verified, the draft does not publish.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">AI-assisted production</h2>
              <p>
                We may use language models to organize research, propose outlines, or create
                a first draft. A generated draft is not treated as publishable work. The
                review checks the actual topic, factual claims, citations, originality,
                repeated language, promotional passages, and whether the article adds a
                concrete explanation, comparison, example, or implementation lesson.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">What we reject</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Generic articles that replace the source topic with a broad AI theme.</li>
                <li>Copied, lightly rewritten, or stitched source material.</li>
                <li>Repeated introductions, conclusions, checklists, or studio promotions.</li>
                <li>Unsupported statistics, invented clients, results, quotes, or testing claims.</li>
                <li>Articles padded to reach a word count without adding useful information.</li>
                <li>Drafts that exist mainly to target a keyword or promote a service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Corrections and updates</h2>
              <p>
                Material changes update the article&apos;s modified date. If a published
                article is found to obscure its source, repeat automated filler, or make
                claims that cannot be verified, we remove it from the catalog and sitemap
                while it is reviewed. Readers can report an issue at{" "}
                <a className="text-white underline" href="mailto:hello@huygenstudios.com">
                  hello@huygenstudios.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </article>
    </SecondaryPageLayout>
  );
}

