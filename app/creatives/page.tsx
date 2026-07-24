import type { Metadata } from "next";
import CreativesApp from "./CreativesClient";

export const metadata: Metadata = {
  title: "Creatives Lab",
  description:
    "An interactive WebGL playground from Huygen Studios — particle systems, audio-reactive visuals, and real-time 3D experiences built with Three.js and custom GLSL shaders.",
  alternates: { canonical: "https://www.huygenstudios.com/creatives" },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Creatives Lab | Huygen Studios",
    description:
      "Interactive WebGL playground — particle systems, audio-reactive visuals, and real-time 3D experiences.",
    url: "https://www.huygenstudios.com/creatives",
    siteName: "Huygen Studios",
    type: "website",
  },
};

export default function CreativesPage() {
  return (
    <>
      {/* Server-rendered fallback for no-JS browsers. */}
      <noscript>
        <main
          style={{
            minHeight: "100dvh",
            background: "#050505",
            color: "#ededed",
            padding: "120px 40px 80px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1>Creatives Lab — Huygen Studios</h1>
          <p>
            This page contains an interactive WebGL experience built with
            Three.js and custom GLSL shaders. Please enable JavaScript to view
            the interactive canvas.
          </p>
          <p>
            Huygen Studios builds cinematic web experiences, AI-powered
            automation systems, and enterprise workflow tooling. Visit our{" "}
            <a href="/services" style={{ color: "#4a79ff" }}>
              services page
            </a>{" "}
            or{" "}
            <a href="/contact" style={{ color: "#4a79ff" }}>
              get in touch
            </a>
            .
          </p>
        </main>
      </noscript>
      {/* Client-side WebGL canvas — rendered only when JS is enabled */}
      <CreativesApp />
      <section className="creatives-editorial" aria-labelledby="creatives-overview">
        <div className="creatives-editorial-inner">
          <span className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase block mb-5">
            Huygen Creatives / Studio practice
          </span>
          <h2 id="creatives-overview">Creative technology with a production purpose.</h2>
          <p className="max-w-[780px] text-[#aeb0b7] leading-relaxed">
            Huygen Creatives is the experimental visual practice inside Huygen Studios.
            The interactive work above explores particles, motion, audio, responsive
            interfaces, and real-time graphics. These experiments are studio-built
            demonstrations used to test how an idea behaves before it becomes part of a
            production website, product interface, campaign, or motion system.
          </p>
          <div className="creatives-editorial-grid">
            <article>
              <h3>What we explore</h3>
              <p>
                Motion language, typographic rhythm, WebGL scenes, responsive composition,
                audio cues, interaction states, and the relationship between visual impact
                and usable navigation.
              </p>
            </article>
            <article>
              <h3>How it becomes useful</h3>
              <p>
                A promising experiment is reduced to a maintainable system: clear fallbacks,
                accessible controls, performance budgets, mobile behavior, and a reason for
                the interaction to exist beyond novelty.
              </p>
            </article>
            <article>
              <h3>Where to continue</h3>
              <p>
                Review our{" "}
                <a href="/services/cinematic-websites">cinematic website practice</a>,
                explore <a href="/products">Huygen Studios products</a>, or{" "}
                <a href="/contact">contact the studio</a> with a specific brief.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
