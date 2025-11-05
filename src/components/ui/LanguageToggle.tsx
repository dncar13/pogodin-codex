"use client";

import clsx from "clsx";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Locale } from "@/types/content";

const options: Locale[] = ["he", "en"];

export function LanguageToggle() {
  const { locale, switchLocale } = useLanguage();

  return (
    <div className="flex rounded-full border border-black/20 bg-white/70 p-1 text-sm" role="group" aria-label="Language toggle">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => switchLocale(option)}
          className={clsx(
            "min-w-[48px] rounded-full px-3 py-1 transition",
            locale === option
              ? "bg-black text-white"
              : "text-black/70 hover:text-black"
          )}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
