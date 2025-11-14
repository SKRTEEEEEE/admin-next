import { ResFlow } from "@log-ui/core/domain/flows/res.type";
import { ApiBaseRepository, Modules } from "@log-ui/core/infrastructure/api/base.repository";

import { ReadAllParams } from "@log-ui/core/domain/entities/tech.type";
import type { Lib, ReadAllFlattenTechsRes, ReadCategoryTechsRes, TechInterface } from "@/core/application/interface/tech.interface";
import { FullTechData } from "@log-ui/core/domain/entities/tech";
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
    return response.json();
  }

  async readFlatten(): Promise<ResFlow<FullTechData[]>> {
    const endpointResult = this.getDynamicEndpointModule("readAll", ReadAllParams.Flatten);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/tech/${ReadAllParams.Flatten}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    return response.json();
  }

  async readCategory(): Promise<ResFlow<ReadCategoryTechsRes>> {
    const endpointResult = this.getDynamicEndpointModule("readAll", ReadAllParams.Category);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/tech/${ReadAllParams.Category}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    return response.json();
  }

  async readFull(): Promise<ResFlow<ReadAllFlattenTechsRes>> {
    const endpointResult = this.getDynamicEndpointModule("readAll", ReadAllParams.Full);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/tech/${ReadAllParams.Full}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    return response.json();
  }
}

// src/core/infrastructure/api/tech.singleton.ts
export const techApiRepository = new TechApiRepository(process.env.TEST_ENV !== "development" ? "https://kind-creation-production.up.railway.app" : "http://localhost:3001");

console.log("test_env: ",process.env.TEST_ENV)