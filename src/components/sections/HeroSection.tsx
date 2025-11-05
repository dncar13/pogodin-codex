"use client";

import clsx from "clsx";
import { useState } from "react";
import { AvatarIllustration } from "@/components/graphics/Avatar";
import { Button } from "@/components/ui/Button";
import { SocialIcons } from "@/components/ui/SocialIcons";
import type { HeroCopy, Locale, SiteCopy } from "@/types/content";

export function HeroSection({ hero, social, role, locale }: { hero: HeroCopy; social: SiteCopy["social"]; role: string; locale: Locale }) {
  const [inverted, setInverted] = useState(false);

  const handleToggle = (force?: boolean) => {
    setInverted((prev) => (typeof force === "boolean" ? force : !prev));
  };

  return (
    <section id="hero" className={`page-shell hero-grid ${inverted ? "is-inverted" : ""}`} aria-label="Hero">
      <div className="hero-panel hero-panel--light">
        <div className="hero-copy-animate max-w-xl space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">{role}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight">
              {inverted ? hero.titleB : hero.titleA}
            </h1>
          </div>
          <p className="text-lg text-black/80">{inverted ? hero.subtitleB : hero.subtitleA}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="#contact" size="lg">
              {hero.primaryCta}
            </Button>
            <Button href="#projects" variant="ghost" size="lg" aria-describedby="hero-alt-hint">
              {hero.secondaryCta}
            </Button>
          </div>
          <span id="hero-alt-hint" className="sr-only">
            {hero.hint}
          </span>
          <SocialIcons social={social} label={locale === "he" ? "קישורים חברתיים" : "Social links"} />
        </div>
      </div>
      <div
        className="hero-panel hero-panel--dark"
        id="portrait-panel"
        role="button"
        tabIndex={0}
        aria-pressed={inverted}
        aria-label={hero.hint}
        onMouseEnter={() => handleToggle(true)}
        onMouseLeave={() => handleToggle(false)}
        onFocus={() => handleToggle(true)}
        onBlur={() => handleToggle(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleToggle();
          }
        }}
      >
        <AvatarIllustration inverted={inverted} />
        <span className={clsx("pointer-events-none absolute bottom-5 text-xs", inverted ? "text-black/60" : "text-white/70")}>
          {hero.hint}
        </span>
      </div>
    </section>
  );
}
