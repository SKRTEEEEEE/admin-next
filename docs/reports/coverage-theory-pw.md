# Teoría de Cobertura: Playwright vs NYC

Este documento explica por qué el coverage de Playwright no es automático y cómo se diferencia de herramientas como Vitest.

## 1. ¿Playwright tiene coverage nativo?
**Sí y No.**
Playwright puede activar la recolección de métricas de V8 (el motor de Chrome), pero lo que obtiene es un "volcado de memoria" crudo. No genera un reporte HTML amigable ni lo integra con tus archivos fuente automáticamente. Para que sea útil, necesitas herramientas externas que conviertan ese volcado de V8 al formato estándar (Estambul/Lcov).

## 2. ¿Por qué NYC ya no detecta nada?
NYC funciona midiendo qué líneas de código se ejecutan **en el proceso de Node.js**.
- **Antes**: Probablemente tenías tests de unidad en Playwright que corrían lógica directamente en Node. NYC veía ese proceso y contaba las líneas.
- **Ahora**: Al movernos a E2E/Integración, el código de la app corre **dentro del navegador**, no en Node. Node solo ejecuta "las instrucciones" del test (clics, esperas), pero no el código de la aplicación.
- **Resultado**: NYC ve que sus tests de Playwright se ejecutan al 100%, pero no tiene visibilidad de lo que pasa dentro de Chrome.

## 3. El problema de la Instrumentación
Para que el navegador pueda "contar" qué líneas usa, el código debe estar **instrumentado** (inyectar contadores en cada línea).
- Vitest lo hace automáticamente en memoria.
- Next.js (SWC) no lo hace por defecto para no ralentizar la app.
- Sin instrumentación, la variable `window.__coverage__` en el navegador está vacía, y por eso NYC (en el servidor) no recibe datos.

## 4. Diferencia con Vitest
Vitest corre en un entorno simulado (JSDOM) donde el test y el código comparten el mismo proceso de Node. Por eso el coverage es "gratis". Playwright es un sistema distribuido: tu código está en un puerto (3000) y tus tests en otro proceso, separados por una barrera insalvable sin instrumentación previa.
