# Admin Next - Agent Guidelines

## 🎯 Contexto del Proyecto
**admin-next** es un template minimalista de micro-frontend Next.js 16 diseñado para:
- Panel de administración/landing central para múltiples micro-frontends
- Integración con backend monolítico (`profile-nest` en puerto 3001)
- Template reutilizable con arquitectura simple pero robusta
- CI/CD completo con GitHub Actions y testing exhaustivo

## 🏗️ Arquitectura del Template

### Stack Tecnológico Core
- **Framework:** Next.js 16 App Router + Turbopack
- **React:** 19.2.0 con TypeScript 5
- **Estilos:** Tailwind CSS 4 + shadcn/ui (Radix UI)
- **i18n:** next-intl con 4 locales (en, es, ca, de)
- **Temas:** next-themes (6 presets × 2 modos = 12 combinaciones)
- **Submodule:** log-ui-ts (auth, components, core compartido)

### Rutas Disponibles
```typescript
// src/lib/i18n/routing.ts
pathnames: {
  "/": "/",              // Landing principal
  "/gradients": "/gradients"  // Página de prueba de gradientes
}
```

### Estructura de Datos
- **Contenido i18n:** `content/data/{locale}/admin.json` + `common.json`
- **Mock Data:** `src/core/admin/surfaces.ts` (estados de micro-frontends)
- **API Mock:** `src/app/api/admin/status/route.ts`

## 🧪 Testing y Calidad

### Estrategia de Testing (Playwright)
El proyecto usa **6 tipos de tests** organizados por proyecto:

| Proyecto | Directorio | Requiere Server | Coverage |
|----------|-----------|-----------------|----------|
| `unit` | `tests/unit/` | ❌ No | ✅ Incluido |
| `api` | `tests/api/` | ❌ No | ✅ Incluido |
| `component` | `tests/component/` | ✅ Sí | ❌ |
| `pages` | `tests/pages/` | ✅ Sí | ❌ |
| `integration` | `tests/integration/` | ✅ Sí | ❌ |
| `e2e` | `tests/e2e/` | ✅ Sí | ❌ |

### Scripts de Testing Críticos
```bash
# SIEMPRE antes de cualquier commit
npm run lint                # ESLint 9 + config Next.js
npm run test:unit           # unit + api (sin servidor)

# Testing completo (requiere build)
npm run build && npm run start  # En terminal 1
npx wait-on http://localhost:3000 && npm run test:server  # En terminal 2

# Coverage (requiere 80% statements/lines/functions, 50% branches)
npm run test:coverage:unit  # Verifica coverage mínimo
```

### Coverage Requirements (.nycrc)
```json
{
  "lines": 80,
  "statements": 80,
  "functions": 80,
  "branches": 50
}
```

## 📁 Estructura Crítica

```
admin-next/
├─ log-ui-ts/                    # ⚠️ Submodule - NO modificar sin confirmar
├─ content/data/{locale}/        # ⚠️ Textos i18n (admin.json, common.json)
├─ src/
│  ├─ app/[locale]/             # layout.tsx + page.tsx + gradients/
│  ├─ components/               # admin/ + ui/ (shadcn) + mode-toggle
│  ├─ core/                     # admin/surfaces + application/ + infrastructure/
│  └─ lib/                      # i18n/routing + utils + metadata + data
├─ tests/                       # unit/ api/ component/ pages/ integration/ e2e/
└─ .github/workflows/           # 17 workflows CI/CD
```

## 🔧 Integración log-ui-ts (Submodule)

### Imports Críticos
```typescript
// ✅ CORRECTO - Desde submodule
import { ResFlow } from "@log-ui/core/domain/flows/res.type"
import { useMediaQuery } from "@log-ui/lib/hooks/use-media-query"
import { CustomConnectButton } from "@log-ui/components/custom-connect-button"

// ✅ CORRECTO - Desde host (admin-next)
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@/lib/i18n/routing"

// ❌ INCORRECTO - NO mezclar
import { Button } from "@log-ui/components/ui/button" // NO EXISTE
```

### Dependencias del Submodule
Si trabajas con log-ui-ts necesitas:
- `thirdweb` (auth)
- `uploadthing` + `@uploadthing/react` (uploads)
- `react-hook-form` + `@hookform/resolvers` + `zod` (forms)
- Radix UI components específicos (ver `log-ui-ts/README.md`)

## 🚀 Flujo de Desarrollo

### Desarrollo Local
```bash
# Opción 1: Solo admin-next
npm run dev                    # Puerto 3000

# Opción 2: Con otros micro-frontends
PORT=3003 npm run dev          # Evita colisión de puertos

# Opción 3: Con backend
cd ../profile-nest && npm run start:dev  # Puerto 3001
cd ../admin-next && npm run dev          # Puerto 3000
```

### Pre-commit Workflow
```bash
# Automático con Husky (configurado)
git commit -m "feat: new feature"
# Ejecuta automáticamente:
# 1. npm run lint
# 2. npm run test:coverage:unit (verifica 80% coverage)
# 3. Commitlint (conventional commits)
```

### CI/CD (GitHub Actions)
- **playwright.yml**: Tests completos en CI (badge de coverage)
- **nextjs.yml**: Build y deploy
- **lighthouse.md**: Performance audits
- **17 workflows totales**: Auto-merge, labels, issues, etc.

## 🎨 Sistema de Temas

### Tokens Base
```css
/* src/app/globals.css */
@import "@log-ui/lib/globals.css";  /* Tokens compartidos */
/* + Custom tokens por tema */
```

### Presets y Gradientes
- 6 presets × 2 modos: grays, gold, neon, sky, soft, default
- 8 gradientes cyberpunk en `src/lib/utils.ts`

## 📊 MCP Tools Disponibles

### Next.js DevTools (Recomendado)
```bash
# Inicializar contexto Next.js
next-devtools___init

# Runtime info (requiere dev server activo)
next-devtools___nextjs_runtime  # Errors, routes, logs

# Docs oficiales
next-devtools___nextjs_docs     # Buscar en docs de Next.js

# Browser automation
next-devtools___browser_eval    # Playwright integration
```

### GitHub Integration
```bash
# Ver PRs, issues, branches
github___list_pull_requests
github___list_issues

# Code search en todo GitHub
github___search_code

# Crear/actualizar archivos
github___create_or_update_file
```

### Vercel (Deployment)
```bash
# Deploy y monitoreo
vercel___deploy_to_vercel
vercel___list_deployments
vercel___get_deployment_build_logs
```

## ⚠️ Reglas Críticas

### 🚫 NUNCA Hacer
1. **Modificar log-ui-ts sin confirmación explícita**
2. **Cambiar estructura de `content/data/{locale}/*.json`** sin actualizar tipos
3. **Agregar librerías sin verificar** (tokens y gradientes son compartidos)
4. **Commitear sin pasar** `npm run lint && npm run test:unit`
5. **Modificar `.nycrc` coverage thresholds** (80/80/80/50 es estándar)
6. **Cambiar `playwright.config.ts` proyectos** sin actualizar CI

### ✅ SIEMPRE Hacer
1. **Verificar tipos con** `npx tsc --noEmit` antes de commit
2. **Actualizar tests** cuando cambies lógica
3. **Mantener coverage** ≥80% (statements/lines/functions)
4. **Usar conventional commits** (feat/fix/docs/chore/test)
5. **Revisar `content/data/` para textos** antes de hardcodear
6. **Consultar `log-ui-ts/README.md`** antes de modificar submodule

### 🔍 Debugging
```bash
# TypeScript errors
npx tsc --noEmit

# Test específico
npx playwright test tests/unit/core-utils.spec.ts

# Coverage detallado
npm run test:coverage  # HTML report en docs/coverage

# Dev server issues
rm -rf .next && npm run dev  # Clean rebuild
```

## 📚 Recursos Clave
- **README.md**: Setup completo y features
- **log-ui-ts/README.md**: Configuración de submodule
- **playwright.config.ts**: Proyectos de test y configuración
- **.nycrc**: Thresholds de coverage
- **content/data/**: Fuente de verdad para i18n
- **.github/workflows/**: CI/CD pipelines

## 🎯 Workflows Comunes

**Nueva Ruta:** `routing.ts` → `app/[locale]/ruta/` → `content/data/` → `tests/pages/`  
**Componente UI:** `npx shadcn add [nombre]` → `import from @/components/ui/`  
**Tema:** `globals.css` → test en `/gradients` → verificar `mode-toggle.tsx`

---

**Última actualización:** 2025-11-13  
**Template version:** 0.0.1  
**Next.js version:** 16.0.0
