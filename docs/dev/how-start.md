# 🚀 Getting Started - Admin Next Template

> Guía rápida de setup, deployment y CI/CD del template admin-next

## 📋 Índice

- [🚀 Getting Started - Admin Next Template](#-getting-started---admin-next-template)
  - [📋 Índice](#-índice)
  - [🔧 Instalación Local](#-instalación-local)
  - [🗝️ Variables de Entorno](#️-variables-de-entorno)
  - [📦 Submodule log-ui-ts](#-submodule-log-ui-ts)
  - [🔐 Package Privado](#-package-privado)
  - [🐛 Troubleshooting](#-troubleshooting)
  - [🎯 Checklist Deploy](#-checklist-deploy)
  - [⚙️ GitHub Actions](#️-github-actions)
    - [Setup](#setup)
    - [Workflows](#workflows)
  - [📚 Recursos Adicionales](#-recursos-adicionales)

---

## 🔧 Instalación Local

```bash
# 1. Clonar con submodules
git clone --recurse-submodules https://github.com/SKRTEEEEEE/profile-migration.git
cd admin-next

# O si ya clonaste:
git submodule update --init --recursive

# 2. Instalar (requiere GITHUB_TOKEN - ver sección Package Privado)
export GITHUB_TOKEN=ghp_tuToken
npm install

# 3. Iniciar dev server
npm run dev  # http://localhost:3000
```

---

## 🗝️ Variables de Entorno



**⚠️ Crítico para Vercel**:
- `NEXT_PUBLIC_BACKEND_URL` → ⚠️ **Incluir `/` final** (ej: `https://api.backend.com/`)
- `NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN` → Debe coincidir con URL de deployment
- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` → De [thirdweb.com](https://thirdweb.com/create-api-key)

---

## 📦 Submodule log-ui-ts

```bash
# Actualizar a última versión
git submodule update --remote log-ui-ts
git add log-ui-ts && git commit -m "chore: update log-ui-ts"

# Cambiar a commit/branch específico
cd log-ui-ts && git checkout <hash> && cd ..
git add log-ui-ts && git commit -m "chore: pin log-ui-ts"

# Sincronizar después de pull
git submodule update --init --recursive

# Hacer cambios en submodule
cd log-ui-ts && git checkout -b feature/x
# ... editar ...
git commit -am "feat: x" && git push origin feature/x
cd .. && git add log-ui-ts && git commit -m "chore: update log-ui-ts"
```

---

## 🔐 Package Privado

Requiere PAT de GitHub para `@skrteeeeee/profile-domain`:

```bash
# 1. Crear token en GitHub:
# Settings → Developer settings → Personal access tokens → Generate (classic)
# Scopes: read:packages, repo

# 2. Configurar (el .npmrc ya existe):
export GITHUB_TOKEN=ghp_tuToken
npm install

# 3. O agregar a .bashrc/.zshrc:
export GITHUB_TOKEN=ghp_tuToken
```

⚠️ NO hardcodear token en `.npmrc`

---



## 🐛 Troubleshooting

| Error | Causa | Solución |
|-------|-------|----------|
| **HTTP 404 en Projects** | BACKEND_URL sin `/` | Agregar barra final: `https://api.com/` |
| **npm 404 profile-domain** | Falta GITHUB_TOKEN | Agregar PAT con `read:packages` |
| **Submodule not initialized** | Falta init | `git submodule update --init --recursive` |
| **Unauthorized login** | AUTH_DOMAIN no coincide | Dev: `localhost:3000` / Prod: URL Vercel |
| **Tests fallan CI/CD** | Falta NPM_TOKEN secret | Settings → Secrets → Add NPM_TOKEN |
| **Submodule commit viejo** | Falta update post-pull | `git submodule update --remote` |
| **Badges no actualizan** | Permisos escritura | Settings → Actions → Read+write permissions |

## 🎯 Checklist Deploy

- [ ] `NEXT_PUBLIC_BACKEND_URL` con `/` en Vercel
- [ ] `GITHUB_TOKEN` en Vercel
- [ ] Submodule `log-ui-ts` inicializado
- [ ] Backend accesible + CORS configurado
- [ ] Build sin errores TypeScript
- [ ] "Projects from Nest API" carga (no 404)
- [ ] Login funciona
- [ ] Tests CI/CD pasan
- [ ] Lighthouse ≥70/80/80/80

---

---

## ⚙️ GitHub Actions

### Setup

```bash
# 1. Settings → Secrets → Actions → Add:
Name: NPM_TOKEN
Value: <PAT_con_read:packages>  # Mismo token que .npmrc local

# 2. Settings → Actions → General:
# ✅ Allow all actions
# ✅ Read and write permissions (para badges)

# 3. Primera vez: push a main para generar badges
```

### Workflows

| Workflow | Trigger | Qué hace | Requiere |
|----------|---------|----------|----------|
| `test-coverage.yml` | Push `main` / PR | Vitest + Playwright + Badges | NPM_TOKEN |
| `nextjs.yml` | Push (no main) | Lint + Build check | NPM_TOKEN |

**`GITHUB_TOKEN`** es automático, NO configurar manualmente.

---

## 📚 Recursos Adicionales

- [README.md](../../README.md) - Documentación principal
- [tests/README.md](../../tests/README.md) - Guía completa de testing
- [log-ui-ts/README.md](../../log-ui-ts/README.md) - Documentación del submodule
- [AGENTS.md](../../AGENTS.md) - Guidelines para desarrollo con IA
- [.github/workflows/](../../.github/workflows/) - Workflows completos

---

**¿Problemas?** Abre un issue en el repositorio o consulta los logs de CI/CD en la tab **Actions**.
