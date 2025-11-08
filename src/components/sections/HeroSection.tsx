"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import { SocialIcons } from "@/components/ui/SocialIcons";
import type { HeroCopy, Locale, SiteCopy } from "@/types/content";

const LTR_SEGMENT_PATTERN = /[A-Za-z][A-Za-z0-9+&/@#.\-–—]*/g;

function normalizeTypography(text: string, locale: Locale) {
  if (locale !== "he") {
    return text;
  }
  return text.replace(/([\u0590-\u05FF])\s*-\s*([\u0590-\u05FF])/g, "$1־$2");
}

function renderWithIsolation(text: string, locale: Locale) {
  const normalized = normalizeTypography(text, locale);
  const segments: ReactNode[] = [];
  const pattern = new RegExp(LTR_SEGMENT_PATTERN);
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(normalized)) !== null) {
    if (match.index > lastIndex) {
      segments.push(normalized.slice(lastIndex, match.index));
    }
    segments.push(
      <bdi key={`${match.index}-${match[0]}`} dir="ltr" className="ltr-fragment">
        {match[0]}
      </bdi>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < normalized.length) {
    segments.push(normalized.slice(lastIndex));
  }

  return segments;
}

function BidiText({ text, locale }: { text: string; locale: Locale }) {
  return <>{renderWithIsolation(text, locale)}</>;
}

export function HeroSection({ hero, social, role, locale }: { hero: HeroCopy; social: SiteCopy["social"]; role: string; locale: Locale }) {
  const defaultAlt = locale === "he" ? "דיוקן של דניאל פוגודין" : "Portrait of Daniel Pogodin";
  const [inverted, setInverted] = useState(false);
  const activeOption = hero.options[0]; // Always use first option
  const direction = locale === "he" ? "rtl" : "ltr";
  const portraitAlt = hero.portraitAlt || defaultAlt;

  const handleHover = (state: boolean) => {
    setInverted(state);
  };

  return (
    <section id="hero" className={clsx("hero-surface", inverted && "is-inverted")} aria-label="Hero">
      <div className="page-shell hero-shell" dir={direction} lang={locale}>
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <BidiText text={hero.kicker || role} locale={locale} />
          </p>
          <h1 className="hero-title">
            <BidiText text={activeOption?.headline ?? ""} locale={locale} />
          </h1>
          <p className="hero-desc">
            <BidiText text={activeOption?.body ?? ""} locale={locale} />
          </p>
          <p className="hero-microcopy">
            <BidiText text={hero.hint} locale={locale} />
          </p>
          <SocialIcons social={social} label={locale === "he" ? "קישורים חברתיים" : "Social links"} />
        </div>
        <div
          className="hero-visual"
          id="portrait-panel"
          role="button"
          tabIndex={0}
          aria-pressed={inverted}
          aria-label={hero.hint}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          onFocus={() => handleHover(true)}
          onBlur={() => handleHover(false)}
          onTouchStart={() => handleHover(true)}
          onTouchEnd={() => handleHover(false)}
          onTouchCancel={() => handleHover(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setInverted((prev) => !prev);
            }
          }}
        >
          <div className="hero-frame">
            <span className="hero-shape hero-shape--dark" />
            <div className="hero-shape hero-shape--light">
              <span className="hero-fx" aria-hidden="true" />
              <Image
                src="/photos/hero-portrait.webp"
                alt={portraitAlt}
                width={709}
                height={1536}
                priority
                sizes="(max-width: 900px) 80vw, 420px"
                className="hero-portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
