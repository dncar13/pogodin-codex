import type { ProjectContent } from "@/types/content";

export function ProjectHero({ project }: { project: ProjectContent }) {
  const stackLabel = project.locale === "he" ? "טכנולוגיות" : "Stack";
  const highlightsLabel = project.locale === "he" ? "דגשים" : "Highlights";
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-black text-white">
      <div className="page-shell grid gap-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">{project.roleForLocale}</p>
          <h1 className="mt-2 text-4xl font-semibold">{project.titleForLocale}</h1>
          <p className="mt-4 text-lg text-white/80">{project.summaryForLocale}</p>
          <p className="mt-3 text-sm text-white/60" aria-label="Illustration description">
            {project.cover.label}
          </p>
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/5 p-6">
          <p className="text-sm text-white/70">{stackLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm text-white">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full bg-white/10 px-3 py-1">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-sm text-white/70">{highlightsLabel}</p>
            <ul className="mt-2 space-y-2 text-sm">
              {project.highlightsForLocale.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-white"></span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
