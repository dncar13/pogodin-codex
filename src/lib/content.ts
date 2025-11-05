import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type {
  AboutCopy,
  Locale,
  ProjectContent,
  ProjectFrontMatter,
  SiteCopy,
} from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");
const PROJECTS_ROOT = path.join(CONTENT_ROOT, "projects");

export const locales: Locale[] = ["he", "en"];

export async function getSiteCopy(): Promise<Record<Locale, SiteCopy>> {
  const raw = await fs.readFile(path.join(CONTENT_ROOT, "site.json"), "utf8");
  const parsed = JSON.parse(raw) as Record<Locale, SiteCopy>;
  return parsed;
}

export async function getAboutCopy(): Promise<AboutCopy> {
  const raw = await fs.readFile(path.join(CONTENT_ROOT, "about.md"), "utf8");
  const { data } = matter(raw);
  return data as AboutCopy;
}

async function readProjectFiles() {
  const files = await fs.readdir(PROJECTS_ROOT);
  return files.filter((file) => file.endsWith(".md"));
}

function mapProjectForLocale(
  entry: ProjectFrontMatter,
  locale: Locale,
): ProjectContent {
  return {
    ...entry,
    locale,
    bodyForLocale: entry.body[locale] ?? "",
    summaryForLocale: entry.summary[locale] ?? "",
    titleForLocale: entry.title[locale] ?? entry.slug,
    roleForLocale: entry.role[locale] ?? "",
    highlightsForLocale: entry.highlights.map(
      (highlight) => highlight[locale] ?? "",
    ),
  };
}

async function parseProjectFile(file: string): Promise<ProjectFrontMatter> {
  const raw = await fs.readFile(path.join(PROJECTS_ROOT, file), "utf8");
  const { data } = matter(raw);
  return data as ProjectFrontMatter;
}

export async function getProjects(locale: Locale): Promise<ProjectContent[]> {
  const files = await readProjectFiles();
  const frontmatters = await Promise.all(files.map(parseProjectFile));
  return frontmatters
    .map((project) => mapProjectForLocale(project, locale))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale,
): Promise<ProjectContent | null> {
  const files = await readProjectFiles();
  const target = files.find((file) => file.replace(/\.md$/, "") === slug);
  if (!target) return null;
  const parsed = await parseProjectFile(target);
  return mapProjectForLocale(parsed, locale);
}
