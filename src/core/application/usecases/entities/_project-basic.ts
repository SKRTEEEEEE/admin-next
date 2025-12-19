import { Project } from "../../interfaces/entities/project.interface";
import { ResFlow } from "@skrteeeeee/profile-domain";
import { projectApiRepository } from "@/core/infrastructure/api/project.repo";

/**
 * Read all example projects
 */
export const readProjectUC = async (): Promise<ResFlow<Project[]>> => {
  return projectApiRepository.readEjemplo();
}

/**
 * Read project by ID
 */
export const readProjectByIdUC = async (id: string): Promise<ResFlow<Project>> => {
  return projectApiRepository.readById(id);
}