import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient";
import { StructuredData } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/config";
import { getAboutCopy, getProjects, getSiteCopy } from "@/lib/content";
import type { Locale, ProjectContent } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteCopy = await getSiteCopy();
  const heCopy = siteCopy.he;
  return {
    title: heCopy.meta.title,
    description: heCopy.meta.description,
    openGraph: {
      title: heCopy.meta.title,
      description: heCopy.meta.description,
      url: SITE_URL,
      type: "website",
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        he: SITE_URL,
        en: `${SITE_URL}/?lang=en`,
      },
    },
  };
}

export default async function Page() {
  const [siteCopy, aboutCopy, heProjects, enProjects] = await Promise.all([
    getSiteCopy(),
    getAboutCopy(),
    getProjects("he"),
    getProjects("en"),
  ]);

  const projectsByLocale: Record<Locale, ProjectContent[]> = {
    he: heProjects,
    en: enProjects,
  };

  return (
    <>
      {(Object.keys(siteCopy) as Locale[]).map((locale) => (
        <StructuredData key={locale} copy={siteCopy[locale]} locale={locale} />
      ))}
      <HomeClient siteCopy={siteCopy} aboutCopy={aboutCopy} projectsByLocale={projectsByLocale} />
    </>
  );
}
