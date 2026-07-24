"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { TextRoll } from "../Button";
import { AnimatedCta } from "../animations/AnimatedCta";
import { BrandLogo } from "./BrandLogo";

interface SecondaryPageLayoutProps {
  children: ReactNode;
}

const nav = [
  ["Services", "/services"],
  ["Products", "/products"],
  ["About", "/about"],
  ["Pricing", "/pricing"],
  ["FAQ", "/faq"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export function SecondaryPageLayout({ children }: SecondaryPageLayoutProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const getRollControl = (target: EventTarget | null) => {
      return target instanceof Element
        ? target.closest<HTMLElement>(".roll-control")
        : null;
    };

    const handlePointerOver = (event: PointerEvent) => {
      const rollControl = getRollControl(event.target);
      if (rollControl && !rollControl.contains(event.relatedTarget as Node | null)) {
        rollControl.classList.add("is-hovered");
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const rollControl = getRollControl(event.target);
      if (rollControl && !rollControl.contains(event.relatedTarget as Node | null)) {
        rollControl.classList.remove("is-hovered");
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      getRollControl(event.target)?.classList.add("is-hovered");
    };

    const handleFocusOut = (event: FocusEvent) => {
      getRollControl(event.target)?.classList.remove("is-hovered");
    };

    root.addEventListener("pointerover", handlePointerOver);
    root.addEventListener("pointerout", handlePointerOut);
    root.addEventListener("focusin", handleFocusIn);
    root.addEventListener("focusout", handleFocusOut);

    return () => {
      root.removeEventListener("pointerover", handlePointerOver);
      root.removeEventListener("pointerout", handlePointerOut);
      root.removeEventListener("focusin", handleFocusIn);
      root.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <main ref={rootRef} className="studio-root min-h-screen flex flex-col">
      {/* Skip to content — keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {/* Header */}
      <header className="header">
        <BrandLogo priority />
        <nav aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link className="roll-control" href={href} key={href}>
              <TextRoll>{label}</TextRoll>
            </Link>
          ))}
        </nav>
        <AnimatedCta href="mailto:hello@huygenstudios.com" label="Start a project" className="header-cta roll-control" />
        <button
          className="menu-toggle"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </button>
      </header>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {mobileOpen && (
          <>
            <button aria-label="Close navigation" onClick={() => setMobileOpen(false)}>
              <X />
            </button>
            {nav.map(([label, href]) => (
              <Link
                className="roll-control"
                href={href}
                key={href}
                onClick={() => setMobileOpen(false)}
              >
                <TextRoll>{label}</TextRoll>
              </Link>
            ))}
            <a className="roll-control" href="mailto:hello@huygenstudios.com">
              <TextRoll>Start a project</TextRoll>
            </a>
          </>
        )}
      </div>

      {/* Content wrapper */}
      <div id="main-content" className="flex-grow pt-[120px] pb-[80px]">
        {children}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="shell footer-grid">
          <div>
            <BrandLogo />
            <p>AI automation, enterprise systems, creative production, motion, UI/UX, and frontend delivery.</p>
          </div>
          <div>
            <strong>Navigate</strong>
            {nav.map(([label, href]) => (
              <Link className="roll-control" href={href} key={href}>
                <TextRoll>{label}</TextRoll>
              </Link>
            ))}
          </div>
          <div>
            <strong>Legal</strong>
            <Link className="roll-control" href="/privacy-policy">
              <TextRoll>Privacy Policy</TextRoll>
            </Link>
            <Link className="roll-control" href="/terms">
              <TextRoll>Terms of Service</TextRoll>
            </Link>
            <Link className="roll-control" href="/cookie-policy">
              <TextRoll>Cookie Policy</TextRoll>
            </Link>
            <Link className="roll-control" href="/disclaimer">
              <TextRoll>Disclaimer</TextRoll>
            </Link>
            <Link className="roll-control" href="/editorial-standards">
              <TextRoll>Editorial Standards</TextRoll>
            </Link>
          </div>
          <div>
            <strong>Contact</strong>
            <a className="roll-control" href="mailto:hello@huygenstudios.com">
              <TextRoll>Email the studio</TextRoll>
            </a>
          </div>
        </div>
        <div className="shell footer-base">
          <span>© 2026 Huygen Studios</span>
          <span>Independent creative and technology studio</span>
        </div>
      </footer>
    </main>
  );
}
