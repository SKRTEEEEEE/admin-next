import { readProjectUC, readProjectByIdUC as readProjectByIdBasicUC } from "./_project-basic";
import { createDomainError, ErrorCodes } from "@skrteeeeee/profile-domain";
import type { Project } from "@/core/application/interfaces/entities/project.interface";

/**
 * Read example projects use case
 * Fetches example projects from the backend API
 * @returns Array of projects
 * @throws DomainError if fetch fails
 */
export const readExampleProjectsUC = async () => {
  try {
    const result = await readProjectUC();
    
    if (!result.success || !result.data) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        readExampleProjectsUC,
        "readExampleProjectsUC",
        "tryAgainOrContact",
        { entity: "example projects", optionalMessage: result.message || "Failed to read projects" }
      );
    }
    
    return result.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      throw error; // Re-throw DomainError
    }
    throw createDomainError(
      ErrorCodes.DATABASE_FIND,
      readExampleProjectsUC,
      "readExampleProjectsUC",
      "tryAgainOrContact",
      { entity: "example projects", optionalMessage: error instanceof Error ? error.message : String(error) }
    );
  }
};

/**
 * Read deployed projects use case
 * Fetches example/deployed projects from the backend API
 * Note: In the migration phase, this returns all example projects
 * since the backend filters by ejemplo:true which includes deployed projects
 * @returns Array of projects
 * @throws DomainError if fetch fails
 */
export const readProjectsDeployedUC = async () => {
  // In the migration phase, we use the same endpoint as readExampleProjectsUC
  // The backend API doesn't have a separate endpoint for deployed projects yet
  // So we return all example projects (ejemplo: true)
  return readExampleProjectsUC();
};

/**
 * Read project by ID use case
 * Fetches a single project by its ID from the backend API
 * @param id - The project ID to fetch
 * @returns Project
 * @throws DomainError if fetch fails or project not found
 */
export const readProjectByIdUC = async (id: string) => {
  try {
    const result = await readProjectByIdBasicUC(id);
    
    if (!result.success || !result.data) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        readProjectByIdUC,
        "readProjectByIdUC",
        "tryAgainOrContact",
        { entity: "project", optionalMessage: `Project with id ${id} not found` }
      );
    }
    
    return result.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      throw error; // Re-throw DomainError
    }
    throw createDomainError(
      ErrorCodes.DATABASE_FIND,
      readProjectByIdUC,
      "readProjectByIdUC",
      "tryAgainOrContact",
      { entity: "project", optionalMessage: error instanceof Error ? error.message : String(error) }
    );
  }
};

// === Landing Page Transformations (Moved from Presentation) ===

const FALLBACK_LOCALE = "en";
const SUPPORTED_LOCALES = new Set(["en", "es", "ca", "de"]);

export type LandingProject = {
  id: string;
  title: string;
  description: string;
  summary: string;
  techBadges: string[];
  keys: string[];
};

/**
 * Resolve locale to supported value
 * Business logic: locale validation and fallback
 */
const resolveLocale = (locale?: string): string => {
  if (!locale) return FALLBACK_LOCALE;
  return SUPPORTED_LOCALES.has(locale) ? locale : FALLBACK_LOCALE;
}

/**
 * Translate internationalized record
 * Business logic: i18n translation with fallbacks
 */
const translateIntl = (intlRecord: Record<string, string> | undefined, locale: string): string => {
  if (!intlRecord) return "";
  return intlRecord[locale] ?? intlRecord[FALLBACK_LOCALE] ?? Object.values(intlRecord)[0] ?? "";
}

/**
 * Map projects to landing format
 * Business logic: data transformation for landing page
 */
const mapProjects = (projects: Project[] | undefined, locale: string): LandingProject[] => {
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

/**
 * Get projects formatted for landing page
 * Orchestrates reading + transformation logic
 */
export const getProjectsForLandingUC = async (locale?: string): Promise<LandingProject[]> => {
  const normalizedLocale = resolveLocale(locale);
  
  try {
    const response = await readProjectUC();
    if (!response.success) return [];
    return mapProjects(response.data, normalizedLocale);
  } catch {
    // Landing page should not fail - return empty array
    return [];
  }
};
