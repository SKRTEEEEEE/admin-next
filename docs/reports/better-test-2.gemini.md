# Estrategia de Testing para `log-ui-ts` con Vitest (Tests Delegados)

Este documento detalla el enfoque para implementar tests unitarios y de componentes para el submódulo `log-ui-ts`, superando los desafíos relacionados con su `package.json` y la estructura del proyecto.

## Contexto y Desafío

1.  **Cohesión de Código:** Los tests de una pieza de software deberían vivir junto a su código fuente para facilitar el mantenimiento. Por lo tanto, los tests de `log-ui-ts` deben estar en `log-ui-ts/tests`.
2.  **Submódulo Ligero:** `log-ui-ts` es un submódulo de código compartido y no debe tener sus propias `devDependencies` (como `vitest`, `@testing-library/react`, etc.). Su `package.json` solo actúa como un "contrato-documento" para `peerDependencies`.
3.  **Ejecución Centralizada:** El proyecto anfitrión (`admin-next`) ya tiene todas las herramientas de testing y es el responsable de ejecutar todos los tests del monorepo.

El desafío es: **¿Cómo ejecutar tests que están en el submódulo desde el proyecto anfitrión, sin que el submódulo tenga dependencias de desarrollo?**

## Solución: Patrón de "Tests Delegados"

La solución es configurar el "test runner" del proyecto anfitrión (`admin-next`) para que descubra y ejecute los tests que residen dentro del submódulo `log-ui-ts`.

### Cómo Funciona

1.  **`log-ui-ts` almacena los tests:** Se crea un directorio `log-ui-ts/tests/` donde se escribirán todos los ficheros de test (`*.test.ts`, `*.test.tsx`). Esto mantiene el código y sus pruebas juntos.
2.  **`admin-next` proporciona el entorno de testing:** El `package.json` de `admin-next` es el único que contiene `vitest`, `jsdom`, `@testing-library/react`, etc.
3.  **`admin-next` es el ejecutor (Test Runner):** La configuración de Vitest en `admin-next` se modifica para que su `include` apunte no solo a sus propios tests, sino también a los del directorio `log-ui-ts/tests/`.

Este enfoque resuelve elegantemente todos los desafíos: los tests están donde deben estar, `log-ui-ts` se mantiene sin dependencias de desarrollo y se aprovecha la infraestructura de testing ya existente en el proyecto anfitrión.

## Plan de Implementación

### Paso 1: Crear la estructura de tests en `log-ui-ts`

1.  Crear los siguientes directorios dentro de `log-ui-ts`:
    *   `log-ui-ts/tests/`
    *   `log-ui-ts/tests/vitest/`
    *   `log-ui-ts/tests/vitest/unit/`
    *   `log-ui-ts/tests/vitest/component/`

2.  Crear un fichero de prueba de ejemplo para validar la configuración:
    *   **Archivo:** `log-ui-ts/tests/vitest/unit/sample.test.ts`
    *   **Contenido:**
        ```typescript
        import { describe, it, expect } from 'vitest';

        describe('Sample test from log-ui-ts', () => {
          it('should pass', () => {
            expect(1 + 1).toBe(2);
          });
        });
        ```

### Paso 2: Actualizar la configuración de Vitest en `admin-next`

Modificar el archivo `vitest.config.ts` del proyecto anfitrión (`admin-next`) para que busque tests también en el submódulo.

```typescript
// En: admin-next/vitest.config.ts

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // ...
  test: {
    // ...
    // Asegurarse de que el "include" original se mantiene
    // y se añade la nueva ruta.
    include: [
      'src/tests/vitest/**/*.{test,spec}.{ts,tsx}', // Ruta existente
      'log-ui-ts/tests/vitest/**/*.{test,spec}.{ts,tsx}' // <-- AÑADIR ESTA LÍNEA
    ],
    // ...
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@log-ui': path.resolve(__dirname, './log-ui-ts'),
    },
  },
});
```
*Nota: La configuración de alias (`resolve.alias`) ya debería estar presente y ser correcta para que los imports funcionen, pero se incluye aquí como referencia.*

### Paso 3: Validar la Ejecución

Después de aplicar estos cambios, ejecutar `npm run vitest:run` desde la raíz de `admin-next`. La salida debería mostrar que los tests de `admin-next` y el nuevo `sample.test.ts` de `log-ui-ts` se han ejecutado correctamente.

Este enfoque de "Tests Delegados" es la mejor práctica para la situación actual, ya que proporciona una estructura de testing limpia, cohesiva y mantenible sin comprometer la ligereza y portabilidad del submódulo `log-ui-ts`.
