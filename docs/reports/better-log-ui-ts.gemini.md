# Informe de Mejoras para `log-ui-ts`

## Visión General

`log-ui-ts` establece un marco robusto y estandarizado para los micro-frontends, especialmente en el manejo de errores y la autenticación. Su enfoque basado en Clean Architecture y la centralización de la lógica compartida son puntos fuertes. Sin embargo, se identifican áreas de mejora para reducir el acoplamiento, aumentar la flexibilidad y simplificar su uso.

## Puntos Clave a Mejorar

### 1. Sistema de Errores `friendlyDesc`

El sistema actual, aunque potente, genera un alto acoplamiento cognitivo. El desarrollador necesita recordar qué `friendlyDesc` (string mágico) produce qué comportamiento (silencioso, toast, error boundary).

**Sugerencia:**

Reemplazar los strings mágicos por un **enum** o un **objeto de configuración** que sea más explícito y auto-documentado.

*Ejemplo de mejora:*

```typescript
// En lugar de:
throw createDomainError(..., 'tryAgainOrContact', ...);

// Usar:
import { ErrorBehavior } from '@log-ui/core/errors';

throw createDomainError(..., ErrorBehavior.ShowToast, {
  type: 'serverError' // Para el icono y mensaje predefinido
});
```

Esto mejora la legibilidad y reduce la probabilidad de errores al escribir un string incorrecto.

### 2. Acoplamiento con `shadcn/ui` y Rutas de Host

`log-ui-ts` asume que el proyecto anfitrión utiliza `shadcn/ui` y que los componentes se encuentran en `@/components/ui`. Esto crea un acoplamiento fuerte y limita la flexibilidad del proyecto anfitrión.

**Sugerencia:**

Implementar un **sistema de inyección de dependencias o un "Adapter" de UI**. `log-ui-ts` debería exportar interfaces para los componentes que necesita, y el proyecto anfitrión sería responsable de proporcionar las implementaciones.

*Ejemplo:*

```typescript
// 1. log-ui-ts define la interfaz
export interface UiComponents {
  Button: React.ComponentType<any>;
  Dialog: React.ComponentType<any>;
  // ... resto de componentes
}

// 2. El proyecto anfitrión proporciona los componentes
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { LogUiProvider } from '@log-ui/core';

const myUiComponents: UiComponents = { Button, Dialog };

export function App({ children }) {
  return (
    <LogUiProvider ui={myUiComponents}>
      {children}
    </LogUiProvider>
  );
}
```

Este patrón invierte el control y desacopla `log-ui-ts` de la librería de componentes específica del anfitrión.

### 3. Configuración Centralizada

La configuración está dispersa en varios archivos (`log-ui-data.tsx`, `log-ui.json`, `apps-config.ts`). Esto puede dificultar el mantenimiento.

**Sugerencia:**

Unificar la configuración en un único objeto o archivo de configuración, similar a como lo hace `next-intl`.

### 4. Dependencia Implícita del `profile-domain`

`log-ui-ts` depende de `@skrteeeeee/profile-domain`, pero este no se declara en su `package.json`, sino que se asume que estará en el `node_modules` del proyecto anfitrión. Esto es una dependencia implícita y puede llevar a errores de versión o falta de la dependencia.

**Sugerencia:**

Declarar `@skrteeeeee/profile-domain` como un `peerDependency` en el `package.json` de `log-ui-ts`. Esto haría que `npm` o `yarn` adviertan al desarrollador si la dependencia no está instalada en el proyecto anfitrión, haciendo el requisito explícito.

## Conclusión

`log-ui-ts` es una base sólida. Las mejoras propuestas no cambian su filosofía, sino que buscan reducir el acoplamiento, mejorar la experiencia del desarrollador y aumentar la mantenibilidad a largo plazo, haciendo que el "template definitivo" sea aún más flexible y escalable para futuros micro-frontends.
