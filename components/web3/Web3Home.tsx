"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PortfolioMarquee } from "./PortfolioMarquee";
import { TextRoll } from "../Button";
import { BrandLogo } from "./BrandLogo";
import { HuygenProducts } from "./HuygenProducts";
import "./web3.css";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const capabilities = [
  {
    title: "AI agents and automation",
    copy: "Purpose-built agents, connected workflows, CRM automation, internal tools, intake systems, and operational handoffs.",
    detail: "Research, architecture, integration, testing, monitoring",
    className: "cap-wide cap-blue",
  },
  {
    title: "Creative production",
    copy: "Motion graphics, campaign systems, launch assets, explainers, social content, and production-ready brand materials.",
    detail: "Direction, motion, editing, modular asset systems",
    className: "cap-narrow cap-light",
  },
  {
    title: "UI/UX and frontend",
    copy: "Websites, landing pages, dashboards, product interfaces, design systems, and responsive frontend implementation.",
    detail: "Strategy, UX, visual design, interaction, development",
    className: "cap-narrow cap-steel",
  },
  {
    title: "Growth infrastructure",
    copy: "Conversion journeys, lead capture, analytics, content operations, follow-up logic, and measurable optimization.",
    detail: "Funnels, attribution, automation, iteration",
    className: "cap-wide cap-dark",
  },
];

const enterprise = [
  ["Client operations", "Intake, qualification, scheduling, CRM updates, summaries, and accountable follow-up."],
  ["Knowledge systems", "Searchable internal knowledge, structured retrieval, guided answers, and controlled access."],
  ["Sales workflows", "Lead routing, research preparation, proposal support, reminders, and pipeline visibility."],
  ["Service delivery", "Project setup, content production, approval flows, status communication, and reporting."],
  ["Digital products", "Interface architecture, dashboards, component systems, interaction, and production frontend."],
  ["Brand production", "Campaign direction, motion language, launch assets, reusable templates, and content systems."],
];

const work = [
  ["Automation operating layer", "Internal build", "A modular intake and routing framework that connects forms, structured summaries, CRM actions, and human review."],
  ["Product interface system", "Studio concept", "A dashboard language for complex operational information, designed around speed, hierarchy, and clear states."],
  ["Motion launch toolkit", "Studio concept", "A reusable motion system for product announcements, explainers, campaign cuts, and responsive social formats."],
  ["Service conversion framework", "Internal build", "A focused website and follow-up architecture for turning qualified interest into a reliable next step."],
];

const processSteps = [
  ["Discover", "Define the operating problem, audience, constraints, current tools, and the evidence that will mark progress."],
  ["Structure", "Map the workflow, information architecture, content hierarchy, interface states, and delivery priorities."],
  ["Design", "Develop the visual system, interaction behavior, motion language, and practical review prototype."],
  ["Build", "Implement the frontend, automation logic, integrations, analytics, and production safeguards."],
  ["Launch", "Test devices, edge cases, data flow, accessibility, performance, and team handoff."],
  ["Improve", "Review usage, conversion, quality, and operational friction to prioritize the next iteration."],
];

const principles = [
  ["Connected disciplines", "Strategy, creative direction, interface design, automation, and implementation stay inside one production conversation."],
  ["Operational clarity", "Every build defines ownership, inputs, outputs, fallback behavior, and the next human decision."],
  ["Production standards", "Responsive behavior, accessibility, performance, maintainability, and documentation are treated as delivery requirements."],
  ["Measured iteration", "Analytics and workflow feedback inform improvements after launch instead of relying on subjective revision cycles."],
];

const faqs = [
  ["What does Huygen Studios work on?", "AI automation, enterprise workflows, creative production, motion graphics, UI/UX, frontend development, websites, product interfaces, and growth infrastructure."],
  ["Can one engagement include both creative and technical work?", "Yes. Integrated engagements are a core use case. A launch may combine positioning, interface design, motion assets, frontend implementation, lead capture, and automated follow-up."],
  ["Do you replace a company’s current tools?", "Only when replacement is justified. We first map the current operation, retain useful tools, and connect or redesign the areas that create delay, inconsistency, or poor visibility."],
  ["Do you work with internal teams?", "Yes. Huygen Studios can lead a complete delivery or work alongside marketing, operations, product, engineering, and leadership teams."],
  ["How is a project scoped?", "The first phase identifies the problem, users, constraints, dependencies, and deliverables. The resulting scope is specific enough to estimate and flexible enough to accommodate verified findings."],
  ["Is ongoing support available?", "Yes. Support can cover workflow monitoring, automation maintenance, content production, interface improvements, analytics review, and structured iteration."],
];

const nav = [
  ["Services", "/services"],
  ["Products", "/products"],
  ["About", "/about"],
  ["Pricing", "/pricing"],
  ["FAQ", "/faq"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export function Web3Home() {
  const root = useRef<HTMLElement>(null);
  const processTrack = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProcess, setActiveProcess] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
    const mobile = matchMedia("(max-width: 767px)").matches;
    let lenis: Lenis | undefined;
    let frame = 0;

    if (process.env.NODE_ENV === "development") {
      console.log("[Animation Debug] Initializing homepage animations.", {
        reduceMotion: reduce,
        mobileLayout: mobile,
        isomorphicLayoutEffect: true,
        fontsLoaded: typeof document !== "undefined" && "fonts" in document ? document.fonts.status : "unknown"
      });
    }

    if (!reduce) {
      lenis = new Lenis({ duration: 1.08, smoothWheel: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
      lenis.on("scroll", ScrollTrigger.update);
    }

    const ctx = gsap.context(() => {
      // Force initial animation states immediately to prevent hydration flash
      gsap.set(".page", { clipPath: "inset(100% 0 0)" });
      gsap.set(".hero-line span", { yPercent: 110 });
      gsap.set(".hero-summary, .hero-actions, .hero-index", { opacity: 0, y: 22 });

      gsap.timeline()
        .fromTo(".page", { clipPath: "inset(100% 0 0)" }, { clipPath: "inset(0% 0 0)", duration: reduce ? 0 : .8, ease: "power4.inOut" })
        .fromTo(".hero-line span", { yPercent: 110 }, { yPercent: 0, duration: reduce ? 0 : .9, stagger: .08, ease: "power4.out" }, .12)
        .fromTo(".hero-summary, .hero-actions, .hero-index", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: reduce ? 0 : .55, stagger: .08 }, .46);

      if (!reduce) {
        gsap.to(".hero-copy", {
          yPercent: -16,
          opacity: .25,
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.to(".statement-word", {
          opacity: 1,
          color: (index, element) => element.dataset.accent === "true" ? "#4a79ff" : "#111216",
          stagger: .025,
          ease: "none",
          scrollTrigger: { trigger: ".statement-copy", start: "top 76%", end: "bottom 38%", scrub: 1 },
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.fromTo(element,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: .8,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 82%", once: true },
            }
          );
        });
        gsap.utils.toArray<HTMLElement>(".cap-card").forEach((card, index) => {
          gsap.fromTo(card,
            { y: 70 + index * 8, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: .9,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 84%", once: true },
            }
          );
        });
        if (!mobile) {
          const cards = gsap.utils.toArray<HTMLElement>(".work-panel");
          cards.slice(0, -1).forEach((card, index) => {
            ScrollTrigger.create({
              trigger: card,
              start: "top top",
              endTrigger: cards[cards.length - 1],
              end: "top top",
              pin: true,
              pinSpacing: false,
            });
            gsap.to(card, {
              scale: .94,
              opacity: .28,
              scrollTrigger: { trigger: cards[index + 1], start: "top bottom", end: "top top", scrub: true },
            });
          });
        }
      }
    }, root);

    // Sync layout when fonts are fully loaded to prevent wrong trigger offsets
    if (typeof window !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (process.env.NODE_ENV === "development") {
          console.log("[Animation Debug] Web fonts are loaded. Refreshing ScrollTrigger.");
        }
        ScrollTrigger.refresh();
      });
    }

    // Call ScrollTrigger.refresh after initial layout settles (e.g. fonts and 3D shapes load)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    // JavaScript fallback to guarantee .roll-control hover animations work across all browsers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const rollControl = target.closest(".roll-control");
      if (rollControl) {
        rollControl.classList.add("is-hovered");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const rollControl = target.closest(".roll-control");
      if (rollControl) {
        const related = e.relatedTarget as HTMLElement;
        if (!related || !rollControl.contains(related)) {
          rollControl.classList.remove("is-hovered");
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      ctx.revert();
      lenis?.destroy();
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const moveProcess = (direction: number) => {
    const next = Math.max(0, Math.min(processSteps.length - 1, activeProcess + direction));
    setActiveProcess(next);
    processTrack.current?.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <main ref={root} className="studio-root">
      {/* Skip to content — keyboard accessibility */}
      <a href="#top" className="skip-link">Skip to main content</a>
      <div className="page">
        <header className="header">
          <BrandLogo href="#top" priority />
          <nav aria-label="Primary navigation">{nav.map(([label, href]) => <Link className="roll-control" href={href} key={href}><TextRoll>{label}</TextRoll></Link>)}</nav>
          <Link href="mailto:hello@huygenstudios.com" className="header-cta roll-control"><TextRoll>Start a project</TextRoll> <ArrowUpRight size={15} /></Link>
          <button className="menu-toggle" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu /></button>
        </header>

        <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
          {mobileOpen && (
            <>
              <button aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X /></button>
              {nav.map(([label, href]) => <Link className="roll-control" href={href} key={href} onClick={() => setMobileOpen(false)}><TextRoll>{label}</TextRoll></Link>)}
              <a className="roll-control" href="mailto:hello@huygenstudios.com"><TextRoll>Start a project</TextRoll></a>
            </>
          )}
        </div>

        <section id="top" className="hero">
          <Image className="hero-image" src="/images/huygen-hero.webp" fill priority sizes="100vw" alt="Purple eclipse over a dark field" />
          <div className="hero-image-shade" />
          <div className="hero-copy shell">
            <div className="hero-index">AI AUTOMATION / CREATIVE PRODUCTION / DIGITAL EXPERIENCES</div>
            <h1>
              <span className="hero-line"><span>Studio expertise,</span></span>
              <span className="hero-line"><span>connected for delivery.</span></span>
            </h1>
            <p className="hero-summary">Huygen Studios combines automation, enterprise workflows, creative production, interface design, motion, and frontend engineering in one delivery practice.</p>
            <div className="hero-actions">
              <a href="mailto:hello@huygenstudios.com" className="button primary roll-control"><TextRoll>Discuss a project</TextRoll> <ArrowUpRight size={17} /></a>
              <Link href="/services" className="button secondary roll-control"><TextRoll>Review capabilities</TextRoll> <ArrowDownRight size={17} /></Link>
            </div>
          </div>
          <div className="hero-axis"><span>STRATEGY</span><span>DESIGN</span><span>AUTOMATION</span><span>DELIVERY</span></div>
        </section>

        <section className="statement">
          <div className="shell statement-grid">
            <h2 className="reveal">One studio across the work that usually gets separated.</h2>
            <p className="statement-copy">{"We connect business context, creative direction, interface systems, production engineering, and AI automation so ideas move from decision to delivery without losing clarity between teams.".split(" ").map((word, index) => <span className="statement-word" data-accent={["creative", "interface", "engineering,", "automation"].includes(word)} key={`${word}-${index}`}>{word} </span>)}</p>
          </div>
        </section>

        <PortfolioMarquee />

        <section id="capabilities" className="capabilities chapter">
          <div className="shell">
            <header className="chapter-head"><h2 className="reveal">Capabilities</h2><p>Integrated services for operational improvement, brand production, product interfaces, and digital growth.</p></header>
            <div className="cap-grid">{capabilities.map((item, index) => <article className={`cap-card ${item.className}`} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.copy}</p><small>{item.detail}</small></div><ArrowUpRight /></article>)}</div>
          </div>
        </section>

        <HuygenProducts />

        <section className="chapter">
          <div className="shell">
            <header className="chapter-head">
              <h2 className="reveal">Who we serve</h2>
              <p>Custom technology integrations for teams that need clear, high-density execution.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[rgba(255,255,255,0.18)]">
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Enterprise Operations</h3>
                <p className="text-[#b8bac1] text-sm leading-relaxed">
                  We help established organizations automate operational intake, run custom LLM voice qualification scripts, and scale WhatsApp conversational outreach without manual overhead.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Product Design Labs</h3>
                <p className="text-[#b8bac1] text-sm leading-relaxed">
                  We deliver custom React frameworks, high-end WebGL interactive elements, and robust design system structures to bring creative concepts to market quickly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Trust & Transparency</h3>
                <p className="text-[#b8bac1] text-sm leading-relaxed">
                  We build with security-first web protocols. Our clients enjoy direct access to the builders, complete code ownership, and verified sandbox environments before production release.
                </p>
              </div>
            </div>
          </div>
        </section>


        <section id="enterprise" className="enterprise chapter">
          <div className="shell enterprise-layout">
            <div className="enterprise-title"><h2>Enterprise and operational systems</h2><p>Practical applications built around the tools, people, approvals, and information a team already uses.</p></div>
            <div className="enterprise-list">{enterprise.map((item, index) => <article className="reveal" key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
          </div>
        </section>

        <section className="principles chapter">
          <div className="shell">
            <header className="chapter-head"><h2 className="reveal">How the studio operates</h2><p>Clear working principles keep multi-disciplinary projects coherent and accountable.</p></header>
            <div className="principle-grid">{principles.map((item) => <article key={item[0]}><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
          </div>
        </section>

        <section id="work" className="work">
          <div className="shell work-intro"><h2 className="reveal">Selected studio frameworks</h2><p>Internal builds and studio concepts are identified clearly. No fictional client claims or invented performance figures.</p></div>
          <div className="work-stack">{work.map((item, index) => <article className={`work-panel work-tone-${index + 1}`} key={item[0]}><div className="work-number">{String(index + 1).padStart(2, "0")}</div><div className="work-type">{item[1]}</div><h3>{item[0]}</h3><p>{item[2]}</p><div className="work-diagram"><i /><i /><i /><i /></div></article>)}</div>
        </section>

        <section id="process" className="process chapter">
          <div className="shell process-head"><div><h2 className="reveal">A structured delivery process</h2><p>Each phase reduces uncertainty before the next investment is made.</p></div><div className="process-controls"><button aria-label="Previous process step" disabled={activeProcess === 0} onClick={() => moveProcess(-1)}><ArrowLeft /></button><span>{String(activeProcess + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}</span><button aria-label="Next process step" disabled={activeProcess === processSteps.length - 1} onClick={() => moveProcess(1)}><ArrowRight /></button></div></div>
          <div className="process-track" ref={processTrack} onScroll={(event) => { const element = event.currentTarget; setActiveProcess(Math.min(5, Math.round(element.scrollLeft / Math.max(1, element.clientWidth * .68)))); }}>{processSteps.map((item, index) => <article className={activeProcess === index ? "active" : ""} tabIndex={0} aria-label={`Step ${index + 1}: ${item[0]}`} key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
        </section>

        <section className="faq chapter">
          <div className="shell faq-grid"><h2 className="reveal">Working with Huygen Studios</h2><div>{faqs.map((item, index) => <article className={openFaq === index ? "open" : ""} key={item[0]}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{item[0]}</span><span>{openFaq === index ? "−" : "+"}</span></button><div><p>{item[1]}</p></div></article>)}</div></div>
        </section>

        <section id="contact" className="contact">
          <div className="shell contact-grid"><h2>Discuss the work that needs to move forward.</h2><div><p>Share the operation, interface, campaign, or digital experience you want to improve. We will respond with the questions needed to define a useful next step.</p><a href="mailto:hello@huygenstudios.com" className="button primary roll-control"><TextRoll>hello@huygenstudios.com</TextRoll> <ArrowUpRight size={17} /></a></div></div>
        </section>

        <footer className="footer">
          <div className="shell footer-grid">
            <div>
              <BrandLogo href="#top" />
              <p>AI automation, enterprise systems, creative production, motion, UI/UX, and frontend delivery.</p>
            </div>
            <div>
              <strong>Navigate</strong>
              {nav.map(([label, href]) => <Link className="roll-control" href={href} key={href}><TextRoll>{label}</TextRoll></Link>)}
            </div>
            <div>
              <strong>Legal</strong>
              <Link className="roll-control" href="/privacy-policy"><TextRoll>Privacy Policy</TextRoll></Link>
              <Link className="roll-control" href="/terms"><TextRoll>Terms of Service</TextRoll></Link>
              <Link className="roll-control" href="/cookie-policy"><TextRoll>Cookie Policy</TextRoll></Link>
              <Link className="roll-control" href="/disclaimer"><TextRoll>Disclaimer</TextRoll></Link>
              <Link className="roll-control" href="/editorial-standards"><TextRoll>Editorial Standards</TextRoll></Link>
            </div>
            <div>
              <strong>Contact</strong>
              <a className="roll-control" href="mailto:hello@huygenstudios.com"><TextRoll>Email the studio</TextRoll></a>
            </div>
          </div>
          <div className="shell footer-base">
            <span>© 2026 Huygen Studios</span>
            <span>Independent creative and technology studio</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
