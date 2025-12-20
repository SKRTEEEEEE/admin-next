"use client";

import { useToastOnce } from "@log-ui/lib/hooks/use-toast-once";
import { useTranslations, useLocale } from "next-intl";
import type { SerializedError } from "@log-ui/lib/error-serialization";

type ProjectsSectionFallbackProps = {
  error: SerializedError; // ✅ Obligatorio
};

/**
 * Client Component fallback para ProjectsSection
 * Muestra toast con el error y renderiza empty state
 * 
 * @param error - Error serializado del servidor (OBLIGATORIO)
 */
export function ProjectsSectionFallback({ error }: ProjectsSectionFallbackProps) {
  const t = useTranslations("admin");
  const locale = useLocale() as "es" | "en" | "ca" | "de";
  
  // Extraer mensaje según tipo de friendlyDesc
  let message = "Error loading projects"; // fallback por defecto
  
  if (error.friendlyDesc) {
    if (typeof error.friendlyDesc === 'string') {
      // friendlyDesc es string ('tryAgainOrContact', 'credentials', etc.)
      message = error.friendlyDesc;
    } else if (typeof error.friendlyDesc === 'object' && locale in error.friendlyDesc) {
      // friendlyDesc es IntlBase con i18n
      message = error.friendlyDesc[locale];
    }
  }
  
  // Mostrar toast una sola vez
  useToastOnce(message);
  
  return (
    <div className="rounded-xl border border-border/40 bg-card/30 px-6 py-8 text-sm text-muted-foreground">
      {t("projects.empty")}
    </div>
  );
}
