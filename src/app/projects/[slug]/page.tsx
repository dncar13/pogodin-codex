import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectBody } from "@/components/sections/ProjectBody";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { SITE_URL } from "@/lib/config";
import { getProjectBySlug } from "@/lib/content";
import type { Locale } from "@/types/content";

function resolveLocale(searchParams: Record<string, string | string[] | undefined>): Locale {
  const raw = typeof searchParams.lang === "string" ? searchParams.lang : "";
  return raw === "en" ? "en" : "he";
}

export async function generateMetadata({ params, searchParams }: { params: { slug: string }; searchParams?: Record<string, string | string[] | undefined>; }): Promise<Metadata> {
  const locale = resolveLocale(searchParams ?? {});
  const project = await getProjectBySlug(params.slug, locale);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: `${project.titleForLocale} – pogodin.co.il`,
    description: project.summaryForLocale,
    openGraph: {
      title: project.titleForLocale,
      description: project.summaryForLocale,
      url: `${SITE_URL}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const locale = resolveLocale(searchParams);
  const project = await getProjectBySlug(params.slug, locale);

  if (!project) {
    notFound();
  }

  const backLabel = locale === "he" ? "← חזרה לדף הבית" : "← Back home";
  const homeHref = locale === "he" ? "/" : "/?lang=en";

  return (
    <div className="space-y-16 py-10">
      <div className="page-shell">
        <Link href={homeHref} className="text-sm text-black/70 underline">
          {backLabel}
        </Link>
      </div>
      <ProjectHero project={project} />
      <ProjectBody project={project} />
    </div>
  );
}
