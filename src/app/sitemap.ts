import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects("he");
  const updated = new Date().toISOString();
  return [
    {
      url: SITE_URL,
      lastModified: updated,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: updated,
    })),
  ];
}
