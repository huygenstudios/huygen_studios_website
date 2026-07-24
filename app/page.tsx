import type { Metadata } from "next";
import { Web3Home } from "@/components/web3/Web3Home";

export const metadata: Metadata = {
  title: "Huygen Studios | AI Automation, Creative Production & Digital Delivery",
  description: "Huygen Studios combines enterprise AI automation, WhatsApp workflows, custom voice agents, brand design, and premium Next.js WebGL systems in one studio practice.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Huygen Studios | AI Automation, Creative Production & Digital Delivery",
    description: "Huygen Studios combines enterprise AI automation, WhatsApp workflows, custom voice agents, brand design, and premium Next.js WebGL systems in one studio practice.",
    url: "https://www.huygenstudios.com",
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.huygenstudios.com/#organization",
        "name": "Huygen Studios",
        "url": "https://www.huygenstudios.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.huygenstudios.com/Huygen%20Studios%20logo%20Black%20horizontal.png"
        },
        "sameAs": [
          "https://github.com/Huygen-Studios"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9262102440",
          "contactType": "customer service",
          "email": "hello@huygenstudios.com"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.huygenstudios.com/#website",
        "url": "https://www.huygenstudios.com",
        "name": "Huygen Studios",
        "publisher": {
          "@id": "https://www.huygenstudios.com/#organization"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Web3Home />
    </>
  );
}
