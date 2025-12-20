"use client";

import { Button } from "@/components/ui/button";
import { analyzeError, getErrorIcon, ErrorIcon } from "@log-ui/lib/hooks";
import { createDomainError, ErrorCodes } from "@skrteeeeee/profile-domain";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import type { SerializedError } from "@log-ui/lib/error-serialization";

/**
 * Componente de demostración del sistema de toast para errores DomainError
 * 
 * Muestra ejemplos de cómo usar analyzeError con ErrorIcon enum:
 * - String predefinido ('credentials') → ErrorIcon.CREDENTIALS (🛡️ ShieldX)
 * - String predefinido ('tryAgainOrContact') → ErrorIcon.TRY_AGAIN_OR_CONTACT (💥 ServerCrash)
 * - IntlBase personalizado + meta.icon → ErrorIcon especificado (ej: ALERT_CIRCLE ⚠️)
 */
export function ErrorToastDemo() {
  const t = useTranslations("admin.errorDemo");
  const locale = useLocale() as "es" | "en" | "ca" | "de";

  // Helper para mostrar toast (simula lo que haría SectionFallbackProvider)
  const showToast = (error: SerializedError) => {
    const title = error.title[locale];
    const description = error.description[locale];
    const icon = getErrorIcon(error.iconType);
    
    toast.error(title, { description, icon });
  };

  const simulatePredefinedError = () => {
    try {
      throw createDomainError(
        ErrorCodes.UNAUTHORIZED_ACTION,
        ErrorToastDemo,
        "simulatePredefinedError",
        'credentials' // String predefinido → profile-domain expande a meta.desc="Credenciales..." → 🛡️ ShieldX
      );
    } catch (error) {
      const serializedError = analyzeError(error);
      if (serializedError.description.es !== 'd') {
        showToast(serializedError);
      }
    }
  };

  const simulateCustomError = () => {
    try {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        ErrorToastDemo,
        "simulateCustomError",
        {
          es: "No se encontró el recurso solicitado",
          en: "The requested resource was not found",
          ca: "No s'ha trobat el recurs sol·licitat",
          de: "Die angeforderte Ressource wurde nicht gefunden"
        }, // IntlBase → Se usa como DESCRIPCIÓN
        {
          desc: {
            es: "Recurso no encontrado",
            en: "Resource not found",
            ca: "Recurs no trobat",
            de: "Ressource nicht gefunden"
          }, // meta.desc → Se usa como TÍTULO
          icon: ErrorIcon.ALERT_CIRCLE // ← Especifica el icono con enum
        }
      );
    } catch (error) {
      const serializedError = analyzeError(error);
      showToast(serializedError);
    }
  };

  const simulateNetworkError = () => {
    try {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        ErrorToastDemo,
        "simulateNetworkError",
        {
          es: "No se pudo conectar con el servidor. Intenta más tarde.",
          en: "Could not connect to server. Try again later.",
          ca: "No s'ha pogut connectar amb el servidor. Prova més tard.",
          de: "Verbindung zum Server fehlgeschlagen. Versuche es später erneut."
        },
        {
          desc: {
            es: "Ups, error de conexión",
            en: "Oops, connection error",
            ca: "Ups, error de connexió",
            de: "Hoppla, Verbindungsfehler"
          } // meta.desc empieza con "ups" → ServerCrash (💥)
        }
      );
    } catch (error) {
      const serializedError = analyzeError(error);
      showToast(serializedError);
    }
  };

  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-2">{t("title")}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t("description")}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline"
          className="flex-1"
          onClick={simulatePredefinedError}
        >
          🛡️ {t("buttons.credentials")}
        </Button>
        
        <Button 
          variant="outline"
          className="flex-1"
          onClick={simulateCustomError}
        >
          ⚠️ {t("buttons.custom")}
        </Button>
        
        <Button 
          variant="outline"
          className="flex-1"
          onClick={simulateNetworkError}
        >
          💥 {t("buttons.network")}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded space-y-2">
        <p><strong>{t("info.title")}</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>{t("info.feature1")}</li>
          <li><code>ErrorIcon.CREDENTIALS</code> → 🛡️ {t("info.iconCredentials")}</li>
          <li><code>ErrorIcon.TRY_AGAIN_OR_CONTACT</code> → 💥 {t("info.iconServer")}</li>
          <li><code>ErrorIcon.ALERT_CIRCLE</code> → ⚠️ {t("info.iconGeneric")}</li>
          <li>{t("info.feature5")}</li>
        </ul>
      </div>
    </div>
  );
}
