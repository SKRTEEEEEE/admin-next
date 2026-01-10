# Test Configuration

> Sistema de testing dual (Vitest + Playwright) con coverage combinado y auditorías LHCI.


## Arquitectura de Tests

| Directorio | Runner | Servidor | Propósito |
|------------|--------|----------|-----------|
| `vitest/unit/` | Vitest | ❌ | Funciones puras, utils |
| `vitest/api/` | Vitest | ❌ | Data/logic de API |
| `vitest/component/` | Vitest | ❌ | Componentes con Testing Library |
| `pw/component/` | Playwright | ✅ | Interacciones UI (clicks, temas) |
| `pw/integration/` | Playwright | ✅ | SSR, i18n, SEO, a11y |
| `pw/e2e/` | Playwright | ✅ | Flujos completos de usuario |
| `pw/performance/` | Playwright | ✅ | Web Vitals, bundle size |

## Sistema de Coverage

### Thresholds

| Runner | Statements | Branches | Functions | Lines |
|--------|------------|----------|-----------|-------|
| **Vitest** | 80% | 60% | 80% | 80% |
| **NYC/Playwright** | 60% | 40% | 60% | 60% |

### Reportes

```
docs/coverage/
├── vitest/       # npm run vitest:cov
└── playwright/   # npm run pw:cov (NYC)
```

## Sistema LHCI (Lighthouse CI)

### Thresholds de Categorías

| Categoría | Mínimo | Nivel |
|-----------|--------|-------|
| Performance | 70% | error |
| Accessibility | 90% | error |
| SEO | 90% | error |
| Best Practices | 90% | error |

### Web Vitals

| Métrica | Máximo | Descripción |
|---------|--------|-------------|
| FCP | 1800ms | First Contentful Paint |
| LCP | 2500ms | Largest Contentful Paint |
| CLS | 0.1 | Cumulative Layout Shift |
| TBT | 250ms | Total Blocking Time |
| SI | 3000ms | Speed Index |

### Reportes
```
docs/lighthouse-reports/perf/   # npm run perf
docs/badges/                    # npm run perf:check (actualiza badges)
```

## Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│  DESARROLLO: npm run vitest (watch) + npm run dev                   │
└─────────────────────────────────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│  PRE-COMMIT (~15s): lint → tsc → vitest:cov → commitlint            │
└─────────────────────────────────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│  PRE-PUSH (~3min): pw:cov → perf → perf:check                       │
└─────────────────────────────────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│  CI/CD (GitHub Actions)                                             │
│  ├─ push(*): build only                                             │
│  └─ PR/push(main): vitest:cov + pw:cov + badges                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Nota: Playwright webServer

```typescript
// playwright.config.ts - CI usa dev, local usa start
webServer: {
  command: process.env.CI ? 'npm run dev' : 'npm run start',
}
```

Ver [reporte detallado](../docs/reports/playwright-ci-dev-vs-prod.md) para más info.

## Badges

| Tipo | Ubicación | Generación |
|------|-----------|------------|
| Coverage (media) | `.github/badges/coverage-*.json` | CI (main) |
| Vitest | `.github/badges/vitest-*.json` | CI (main) |
| Playwright | `.github/badges/playwright-*.json` | CI (main) |
| LHCI | `docs/badges/*.json` | Local (`npm run perf:check`) |

Colores: 🟢 ≥80% | 🟡 60-79% | 🟠 40-59% | 🔴 <40%

## Comandos Completos

```bash
# Vitest
npm run vitest           # Watch mode
npm run vitest:run       # Single run
npm run vitest:cov       # Con coverage
npm run vitest:ui        # UI interactiva
 
 # Vitest log-ui-ts
 npm run vitest:run:l-ui  # Ejecución única (submódulo)
 npm run vitest:cov:l-ui  # Coverage con thresholds (submódulo)
 
 # Playwright
npm run pw               # Todos los tests
npm run pw:int           # Solo integration
npm run pw:e2e           # Solo e2e
npm run pw:perf          # Solo performance
npm run pw:cov           # Con NYC coverage

# Combinados
npm run test:cov         # vitest:cov + pw:cov
npm run test:all         # vitest + pw

# LHCI
npm run perf             # Audit completo
npm run perf:check       # Validar + badges
```

## Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `vitest.config.ts` | Vitest + coverage thresholds (global) |
| `vitest.config.log-ui-ts.ts` | Vitest específico para el submódulo `log-ui-ts` |
| `playwright.config.ts` | Playwright projects + webServer |
| `.nycrc` | NYC coverage thresholds |
| `lighthouserc.perf.json` | LHCI thresholds + URLs |
| `scripts/check-perf-thresholds.js` | Validación LHCI + badges |
