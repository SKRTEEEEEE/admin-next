import {
  Project,
  ProjectInterface,
} from "@/core/application/interfaces/entities/project.interface";
import { ResFlow, createDomainError, ErrorCodes } from "@skrteeeeee/profile-domain";
import { ApiBaseRepository, Modules } from "@log-ui/core/infrastructure/api/base.repository";

export class ProjectApiRepository
  extends ApiBaseRepository
  implements ProjectInterface
{
  constructor(baseUrl?: string) {
    super(Modules.PROJECTS, baseUrl);
  }

  async readEjemplo(): Promise<ResFlow<Project[]>> {
    const endpoint = this.getEndpointModule("list") || `${this.baseUrl}/project`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        ProjectApiRepository,
        "readEjemplo",
        "tryAgainOrContact",
        { entity: "projects", optionalMessage: `HTTP ${response.status}: ${response.statusText}` }
      );
    }
    return response.json();
  }

  async readById(id: string): Promise<ResFlow<Project>> {
    const endpointResult = this.getDynamicEndpointModule("readById", id);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/project/${id}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        ProjectApiRepository,
        "readById",
        "tryAgainOrContact",
        { entity: "project", optionalMessage: `HTTP ${response.status}: ${response.statusText} (id: ${id})` }
      );
    }
    return response.json();
  }
}

//singleton
// 🔥 FORZADO A LOCALHOST PARA DEBUGGING
// export const projectApiRepository = new ProjectApiRepository("http://localhost:3001")
export const projectApiRepository = new ProjectApiRepository(
  process.env.TEST_ENV !== "development"
    ? "https://kind-creation-production.up.railway.app"
    : "http://localhost:3001"
);
