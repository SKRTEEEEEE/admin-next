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
</div>

> Un punto de partida minimalista y moderno para frontends. Construido con Next.js 16, React 19, TypeScript, y Tailwind CSS. Incluye soporte multiidioma, temas personalizados, y gradientes animados.

---

## 📋 Visión General

**Admin Next** es un template de landing minimalista diseñado para centralizar y monitorear el estado de múltiples micro frontends (como `admin`, `profile`, `agora`) sobre el monolito `profile-nest`. Pensado como blueprint/template reutilizable con una arquitectura simple pero poderosa, centrada en un buen CI/CD y el uso de mis librerías base favoritas.

##✨ Características Principales

- 🌍 Soporte Multiidioma - Preconfigurado para inglés, español, catalán y alemán
- 🎨 Sistema de Temas - 12 temas predefinidos con soporte para modo claro y oscuro
- 🎭 Gradientes Animados - Fondos dinámicos configurables para crear experiencias visuales impactantes
- ⚡ Ultra Optimizado - Construido con Next.js 16 App Router y Turbopack para máximo rendimiento
- 🎯 100% TypeScript - Type-safety completo en todo el proyecto
- 📱 Totalmente Responsivo - Diseño mobile-first con Tailwind CSS 4
- 🧪 Testing Incluido - Suite completa de tests con Playwright (unitarios, componentes, API, E2E)
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

- **Testing:** [Playwright](https://playwright.dev/) + [NYC](https://www.npmjs.com/package/nyc)
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

## Usage
- `npm run dev` → desarrollo local
- `npm run build && npm run start` → entorno de pruebas/Playwright server-side
- `npm run lint && npm run test:unit` → validaciones rápidas
- `npm run test:server` (con `npx wait-on http://localhost:3000`) → component/pages/integration/e2e

## Scripts útiles
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Dev server (puerto 3000, usa `PORT=3003` si convives con otros micro frontends) |
| `npm run build` | Compila con Turbopack |
| `npm run start` | Sirve la build (necesario para `test:server`) |
| `npm run lint` | ESLint 9 + config Next |
| `npm run test:unit` | Proyectos Playwright `unit` + `api` |
| `npm run test:server` | Ejecuta component/pages/integration/e2e (requiere server activo) |

### Flujo de test recomendado
1. `npm run lint`
2. `npm run test:unit`
3. `npm run build && npm run start` en una terminal y, en otra, `npm run test:server` (puedes usar `npx wait-on http://localhost:3000` antes de lanzar los tests).

## Estructura mínima
```
admin-next/
├─ content/data/{locale}/admin.json   # Copia textual de la landing
├─ src/app/[locale]/layout.tsx        # ThemeProvider + NextIntl + Navbar
├─ src/app/[locale]/page.tsx          # Única vista (hero + status + diagnostics)
├─ src/components/admin/animated-gradient.tsx
├─ src/components/mode-toggle.tsx     # Dropdown con 6 presets
├─ src/core/admin/surfaces.ts         # Datos mockeados para API/status
├─ src/app/api/admin/status/route.ts  # Endpoint usado por tests/api
└─ tests/…                            # 1 spec mínimo por tipo (unit/component/etc)
```

## Internacionalización
- Contenido en `content/data/{locale}/admin.json` + `common.json`
- `src/lib/i18n/routing.ts` sólo expone `/` y `/gradients`
- `getTranslations("admin")` alimenta el layout principal

## Temas
- Tokens base en `src/app/globals.css`

## SEO & utilidades
- `robots.ts`, `sitemap.ts` y schemas siguen activos para asegurar foco SEO.
- `AnimatedGradientBackground` recicla la lista de gradientes de `src/lib/utils.ts`.
- `adminSurfaces` + `app/api/admin/status` sirven de ejemplo para conectar los tests API.

## CI
- Multiples ayudas para el desarrollo continuo, descubrelas en `.github`

## 📝 License
Código bajo MIT License (ver LICENSE en la raíz del repo). Escríbeme si necesitas reutilizarlo en otro frontend.
