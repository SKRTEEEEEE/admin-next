import { ResFlow, FullTechData } from "@skrteeeeee/profile-domain";
import type { Lib, ReadAllFlattenTechsRes, ReadCategoryTechsRes } from "@/core/application/interfaces/entities/tech.interface";
import { techApiRepository } from "@/core/infrastructure/api/tech.repo";

/**
 * Read techs in database format
 */
export const readTechDbUC = async (): Promise<ResFlow<Lib[]>> => {
  return techApiRepository.readDb();
}

/**
 * Read techs in flattened format
 */
export const readTechFlattenUC = async (): Promise<ResFlow<FullTechData[]>> => {
  return techApiRepository.readFlatten();
}

/**
 * Read techs grouped by category
 */
export const readTechCategoryUC = async (): Promise<ResFlow<ReadCategoryTechsRes>> => {
  return techApiRepository.readCategory();
}

/**
 * Read full tech data (all formats)
 */
export const readTechFullUC = async (): Promise<ResFlow<ReadAllFlattenTechsRes>> => {
  return techApiRepository.readFull();
}


