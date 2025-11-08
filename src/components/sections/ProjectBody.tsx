import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ProjectContent } from "@/types/content";

export function ProjectBody({ project }: { project: ProjectContent }) {
  const linksLabel = project.locale === "he" ? "קישורים" : "Links";
  const statusLabel = project.locale === "he" ? "סטטוס" : "Status";
  const demoLabel = project.locale === "he" ? "להדגמה" : "Live demo";
  const repoLabel = project.locale === "he" ? "למאגר" : "Repository";
  return (
    <section className="page-shell py-8 sm:py-12 md:py-16">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="prose prose-sm sm:prose-base lg:prose-lg space-y-4 sm:space-y-6 text-base sm:text-lg leading-7 sm:leading-8 text-black/80">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.bodyForLocale}
          </ReactMarkdown>
        </div>
        <div className="space-y-4 sm:space-y-6 rounded-2xl sm:rounded-[28px] border border-black/10 bg-white/90 p-4 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          <div>
            <h3 className="text-lg font-semibold">{linksLabel}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {project.links.demo && (
                <li>
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-black underline">
                    {demoLabel} ↗
                  </a>
                </li>
              )}
              {project.links.repo && (
                <li>
                  <a href={project.links.repo} target="_blank" rel="noreferrer" className="text-black underline">
                    {repoLabel} ↗
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{statusLabel}</h3>
            <p className="text-black/70">{project.status}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
