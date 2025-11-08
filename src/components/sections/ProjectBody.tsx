import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ProjectContent } from "@/types/content";

export function ProjectBody({ project }: { project: ProjectContent }) {
  const linksLabel = project.locale === "he" ? "קישורים" : "Links";
  const statusLabel = project.locale === "he" ? "סטטוס" : "Status";
  const demoLabel = project.locale === "he" ? "להדגמה" : "Live demo";
  const repoLabel = project.locale === "he" ? "למאגר" : "Repository";
  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="prose prose-lg space-y-6 text-lg leading-8 text-black/80">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.bodyForLocale}
          </ReactMarkdown>
        </div>
        <div className="space-y-6 rounded-[28px] border border-black/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
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
