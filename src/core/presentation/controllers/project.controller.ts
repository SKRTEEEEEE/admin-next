"use server";

import { getProjectsForLandingUC, type LandingProject } from "@/core/application/usecases/entities/project";

/**
 * Project Controller
 * Presentation Layer: Handles Next.js Server Actions
 * Delegates business logic to Application Layer use cases
 * 
 * @responsibility Handle HTTP/Server Action requests and delegate to use cases
 */

/**
 * Fetch projects for landing page
 * Server Action that delegates to getProjectsForLandingUC
 */
export async function fetchLandingProjects(locale?: string): Promise<LandingProject[]> {
  return getProjectsForLandingUC(locale);
}
