import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Engagement Models & Pricing | Huygen Studios",
  description: "Learn about our pilot campaigns, retainer support, and custom fixed-scope pricing models for enterprise AI automation and web projects.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-16">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">03 // Pricing & Engagement</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">Transparent, structured engagements.</h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              We align our engagement models directly with your project lifecycle, from initial validation pilots to long-term operational support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[rgba(255,255,255,0.18)] pt-12">
            <div className="border border-[rgba(255,255,255,0.1)] p-8 rounded-lg bg-[#0c0d10]">
              <span className="text-xs font-mono tracking-widest uppercase text-[#4a79ff] block mb-2">Stage 01 // Validation</span>
              <h2 className="text-2xl font-bold mb-4">Proof of Concept Pilot</h2>
              <p className="text-[#b8bac1] text-sm leading-relaxed mb-6">
                A focused 2-to-4 week build designed to test and validate a single operational bottleneck or AI capability (e.g. outbound lead calling) inside your active environment.
              </p>
              <ul className="text-[#b8bac1] text-xs space-y-2 mb-8 list-inside list-disc">
                <li>Defined, isolated scope</li>
                <li>Working automation system</li>
                <li>Performance telemetry reporting</li>
                <li>Fast turnaround</li>
              </ul>
              <Link href="/contact" className="text-white underline hover:text-[#4a79ff] text-sm transition-colors">
                Inquire about Pilots
              </Link>
            </div>

            <div className="border border-[rgba(255,255,255,0.1)] p-8 rounded-lg bg-[#0c0d10]">
              <span className="text-xs font-mono tracking-widest uppercase text-[#7c4e9b] block mb-2">Stage 02 // Project</span>
              <h2 className="text-2xl font-bold mb-4">Fixed-Scope Build</h2>
              <p className="text-[#b8bac1] text-sm leading-relaxed mb-6">
                Full-scale implementation of complex custom infrastructure, such as multi-channel intake funnels, 3D web applications, or custom corporate database connectors.
              </p>
              <ul className="text-[#b8bac1] text-xs space-y-2 mb-8 list-inside list-disc">
                <li>Detailed technical specifications</li>
                <li>Milestone-based delivery cycles</li>
                <li>Comprehensive security hardening</li>
                <li>Full source ownership transfer</li>
              </ul>
              <Link href="/contact" className="text-white underline hover:text-[#4a79ff] text-sm transition-colors">
                Request custom quote
              </Link>
            </div>

            <div className="border border-[rgba(255,255,255,0.1)] p-8 rounded-lg bg-[#0c0d10]">
              <span className="text-xs font-mono tracking-widest uppercase text-white block mb-2">Stage 03 // Support</span>
              <h2 className="text-2xl font-bold mb-4">Studio Retainer</h2>
              <p className="text-[#b8bac1] text-sm leading-relaxed mb-6">
                Dedicated engineering capacity and support. Designed for clients needing continuous automation monitoring, interface adjustments, or campaign asset production.
              </p>
              <ul className="text-[#b8bac1] text-xs space-y-2 mb-8 list-inside list-disc">
                <li>Priority queue processing</li>
                <li>24-to-48 hour response SLA</li>
                <li>Structured monthly syncs</li>
                <li>Continuous error monitoring</li>
              </ul>
              <Link href="/contact" className="text-white underline hover:text-[#4a79ff] text-sm transition-colors">
                Discuss retainer terms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
