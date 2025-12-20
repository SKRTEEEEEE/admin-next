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
    
    try {
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
    } catch (error) {
      // Si el error ya es un DomainError, re-lanzar
      if (error && typeof error === 'object' && 'type' in error && 'friendlyDesc' in error) {
        throw error;
      }
      
      // Error de red (ECONNREFUSED, timeout, etc.) - Backend no disponible
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        ProjectApiRepository,
        "readEjemplo",
        {
          es: "No se pudo conectar con el servidor. Intenta más tarde.",
          en: "Could not connect to server. Try again later.",
          ca: "No s'ha pogut connectar amb el servidor. Prova més tard.",
          de: "Verbindung zum Server fehlgeschlagen. Versuche es später erneut."
        }, // friendlyDesc con i18n para errores de red
        { 
          entity: "projects", 
          optionalMessage: error instanceof Error ? error.message : String(error)
        }
      );
    }
  }

  async readById(id: string): Promise<ResFlow<Project>> {
    const endpoint = this.getEndpointModule("readById").replace(":id", id) || `${this.baseUrl}/project/${id}`;
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
export const projectApiRepository = new ProjectApiRepository(
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
);
