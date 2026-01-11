# Decisión Técnica: Arquitectura de Cobertura en Playwright

## Contexto y Complicaciones con NYC
Actualmente, **NYC no detecta cobertura en Playwright** porque el código de la aplicación se ejecuta en un proceso aislado (el navegador) mientras que NYC monitoriza el proceso de Node.js que lanza los tests.

- **Complicación actual**: El motor de NYC "ve" que los archivos de test se ejecutan, pero como no hay instrumentación en el código servido por Next.js, no recibe contadores de líneas desde el frontend.

## El Camino de la Solución (Posible Implementación)
Para recuperar el coverage, se requeriría una arquitectura de tres capas:

1. **Instrumentación (SWC)**: Instalar y configurar `swc-plugin-coverage-instrument`. Esto inyecta código de seguimiento en cada línea durante el build de Next.js.
2. **Extracción (Fixture)**: Crear un Fixture global en Playwright que, tras cada test, extraiga el objeto `window.__coverage__` y lo persista en disco.
3. **Orquestación (Scripts)**: Añadir lógica en `package.json` para levantar el servidor instrumentado, correr tests y unificar JSONs dispersos.

## Riesgos y Complicaciones de la Solución
A pesar de ser técnicamente posible, se descarta por los siguientes motivos:

- **Fragilidad de SWC**: Los plugins de instrumentación de SWC son experimentales y suelen romperse con cada actualización menor de Next.js, generando errores de "AST Mismatch" difíciles de depurar.
- **Sobrecarga de Dependencias**: Requiere mantener librerías adicionales y scripts complejos de "merging" de reportes que dificultan la mantenibilidad del repo para un único desarrollador.
- **Impacto en Rendimiento**: Instrumentar el código añade una carga de procesamiento al navegador que puede desvirtuar los tests de **Performance**.
- **Valor Retorno bajo**: Con Vitest ya cubriendo el 100% de la lógica de negocio (Use Cases y Repositorios), la métrica de Playwright solo añadiría visibilidad sobre el "pegamento" de la UI, lo cual ya queda validado visual y funcionalmente al pasar el **Test-Padre**.

## Conclusión Final
Se decide priorizar un **"Smoke Test" robusto** (E2E) por encima de una métrica de línea inestable. La seguridad del proyecto reside en que los flujos críticos funcionen de principio a fin, no en el porcentaje estadístico de líneas del frontend.
