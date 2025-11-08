"use client";

import { useState } from "react";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Button } from "@/components/ui/Button";
import type { Locale, SiteCopy } from "@/types/content";

export function SiteHeader({ navigation, locale }: { navigation: SiteCopy["navigation"]; siteName: string; locale: Locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = [
    { href: "#about", label: navigation.about },
    { href: "#skills", label: navigation.skills },
    { href: "#projects", label: navigation.projects },
    { href: "#contact", label: navigation.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="page-shell flex items-center justify-between py-3 sm:py-4">
        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center gap-4 text-sm font-medium md:flex" aria-label={locale === "he" ? "ניווט ראשי" : "Primary navigation"}>
          {items.map((item) => (
            <a key={item.href} href={item.href} className="text-black/70 hover:text-black">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <Button href="#contact" size="sm" className="whitespace-nowrap text-xs sm:text-sm">
            {navigation.contactCta}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-black/10 bg-white/95 md:hidden">
          <nav className="page-shell flex flex-col gap-1 py-4">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-black/70 hover:bg-black/5 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 rounded-lg bg-black px-4 py-3 text-center text-base font-medium text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navigation.contactCta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
