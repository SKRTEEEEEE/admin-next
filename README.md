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

Landing dedicada a centralizar el estado de los micro frontends (`admin`, `profile`, `agora`) encima del monolito `profile-nest`. Está pensada como blueprint mínima: una sola página (`src/app/[locale]/page.tsx`), gradiente animado, i18n con `next-intl`, temas con `next-themes` (6 presets) y utilidades de shadcn/ui.

## 📋 Overview
- Control center construido con [Next.js](https://nextjs.org/docs), React 19 y TypeScript 5.
- Incluye robots/sitemap, status API (`/api/admin/status`) y tests Playwright listos para CI.
- Todo el contenido vive en `content/data/{locale}/admin.json`, de forma que duplicar el template es solo copiar esos JSON.

## 🛠️ Tech Stack
- Next.js 16 App Router + React 19 + TypeScript 5
- Tailwind CSS 4 + shadcn/ui + Radix UI
- next-intl para `en/es/ca/de`
- next-themes + tokens custom (`light`, `dark`, `neon`, `emerald`, `sunset`, `terminal`)
- Playwright (+ NYC) para unit/component/api/e2e

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
- Presets: `light`, `dark`, `neon`, `emerald`, `sunset`, `terminal`
- Selector accesible en la `Navbar` usando Radix Dropdown + next-themes

## SEO & utilidades
- `robots.ts`, `sitemap.ts` y schemas siguen activos para asegurar foco SEO.
- `AnimatedGradientBackground` recicla la lista de gradientes de `src/lib/utils.ts`.
- `adminSurfaces` + `app/api/admin/status` sirven de ejemplo para conectar los tests API.

## Tips
- Mantén el número de dependencias bajo: antes de añadir librerías pregunta/justifica.
- Si necesitas otro micro frontend, usa el mismo patrón: JSON por locale + única página.
- Ejecuta `run-all-tests.sh` (Git Bash) sólo si necesitas la suite completa CI; para desarrollo basta con el flujo descrito arriba.

## 📝 License
Código bajo MIT License (ver LICENSE en la raíz del repo). Escríbeme si necesitas reutilizarlo en otro micro admin.
