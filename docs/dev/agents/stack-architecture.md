# Stack & Arquitectura

> Stack tecnológico core + sistema de temas

## 🛠️ Stack Core (Inmutable)

- **Framework:** Next.js 16 App Router + Turbopack
- **React:** 19.2.0 (Server + Client Components)
- **TypeScript:** 5 (strict mode)
- **Estilos:** Tailwind CSS 4 + shadcn/ui (Radix UI)
- **i18n:** next-intl (4 locales: en, es, ca, de)
- **Temas:** next-themes (6 presets × 2 modos = 12 combinaciones)
- **Submodule:** log-ui-ts (auth, components, core)

## 🎨 Sistema de Temas

**Tokens:** `src/app/globals.css` + `@log-ui/lib/globals.css` (NO modificar import)

**Presets:** grays, gold, neon, sky, soft, default  
**Gradientes:** Configurables en `src/lib/utils.ts` (8 predefinidos)

**Probar:** `/gradients` page (test visual de todos los temas)

## 🗺️ Rutas i18n

**Config:** `src/lib/i18n/routing.ts`

```typescript
pathnames: {
  "/": "/",
  "/gradients": "/gradients",
  // [TODO: Agregar rutas proyecto]
}
```

**Agregar ruta:** Ver [dev-workflows.md](./dev-workflows.md)

## 📁 Estructura de Datos

- **i18n:** `content/data/{locale}/[NOMBRE].json` + `common.json`
- **Mock:** `src/core/[DOMINIO]/[datos].ts`
- **API:** `src/app/api/[NOMBRE]/route.ts`

## 🏗️ Clean Architecture

**Ver detalles:** [cleanarch.md](../../../docs/cleanarch.md)

- **Application** - Use cases e interfaces
- **Infrastructure** - Repos API + servicios externos
- **Presentation** - Adapters Next.js + Server Actions

## 📚 Referencias

- **Clean Arch:** [cleanarch.md](../../../docs/cleanarch.md)
- **Microservices:** [microservices-arch.md](../../../docs/microservices-arch.md)
- **Testing:** [tests/README.md](../../../tests/README.md)
- **log-ui-ts:** [log-ui-integration.md](./log-ui-integration.md)
