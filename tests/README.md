# Documentación Master de Pruebas

> **Estrategia Híbrida**:  Responsabilidad segregada (Vitest vs Playwright) + Sistema de Calidad (CI/CD, Badges, LHCI).

Este directorio gobierna la calidad del proyecto `admin-next`. Aquí convergen la filosofía del "Test-Padre" con la infraestructura técnica de reportes.

---

## 1. Arquitectura y Responsabilidades

Dividimos el testing en dos dominios estrictos para maximizar la confianza y minimizar la fragilidad.

| Dominio | Herramienta | Servidor | Objetivo | Doc |
| :--- | :--- | :--- | :--- | :--- |
| **Lógica & Unit** | **Vitest** | ❌ No | Validar funciones puras, componentes aislados y reglas de negocio. Rápido y determinista. | [Ver Guía](./vitest/README.md) |
| **E2E & Humo** | **Playwright** | ✅ Sí | Validar que la app *funciona* para el usuario. Navegación, i18n, flujos críticos. | [Ver Guía](./pw/README.md) |

### El "Test-Padre"
Es el E2E crítico (`smoke/admin-workflow.spec.ts`) que valida la integridad total del sistema (Frontend + Backend simulado + Interacciones). Si este test falla, **no se despliega**.

---

## 2. Workflow de Calidad y CI/CD

El pipeline asegura que cada commit cumpla estándares antes de llegar a producción.

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

### Badges de Estado
Generados automáticamente en CI para visibilidad inmediata en el README principal.

| Tipo | Ubicación | Generación |
| :--- | :--- | :--- |
| **Coverage** | `.github/badges/coverage-*.json` | CI (Branch main) |
| **Vitest** | `.github/badges/vitest-*.json` | CI (Branch main) |
| **Playwright** | `.github/badges/playwright-*.json` | CI (Branch main) |
| **Lighthouse** | `docs/badges/*.json` | Local (`npm run perf:check`) |

---

## 3. Sistema de Métricas (Thresholds)

### Cobertura de Código (Code Coverage)
[Decisión Técnica:](./../docs/dev/no-pw-cov.md) Priorizamos cobertura de líneas en Unit (Vitest) y confiabilidad funcional en E2E (Playwright).

| Runner | Statements | Branches | Functions | Lines |
| :--- | :--- | :--- | :--- | :--- |
| **Vitest** | 80% | 60% | 80% | 80% |
| **Playwright** | N/A* | N/A* | N/A* | N/A* |

*> El comando `pw:cov` existe (NYC) pero no bloquea despliegues. Se usa solo para análisis manual.*

### Core Web Vitals (Lighthouse CI)
Límites estrictos para asegurar la experiencia de usuario.

| Métrica | Límite (Desktop) | Descripción |
| :--- | :--- | :--- |
| **FCP** | < 1.8s | Primera pintura con contenido |
| **LCOM** | < 2.5s | Despliegue del elemento más grande |
| **CLS** | < 0.1 | Estabilidad visual (saltos) |
| **Score** | > 90 | Puntuación general Performance/SEO/A11y |

---

## 4. Matriz de Decisión: ¿Dónde va mi test?

| Escenario | Directorio | Tipo |
| :--- | :--- | :--- |
| Función pura `sumar(a, b)` | `tests/vitest/unit` | Unit |
| Componente visual `Button` | `tests/vitest/component` | Component |
| Endpoint de API JSON | `tests/vitest/api` | Unit/Integration |
| **Flujo Crítico ("Test-Padre")** | `tests/pw/e2e/smoke` | **E2E Smoke** |
| Reacción UI a Error 500 | `tests/pw/integration` | Integration (Mocked) |
| Carga de página < 2s | `tests/pw/performance` | Performance |

---

## 5. Comandos Maestros

```bash
# === 🚀 Ejecución Principal ===
npm run test:all         # Ejecuta TODO (Unit + E2E)
npm run vitest:run       # Solo Unitarios (Rápido)
npx playwright test tests/pw/e2e/smoke/admin-workflow.spec.ts  # Solo Test-Padre

# === 📊 Reportes de Coverage ===
npm run vitest:cov       # Coverage Unitario Global
npm run vitest:cov:l-ui  # Coverage solo submódulo log-ui
npm run pw:cov           # Coverage E2E (Experimental/Manual)

# === ⚡ Performance ===
npm run perf             # Auditoría Lighthouse completa
npm run perf:check       # Validar thresholds y generar badges
```

---

## 📂 Estructura de Archivos

| Archivo | Propósito |
| :--- | :--- |
| `vitest.config.ts` | Config de Vitest global + Thresholds. |
| `playwright.config.ts` | Config de Playwright (Proyectos, WebServer). |
| `lighthouserc.perf.json` | Config de LHCI (URLs a auditar, límites). |
| `.nycrc` | Config de NYC (usado por `pw:cov`). |
