import { ResFlow, createDomainError, ErrorCodes } from "@skrteeeeee/profile-domain";
import { ApiBaseRepository, Modules } from "@log-ui/core/infrastructure/api/base.repository";

import { ReadAllParams } from "@skrteeeeee/profile-domain";
import type { Lib, ReadAllFlattenTechsRes, ReadCategoryTechsRes, TechInterface } from "@/core/application/interfaces/entities/tech.interface";
import { FullTechData } from "@skrteeeeee/profile-domain";
// src/core/infrastructure/api/tech.repository(-or->service).ts
export class TechApiRepository
  extends ApiBaseRepository
  implements TechInterface
{
  constructor(baseUrl?: string) {
    super(Modules.TECH, baseUrl);
  }

  async readDb(): Promise<ResFlow<Lib[]>> {
    const endpointResult = this.getDynamicEndpointModule("readAll", ReadAllParams.Db);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/tech/${ReadAllParams.Db}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        TechApiRepository,
        "readDb",
        "tryAgainOrContact",
        { entity: "techs (db)", optionalMessage: `HTTP ${response.status}: ${response.statusText}` }
      );
    }
    return response.json();
  }

  async readFlatten(): Promise<ResFlow<FullTechData[]>> {
    const endpointResult = this.getDynamicEndpointModule("readAll", ReadAllParams.Flatten);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/tech/${ReadAllParams.Flatten}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        TechApiRepository,
        "readFlatten",
        "tryAgainOrContact",
        { entity: "techs (flatten)", optionalMessage: `HTTP ${response.status}: ${response.statusText}` }
      );
    }
    return response.json();
  }

  async readCategory(): Promise<ResFlow<ReadCategoryTechsRes>> {
    const endpointResult = this.getDynamicEndpointModule("readAll", ReadAllParams.Category);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/tech/${ReadAllParams.Category}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        TechApiRepository,
        "readCategory",
        "tryAgainOrContact",
        { entity: "techs (category)", optionalMessage: `HTTP ${response.status}: ${response.statusText}` }
      );
    }
    return response.json();
  }

  async readFull(): Promise<ResFlow<ReadAllFlattenTechsRes>> {
    const endpointResult = this.getDynamicEndpointModule("readAll", ReadAllParams.Full);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/tech/${ReadAllParams.Full}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        TechApiRepository,
        "readFull",
        "tryAgainOrContact",
        { entity: "techs (full)", optionalMessage: `HTTP ${response.status}: ${response.statusText}` }
      );
    }
    return response.json();
  }
}

// src/core/infrastructure/api/tech.singleton.ts
export const techApiRepository = new TechApiRepository(
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
);