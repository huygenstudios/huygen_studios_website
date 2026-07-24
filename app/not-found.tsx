import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export default function NotFoundPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell max-w-[900px]">
          <span className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase block mb-4">
            404 / Page not found
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-7">
            This route does not exist.
          </h1>
          <p className="text-lg text-[#b8bac1] leading-relaxed mb-8">
            The address may have changed or the page may have been removed. Continue with
            the main site, browse the products, or return to the editorial catalog.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="button primary">Home</Link>
            <Link href="/products" className="button secondary">Products</Link>
            <Link href="/blog" className="button secondary">Blog</Link>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}

