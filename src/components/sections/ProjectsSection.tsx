import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale, ProjectContent } from "@/types/content";

export function ProjectsSection({ title, projects, locale }: { title: string; projects: ProjectContent[]; locale: Locale }) {
  return (
    <section id="projects" className="page-shell py-16">
      <SectionHeading kicker="Portfolio" title={title} />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
