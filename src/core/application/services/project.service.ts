"use server";

import { ReadProjectUseCase } from "@/core/application/usecases/project.usecases";
import { Project } from "@/core/application/interface/project.interface";
import { projectApiRepository } from "@/core/infrastructure/api/project.repo";

const readProjectUseCase = new ReadProjectUseCase(projectApiRepository);

export type LandingProject = {
  id: string;
  title: string;
  description: string;
  summary: string;
  techBadges: string[];
  keys: string[];
};

const FALLBACK_LOCALE = "en";

const SUPPORTED_LOCALES = new Set(["en", "es", "ca", "de"]);

function resolveLocale(locale?: string) {
  if (!locale) return FALLBACK_LOCALE;
  return SUPPORTED_LOCALES.has(locale) ? locale : FALLBACK_LOCALE;
}

function translateIntl(intlRecord: Record<string, string> | undefined, locale: string) {
  if (!intlRecord) return "";
  return intlRecord[locale] ?? intlRecord[FALLBACK_LOCALE] ?? Object.values(intlRecord)[0] ?? "";
}

function mapProjects(projects: Project[] | undefined, locale: string): LandingProject[] {
  if (!projects) return [];
  return projects.map((project) => ({
    id: project.id ?? project.nameId,
    title: translateIntl(project.title, locale),
    description: translateIntl(project.desc, locale),
    summary: translateIntl(project.lilDesc, locale),
    techBadges: project.techs?.map((tech) => tech.nameBadge) ?? [],
    keys:
      project.keys?.map((key) => translateIntl(key.title, locale)).filter((title) => Boolean(title)) ?? [],
  }));
}

export async function fetchLandingProjects(locale?: string): Promise<LandingProject[]> {
  const normalizedLocale = resolveLocale(locale);
  try {
    const response = await readProjectUseCase.execute();
    if (!response.success) return [];
    return mapProjects(response.data, normalizedLocale);
  } catch (error) {
    console.error("Failed to load landing projects", error);
    return [];
  }
}
