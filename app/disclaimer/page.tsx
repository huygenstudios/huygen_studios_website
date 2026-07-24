import type { Metadata } from "next";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important limitations concerning Huygen Studios articles, technical examples, external sources, product information, and advertising.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <SecondaryPageLayout>
      <article className="chapter">
        <div className="shell">
          <header className="max-w-[850px] mb-12">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">
              Last updated: July 23, 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">
              Disclaimer
            </h1>
            <p className="text-lg text-[#b8bac1] leading-relaxed">
              Huygen Studios publishes general information about technology, automation,
              design, business operations, and its own products and services.
            </p>
          </header>
          <div className="max-w-[900px] border-t border-white/15 pt-12 space-y-9 text-sm text-[#b8bac1] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">General information</h2>
              <p>
                Articles and examples are educational and do not constitute legal, financial,
                medical, security, or other regulated professional advice. Readers should
                assess recommendations against their own requirements and obtain qualified
                advice where appropriate.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Technical examples</h2>
              <p>
                Software, APIs, product behavior, pricing, and platform policies can change.
                Test any code, integration, automation, or configuration in a controlled
                environment before production use. Huygen Studios does not warrant that an
                example is suitable for every system or jurisdiction.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">External sources and links</h2>
              <p>
                External links are provided for context and attribution. Huygen Studios does
                not control the continued availability, accuracy, privacy practices, or views
                of third-party websites.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Advertising and promotion</h2>
              <p>
                The website may display clearly identified advertising after approval by an
                advertising provider. Editorial coverage is not sold, and advertising does
                not determine the conclusions of an article. Product pages describing
                CapInsta or other Huygen Studios products are promotional company content and
                are identified by their context and links.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
              <p>
                Report an error or ask about this disclaimer at{" "}
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

