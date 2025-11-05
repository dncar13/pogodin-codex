import Link from "next/link";
import clsx from "clsx";
import type { Locale, ProjectContent } from "@/types/content";

export function ProjectCard({ project, locale }: { project: ProjectContent; locale: Locale }) {
  const caseStudyLabel = locale === "he" ? "לקריאת העמוד" : "Case study";
  const href = locale === "he" ? `/projects/${project.slug}` : `/projects/${project.slug}?lang=en`;
  return (
    <article
      className="group flex h-full flex-col justify-between rounded-3xl border border-black/10 bg-white/90 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
          <span>{project.roleForLocale}</span>
          <span className="h-px flex-1 bg-zinc-200" aria-hidden="true" />
          <span>{project.status}</span>
        </div>
        <h3 className="text-2xl font-semibold">{project.titleForLocale}</h3>
        <p className="text-base text-black/70">{project.summaryForLocale}</p>
        <ul className="flex flex-wrap gap-2 text-xs text-black/60">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full bg-black/5 px-3 py-1">
              {tech}
            </li>
          ))}
        </ul>
        <ul className="space-y-2 text-sm text-black/80">
          {project.highlightsForLocale.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className={clsx("mt-1 inline-block h-2 w-2 rounded-full", "bg-black")}></span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm font-semibold">
        {project.links.demo && (
          <a href={project.links.demo} className="text-black/70 hover:text-black" target="_blank" rel="noreferrer">
            Demo ↗
          </a>
        )}
        <Link href={href} className="text-black">
          {caseStudyLabel} →
        </Link>
      </div>
    </article>
  );
}
