# Admin Next – micro admin template

<div align="center">
  
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![Test Coverage](https://img.shields.io/badge/TEST-Coverage-green?style=social)
[![Coverage: Statements](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/coverage-statements.json)](.github/badges/coverage-statements.json)
[![Coverage: Branches](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/coverage-branches.json)](.github/badges/coverage-branches.json)
[![Coverage: Functions](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/coverage-functions.json)](.github/badges/coverage-functions.json)
[![Coverage: Lines](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/.github/badges/coverage-lines.json)](.github/badges/coverage-lines.json)

![Lighthouse Performance](https://img.shields.io/badge/LIGHTHOUSE-Performance-orange?style=social)
[![Performance](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/docs/badges/perf.json)](docs/badges/perf.json)
[![Accessibility](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/docs/badges/acc.json)](docs/badges/acc.json)
[![SEO](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/docs/badges/seo.json)](docs/badges/seo.json)
[![Best Practices](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/admin-next/main/docs/badges/bp.json)](docs/badges/bp.json)
</div>

> Un punto de partida minimalista y moderno para frontends. Construido con Next.js 16, React 19, TypeScript, y Tailwind CSS. Incluye soporte multiidioma, temas personalizados, y gradientes animados.

---

## 📋 Visión General

**Admin Next** es un template de landing minimalista diseñado para centralizar y monitorear el estado de múltiples micro frontends (como `admin`, `profile`, `agora`) sobre el monolito `profile-nest`. Pensado como blueprint/template reutilizable con una arquitectura simple pero poderosa, centrada en un buen CI/CD y el uso de mis librerías base favoritas.

## ✨ Características Principales

- 🌍 Soporte Multiidioma - Preconfigurado para inglés, español, catalán y alemán
- 🎨 Sistema de Temas - 12 temas predefinidos con soporte para modo claro y oscuro
- 🎭 Gradientes Animados - Fondos dinámicos configurables para crear experiencias visuales impactantes
- ⚡ Ultra Optimizado - Construido con Next.js 16 App Router y Turbopack para máximo rendimiento
- 🎯 100% TypeScript - Type-safety completo en todo el proyecto
- 📱 Totalmente Responsivo - Diseño mobile-first con Tailwind CSS 4
- 🧪 Testing Completo - Suite de tests con Playwright (unit, component, pages, integration, e2e) + Performance testing (Lighthouse CI + Web Vitals)
- 🎭 Componentes Accesibles - Basado en Radix UI y shadcn/ui
- 🔍 SEO Ready - Meta tags, sitemap y robots.txt preconfigurados
- 📦 Arquitectura Simple - Una sola página, fácil de duplicar y mantener
- 🚀 API de Estado - Endpoint de ejemplo para monitoreo de servicios
- 🛠️ Fácil Personalización - Todo el contenido gestionado mediante archivos JSON

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

- **Testing:** [Playwright](https://playwright.dev/) (7 proyectos: unit, api, component, pages, integration, e2e, performance)
- **Coverage:** [NYC](https://www.npmjs.com/package/nyc) (thresholds: 80/80/80/50)
- **Performance:** [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) (thresholds: 90/95/90/95)
- **Linting:** [ESLint 9](https://eslint.org/) con configuración Next.js
- **Git Hooks:** [Husky](https://typicode.github.io/husky/)
- **Commit Linting:** [Commitlint](https://commitlint.js.org/)

## 🚀 Getting Started
```bash
git clone https://github.com/SKRTEEEEEE/profile-migration.git
cd admin-next
npm install
npm run dev
# usa PORT=3003 npm run dev si convives con otro frontend en 3000
```

## 📦 Usage

### Scripts Principales
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Dev server con Turbopack (puerto 3000, usa `PORT=3003` si convives con otros frontends) |
| `npm run build` | Compila optimizado con Turbopack |
| `npm run start` | Sirve la build (necesario para tests con servidor) |
| `npm run lint` | ESLint 9 + config Next.js |
| **Testing** | |
| `npm run test:unit` | Tests unitarios + API (sin servidor) |
| `npm run test:server` | Tests component/pages/integration (con servidor) |
| `npm run test:e2e` | Tests E2E + E2E Performance (con servidor) |
| `npm run test:perf` | Tests Performance puros - Lighthouse wrapper (con servidor) |
| `npm run test:all` | Ejecuta todos los tests (unit + server + e2e + perf) |
| **Performance** | |
| `npm run perf` | Lighthouse CI completo (build + start + audit de 5 páginas) |
| `npm run perf:check` | Validar thresholds de performance (90/95/90/95) |
| `npm run lh:home` | Lighthouse audit manual de la home |

### Flujo de Test Recomendado
1. **Pre-commit (automático):**
   - `npm run lint` - Validaciones de código
   - `npx tsc --noEmit` - Type checking
   - `npm run test:coverage:unit` - Coverage mínimo 80%
   - `npm run perf:check` - Thresholds de performance (90/95/90/95)

2. **Testing local:**
   - `npm run test:unit` - Tests rápidos sin servidor
   - `npm run build && npm run start` en una terminal
   - `npx wait-on http://localhost:3000 && npm run test:server` en otra terminal
   - `npx wait-on http://localhost:3000 && npm run test:e2e` - E2E + E2E Performance

3. **Performance audit completo:**
   - `npm run perf` - Lighthouse CI (build + start + audit automático)

> 📚 **Documentación completa de testing:** Ver [docs/TEST.md](docs/TEST.md) para guía detallada de todos los tipos de tests, configuración, thresholds y workflows.

## 📁 Estructura del Proyecto
```
admin-next/
├─ log-ui-ts/                         # Submodule compartido (auth, components, core)
├─ content/data/{locale}/
│  ├─ admin.json                      # Textos de la landing por idioma
│  └─ common.json                     # Traducciones comunes
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx                # ThemeProvider + NextIntl
│  │  │  └─ page.tsx                  # Vista principal (hero + status + diagnostics)
│  │  └─ api/admin/status/route.ts    # API de ejemplo para monitoreo
│  ├─ components/
│  │  ├─ admin/                       # Componentes específicos del template
│  │  ├─ ui/                          # shadcn/ui components
│  │  └─ mode-toggle.tsx              # Theme switcher (6 presets x 2 modos)
│  ├─ core/
│  │  ├─ admin/surfaces.ts            # Mock data para API
│  │  ├─ application/                 # Use cases e interfaces
│  │  └─ infrastructure/              # Repositorios API
│  └─ lib/
│     ├─ i18n/routing.ts              # Rutas i18n (/, /gradients)
│     ├─ utils.ts                     # Utilidades (gradients, cn)
│     └─ metadata.ts                  # SEO helpers
└─ tests/                             # Specs por tipo (unit/component/api/e2e)
```

## 🌍 Internacionalización
- **Archivos:** `content/data/{locale}/admin.json` + `common.json`
- **Rutas:** Configuradas en `src/lib/i18n/routing.ts`
- **Uso:** `getTranslations("admin")` en componentes
- **Idiomas:** en, es, ca, de (ampliable en `routing.ts`)

## 🎨 Sistema de Temas
- **Tokens:** Definidos en `src/app/globals.css` + `log-ui-ts/lib/globals.css`
- **Presets:** 6 esquemas de color (grays, gold, neon, sky, soft) × 2 modos
- **Gradientes:** Configurables en `src/lib/utils.ts` (usados por `AnimatedGradientBackground`)
- **Provider:** `next-themes` en layout raíz

## 🔧 Integración log-ui-ts
Este template integra el submodule **log-ui-ts** para funcionalidades compartidas:
- **Auth:** Autenticación con Thirdweb (setup requerido)
- **Components:** Header, navegación, theme toggle
- **Core:** Domain entities, repositorios base, flows
- **Hooks:** `use-media-query` y otros hooks compartidos

Ver `log-ui-ts/README.md` para setup completo de dependencias y configuración.

## 🔍 SEO y Utilidades
- `robots.ts`, `sitemap.ts` preconfigurados
- Meta tags dinámicos por idioma en `src/lib/metadata.ts`
- Open Graph y Twitter Cards incluidos
- Lighthouse score optimizado (ver `lh:home` script)

## CI
- Multiples ayudas para el desarrollo continuo, descubrelas en `.github`

## 📝 License
Código bajo MIT License (ver LICENSE en la raíz del repo). Escríbeme si necesitas reutilizarlo en otro frontend.
