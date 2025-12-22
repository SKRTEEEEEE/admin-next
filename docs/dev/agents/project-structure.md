# Project Structure

> Árbol de directorios + convenciones de naming

## 📁 Estructura Crítica

```
admin-next/
├─ log-ui-ts/                    # Submodule (NO modificar sin confirmar)
├─ content/data/{locale}/        # i18n (ÚNICA fuente de verdad)
├─ src/
│  ├─ app/[locale]/             # App Router
│  │  ├─ _componentes/          # Componentes página-específicos
│  │  └─ [RUTA]/_componentes/   # Componentes ruta-específicos
│  ├─ components/
│  │  ├─ [DOMINIO]/             # Reutilizables proyecto
│  │  └─ ui/                    # shadcn/ui (NO modificar estructura)
│  ├─ core/
│  │  ├─ application/           # Use cases + interfaces
│  │  ├─ infrastructure/        # Repos API + servicios
│  │  └─ presentation/          # Adapters + controllers
│  └─ lib/                      # i18n, utils, metadata
├─ tests/
│  ├─ vitest/                   # unit, api, component
│  └─ pw/                       # component, integration, e2e, performance
└─ .github/workflows/           # CI/CD (NO tocar)
```

## 🔤 Convenciones de Naming

- **Componentes:** `kebab-case.tsx`
- **Tests:** `.test.ts` (Vitest) | `.spec.ts` (Playwright)
- **i18n:** `{locale}/[nombre].json`
- **Repositories:** `*.repository.ts`
- **Use Cases:** `*.ts` (sin sufijo)

## 📂 Regla: Reutilizable vs Específico

| Ubicación | Uso |
|-----------|-----|
| `src/components/[DOMINIO]/` | Reutilizable entre páginas |
| `app/[locale]/_componentes/` | Específico de una página |
| `app/[locale]/[ruta]/_componentes/` | Específico de una ruta |

## 📋 Archivos Críticos (NO Modificar)

| Archivo | ¿Modificar? |
|---------|-------------|
| `src/app/globals.css` | ⚠️ Solo custom tokens |
| `src/lib/i18n/routing.ts` | ✅ Agregar rutas proyecto |
| `playwright.config.ts` | ❌ NO cambiar proyectos |
| `.nycrc`, `vitest.config.ts` | ❌ NO cambiar thresholds |
| `log-ui-ts/` | ❌ NO modificar sin confirmar |

## 📚 Referencias

- **Clean Architecture:** [cleanarch.md](../../../docs/cleanarch.md)
- **Workflows:** [dev-workflows.md](./dev-workflows.md)
- **Testing:** [tests/README.md](../../../tests/README.md)
