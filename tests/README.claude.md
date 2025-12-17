# Test Configuration - Implementation Plan

## 📁 Nueva Estructura Propuesta

```
tests/
├── vitest/                    # ⚡ Tests rápidos (Node.js, sin browser)
│   ├── unit/                  # Funciones puras, utils
│   │   ├── core-utils.test.ts     ← migrar de pw/unit/
│   │   ├── lib-utils.test.ts      ← migrar de pw/unit/
│   │   └── lib-data.test.ts       ← migrar de pw/unit/lib/
│   ├── component/             # Componentes con Testing Library
│   │   └── button.test.tsx        ← migrar de pw/unit/components/
│   ├── api/                   # Tests de data/logic de API
│   │   ├── project.test.ts        ← migrar de pw/api/
│   │   └── tech.test.ts           ← migrar de pw/api/
│   └── setup.ts
│
├── pw/                        # 🎭 Tests Playwright (necesitan browser/server)
│   ├── component/             # Tests de componentes visuales (interacción UI)
│   │   ├── mode-toggle.spec.ts        # Theme switcher
│   │   ├── navbar.spec.ts             # Navegación
│   │   ├── admin-hero.spec.ts         # Hero section
│   │   ├── admin-theming.spec.ts      # Presets de temas
│   │   └── admin-components.spec.ts   # Componentes admin
│   │
│   ├── integration/           # Tests con servidor (locale, SEO, a11y)
│   │   ├── accessibility.spec.ts           # A11y smoke tests
│   │   ├── seo-metadata.spec.ts            # Meta tags
│   │   ├── seo-metadata-enhanced.spec.ts   # SEO avanzado
│   │   ├── seo-robots-sitemap.spec.ts      # robots.txt + sitemap
│   │   ├── usecases.spec.ts                # Admin status
│   │   ├── info.spec.ts                    # Admin home page
│   │   ├── portafolio.spec.ts              # Locale CA
│   │   └── pages/
│   │       └── proyectos-id.spec.ts        # Locale routing
│   │
│   ├── e2e/                   # Tests end-to-end (flujos completos usuario)
│   │   └── (vacío - por crear flujos reales de usuario)
│   │
│   └── performance/           # Web Vitals, bundle size
│       ├── web-vitals-pure.spec.ts         # FCP metrics
│       ├── bundle-budgets.spec.ts          # Bundle size
│       ├── lighthouse-ci.spec.ts           # LHCI integration
│       ├── homepage.spec.ts                # Home Web Vitals ← de e2e/performance
│       ├── gradients-page.spec.ts          # Gradients Web Vitals ← de e2e/performance
│       └── info-page.spec.ts               # Info Web Vitals ← de e2e/performance
│
├── utils/                     # Helpers compartidos
│   └── url.ts                 # URL helpers para tests
│
└── README.md
```

---

## 📋 Organización Detallada de `pw/`

### `pw/component/` - Tests de Componentes Visuales
**Propósito**: Verificar interacciones UI que requieren browser real  
**Características**:
- Necesitan servidor corriendo (`:3000`)
- Prueban interactividad visual (clicks, hovers, animaciones)
- Verifican renderizado real en browser

**Archivos**:
- `mode-toggle.spec.ts` - Cambio de temas (light/dark/presets)
- `navbar.spec.ts` - Navegación y menús
- `admin-hero.spec.ts` - Hero section del admin
- `admin-theming.spec.ts` - 6 presets de temas
- `admin-components.spec.ts` - Componentes específicos admin

---

### `pw/integration/` - Tests de Integración
**Propósito**: Verificar funcionalidades que requieren servidor  
**Características**:
- Server-side rendering (SSR)
- i18n / locale routing
- SEO (meta tags, robots.txt, sitemap)
- Accessibility (a11y)

**Archivos**:
- `accessibility.spec.ts` - Smoke tests a11y básicos
- `seo-metadata.spec.ts` - Meta tags básicos
- `seo-metadata-enhanced.spec.ts` - SEO avanzado (OG, Twitter)
- `seo-robots-sitemap.spec.ts` - robots.txt y sitemap.xml
- `usecases.spec.ts` - Admin status API integration
- `info.spec.ts` - Página admin home
- `portafolio.spec.ts` - Test locale catalán
- `pages/proyectos-id.spec.ts` - Locale routing español

---

### `pw/e2e/` - Tests End-to-End
**Propósito**: Flujos completos de usuario real (multi-página)  
**Características**:
- Simulan comportamiento real del usuario
- Navegación entre múltiples páginas
- Interacciones complejas (login, checkout, forms)
- Escenarios completos de principio a fin

**Estado**: 
- 🔧 **Pendiente** - Actualmente vacío, por crear
- Los archivos en `e2e/performance/` se moverán a `performance/`

**Ejemplos de E2E reales**:
- Login → Dashboard → Create item → Logout
- Browse products → Add to cart → Checkout
- Search → Filter → View details → Contact

---

### `pw/performance/` - Tests de Performance
**Propósito**: Métricas de Web Vitals, bundle size y LHCI  
**Características**:
- Core Web Vitals (LCP, FID, CLS, FCP)
- Bundle size budgets
- Lighthouse CI integration
- Performance por página

**Archivos**:
- `web-vitals-pure.spec.ts` - FCP (First Contentful Paint)
- `bundle-budgets.spec.ts` - Verificar tamaño de bundles
- `lighthouse-ci.spec.ts` - Integración LHCI (si existe)
- `homepage.spec.ts` - Web Vitals home page *(mover de e2e/)*
- `gradients-page.spec.ts` - Web Vitals gradients *(mover de e2e/)*
- `info-page.spec.ts` - Web Vitals admin info *(mover de e2e/)*

**Nota**: Los archivos actualmente en `e2e/performance/` son tests de performance, NO e2e. Se deben mover a `performance/`
```

---

## 🔄 Qué Migrar a Vitest

| Carpeta actual | Migrar a Vitest | Razón |
|----------------|-----------------|-------|
| `unit/` | ✅ Todo | Funciones puras |
| `api/` | ✅ Todo | Solo data/logic |
| `component/` | ❌ Mantener PW | Necesitan render visual |
| `integration/` | ❌ Mantener PW | Necesitan servidor |
| `e2e/` | ❌ Mantener PW | Browser real |
| `performance/` | ❌ Mantener PW | Métricas browser |
| `pages/` | ❌ Eliminar/merge | Redundantes con integration |

---

## 📊 Sistema de Coverage

### Vitest Coverage (tests rápidos)

```typescript
// vitest.config.ts - thresholds
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html', 'lcov'],
  reportsDirectory: './docs/coverage/vitest',
  thresholds: {
    statements: 80,
    branches: 60,
    functions: 80,
    lines: 80,
  },
  exclude: [
    'node_modules/',
    'tests/',
    '**/*.d.ts',
    '**/*.config.*',
    '.next/',
    'src/middleware.ts',
  ],
}
```

### NYC Coverage (Playwright - integration)

```json
// .nycrc - thresholds más bajos (cubre menos código)
{
  "lines": 60,
  "statements": 60,
  "functions": 60,
  "branches": 40
}
```

### Coverage Combinado

El coverage total se calcula sumando:
- **Vitest**: unit + api + component logic (~80% del código)
- **NYC/Playwright**: integration paths (~20% adicional)

---

## 🚦 Sistema LHCI (Lighthouse CI)

### Thresholds de Categorías

| Métrica | Mínimo | Nivel |
|---------|--------|-------|
| Performance | 40% | warn |
| Accessibility | 80% | error |
| SEO | 80% | error |
| Best Practices | 80% | error |

### Web Vitals Thresholds

| Métrica | Máximo | Descripción |
|---------|--------|-------------|
| FCP | 3000ms | First Contentful Paint |
| LCP | 4000ms | Largest Contentful Paint |
| CLS | 0.25 | Cumulative Layout Shift |
| TBT | 600ms | Total Blocking Time |
| SI | 5000ms | Speed Index |

---

## 📋 Comandos

```json
{
  // === VITEST (rápido, sin servidor) ===
  "vitest": "vitest",
  "vitest:run": "vitest run",
  "vitest:cov": "vitest run --coverage",
  "vitest:ui": "vitest --ui",

  // === PLAYWRIGHT (necesita servidor) ===
  "pw": "playwright test",
  "pw:int": "playwright test tests/pw/integration",
  "pw:e2e": "playwright test tests/pw/e2e",
  "pw:perf": "playwright test tests/pw/performance",
  "pw:cov": "nyc playwright test",

  // === COMBINADOS ===
  "test:fast": "npm run vitest:run", //Fast concept - REDUNDANT
  "test:cov": "npm run vitest:cov && npm run pw:cov", //All cov
  "test:all": "npm run vitest && npm run pw", //All with. cov

  // === LHCI ===
  "perf": "lhci autorun --config=lighthouserc.perf.json",
  "perf:check": "node scripts/check-perf-thresholds.js",

  // === COVERAGE REPORT ===
  "coverage:report": "npm run test:vitest:cov && open docs/coverage/vitest/index.html"
}
```

---


## 🔄 Flujo Completo

```
┌─────────────────────────────────────────────────────────────────────┐
│                          DESARROLLO                                  │
├─────────────────────────────────────────────────────────────────────┤
│  npm run vitest         → Vitest watch mode (instantáneo)           │
│  npm run dev            → Next.js dev server                        │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       PRE-COMMIT (~15s)                             │
├─────────────────────────────────────────────────────────────────────┤
│  1. eslint                          → Linting                       │
│  2. tsc --noEmit                    → Type check                    │
│  3. npm run vitest:cov              → Vitest + coverage check ✅    │
│  4. commitlint                      → Conventional commits          │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       PRE-PUSH (~3min)                              │
├─────────────────────────────────────────────────────────────────────┤
│  1. npm run pw:cov                  → Playwright + NYC coverage     │
│  2. npm run perf                    → LHCI run                      │
│  3. npm run perf:check              → LHCI thresholds check         │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     CI/CD - GitHub Actions                          │
├─────────────────────────────────────────────────────────────────────┤
│  ON: push (any branch)                                              │
│  └── next build                     → Solo build check (no tests)   │
│                                                                     │
│  ON: pull_request (main)            → FULL                          │
│  ├── npm run test:cov               → Vitest + Playwright coverage  │
│  └── Post comment con métricas                                      │
│                                                                     │
│  ON: push (main)                                                    │
│  └── npm run vitest:cov             → Vitest coverage only          │
└─────────────────────────────────────────────────────────────────────┘
```

---


## 📊 Resumen Visual

```
                    ┌──────────────────┐
                    │   DESARROLLO     │
                    │  npm run vitest  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌─────────────────────────────────┐
        │ COMMIT   │  │  PUSH    │  │              CI                 │
        ├──────────┤  ├──────────┤  ├─────────────────────────────────┤
        │ ~15s     │  │ ~3min    │  │  push(*)   PR(main)  push(main) │
        ├──────────┤  ├──────────┤  ├─────────────────────────────────┤
        │ lint     │  │ pw:cov   │  │  build     test:cov  vitest:cov │
        │ tsc      │  │          │  │  only      +comment             │
        │ vitest   │  │ perf     │  │                                 │
        │ +cov     │  │          │  │                                 │
        │          │  │ perf:    │  │                                 │
        │ commitlnt│  │ check    │  │                                 │
        └──────────┘  └──────────┘  └─────────────────────────────────┘

Coverage:  80%         60%           -       80%+60%      80%
           Vitest      Playwright    -       Full         Vitest
```

---

## 📝 Notas de Implementación

### Archivos de Configuración

- `vitest.config.ts` - Configuración Vitest con coverage thresholds
- `playwright.config.ts` - Configuración Playwright con projects
- `.nycrc` - Coverage thresholds para Playwright
- `lighthouserc.perf.json` - Configuración LHCI
- `scripts/check-perf-thresholds.js` - Script de validación LHCI

### Reportes Generados

```
docs/
├── coverage/
│   ├── vitest/          # Coverage Vitest (HTML)
│   └── playwright/      # Coverage NYC (HTML)
├── lighthouse-reports/
│   └── perf/            # Reportes LHCI
├── badges/              # Badges para README
│   ├── perf.json
│   ├── acc.json
│   ├── seo.json
│   └── bp.json
└── test-results/
    ├── html-report/     # Playwright HTML report
    └── artifacts/       # Screenshots, traces
```


## 🏷️ Badges
### `lhci`
- Se incluye una fila (3ra linea) con los resultados de los informes de lighthouse
- **Los reportes se generan el local al ejecutar `npm run perf:check`**
  - Esto significa que al ejecutar este comando se han de actualizar los valores de ./docs/badges
### test
- **Los reportes se generan con la action `lighthouse.yml` que sera renombrada a `test-coverage.yml`**
- Todas las lineas de test, han de incluir los campos clásicos de coverage(st, br, func y lines) 
- Se incluye/genera una fila (2da linea) con la media de los resultados de ambas partes (pw + vitest)
- [ ] Se incluyen lineas (4ta i 5ta) de cada 'sección' de los test (playwright y vitest) 