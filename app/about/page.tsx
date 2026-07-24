import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "About the Studio",
  description: "Huygen Studios is an independent technology and creative studio working across AI automation, voice systems, digital products, and frontend experiences.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-16">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">01 // About the Studio</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">Connected disciplines, one accountable studio.</h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              Huygen Studios combines AI automation, enterprise workflows, creative production, interface design, motion, and frontend engineering into one delivery practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[rgba(255,255,255,0.18)] pt-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Operations & Service SLA</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-6">
                We operate as an independent studio based in India. Clients work directly
                with the people responsible for research, design, automation, and
                implementation. That structure keeps positioning, interface systems, and
                code execution inside one accountable delivery conversation.
              </p>
              <p className="text-[#b8bac1] leading-relaxed">
                For service inquiries and ongoing support builds, we maintain an active 24-to-48 hour response SLA to keep operational systems running smoothly.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">The Studio Philosophy</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-6">
                Every project is scoped around a specific operational or communication
                problem. We do not publish fictional client claims, invented performance
                figures, or portfolio work presented as a commissioned result when it is a
                studio concept.
              </p>
              <div className="flex gap-4">
                <Link href="/services" className="text-white underline hover:text-[#4a79ff] transition-colors">
                  Explore Services
                </Link>
                <span className="text-neutral-600">•</span>
                <Link href="/contact" className="text-white underline hover:text-[#4a79ff] transition-colors">
                  Discuss a Project
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[rgba(255,255,255,0.18)] pt-12 mt-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Products and creative practice</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-5">
                The studio also maintains focused products and experimental creative work.
                CapInsta is our browser-based caption and video-editing product; Huygen
                Creatives is the studio&apos;s space for real-time graphics, interaction,
                motion, and WebGL studies.
              </p>
              <div className="flex gap-4">
                <Link href="/products" className="text-white underline hover:text-[#4a79ff]">
                  View products
                </Link>
                <Link href="/creatives" className="text-white underline hover:text-[#4a79ff]">
                  Visit Huygen Creatives
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Publishing and accountability</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-5">
                Blog articles use an organizational byline because research, checking, and
                editing can involve several contributors. We disclose the role of
                AI-assisted drafting, link sources, correct material errors, and remove
                unreviewed automated drafts from indexable archives.
              </p>
              <Link href="/editorial-standards" className="text-white underline hover:text-[#4a79ff]">
                Read the editorial standards
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
