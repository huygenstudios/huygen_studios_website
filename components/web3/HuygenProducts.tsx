import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capInsta } from "@/lib/products";

export function HuygenProducts() {
  return (
    <section className="products-feature chapter" aria-labelledby="products-heading">
      <div className="shell">
        <header className="chapter-head">
          <div>
            <span className="section-kicker">Studio product / 01</span>
            <h2 id="products-heading">Tools built from real production needs.</h2>
          </div>
          <p>
            Huygen Studios also builds focused products. CapInsta turns spoken video into
            timed, animated captions in the browser, with practical export options for
            creators and production teams.
          </p>
        </header>

        <article className="product-feature-card">
          <div className="product-feature-visual">
            <Image
              src={capInsta.image}
              alt="CapInsta video caption editor preview"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
          <div className="product-feature-copy">
            <span>AI video editor for creators</span>
            <h3>{capInsta.name}</h3>
            <p>{capInsta.shortDescription}</p>
            <ul>
              <li>Word-level automatic caption timing</li>
              <li>Animated caption styles and active-word highlighting</li>
              <li>MP4, SRT, and VTT export options</li>
            </ul>
            <div className="product-feature-actions">
              <Link href="/products/capinsta" className="button primary">
                Product details <ArrowUpRight size={17} />
              </Link>
              <a
                href={capInsta.url}
                className="button secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open CapInsta <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

