# 🧪 Testing Guide - Admin Next Template

## 📋 Índice
- [Tipos de Tests](#-tipos-de-tests)
- [Scripts Disponibles](#-scripts-disponibles)
- [Workflows de Desarrollo](#-workflows-de-desarrollo)
- [Coverage Requirements](#-coverage-requirements)
- [Performance Testing](#-performance-testing)
- [Configuración](#-configuración)
- [CI/CD Integration](#-cicd-integration)

---

## 🎯 Tipos de Tests

El template usa **7 categorías** de tests organizados en proyectos de Playwright:

| Proyecto | Requiere Server | Propósito | Comando |
|----------|-----------------|-----------|---------|
| **unit** | ❌ No | Lógica pura (utils, hooks, helpers) | `npm run test:unit` |
| **api** | ❌ No | Endpoints y repositorios | `npm run test:unit` |
| **component** | ✅ Sí | Componentes en aislamiento | `npm run test:server` |
| **pages** | ✅ Sí | Páginas completas con i18n | `npm run test:server` |
| **integration** | ✅ Sí | Flujos entre componentes | `npm run test:server` |
| **e2e** | ✅ Sí | User journeys + E2E Performance | `npm run test:e2e` |
| **performance** | ✅ Sí | Lighthouse CI + Performance Budgets | `npm run test:perf` |

### 🔍 Diferencia: E2E Performance vs Performance Puro

| Aspecto | E2E Performance | Performance Puro |
|---------|-----------------|------------------|
| **Ubicación** | `tests/e2e/performance/` | `tests/performance/` |
| **Propósito** | Performance durante interacción | Performance de carga inicial |
| **Herramientas** | Playwright PerformanceObserver | Lighthouse CI + Playwright |
| **Métricas** | LCP, CLS, FID, JS Coverage | LCP, FCP, TBT, Speed Index, Bundle |
| **Interacción** | ✅ Clicks, scroll, navigate | ❌ Solo load |
| **Thresholds** | Relaxados (20s, 0.2 CLS) | Estrictos (2.5s, 0.1 CLS, 90%) |
| **Comando** | `npm run test:e2e` | `npm run test:perf` |
| **Ejemplo** | Usuario → carga → interactúa → mide | Página → carga → mide → fin |

**Cuándo usar cada uno:**
- **E2E Performance:** Validar que la app mantiene buena performance mientras el usuario navega
- **Performance Puro:** Optimizar métricas de carga inicial para SEO, Core Web Vitals, auditorías

📂 **Estructura de archivos:**
```
tests/
├── unit/                    # Lógica pura (sin servidor)
├── api/                     # Endpoints (sin servidor)
├── component/               # Componentes aislados (con servidor)
│   ├── admin-theming.spec.ts     ← Renombrado de pages-performance.spec.ts
│   ├── admin-hero.spec.ts        ← Renombrado de performance-report.spec.ts
│   ├── navbar.spec.ts
│   └── mode-toggle.spec.ts
├── pages/                   # Páginas completas (con servidor)
├── integration/             # Flujos entre componentes (con servidor)
├── e2e/                     # User journeys (con servidor)
│   ├── performance/         # E2E + Web Vitals durante interacción
│   │   ├── homepage.spec.ts      ← Renombrado de index.spec.ts
│   │   ├── info-page.spec.ts     ← NUEVO
│   │   └── gradients-page.spec.ts ← NUEVO
│   └── [otros e2e]
└── performance/             # Lighthouse CI + Budgets (con servidor) - NUEVO
    ├── lighthouse-ci.spec.ts     ← NUEVO (wrapper de lhci en Playwright)
    ├── web-vitals-pure.spec.ts   ← NUEVO (Web Vitals sin interacción)
    └── bundle-budgets.spec.ts    ← NUEVO (validar budgets)
```

**Nota:** Los archivos marcados con `← Renombrado` o `← NUEVO` serán creados/modificados durante la implementación.

⚙️ **Config:** [`playwright.config.ts`](../playwright.config.ts)

---

## 🚀 Scripts Disponibles

### Testing Básico
```bash
# Tests sin servidor (unit + api)
npm run test:unit

# Tests con servidor (component + pages + integration)
npm run test:server  # Requiere: npm run start en otra terminal

# E2E (user journeys + e2e performance)
npm run test:e2e     # Requiere: npm run start en otra terminal

# Todos los tests (unit + api + server + e2e)
npm run test:all

# Test específico
npx playwright test tests/unit/ejemplo.spec.ts
npx playwright test tests/e2e/performance/homepage.spec.ts
```

### Coverage (NYC)
```bash
# Coverage de tests unit/api con thresholds (80/80/80/50)
npm run test:coverage:unit

# Coverage completo (incluye tests con servidor)
npm run test:coverage

# Ver reporte HTML
# Abrir: docs/coverage/index.html
```

### Performance Testing
```bash
# Performance PURO (Lighthouse CI + Budgets)
npm run test:perf    # Lighthouse CI wrapper en Playwright

# Lighthouse CLI completo (5 páginas)
npm run perf         # Build + Start + Lighthouse CI

# Solo verificar thresholds (90/95/90/95)
npm run perf:check   # Valida contra thresholds sin rebuild

# E2E Performance (user journeys + Web Vitals)
npm run test:e2e     # Incluye tests/e2e/performance/

# Lighthouse manual de una página
npm run lh:home      # Solo homepage en CLI
```

### Pre-commit (Automático)
```bash
# Husky ejecuta automáticamente al hacer commit:
git commit -m "feat: nueva funcionalidad"

# Pasos ejecutados:
# 1. npm run lint          (ESLint 9)
# 2. npx tsc --noEmit      (TypeScript)
# 3. npm run test:coverage:unit (80% coverage)
# 4. npm run perf:check    (90% performance)

# Saltar checks (NO recomendado):
git commit -m "..." --no-verify
```

---

## 🔄 Workflows de Desarrollo

### 1️⃣ Desarrollo Local (sin performance)
```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Tests manuales
npx playwright test tests/unit/mi-test.spec.ts

# Linting continuo
npm run lint
```

### 2️⃣ Pre-commit Completo (local)
```bash
# Antes de commit, validar todo:
npm run lint
npx tsc --noEmit
npm run test:coverage:unit

# Si pasó todo, commit:
git add .
git commit -m "feat: mi feature"
# ⚠️ Husky ejecutará checks automáticamente
```

### 3️⃣ Testing con Servidor (component/pages/integration/e2e)
```bash
# Terminal 1: Build + Start
npm run build
npm run start  # Puerto 3000

# Terminal 2: Tests con servidor
npx wait-on http://localhost:3000
npm run test:server  # component + pages + integration

# Terminal 2 alternativa: E2E + E2E Performance
npx wait-on http://localhost:3000
npm run test:e2e     # user journeys + web vitals

# Alternativa (un solo comando):
npm run build && npm run start & npx wait-on http://localhost:3000 && npm run test:all
```

### 4️⃣ Performance Testing Completo
```bash
# Opción A: Lighthouse CI (recomendado - auditoría completa)
npm run perf  # Build + Start + Lighthouse + Thresholds

# Opción B: Performance Puro en Playwright
npm run build && npm run start  # Terminal 1
npm run test:perf               # Terminal 2 - Lighthouse wrapper

# Opción C: E2E Performance (user journeys + Web Vitals)
npm run build && npm run start  # Terminal 1
npm run test:e2e                # Terminal 2 - Incluye tests/e2e/performance/

# Ver reportes:
# - Lighthouse CLI: docs/lighthouse-reports/perf/*.html
# - Playwright: docs/test-results/html-report/
```

---

## 📊 Coverage Requirements

### Thresholds Mínimos ([`.nycrc`](../.nycrc))
```
✅ Lines:       80%
✅ Statements:  80%
✅ Functions:   80%
✅ Branches:    50%
```

### Archivos Excluidos
- Tests (`*.spec.ts`, `*.test.ts`)
- Configs (`*.config.ts`, `*.config.js`)
- Middleware (`middleware.ts`)
- SEO hardcoded (`src/lib/seo/**`)
- Mock data (`*-hardcdd.ts`)

### Ver Coverage Detallado
```bash
npm run test:coverage
# Reporte HTML: docs/coverage/index.html
# JSON: docs/coverage/coverage-summary.json
```

---

## ⚡ Performance Testing

### Lighthouse CI Thresholds ([`lighthouserc.perf.json`](../lighthouserc.perf.json))

#### Categorías
```
✅ Performance:      90% (crítico)
✅ Accessibility:    95%
✅ SEO:              90%
✅ Best Practices:   95%
```

#### Core Web Vitals (valores máximos)
```
✅ LCP (Largest Contentful Paint):   2500ms
✅ CLS (Cumulative Layout Shift):    0.1
✅ TBT (Total Blocking Time):        200ms
✅ FCP (First Contentful Paint):     1800ms
✅ Speed Index:                      3000ms
```

#### Performance Budget ([`lighthouse.budget.json`](../lighthouse.budget.json))
```
✅ JavaScript:   300 KB max
✅ CSS:          50 KB max
✅ Images:       500 KB max
✅ Total:        1 MB max
```

### Páginas Auditadas (Lighthouse CI)
1. `/es` (Homepage)
2. `/en/info`
3. `/de/gradients`
4. `/es/portafolio`
5. `/ca/estudis`

### Páginas Auditadas (E2E Performance - Playwright)
1. `/es` (Homepage con interacción)
2. `/en/info` (Info page con scroll)
3. `/de/gradients` (Gradients con theme switching)

### Comandos Performance
```bash
# === LIGHTHOUSE CI (Performance Puro) ===
# Lighthouse completo (5 páginas, build + start automático)
npm run perf

# Solo validar thresholds (sin rebuild)
npm run perf:check

# Lighthouse wrapper en Playwright
npm run test:perf

# Lighthouse de una página específica (manual)
npx lighthouse http://localhost:3000/es --output=html

# === E2E PERFORMANCE (User Journeys + Web Vitals) ===
# Tests de performance durante interacción de usuario
npm run test:e2e  # Incluye tests/e2e/performance/*.spec.ts

# Test específico de E2E Performance
npx playwright test tests/e2e/performance/homepage.spec.ts
```

### Interpretar Resultados

**Lighthouse CI (Performance Puro):**
```bash
# ✅ Pasó todos los thresholds
✅ performance: 0.92 >= 0.90
✅ accessibility: 0.96 >= 0.95
✅ Performance coverage passed!

# ❌ Falló performance
❌ performance: 0.87 < 0.90 (http://localhost:3000/es)
❌ Performance coverage failed!
```

**E2E Performance (User Journeys):**
```bash
# ✅ Web Vitals OK durante interacción
✅ LCP: 1850ms < 2500ms
✅ CLS: 0.08 < 0.2
✅ Load time: 3200ms < 20000ms
✅ JS Coverage: 45%

# ❌ Performance degradada por interacción
❌ LCP: 3100ms > 2500ms (warning - esperado en journeys)
✅ CLS: 0.15 < 0.2
Note: E2E Performance permite thresholds más relaxados
```

---

## ⚙️ Configuración

### Modificar Thresholds de Coverage

**Archivo:** [`.nycrc`](../.nycrc)

```json
{
  "lines": 80,        // Cambiar aquí
  "statements": 80,
  "functions": 80,
  "branches": 50
}
```

### Modificar Thresholds de Performance

**Archivo:** [`lighthouserc.perf.json`](../lighthouserc.perf.json)

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.90 }],  // Cambiar aquí
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }]
      }
    }
  }
}
```

### Agregar Páginas a Performance Testing

**Archivo:** [`lighthouserc.perf.json`](../lighthouserc.perf.json)

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/es",
        "http://localhost:3000/tu-nueva-ruta"  // Agregar aquí
      ]
    }
  }
}
```

### Modificar Performance Budget

**Archivo:** [`lighthouse.budget.json`](../lighthouse.budget.json)

```json
{
  "budgets": [{
    "resourceSizes": [
      { "resourceType": "script", "budget": 300 }  // KB, cambiar aquí
    ],
    "timings": [
      { "metric": "largest-contentful-paint", "budget": 2500 }  // ms
    ]
  }]
}
```

### Agregar Proyecto de Tests en Playwright

**Archivo:** [`playwright.config.ts`](../playwright.config.ts)

```typescript
projects: [
  // ... unit, api, component, pages, integration
  
  {
    name: 'e2e',  // User journeys + E2E Performance
    testMatch: /tests\/e2e\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:3000',
    },
  },
  
  {
    name: 'performance',  // Lighthouse CI + Budgets
    testMatch: /tests\/performance\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:3000',
      timeout: 60000,  // Lighthouse tarda más
    },
  },
]
```

### Deshabilitar Performance en Pre-commit

**Archivo:** `.husky/pre-commit`

```bash
# Comentar esta línea:
# npm run perf:check
```

---

## 🤖 CI/CD Integration

### GitHub Actions Workflows

#### 1. Playwright Tests ([`.github/workflows/playwright.yml`](../.github/workflows/playwright.yml))
```yaml
# Ejecuta: lint + test:coverage:unit
# Trigger: push, pull_request
# Badge: Coverage % en README
```

#### 2. Lighthouse Performance ([`.github/workflows/lighthouse.yml`](../.github/workflows/lighthouse.yml))
```yaml
# Ejecuta: npm run perf
# Trigger: pull_request, push to main
# Genera: Comentario en PR con métricas
# Artifacts: Reportes Lighthouse
```

#### 3. Next.js Build ([`.github/workflows/nextjs.yml`](../.github/workflows/nextjs.yml))
```yaml
# Ejecuta: npm run build
# Trigger: push to main
# Deploy: Automático si build pasa
```

### Ver Resultados CI/CD

**GitHub:**
- Actions → Workflow run → Jobs → Artifacts
- Pull Request → Checks → Details

**Local (simular CI):**
```bash
# Simular Playwright workflow
npm run lint && npm run test:coverage:unit

# Simular Lighthouse workflow
npm run perf

# Simular build workflow
npm run build
```

### Badges en README

```markdown
![Tests](https://github.com/USUARIO/REPO/workflows/Playwright/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)
![Lighthouse](https://img.shields.io/badge/lighthouse-90%2B-brightgreen)
```

---

## 🐛 Troubleshooting

### Error: "Executable doesn't exist at ..."
```bash
# Instalar navegadores Playwright
npx playwright install
npx playwright install-deps

# Para tests de performance con Lighthouse
npm install -g @lhci/cli  # Si usa Lighthouse CLI global
```

### Error: "Target closed" en tests con servidor
```bash
# Verificar que el servidor esté corriendo
curl http://localhost:3000/es

# Aumentar timeout en playwright.config.ts
expect: { timeout: 10000 }

# Para tests de performance, aumentar timeout del proyecto:
# playwright.config.ts → projects → performance → use.timeout: 90000
```

### Coverage no alcanza 80%
```bash
# Ver archivos sin coverage
npm run test:coverage:unit

# Ver reporte HTML detallado
# Abrir: docs/coverage/index.html
```

### Performance < 90% en Lighthouse
```bash
# Identificar problema
npm run perf

# Ver reporte detallado
# Abrir: docs/lighthouse-reports/perf/*.html

# Optimizaciones comunes:
# - Optimizar imágenes (next/image)
# - Reducir bundle JS (dynamic imports)
# - Eliminar CSS no usado
# - Añadir caché de assets
```

### Pre-commit muy lento (> 5 min)
```bash
# Opción 1: Deshabilitar perf en pre-commit
# Editar .husky/pre-commit (comentar npm run perf:check)

# Opción 2: Usar --no-verify ocasionalmente
git commit -m "..." --no-verify

# Opción 3: Optimizar build
# - Usar Turbopack (ya activo)
# - Limpiar caché: rm -rf .next

# Nota: Performance check en pre-commit usa thresholds validados,
# no requiere build completo si ya existe docs/lighthouse-reports/
```

---

## 📚 Recursos

- [Playwright Docs](https://playwright.dev/)
- [NYC Coverage](https://github.com/istanbuljs/nyc)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing)

---

## ✅ Checklist para Nuevos Tests

### Tests Funcionales (unit/api/component/pages/integration)
- [ ] Crear test en `tests/{tipo}/mi-test.spec.ts`
- [ ] Seguir naming: `*.spec.ts`
- [ ] Usar `test.describe()` para agrupar
- [ ] Validar con `npm run test:unit` o `npm run test:server`
- [ ] Verificar coverage: `npm run test:coverage:unit`
- [ ] Commit (pre-commit ejecutará validaciones)

### Tests E2E
- [ ] Crear test en `tests/e2e/mi-journey.spec.ts`
- [ ] Simular user journey completo
- [ ] Validar con `npm run test:e2e`
- [ ] Si incluye performance, usar estructura de `tests/e2e/performance/`

### Tests de Performance
- [ ] **E2E Performance:** Crear en `tests/e2e/performance/` si mide durante interacción
- [ ] **Performance Puro:** Crear en `tests/performance/` si es auditoría estática
- [ ] Si es página nueva:
  - Agregar a [`lighthouserc.perf.json`](../lighthouserc.perf.json) → `collect.url`
  - Crear test E2E Performance en `tests/e2e/performance/{page}.spec.ts`
- [ ] Validar con `npm run test:perf` (puro) o `npm run test:e2e` (e2e)
- [ ] Verificar thresholds con `npm run perf:check`

---

**Última actualización:** 2025-11-14  
**Template:** admin-next v0.0.1  
**Playwright:** 1.55.1  
**Lighthouse CI:** 0.15.1
