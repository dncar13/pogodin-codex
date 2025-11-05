"use client";

import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Button } from "@/components/ui/Button";
import type { Locale, SiteCopy } from "@/types/content";

export function SiteHeader({ navigation, siteName, locale }: { navigation: SiteCopy["navigation"]; siteName: string; locale: Locale }) {
  const items = [
    { href: "#about", label: navigation.about },
    { href: "#skills", label: navigation.skills },
    { href: "#projects", label: navigation.projects },
    { href: "#contact", label: navigation.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="page-shell flex flex-wrap items-center gap-4 py-4">
        <a href="#hero" className="text-lg font-semibold tracking-wide">
          {siteName}
        </a>
        <nav className="flex flex-1 flex-wrap items-center gap-4 text-sm font-medium" aria-label={locale === "he" ? "ניווט ראשי" : "Primary navigation"}>
          {items.map((item) => (
            <a key={item.href} href={item.href} className="text-black/70 hover:text-black">
              {item.label}
            </a>
          ))}
        </nav>
        <LanguageToggle />
        <Button href="#contact" size="md">
          {navigation.contactCta}
        </Button>
      </div>
    </header>
  );
}
