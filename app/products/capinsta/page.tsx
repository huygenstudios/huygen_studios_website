import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { capInsta } from "@/lib/products";

const capInstaFaqs = [
  {
    question: "Is CapInsta free to use?",
    answer:
      "CapInsta is currently available free during its public beta. Features or pricing may change after the beta period.",
  },
  {
    question: "Do I need an account?",
    answer:
      "The current beta can be used without creating an account. The editing session opens on the CapInsta subdomain.",
  },
  {
    question: "What can I export?",
    answer:
      "You can export a captioned video or download SRT and VTT subtitle files for use in compatible editors and players.",
  },
  {
    question: "Which spoken-language workflows are supported?",
    answer:
      "CapInsta supports English, Hinglish, Telgish, and mixed-language caption workflows. Names and specialised terms should still be reviewed manually.",
  },
  {
    question: "How is uploaded media handled?",
    answer:
      "Media and working files use temporary storage during the editing workflow and are automatically cleared after a period of inactivity. Download finished exports before leaving the editor.",
  },
] as const;

export const metadata: Metadata = {
  title: "CapInsta AI Video Caption Editor",
  description:
    "CapInsta is a browser-based AI video editor by Huygen Studios for automatic word-timed captions, animated caption styles, and MP4, SRT, or VTT export.",
  keywords: [
    "CapInsta",
    "Instagram caption tool",
    "video caption generator",
    "AI video caption editor",
    "animated captions",
    "Hinglish captions",
    "Telgish captions",
  ],
  alternates: { canonical: "/products/capinsta" },
  openGraph: {
    title: "CapInsta | AI Video Caption Editor by Huygen Studios",
    description:
      "Generate accurate word-timed captions, style them in the browser, and export a finished video or subtitle file.",
    url: "https://www.huygenstudios.com/products/capinsta",
    type: "website",
    images: [{ url: "/creatives/assets/Capinsta.png", alt: "CapInsta editor preview" }],
  },
};

export default function CapInstaProductPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CapInsta",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web browser",
    url: capInsta.url,
    description: capInsta.shortDescription,
    image: "https://www.huygenstudios.com/creatives/assets/Capinsta.png",
    author: {
      "@type": "Organization",
      "@id": "https://www.huygenstudios.com/#organization",
      name: "Huygen Studios",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free during public beta; pricing may change after beta.",
      availability: "https://schema.org/InStock",
    },
    featureList: capInsta.features.join(", "),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: capInstaFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <SecondaryPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <article className="chapter">
        <div className="shell">
          <Link href="/products" className="text-sm text-[#93969e] hover:text-white">
            &larr; All products
          </Link>

          <header className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-center mt-10 mb-20">
            <div>
              <span className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase block mb-4">
                A Huygen Studios product
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-7">
                CapInsta
              </h1>
              <p className="text-xl text-[#d8d9dd] leading-relaxed mb-5">
                Turn spoken video into accurate, animated captions without moving the
                project between several tools.
              </p>
              <p className="text-base text-[#b8bac1] leading-relaxed mb-8">
                CapInsta is a browser-based AI video editor for creators, social teams,
                educators, and production teams. It generates word-timed captions,
                provides ready-made motion styles, and lets you correct wording and timing
                before exporting a finished video or subtitle file.
              </p>
              <a
                href={capInsta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button primary"
              >
                Start editing on CapInsta <ArrowUpRight size={17} />
              </a>
              <p className="text-xs text-[#93969e] mt-4">
                Currently free during public beta. The editor opens on the CapInsta subdomain.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#0c0d10]">
              <Image
                src={capInsta.image}
                alt="CapInsta browser video editor with animated captions"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
                priority
              />
            </div>
          </header>

          <div className="max-w-[900px] space-y-16 text-[#b8bac1] leading-relaxed">
            <section>
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-6">
                The problem CapInsta solves
              </h2>
              <p className="mb-5">
                Captions make spoken video easier to follow with the sound off, but a good
                result involves more than transcription. A creator often has to generate a
                transcript, break it into readable phrases, time each word, choose a visual
                treatment, preview the motion, and then export in the format required by a
                publishing platform or another editor.
              </p>
              <p>
                CapInsta keeps that workflow in one browser tab. It is especially useful for
                short-form videos, reels, interviews, educational clips, and creator-led
                content where timing and active-word emphasis affect readability.
              </p>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-6">
                What the editor can do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                {capInsta.features.map((feature) => (
                  <div key={feature} className="bg-[#0c0d10] p-6 text-sm text-[#d8d9dd]">
                    {feature}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-6">
                How to use CapInsta
              </h2>
              <ol className="space-y-5">
                <li>
                  <strong className="text-white">1. Import a video.</strong> Upload a common
                  video format from your device to begin a temporary editing session.
                </li>
                <li>
                  <strong className="text-white">2. Generate captions.</strong> Let the
                  speech-recognition workflow produce text with word-level timing. CapInsta
                  supports English, Hinglish, Telgish, and mixed-language detection.
                </li>
                <li>
                  <strong className="text-white">3. Review the result.</strong> Correct the
                  wording, adjust individual timing, and choose an animated caption preset
                  with the emphasis that suits the clip.
                </li>
                <li>
                  <strong className="text-white">4. Export.</strong> Download a captioned
                  video, or export SRT or VTT subtitles for Premiere, DaVinci Resolve,
                  CapCut, or another compatible editor.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-6">
                CapInsta questions
              </h2>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {capInstaFaqs.map((item) => (
                  <article key={item.question} className="py-6">
                    <h3 className="text-lg text-white font-semibold mb-3">{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-6">
                Privacy and product ownership
              </h2>
              <p className="mb-5">
                CapInsta is built and maintained by Huygen Studios. Uploaded video,
                captions, transcripts, and exports are held only while the editing workflow
                is active and are automatically cleared after a period of inactivity. Users
                should download their export before leaving the editor.
              </p>
              <p>
                This page explains the product&apos;s relationship to Huygen Studios. The
                actual editor, current feature details, product policies, and account-free
                beta experience live on{" "}
                <a
                  href={capInsta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-[#4a79ff]"
                >
                  capinsta.huygenstudios.com
                </a>
                . That separation avoids copying the product website while still making the
                ownership and purpose clear.
              </p>
            </section>
          </div>
        </div>
      </article>
    </SecondaryPageLayout>
  );
}
