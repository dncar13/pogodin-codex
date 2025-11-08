"use client";

import type { SimpleIcon } from "simple-icons";
import {
  siNodedotjs,
  siReact,
  siNextdotjs,
  siTypescript,
  siPython,
  siGraphql,
  siOpenapiinitiative,
  siN8n,
  siZapier,
  siMake,
  siFigma,
  siGit,
  siVercel,
  siGooglecloud,
  siPostgresql,
} from "simple-icons/icons";
import type { Locale } from "@/types/content";

type ToolCard = {
  id: string;
  icons: SimpleIcon[];
  label: Record<Locale, string>;
};

const createLabel = (he: string, en: string) => ({ he, en });

const TOOL_CARDS: ToolCard[] = [
  { id: "node", label: createLabel("Node.js", "Node.js"), icons: [siNodedotjs] },
  { id: "react-next", label: createLabel("React / Next.js", "React / Next.js"), icons: [siReact, siNextdotjs] },
  { id: "ts", label: createLabel("TypeScript", "TypeScript"), icons: [siTypescript] },
  { id: "python", label: createLabel("Python", "Python"), icons: [siPython] },
  { id: "apis", label: createLabel("REST / GraphQL", "REST / GraphQL"), icons: [siOpenapiinitiative, siGraphql] },
  { id: "n8n", label: createLabel("n8n", "n8n"), icons: [siN8n] },
  { id: "zapier", label: createLabel("Zapier", "Zapier"), icons: [siZapier] },
  { id: "make", label: createLabel("Make (Integromat)", "Make (Integromat)"), icons: [siMake] },
  { id: "figma", label: createLabel("Figma", "Figma"), icons: [siFigma] },
  { id: "git", label: createLabel("Git", "Git"), icons: [siGit] },
  { id: "cloud", label: createLabel("Vercel / GCP", "Vercel / GCP"), icons: [siVercel, siGooglecloud] },
  { id: "db", label: createLabel("PostgreSQL / Vector DBs", "PostgreSQL / Vector DBs"), icons: [siPostgresql] },
];

function BrandIcon({ icon, size = 28, title }: { icon: SimpleIcon; size?: number; title?: string }) {
  return (
    <svg role="img" aria-label={title ?? icon.title} viewBox="0 0 24 24" width={size} height={size} className="tool-svg">
      <path d={icon.path} />
    </svg>
  );
}

export function ToolsSection({ title, kicker, locale }: { title: string; kicker: string; locale: Locale }) {
  const direction = locale === "he" ? "rtl" : "ltr";
  const sectionLabel = locale === "he" ? "כלים שאני עובד איתם" : "Tools I work with";

  return (
    <section id="tools" className="tools-section" aria-label={sectionLabel} dir={direction} lang={locale}>
      <div className="page-shell">
        <p className="tools-kicker">{kicker}</p>
        <h2 className="tools-title">{title}</h2>
        <ul className="tools-grid">
          {TOOL_CARDS.map((tool) => (
            <li key={tool.id} className="tool-card">
              <div className="tool-logos" aria-hidden="true">
                {tool.icons.map((icon, index) => (
                  <span key={`${tool.id}-${index}`} className="logo-chip" title={icon.title}>
                    <BrandIcon icon={icon} />
                  </span>
                ))}
              </div>
              <div className="tool-label">{tool.label[locale]}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ToolsSection;
