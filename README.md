# Profile Next Template – micro front NextJS template

<div align="center">
  
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![Test Coverage](https://img.shields.io/badge/🌡️TEST-Coverage-green?style=social)
[![Coverage: Statements](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/coverage-statements.json)](.github/badges/coverage-statements.json)
[![Coverage: Branches](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/coverage-branches.json)](.github/badges/coverage-branches.json)
[![Coverage: Functions](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/coverage-functions.json)](.github/badges/coverage-functions.json)
[![Coverage: Lines](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/coverage-lines.json)](.github/badges/coverage-lines.json)

![Lighthouse Performance](https://img.shields.io/badge/🏠LIGHTHOUSE-Performance-orange?style=social)
[![Performance](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/docs/badges/perf.json)](docs/badges/perf.json)
[![Accessibility](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/docs/badges/acc.json)](docs/badges/acc.json)
[![SEO](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/docs/badges/seo.json)](docs/badges/seo.json)
[![Best Practices](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/docs/badges/bp.json)](docs/badges/bp.json)


![Vitest Coverage](https://img.shields.io/badge/⚡Vitest-coverage-orange?style=social)
[![Vitest Statements](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/vitest-statements.json)](.github/badges/vitest-statements.json)
[![Vitest Branches](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/vitest-branches.json)](.github/badges/vitest-branches.json)
[![Vitest Functions](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/vitest-functions.json)](.github/badges/vitest-functions.json)
[![Vitest Lines](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/vitest-lines.json)](.github/badges/vitest-lines.json)

![Playwright Coverage](https://img.shields.io/badge/🎭Playwright-coverage-orange?style=social)
[![Playwright Statements](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/playwright-statements.json)](.github/badges/playwright-statements.json)
[![Playwright Branches](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/playwright-branches.json)](.github/badges/playwright-branches.json)
[![Playwright Functions](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/playwright-functions.json)](.github/badges/playwright-functions.json)
[![Playwright Lines](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/playwright-lines.json)](.github/badges/playwright-lines.json)

</div>

> *Un punto de partida moderno para frontend's. Construido con Next.js 16, React 19, TypeScript, y Tailwind CSS. Incluye soporte multi-idioma, temas personalizados, y gradientes animados.*
> - Especialmente pensado para **micro-frontend's y clean-architecture con fuerte acople a `domain`**
> - **`domain` como package: contrato central** de los micro-frontend's, compartido con el backend.
> - **`log-ui` como submodule: contrato visual** de los micro-frontend's.

---

## 📋 Visión General

**Profile Next Template** es un template de landing minimalista diseñado para centralizar y monitorear el estado de múltiples micro frontends (como `admin`, `profile`, `agora`) sobre el monolito `profile-nest`. Pensado como blueprint/template reutilizable con una arquitectura simple pero poderosa, centrada en un buen CI/CD y el uso de mis librerías base favoritas.

## ✨ Características Principales

- 🌍 Soporte Multi-idioma - Preconfigurado para inglés, español, catalán y alemán
- 🎨 Sistema de Temas - 12 temas predefinidos con soporte para modo claro y oscuro
- 🏷️ Toast errores - Sistema de muestra de errores con mensaje friendly para el usuario automáticamente
- 🧪 Testing Completo - enfoque continuo con husky y flujo simple integrado
  - 🖲️ Suite de tests con Playwright (unit, component, pages, integration, e2e) 
  - 🌩️ Suite de tests ultra rápidos con Vitest (unit, api)
  - 💻 Performance testing (Lighthouse CI + Web Vitals) 
- 🛡️ Clean Architecture - Capas basadas en vertical clean architecture + separación por responsabilidad (shared/module)
- 🧩 Enfoque Micro-frontend - Template fuertemente pensado para el uso con micro-frontend's
  - 🔐 Dominio package - Fuerte acople al dominio (clean architecture) configurado como package 
  - 🍱 Sincronización automática - Usa submodule para compartir la UI + funcionalidades fácilmente.
- 🎭 Gradientes Animados - Fondos dinámicos configurables para crear experiencias visuales impactantes
- 🎭 Componentes Accesibles - Basado en shadcn/ui
- 🎯 100% TypeScript - Type-safety completo en todo el proyecto
- ⚡ Ultra Optimizado - Construido con Next.js 16 App Router y Turbopack para máximo rendimiento
- 🔍 SEO Ready - Meta tags, sitemap y robots.txt preconfigurados
- 📱 Totalmente Responsivo - Diseño mobile-first con Tailwind CSS 4
- 📦 Template Simple - Una sola página, fácil de duplicar y mantener
- 🛠️ Fácil Personalización - Todo el contenido gestionado mediante archivos JSON
- 🚀 API de Estado - Endpoint de ejemplo para monitoreo de servicios

## 🛠️ Stack Tecnológico

### Tecnologías Core

- **Framework:** [Next.js 16](https://nextjs.org/) con App Router
- **UI Library:** [React 19.2.0](https://reactjs.org/)
- **Lenguaje:** [TypeScript 5](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Internacionalización:** [next-intl 4.3.9](https://next-intl-docs.vercel.app/)
- **Temas:** [next-themes](https://github.com/pacocoursey/next-themes)

### Componentes UI y Librerías

- **Componentes UI:** [Radix UI](https://www.radix-ui.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Componentes:** [shadcn/ui](https://ui.shadcn.com/)
- **Notificaciones:** [Sonner](https://sonner.emilkowal.ski/)

### Desarrollo y Testing

- **Testing:** 
  - [Playwright](https://playwright.dev/) (6 cat: unit, api, component, integration, e2e, performance)
  - [Vitest](https://vitest.dev/) (2 cat: unit, api)
- **Coverage:** [NYC](https://www.npmjs.com/package/nyc) (thresholds: 60/60/60/40)
- **Performance:** [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) (thresholds: 70/80/80/80)
- **Linting:** [ESLint 9](https://eslint.org/) con configuración Next.js
- **Git Hooks:** [Husky](https://typicode.github.io/husky/)
- **Commit Linting:** [Commitlint](https://commitlint.js.org/)

## 🚀 Getting Started
```bash
git clone https://github.com/SKRTEEEEEE/profile-migration.git
cd admin-next
git submodule update --init --recursive
npm install
npm run dev
# usa PORT=3003 npm run dev si convives con otro frontend en 3000
```

> **Nota:** Este proyecto usa `log-ui-ts` como submodule. Para configurar las dependencias necesarias para utilizar-lo (como `@skrteeeeee/profile-domain`), consulta [log-ui-ts/README.md](log-ui-ts/README.md).
> 
> ⚠️ DISCLAIMER: *Este template usa 'dominio' como package y submodule para la lógica compartida. Para utilizar este template, crea un 'dominio' con la lógica de tu app y adapta los distintos componentes a esta*
> - *Si quieres iniciar el proyecto 'tal como esta': [deberás asegurar-te de tener disponible `package/domain`, puedes encontrar el código utilizado en este template aquí - v0.0.2](https://github.com/SKRTEEEEEE/profile-domain)*
> - *[Guía sobre como empezar rápido o como desplegar, aquí](./docs/dev/how-start.md)*

## 📦 Usage

> 📚 **Full docs**: See [tests/README.md](tests/README.md) for complete testing guide

### Quick Start
```bash
npm run dev              # Development server (port 3000)
npm run build            # Production build
npm run start            # Serve production build
```

### Testing & Quality
```bash
npm run vitest           # Fast unit tests (watch mode)
npm run vitest:cov       # Unit tests with coverage
npm run pw:cov           # Playwright integration tests
npm run lint             # ESLint validation
```

### Performance Audits
```bash
npm run perf             # Full Lighthouse CI audit
npm run perf:check       # Validate thresholds + update badges
```

### Badges System

**Coverage & Performance badges auto-update** on `main` push via GitHub Actions:

- **Coverage**: Combined average (Vitest + Playwright) in `.github/badges/`
- **Lighthouse**: Performance/A11y/SEO/BP metrics in `docs/badges/`
- **Colors**: 🟢 ≥80% | 🟡 60-79% | 🟠 40-59% | 🔴 <40%

### Recommended Workflow

- **Local dev**: `npm run dev` + `npm run vitest` (watch mode)
- **Pre-commit** (automatic): lint + typecheck + vitest coverage
- **Pre-push** (automatic): playwright tests + performance checks
- **CI/CD**: Full test suite + badge updates on main


## 📁 Estructura del Proyecto
> - 📚 **Full docs: See [docs/cleanarch.md](./docs/cleanarch.md)** for a complete guide of the purposed structure
> - 📚 **Full docs**: See [tests/README.md](tests/README.md) for complete testing guide
> - 📚 **Full docs**: See [log-ui-ts/README.md](./log-ui-ts/README.md) for complete log-ui-ts submodule guide



```
[your-project]/
├─ log-ui-ts/                    # Submodule (NO modificar sin confirmar)
├─ content/data/{locale}/        # i18n (ÚNICA fuente de verdad)
├─ src/
│  ├─ app/[locale]/             # App Router
│  │  ├─ _componentes/          # Componentes página-específicos
│  │  └─ [RUTA]/_componentes/   # Componentes ruta-específicos
│  ├─ components/
│  │  ├─ [DOMINIO]/             # Reutilizables proyecto
│  │  └─ ui/                    # shadcn/ui (NO modificar estructura)
│  ├─ core/                     # *descrito en /docs/cleanarch.md
│  └─ lib/                      # i18n, utils, metadata
├─ tests/                       # *descrito en /test/README.md
│  ├─ vitest/                   # unit, api, component
│  └─ pw/                       # component, integration, e2e, performance
├─ docs/                        # Documentación del proyecto
└─ .github/                     # Github Files
```

## 📝 License
Código bajo MIT License (ver LICENSE en la raíz del repo). Puedes escribir-me si necesitas reutilizarlo en otro frontend y necesitas ayuda. 💖
