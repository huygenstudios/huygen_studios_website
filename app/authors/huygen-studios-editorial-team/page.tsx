import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Huygen Studios Editorial Team",
  description:
    "About the organizational author responsible for Huygen Studios articles on automation, voice systems, frontend engineering, and creative technology.",
  alternates: { canonical: "/authors/huygen-studios-editorial-team" },
};

export default function EditorialAuthorPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.huygenstudios.com/#editorial-team",
    name: "Huygen Studios Editorial Team",
    url: "https://www.huygenstudios.com/authors/huygen-studios-editorial-team",
    parentOrganization: {
      "@id": "https://www.huygenstudios.com/#organization",
    },
    knowsAbout: [
      "AI automation",
      "AI voice agents",
      "CRM workflows",
      "frontend engineering",
      "motion design",
      "creative technology",
    ],
  };

  return (
    <SecondaryPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <article className="chapter">
        <div className="shell max-w-[1050px]">
          <span className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase block mb-4">
            Organizational author
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-7">
            Huygen Studios Editorial Team
          </h1>
          <div className="max-w-[850px] space-y-6 text-[#b8bac1] leading-relaxed">
            <p>
              This byline represents the Huygen Studios contributors who research, review,
              and maintain the studio&apos;s technical and business articles. We use an
              organizational author rather than attributing collaborative work to a fictional
              individual.
            </p>
            <p>
              The team&apos;s subject coverage follows the studio&apos;s working areas:
              automation architecture, voice and messaging workflows, CRM operations,
              frontend engineering, motion, WebGL, product interfaces, and creative
              production. Articles should explain tradeoffs and implementation details
              without claiming experience, results, or source access that cannot be shown.
            </p>
            <p>
              Questions, correction requests, and source concerns can be sent to{" "}
              <a className="text-white underline" href="mailto:hello@huygenstudios.com">
                hello@huygenstudios.com
              </a>
              . For the complete publication process, read the{" "}
              <Link className="text-white underline" href="/editorial-standards">
                editorial standards
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </SecondaryPageLayout>
  );
}

