import { ResFlow } from "@log-ui/core/domain/flows/res.type";
import type { FullTechData, TechBase } from "@log-ui/core/domain/entities/tech";
import { DBBase } from "@/dynamic.types";
export type Lib = TechBase & DBBase;
export type Fw = TechBase & DBBase & {
  librerias?: Lib[];
}
export type Leng = TechBase & DBBase & {
  frameworks?: Fw[];
}
export type ReadCategoryTechsRes = {
  dispoFw: { name: string }[];
  dispoLeng: { name: string }[];
};

export type ReadAllFlattenTechsRes = ReadCategoryTechsRes &{
  techs: Lib[];
  flattenTechs: FullTechData[];
} 

/**
 * Contrato de repositorio para el recurso Tech
 * Exponer el endpoint dinámico /tech/:type donde type es ReadAllParams
 */
export interface TechInterface {
  /** Lee datos de tech según el tipo solicitado (uso genérico, Full por defecto) */
  // readByType(type: ReadAllParams): Promise<ResFlow<ReadAllFlattenTechsRes>>;
  /** Lee solo DB (lenguajes y frameworks con _id, etc.) */
  readDb(): Promise<ResFlow<Lib[]>>;
  /** Lee solo flatten de techs (valores calculados) */
  readFlatten(): Promise<ResFlow<FullTechData[]>>;
  /** Lee solo categorías disponibles (lenguajes y frameworks) */
  readCategory(): Promise<ResFlow<ReadCategoryTechsRes>>;
  /** Lee todo: db + flatten + categorías */
  readFull(): Promise<ResFlow<ReadAllFlattenTechsRes>>;
}


