"use client";

import { createContext, startTransition, useContext, useEffect, useMemo, useState } from "react";
import type { AboutCopy, Locale, SiteCopy } from "@/types/content";

const DEFAULT_LOCALE: Locale = "he";

export type LanguageContextValue = {
  locale: Locale;
  copy: SiteCopy;
  about: string;
  switchLocale: (next: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type Props = {
  siteCopy: Record<Locale, SiteCopy>;
  aboutCopy: AboutCopy;
  children: React.ReactNode;
};

export function LanguageProvider({ siteCopy, aboutCopy, children }: Props) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  // restore persisted locale
  useEffect(() => {
    if (typeof window === "undefined") return;
    const search = new URLSearchParams(window.location.search);
    const queryLocale = search.get("lang") as Locale | null;
    if (queryLocale && queryLocale in siteCopy) {
      startTransition(() => setLocale(queryLocale));
      window.localStorage.setItem("pogodin-locale", queryLocale);
      return;
    }

    const stored = window.localStorage.getItem("pogodin-locale") as Locale | null;
    if (stored && stored in siteCopy) {
      startTransition(() => setLocale(stored));
    }
  }, [siteCopy]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("lang", locale === "he" ? "he" : "en");
    document.documentElement.setAttribute("dir", locale === "he" ? "rtl" : "ltr");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("pogodin-locale", locale);
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const safeLocale = siteCopy[locale] ? locale : DEFAULT_LOCALE;
    return {
      locale: safeLocale,
      copy: siteCopy[safeLocale],
      about: aboutCopy[safeLocale],
      switchLocale: (next) => {
        if (next in siteCopy) {
        startTransition(() => setLocale(next));
        }
      },
    };
  }, [locale, siteCopy, aboutCopy]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
