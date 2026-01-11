# Informe de Mejoras `log-ui-ts` (v2)

Siguiendo tu feedback, este informe se centra en soluciones pragmáticas para los puntos discutidos.

## 1. Mejora del Manejo de Errores (`friendlyDesc`)

El objetivo es hacer el sistema más predecible y robusto, con y sin modificar `profile-domain`.

### Solución A: Sin modificar `profile-domain` (Recomendada a corto plazo)

Crearemos un "adaptador" o "envoltorio" (wrapper) dentro de `log-ui-ts`. La idea es interceptar el `DomainError` y enriquecerlo antes de que sea procesado por `analyzeError`.

**Plan de implementación:**

1.  **Crear un `ErrorWrapper` en `log-ui-ts`:**
    *   Se crea una nueva función, por ejemplo, `createLogError`, que internamente llama a `createDomainError`.
    *   Esta función aceptará un `behavior` (ej: `{ type: 'toast', messageKey: 'auth.invalid' }`) en lugar del `friendlyDesc` string.
    *   Mapeará este `behavior` al `friendlyDesc` y a los `meta` correctos que `createDomainError` espera.

    ```typescript
    // en: log-ui-ts/lib/error-wrapper.ts
    import { createDomainError } from '@skrteeeeee/profile-domain';

    export function createLogError(behavior, originalMeta) {
      const { friendlyDesc, meta } = mapBehaviorToDomainErrorParams(behavior);
      return createDomainError(..., friendlyDesc, { ...originalMeta, ...meta });
    }
    ```

2.  **Refactorizar `log-ui-ts`:**
    *   Internamente, `log-ui-ts` dejará de usar `createDomainError` directamente y usará `createLogError`.

**Ventajas:**
*   **Cero impacto** en el backend u otros frontends.
*   La lógica compleja se aísla en `log-ui-ts`.
*   Se elimina el uso de "strings mágicos" en el código del día a día.

### Solución B: Modificando `profile-domain` (Recomendada a largo plazo)

Para que los `meta` lleguen correctamente, el `DomainError` debe poder transportar un payload de metadatos sin que el `Error` base de JS lo descarte.

**Plan de implementación:**
1.  **Modificar `DomainError` en `profile-domain`:**
    *   Asegurarse de que la clase `DomainError` serialice y adjunte correctamente los metadatos. Se puede usar una propiedad específica como `public readonly metadata: Record<string, any>`.

2.  **Hacer `friendlyDesc` opcional y priorizar `meta`:**
    *   Modificar `createDomainError` para que acepte un objeto de configuración más rico, y marcar `friendlyDesc` como obsoleto (`@deprecated`).

    ```typescript
    // En @skrteeeeee/profile-domain
    // El nuevo `meta` podría contener el comportamiento esperado
    throw createDomainError(code, context, {
        behavior: 'toast',
        i18nKey: 'errors.tryAgain'
    });
    ```
**Ventaja:** Solución más limpia y escalable para todo el ecosistema.
**Riesgo:** Requiere una actualización coordinada de todas las aplicaciones que usan `profile-domain`.

## 2. Unificación de la Configuración: Modelo Híbrido

La configuración está dispersa. La solución ideal no es mover todo al proyecto anfitrión, sino adoptar un **modelo híbrido** que equilibre la responsabilidad.

**Filosofía:**
- **`log-ui-ts` (Submódulo):** Define la **estructura** de la configuración (tipos), exporta **utilidades** para consumirla (ej: `getAppUrl`), y provee **valores por defecto** para reglas comunes. Exporta una función `defineConfig` para garantizar el tipado.
- **`admin-next` (Proyecto Anfitrión):** "Rellena" la configuración con los datos específicos de su implementación (endpoints, rutas, traducciones), fusionándolos con los defaults del submódulo.

**Plan de implementación:**

1.  **Crear un `config` central en `log-ui-ts`:**
    *   En `log-ui-ts/lib/config`, se creará un archivo `index.ts` que defina los tipos de toda la configuración (`LogUiConfig`) y la función `defineLogUiConfig`.
    *   `defineLogUiConfig` será una función de ayuda (helper) que simplemente devuelve la configuración que se le pasa, pero asegurando que cumple con el tipo `DeepPartial<LogUiConfig>`. Esto proporciona autocompletado y seguridad de tipos en el proyecto anfitrión.

2.  **Crear `log-ui.config.ts` en el Proyecto Anfitrión:**
    *   En la raíz de `admin-next`, se crea este archivo.
    *   Se importa `defineLogUiConfig` de `@log-ui/lib/config`.
    *   Se define la configuración específica de `admin-next`.

    ```typescript
    // en: /admin-next/log-ui.config.ts
    import { defineLogUiConfig } from '@log-ui/lib/config';

    export const logUiConfig = defineLogUiConfig({
      // El anfitrión SOBRESCRIBE los endpoints de las apps
      apps: [
        { id: "profile", url: { dev: "...", prod: "..." } },
        { id: "agora", url: { dev: "...", prod: "..." } },
      ],
      // El anfitrión DEFINE sus rutas de navegación específicas
      nav: {
        paths: [
          { id: "home", path: "/" },
          { id: "dashboard", path: "/dashboard" },
        ],
      },
      i18n: {
        path: './src/data/{locale}/log-ui.json',
      }
    });
    ```

3.  **`log-ui-ts` consume la configuración:**
    *   El submódulo importará y usará `logUiConfig` desde una ruta de alias (ej: `@/log-ui.config`) que el proyecto anfitrión debe configurar en su `tsconfig.json`.
    *   Internamente, `log-ui-ts` fusionará la configuración proporcionada por el anfitrión con sus propios valores por defecto.

    ```typescript
    // Ejemplo de cómo log-ui-ts usaría la config
    import { logUiConfig } from '@/log-ui.config'; // Alias al archivo del anfitrión
    import { defaultConfig } from './defaults'; // Defaults internos de log-ui-ts

    const finalConfig = { ...defaultConfig, ...logUiConfig };

    // Ahora las funciones usan finalConfig
    function getAppUrl(appId: string): string {
      const app = finalConfig.apps.find(a => a.id === appId);
      // ...
    }
    ```

**Ventajas de este modelo:**
*   **Claridad:** Se sabe qué es una regla por defecto (`log-ui-ts`) y qué es una implementación (`admin-next`).
*   **Seguridad de tipos:** `defineLogUiConfig` asegura que la configuración es correcta.
*   **Mantenibilidad:** La configuración específica vive con su proyecto, pero sigue una estructura central.
*   **Autonomía:** `log-ui-ts` puede funcionar con su config por defecto para sus propios tests o storybook, sin depender del anfitrión.

## 3. Aclaración sobre `peerDependencies`

Tu razonamiento es correcto: no quieres duplicar el código. `peerDependencies` es precisamente la herramienta para esto.

*   **`dependencies`:** "Mi código necesita ESTA librería para funcionar. Instálala para mí."
*   **`peerDependencies`:** "Mi código necesita que el ENTORNO (el proyecto anfitrión) proporcione ESTA librería. Yo no la voy a instalar, pero si no está, avisa de que algo va mal."

Al declarar `thirdweb`, `uploadthing` y `@skrteeeeee/profile-domain` como `peerDependencies` en el `package.json` de `log-ui-ts`, consigues:
1.  **Cero duplicación:** `log-ui-ts` no instala su propia copia.
2.  **Contrato explícito:** `npm` o `yarn` mostrarán una advertencia si `admin-next` no tiene instaladas estas dependencias, previniendo errores en tiempo de ejecución.
3.  **Versión única:** Se asegura que tanto `admin-next` como `log-ui-ts` usan la misma instancia y versión de la dependencia.

Es la práctica estándar para librerías y plugins compartidos.
