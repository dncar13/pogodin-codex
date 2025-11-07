"use client";

import { useEffect, useRef, useState, ReactElement } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// SVG icons for each skill
const skillIcons: Record<string, ReactElement> = {
  HTML: (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z" />
    </svg>
  ),
  "JavaScript/TypeScript": (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  ),
  "React/Next.js": (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-60 12 12)" />
    </svg>
  ),
  "Node בסיסי": (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.246-.225-.333-.08-.383.585-.204.703-.25 1.328-.602.065-.037.151-.023.218.016l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.054-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.048-.139.144-.139.245v10.142c0 .1.055.194.137.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.599.247-.925.247z" />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
    </svg>
  ),
};

function SkillCard({ skill, index }: { skill: string; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-105",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      style={{
        transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Icon */}
        <div className="h-16 w-16 text-gray-600 transition-colors group-hover:text-black">
          {skillIcons[skill] || (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
              <span className="text-2xl font-bold">{skill[0]}</span>
            </div>
          )}
        </div>

        {/* Skill Name */}
        <h3 className="text-center text-sm font-medium text-black">{skill}</h3>
      </div>

      {/* Hover effect background */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-black/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
    </div>
  );
}

export function SkillsSection({ heading, skills, kicker }: { heading: string; skills: string[]; kicker: string }) {
  return (
    <section id="skills" className="bg-gray-50 py-16 md:py-24">
      <div className="page-shell">
        <SectionHeading kicker={kicker} title={heading} />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
