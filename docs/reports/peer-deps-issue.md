# `peerDependencies` en `log-ui-ts` - Informe de Problema y Solución

Este documento describe el problema encontrado al intentar automatizar la validación de `peerDependencies` en el submódulo `log-ui-ts` y proporciona una solución manual recomendada.

## Problema: `peerDependencies` de un Submódulo Local no se validan automáticamente

El objetivo era crear un `package.json` en `log-ui-ts` para declarar `peerDependencies`. Esto debía servir como un contrato explícito para que el proyecto host (`admin-next`) se asegurara de tener las dependencias correctas.

Se intentaron dos enfoques:
1.  **Enfoque natural:** Se esperaba que `npm install` en el proyecto raíz leyera el `package.json` del submódulo y advirtiera sobre las `peerDependencies` faltantes. **Esto no funcionó**, ya que `npm` no procesa las `peerDependencies` de submódulos locales referenciados con `file:`.
2.  **Enfoque con script:** Se creó un script (`scripts/check-peer-deps.js`) para validar manualmente las `peerDependencies`. Aunque se hicieron múltiples intentos, el script resultó ser frágil y propenso a errores debido a las complejidades del entorno y la resolución de versiones.

**Conclusión del problema:** No existe una forma fiable de automatizar la validación de `peerDependencies` para un submódulo local en este entorno.

## Solución: `package.json` como "Contrato-Documento"

Dado que la validación automática no es factible, el `package.json` de `log-ui-ts` debe ser tratado **únicamente como un documento de referencia (un "contrato-documento")**. No tiene ningún efecto funcional en el proceso de instalación de dependencias, pero sirve como una **fuente de verdad** para que los desarrolladores sepan qué dependencias espera `log-ui-ts`.

Este enfoque de "contrato-documento" es una solución parcial y solo adquiere su plena funcionalidad cuando `log-ui-ts` se convierte en un paquete de `npm` y se instala como tal en el proyecto host.

**Acción recomendada:**

1.  **Cree un nuevo archivo** en la siguiente ruta:
    `C:/Users/adanr/Code/profile-migr/admin-next/log-ui-ts/package.json`

2.  **Copie y pegue el siguiente contenido** en el archivo. Este contenido representa el "contrato" de dependencias que `log-ui-ts` espera que el proyecto host cumpla:

    ```json
    {
      "name": "@log-ui/log-ui-ts",
      "version": "0.0.1",
      "description": "Shared UI components and utilities for micro-frontends",
      "main": "index.ts",
      "types": "index.d.ts",
      "sideEffects": false,
      "peerDependencies": {
        "next": "^16.0.10",
        "react": "^19.2.0",
        "react-dom": "^19.2.0",
        "typescript": "^5.0.0",
        "@skrteeeeee/profile-domain": "^0.0.2",
        "thirdweb": "^5.112.0",
        "uploadthing": "^7.7.4",
        "@uploadthing/react": "^7.3.3",
        "next-intl": "^4.4.0",
        "sonner": "^2.0.7",
        "lucide-react": "^0.544.0",
        "zod": "^4.1.12",
        "react-hook-form": "^7.66.0",
        "@hookform/resolvers/zod": "^5.2.2",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "tailwind-merge": "^3.3.1",
        "@radix-ui/react-alert-dialog": "^1.1.15",
        "@radix-ui/react-avatar": "^1.1.10",
        "@radix-ui/react-dialog": "^1.1.15",
        "@radix-ui/react-dropdown-menu": "^2.1.16",
        "@radix-ui/react-icons": "^1.3.2",
        "@radix-ui/react-label": "^2.1.8",
        "@radix-ui/react-navigation-menu": "^1.2.14",
        "@radix-ui/react-popover": "^1.1.15",
        "@radix-ui/react-select": "^2.2.6",
        "@radix-ui/react-separator": "^1.1.8",
        "@radix-ui/react-slot": "^1.2.3",
        "@radix-ui/react-tabs": "^1.1.13"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    }
    ```

3.  **Proceso de Verificación Manual (Obligatorio para desarrolladores):**
    *   **Al añadir/actualizar una dependencia en `log-ui-ts`:** El desarrollador **debe** actualizar el `package.json` de `log-ui-ts` para reflejar el cambio.
    *   **A continuación:** El desarrollador **debe** ir al `package.json` del proyecto host (`admin-next`) y asegurarse de que la dependencia está instalada y cumple con la versión requerida.
