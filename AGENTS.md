# [NOMBRE DEL PROYECTO] - Agent Guidelines

> **⚠️ TEMPLATE MODE:** Este es un AGENTS.md genérico para micro-frontends basados en el template `admin-next`. Personaliza las secciones marcadas con `[TODO]` o ejemplos obvios.

---

## 🎯 Contexto del Proyecto

**[NOMBRE DEL PROYECTO]** es un micro-frontend Next.js 16 basado en el template `admin-next`, diseñado para:

- [TODO: Propósito principal del micro-frontend]
- [TODO: Usuarios objetivo o casos de uso]
- Integración con backend monolítico (`profile-nest` en puerto :3001)
- Arquitectura simple, robusta y reutilizable
- CI/CD completo con GitHub Actions



## 🏗️ Arquitectura del Template

### Stack Tecnológico Core (Inmutable)
- **Framework:** Next.js 16 App Router + Turbopack
- **React:** 19.2.0 con TypeScript 5
- **Estilos:** Tailwind CSS 4 + shadcn/ui (Radix UI)
- **i18n:** next-intl con 4 locales (en, es, ca, de)
- **Temas:** next-themes (6 presets × 2 modos = 12 combinaciones)
- **Submodule:** log-ui-ts (auth, components, core compartido)

### Rutas del Proyecto
```typescript
// src/lib/i18n/routing.ts
pathnames: {
  "/": "/",                    // [TODO: Describe la landing principal]
  "/gradients": "/gradients",  // Página de prueba de gradientes (mantener)
  // [TODO: Agregar rutas específicas del micro-frontend]
  // "/ejemplo": "/ejemplo",   // Ejemplo: Dashboard, catálogo, etc.
}
```

### Estructura de Datos
- **Contenido i18n:** `content/data/{locale}/[NOMBRE].json` + `common.json`
- **Mock Data:** `src/core/[DOMINIO]/[datos].ts` ([TODO: Describe tus entidades])
- **API Routes:** `src/app/api/[NOMBRE]/route.ts` ([TODO: Lista endpoints])

---

## 🧪 Testing y Calidad (Obligatorio)

### Estrategia de Testing (Playwright)
El template usa **6 tipos de tests** organizados por proyecto:

| Proyecto | Directorio | Requiere Server | Coverage | Propósito |
|----------|-----------|-----------------|----------|-----------|
| `unit` | `tests/unit/` | ❌ No | ✅ Incluido | Lógica pura (utils, use cases) |
| `api` | `tests/api/` | ❌ No | ✅ Incluido | Endpoints y repositorios |
| `component` | `tests/component/` | ✅ Sí | ❌ | Componentes en aislamiento |
| `pages` | `tests/pages/` | ✅ Sí | ❌ | Páginas completas con i18n |
| `integration` | `tests/integration/` | ✅ Sí | ❌ | Flujos entre componentes |
| `e2e` | `tests/e2e/` | ✅ Sí | ❌ | User journeys completos |

### Scripts de Testing Críticos (NO MODIFICAR)
```bash
# SIEMPRE antes de cualquier commit (Husky ejecuta automáticamente)
npm run lint                # ESLint 9 + config Next.js
npm run test:unit           # unit + api (sin servidor)

# Testing completo (requiere build)
npm run build && npm run start  # En terminal 1
npx wait-on http://localhost:3000 && npm run test:server  # En terminal 2

# Coverage (requiere 80% statements/lines/functions, 50% branches)
npm run test:coverage:unit  # Verifica coverage mínimo
```

### Coverage Requirements (.nycrc - NO MODIFICAR)
```json
{
  "lines": 80,
  "statements": 80,
  "functions": 80,
  "branches": 50
}
```

---

## 📁 Estructura Crítica

```
[NOMBRE-PROYECTO]/
├─ log-ui-ts/                    # ⚠️ Submodule - NO modificar sin confirmar
├─ content/data/{locale}/        # ⚠️ ÚNICA fuente de verdad para textos
│  ├─ [NOMBRE].json             # [TODO: Textos específicos del proyecto]
│  └─ common.json               # Traducciones compartidas (botones, errores)
├─ src/
│  ├─ app/[locale]/             # App Router con i18n
│  │  ├─ layout.tsx             # ThemeProvider + NextIntlProvider (NO tocar)
│  │  ├─ page.tsx               # [TODO: Landing principal del micro-frontend]
│  │  ├─ gradients/page.tsx     # Test de gradientes (mantener)
│  │  └─ [TODO]/page.tsx        # [Agregar rutas específicas]
│  ├─ components/
│  │  ├─ [DOMINIO]/             # [TODO: Componentes específicos del proyecto]
│  │  ├─ ui/                    # shadcn/ui components (NO modificar estructura)
│  │  ├─ mode-toggle.tsx        # Theme switcher (compartido)
│  │  └─ theme-popover.tsx      # Theme selector (compartido)
│  ├─ core/
│  │  ├─ [DOMINIO]/             # [TODO: Lógica de negocio del proyecto]
│  │  ├─ application/           # Use cases e interfaces
│  │  └─ infrastructure/        # Repositorios API (usa @log-ui/core)
│  └─ lib/
│     ├─ i18n/routing.ts        # next-intl config (actualizar rutas)
│     ├─ utils.ts               # cn + other (project utils)
│     ├─ metadata.ts            # SEO helpers (actualizar meta tags)
│     └─ data.ts                # [TODO: Datos estáticos del proyecto]
├─ tests/                       # unit/ api/ component/ pages/ integration/ e2e/
└─ .github/workflows/           # CI/CD (17 workflows activos - NO tocar)
```

---

## 🔧 Integración log-ui-ts (Submodule Compartido)

### Imports Críticos (REGLA INMUTABLE)
```typescript
// ✅ CORRECTO - Desde submodule (funcionalidades compartidas)
import { ResFlow } from "@log-ui/core/domain/flows/res.type"
import { useMediaQuery } from "@log-ui/lib/hooks/use-media-query"
import { CustomConnectButton } from "@log-ui/components/custom-connect-button"

// ✅ CORRECTO - Desde host (código específico del proyecto)
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@/lib/i18n/routing"

// ❌ INCORRECTO - NUNCA mezclar prefijos
import { Button } from "@log-ui/components/ui/button" // NO EXISTE
```

### Dependencias del Submodule (Verificar en log-ui-ts/README.md)
Si trabajas con log-ui-ts necesitas:
- `thirdweb` (auth - requiere configuración)
- `uploadthing` + `@uploadthing/react` (uploads)
- `react-hook-form` + `@hookform/resolvers` + `zod` (forms)
- Radix UI components específicos

**Antes de instalar cualquier librería nueva, verifica si ya existe en log-ui-ts.**

---

## 🚀 Flujo de Desarrollo

### Desarrollo Local
```bash
# Opción 1: Solo este micro-frontend
npm run dev                    # Puerto 3000

# Opción 2: Con otros micro-frontends (evitar colisión)
PORT=3003 npm run dev          # Usar puerto alternativo

# Opción 3: Con backend (recomendado)
cd ../profile-nest && npm run start:dev  # Terminal 1 - Puerto 3001
cd ../[NOMBRE-PROYECTO] && npm run dev   # Terminal 2 - Puerto 3000
```

### Pre-commit Workflow (Husky Configurado - Automático)
```bash
# Al hacer commit, Husky ejecuta automáticamente:
git commit -m "feat: nueva funcionalidad"

# 1. npm run lint (ESLint 9)
# 2. npm run test:coverage:unit (verifica 80% coverage)
# 3. Commitlint (conventional commits: feat/fix/docs/chore/test)
```

### CI/CD (GitHub Actions - 17 Workflows Activos)
- **playwright.yml**: Tests completos + badge de coverage
- **nextjs.yml**: Build + deploy automático
- **lighthouse.yml**: Performance audits (score mínimo 90)
- Otros: auto-merge, labels, stale issues, etc.

---

## 🎨 Sistema de Temas (Compartido)

### Tokens Base (globals.css)
```css
/* src/app/globals.css */
@import "@log-ui/lib/globals.css";  /* Tokens compartidos (NO modificar) */
/* [TODO: Agregar custom tokens específicos del proyecto si es necesario] */
```

### Presets Disponibles (NO MODIFICAR)
- `light-grays`, `dark-grays` (neutro)
- `light-gold`, `dark-gold` (cálido)
- `light-neon`, `dark-neon` (vibrante)
- `light-sky`, `dark-sky` (frío)
- `light-soft`, `dark-soft` (suave)
- `light-default`, `dark-default` (base)

### Gradientes (src/lib/utils.ts)
```typescript
// 8 gradientes cyberpunk predefinidos
// [TODO: Puedes agregar gradientes específicos del proyecto aquí]
export const gradients = [
  "bg-gradient-to-r from-cyan-500 to-blue-500",
  // ... resto de gradientes
]
```

---

## 📊 MCP Tools Disponibles (Next.js DevTools + GitHub + Vercel)

### 1. Next.js DevTools (Recomendado para Debugging)
```bash
# Inicializar contexto Next.js (SIEMPRE PRIMERO)
next-devtools___init

# Runtime info (requiere dev server activo en puerto 3000)
next-devtools___nextjs_runtime  
# - Ver errores en tiempo real
# - Inspeccionar rutas y componentes
# - Logs del servidor

# Documentación oficial Next.js
next-devtools___nextjs_docs
# - Buscar en docs oficiales
# - Resolver dudas de API

# Browser automation (Playwright)
next-devtools___browser_eval
# - Automatizar navegación
# - Capturas de pantalla
# - Testing interactivo
```

### 2. GitHub Integration (Control de Versiones)
```bash
# Gestión de código
github___list_pull_requests      # Ver PRs abiertos
github___list_issues             # Ver issues
github___search_code             # Buscar en todo GitHub

# Crear/actualizar archivos
github___create_or_update_file   # Push de archivos
github___create_pull_request     # Crear PR
```

### 3. Vercel (Deployment y Monitoreo)
```bash
# Deploy y monitoreo
vercel___deploy_to_vercel              # Deploy manual
vercel___list_deployments              # Ver deploys
vercel___get_deployment_build_logs     # Logs de build
```

---

## ⚠️ Reglas Críticas del Template

### 🚫 NUNCA Hacer
1. **Modificar log-ui-ts sin confirmación explícita** (es compartido entre micro-frontends)
2. **Cambiar estructura de `content/data/{locale}/*.json`** sin actualizar tipos en TypeScript
3. **Agregar librerías sin verificar log-ui-ts** (evitar duplicados: tokens, gradientes, hooks)
4. **Commitear sin pasar** `npm run lint && npm run test:unit` (Husky lo bloqueará)
5. **Modificar `.nycrc` coverage thresholds** (80/80/80/50 es estándar del template)
6. **Cambiar `playwright.config.ts` proyectos** sin actualizar CI/CD en `.github/workflows`
7. **Tocar `src/app/globals.css` imports de log-ui-ts** (tokens compartidos)
8. **Modificar `next.config.ts` sin documentar** (afecta build y deploy)

### ✅ SIEMPRE Hacer
1. **Verificar tipos con** `npx tsc --noEmit` antes de commit
2. **Actualizar tests** cuando cambies lógica (mantener coverage ≥80%)
3. **Usar conventional commits** (feat/fix/docs/chore/test/refactor)
4. **Revisar `content/data/` para textos** antes de hardcodear strings
5. **Consultar `log-ui-ts/README.md`** antes de modificar submodule
6. **Actualizar `AGENTS.md`** cuando agregues funcionalidades importantes
7. **Documentar nuevas rutas** en `src/lib/i18n/routing.ts` + `content/data/`
8. **Probar en todos los idiomas** (en, es, ca, de) antes de merge

### 🔍 Debugging Rápido
```bash
# TypeScript errors
npx tsc --noEmit

# Test específico
npx playwright test tests/unit/[archivo].spec.ts

# Coverage detallado (HTML report)
npm run test:coverage  # Ver en docs/coverage/index.html

# Dev server issues
rm -rf .next && npm run dev  # Clean rebuild

# Problemas de dependencias
rm -rf node_modules package-lock.json && npm install
```

---

## 📚 Recursos Clave del Template

| Archivo | Propósito |
|---------|-----------|
| **README.md** | Setup completo y features del proyecto |
| **log-ui-ts/README.md** | Configuración de submodule y dependencias |
| **playwright.config.ts** | 6 proyectos de test configurados |
| **.nycrc** | Thresholds de coverage obligatorios |
| **content/data/** | ÚNICA fuente de verdad para textos i18n |
| **.github/workflows/** | 17 workflows de CI/CD activos |
| **src/lib/i18n/routing.ts** | Configuración de rutas y locales |
| **src/app/globals.css** | Sistema de tokens de diseño |

---

## 🎯 Workflows Comunes

### Agregar Nueva Ruta
1. **Routing:** Actualizar `src/lib/i18n/routing.ts` → `pathnames`
2. **Página:** Crear `src/app/[locale]/nueva-ruta/page.tsx`
3. **i18n:** Agregar traducciones en `content/data/{locale}/[NOMBRE].json`
4. **Tests:** Crear `tests/pages/nueva-ruta.spec.ts`
5. **SEO:** Actualizar `src/lib/metadata.ts` si necesita meta tags custom

### Agregar Componente UI (shadcn)
1. **Instalar:** `npx shadcn@latest add [componente]`
2. **Importar:** `import { [Componente] } from "@/components/ui/[componente]"`
3. **Usar:** En tus componentes de `src/components/[DOMINIO]/`
4. **Tests:** Crear `tests/unit/components/[componente].spec.ts`

### Modificar Temas (Avanzado)
1. **Tokens:** Actualizar `src/app/globals.css` (cuidado con log-ui-ts imports)
2. **Test:** Probar en `/gradients` con todos los presets (6 × 2 = 12)
3. **Verificar:** `mode-toggle.tsx` si cambias número de presets
4. **Documentar:** Actualizar README.md si afecta UX

### Integrar Nueva Funcionalidad de log-ui-ts
1. **Revisar:** `log-ui-ts/README.md` para ver qué está disponible
2. **Importar:** Usar prefijo `@log-ui/` correcto (ver sección imports)
3. **Dependencias:** Instalar deps requeridas (thirdweb, uploadthing, etc.)
4. **Configurar:** Seguir setup específico (auth, uploads, etc.)
5. **Documentar:** Actualizar AGENTS.md con el nuevo patrón de uso

---

## 🆕 Personalización del Template

### [TODO] Checklist para Nuevo Micro-Frontend

- [ ] **Nombre:** Cambiar `admin-next` → `[NOMBRE-PROYECTO]` en:
  - `package.json` (name, description)
  - `README.md` (título, badges)
  - `AGENTS.md` (este archivo)
  
- [ ] **Rutas:** Actualizar `src/lib/i18n/routing.ts`:
  - Definir rutas específicas del proyecto
  - Mantener `/gradients` para tests
  
- [ ] **Contenido i18n:** Renombrar/crear `content/data/{locale}/`:
  - `admin.json` → `[NOMBRE].json`
  - Definir estructura de textos del proyecto
  
- [ ] **Dominio:** Crear estructura en `src/core/[DOMINIO]/`:
  - Entidades, use cases, repositorios
  
- [ ] **Componentes:** Crear `src/components/[DOMINIO]/`:
  - Componentes específicos del proyecto
  
- [ ] **SEO:** Actualizar `src/lib/metadata.ts`:
  - Meta tags, OG images, Twitter cards
  
- [ ] **Testing:** Crear tests específicos:
  - `tests/unit/[DOMINIO]/`
  - `tests/pages/[RUTAS]/`
  
- [ ] **CI/CD:** Verificar workflows en `.github/workflows/`:
  - Ajustar badges de coverage en README.md
  - Configurar Vercel/deploy si es necesario
  
- [ ] **Documentación:** Completar este AGENTS.md:
  - Rellenar todos los `[TODO]`
  - Agregar ejemplos reales del proyecto
  - Documentar flujos específicos

---

## 📝 Notas Finales para Agentes AI

Este template está diseñado para ser **reutilizable y escalable**. Cada micro-frontend debe:

1. **Mantener la arquitectura base** (Next.js 16, log-ui-ts, testing)
2. **Personalizar solo las capas de negocio** (core, components, content)
3. **Respetar las reglas compartidas** (coverage, commits, imports)
4. **Documentar cambios significativos** en README.md y AGENTS.md

**Antes de modificar cualquier archivo marcado como "NO TOCAR" o "compartido", consulta con el desarrollador.**

---

**Última actualización:** [TODO: Fecha]  
**Template base:** admin-next v0.0.1  
**Next.js version:** 16.0.0  
**Proyecto:** [TODO: Nombre del micro-frontend]
