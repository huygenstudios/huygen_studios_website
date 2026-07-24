import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/components/web3/web3.css";
import { CookieConsent } from "@/components/CookieConsent";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = JetBrains_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.huygenstudios.com"),
  icons: {
    icon: "/favicon.ico?v=20260724",
    shortcut: "/favicon.ico?v=20260724",
    apple: "/apple-icon.png?v=20260724",
  },
  title: {
    default: "Huygen Studios | Premium AI Automation & Web Agency",
    template: "%s | Huygen Studios",
  },
  description:
    "Huygen Studios is a technology and creative studio specialising in enterprise AI automation, voice systems, and cinematic web interfaces. We build custom AI calling agents, WhatsApp automations, and premium web experiences.",
  keywords: [
    "AI automation agency",
    "AI voice agents",
    "WhatsApp automation",
    "cinematic web development",
    "enterprise AI integration",
    "Next.js development agency",
  ],
  authors: [{ name: "Huygen Studios", url: "https://www.huygenstudios.com" }],
  creator: "Huygen Studios",
  publisher: "Huygen Studios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Huygen Studios | Premium AI Automation & Web Agency",
    description:
      "Huygen Studios is the premier agency for elite AI automation, voice agents, and cinematic web experiences. Transform your business today.",
    url: "https://www.huygenstudios.com",
    siteName: "Huygen Studios",
    images: [{ url: "/images/huygen-hero.webp", width: 1280, height: 720, alt: "Huygen Studios" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huygen Studios | Premium AI Automation & Web Agency",
    description:
      "Huygen Studios is the premier agency for elite AI automation, voice agents, and cinematic web experiences.",
    images: ["/images/huygen-hero.webp"],
    creator: "@huygenstudios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  other: {
    "google-adsense-account": "ca-pub-1790543418739606",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Huygen Studios",
  url: "https://www.huygenstudios.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.huygenstudios.com/Huygen%20Studios%20logo%20Black%20horizontal.png",
    width: 2048,
    height: 682,
  },
  description: "Technology and creative studio specialising in enterprise AI automation, voice systems, and cinematic web interfaces.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@huygenstudios.com",
    availableLanguage: ["English"]
  },
  knowsAbout: [
    "AI automation",
    "AI voice agents",
    "creative production",
    "frontend engineering",
    "digital products"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Prevent Dark Reader extension from causing hydration errors */}
        <meta name="color-scheme" content="dark light" />
        <meta name="darkreader-lock" />
        {/* RSS feed discovery */}
        <link rel="alternate" type="application/rss+xml" title="Huygen Studios Blog" href="https://www.huygenstudios.com/rss.xml" />
        <Script
          id="js-enabled-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-enabled');`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body text-white bg-[#050505]" suppressHydrationWarning>
        {children}
        <CookieConsent analyticsId={googleAnalyticsId} />
      </body>
    </html>
  );
}
