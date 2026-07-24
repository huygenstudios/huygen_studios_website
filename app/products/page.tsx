import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore focused software products built by Huygen Studios, including CapInsta, a browser-based AI video caption editor for creators.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products by Huygen Studios",
    description:
      "Focused software products shaped by practical creative and production workflows.",
    url: "https://www.huygenstudios.com/products",
    type: "website",
  },
};

export default function ProductsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Huygen Studios Products",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.huygenstudios.com/products/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <SecondaryPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <section className="chapter">
        <div className="shell">
          <header className="max-w-[850px] mb-16">
            <span className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase block mb-4">
              Products / Huygen Studios
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
              Focused tools for real creative work.
            </h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              Our products begin with a specific production problem. We keep the scope
              clear, explain the data handling, and build the workflows so people can
              understand what the software does before they use it.
            </p>
          </header>

          {products.map((product) => (
            <article
              key={product.slug}
              className="grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-[#0c0d10]"
            >
              <div className="relative min-h-[340px] lg:min-h-[520px] overflow-hidden">
                <Image
                  src={product.image}
                  alt="CapInsta video caption editor preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <span className="text-xs font-mono text-[#93969e] uppercase tracking-[0.18em]">
                  AI video editor for creators
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
                  {product.name}
                </h2>
                <p className="text-[#b8bac1] leading-relaxed mb-7">
                  {product.shortDescription}
                </p>
                <ul className="space-y-3 text-sm text-[#d8d9dd] mb-9">
                  {product.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="border-t border-white/10 pt-3">
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/products/${product.slug}`} className="button primary">
                    Learn about {product.name} <ArrowUpRight size={17} />
                  </Link>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button secondary"
                  >
                    Open the product <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SecondaryPageLayout>
  );
}

