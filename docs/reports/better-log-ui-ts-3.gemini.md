# Uso de `package.json` y `peerDependencies` en Submódulos (No Publicados como npm)

Este documento explora la relevancia de `package.json` y `peerDependencies` en el contexto de un submódulo como `log-ui-ts`, que se utiliza para compartir código directamente entre proyectos y no como un paquete npm publicado.

## Submódulos para Código Compartido
Un submódulo integra su código fuente directamente en el repositorio principal (host). Esto significa que, por defecto, el sistema de construcción y la gestión de dependencias del proyecto host son los que prevalecen. `log-ui-ts` funciona actualmente bajo este modelo, donde sus dependencias son resueltas por el `package.json` de `admin-next`.

## `package.json` en un Submódulo: ¿Por qué y para qué?
Aunque `log-ui-ts` no se publique en npm, un `package.json` dentro del submódulo podría tener utilidad:
-   **Dependencias de Desarrollo:** Para definir dependencias específicas (`devDependencies`) necesarias para el desarrollo, pruebas o linting interno del propio submódulo, de forma aislada del proyecto host.
-   **Scripts:** Para scripts de construcción o prueba propios del submódulo.
-   **Metadatos:** Para documentar versiones de Node.js, licencias o autores del submódulo.

Si el `package.json` de `log-ui-ts` no existe, se asume que su desarrollo y dependencias son completamente gestionados por el proyecto host.

## `peerDependencies` en Submódulos (sin Publicar)
La función principal de `peerDependencies` es declarar dependencias que el *entorno consumidor* (el proyecto host) debe proporcionar. Incluso sin publicar `log-ui-ts` como un paquete npm, `peerDependencies` seguiría siendo una herramienta valiosa para:

1.  **Declaración Explícita:** Servir como una "declaración de contrato" o documentación. Indica que `log-ui-ts` espera que el proyecto host tenga instaladas ciertas librerías (ej. `@skrteeeeee/profile-domain`, `thirdweb`, `uploadthing`).
2.  **Consistencia de Versiones:** Al declarar una `peerDependency` (ej. `@skrteeeeee/profile-domain`), se comunica al desarrollador del proyecto host que `log-ui-ts` está diseñado para funcionar con una versión específica de esa dependencia. Esto fomenta el uso de una única instancia y versión de la librería en todo el monorepo.
3.  **Prevención de Duplicación:** Aunque en un submódulo directo la duplicación de código no es el problema principal (ya que el código está en un solo lugar), el uso de `peerDependencies` ayuda a evitar que los sistemas de empaquetado del host instalen varias copias de la misma librería si tanto el host como el submódulo la utilizan.
4.  **Verificación Temprana:** Herramientas de análisis de dependencias o instaladores (como `npm` o `yarn`) pueden emitir advertencias si el host no cumple con las `peerDependencies` declaradas en el submódulo, identificando problemas antes del tiempo de ejecución.

En resumen, incluso para un submódulo no publicado, `peerDependencies` ofrece un mecanismo robusto para comunicar y gestionar las expectativas sobre las dependencias externas que deben ser proporcionadas por el proyecto que lo integra. Para implementar esto, sería necesario añadir un `package.json` mínimo al submódulo `log-ui-ts`.
