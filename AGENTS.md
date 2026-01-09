# Admin Next - Template Guidelines

> Micro-frontend template Next.js 16 con clean architecture + log-ui-ts submodule

## 🎯 Contexto del Proyecto
Fíjate en mi carpeta/proyecto en ./admin-next, si te fijas este es una copia de agora-next/profile-next. La question de este proyecto esque estoy migrando de un frontend/backend nextjs (profile-page), a una estructura de backend monolitico (profile-nest) y frontends micro (admin, profile, agora). 
- **`admin-next` = template base para nuevos micro-frontend**
- En el issue de ahora, debes centrarte en la parte de admin-next y log-ui-ts, para crear el **template definitivo para los nuevos micro-frontend de este proyecto**

- Estos micro-frontend's comparten dominio con './profile-domain' como package y con el backend
- Estos micro-frontend's comparten las funcionalidades con ./*/log-ui-ts/ como submodule, [ver README.md](../log-ui-ts/README.md)

- Tienes un **reporte MUY IMPORTANTE de la arquitectura** en [./docs/cleanarch.md](../../docs/cleanarch.md)
- Tienes un reporte del test en [./admin-next/test/README.md](../tests/README.md)
- Tienes un servidor del backend corriendo en :3001
- Tienes un servidor del frontend (`admin-next`) en :3000, en modo desarrollo (`npm run dev`)
- Tienes el 'standard de error management' en [./admin-next/log-ui-ts/error-handling-quick-guide.md](../log-ui-ts/error-handling-quick-guide.md)

## ⚠️ Flujo de Validación (OBLIGATORIO)
> *Antes de dar por terminada un flujo de tareas(o tarea/session), asegúrate de realizar las siguientes acciones *
> - *Tienes toda la información sobre como realizar las tareas en la documentación referida en este documento*
> - *Debes asegurar-te de revisar en este AGENTS.md y en los documentos a los que este se refiere para asegurar-te de realizar correctamente este flujo*
> *__Si cualquiera de estas acciones falla, NO puedes dar por terminado el flujo de tarea__*

### Comprobar compilación 
- `npx tsc --noEmit`
### Comprobar Test completo
- `npm run test:cov`
### Actualizar documentación


## ✏️ Flujo de Git (OBLIGATORIO)

Cada commit debe:
- Estar en inglés y seguir Conventional Commits
- Estar firmado
- Incluir siempre estas líneas al final:
    CO-CREATED by Agent666 — ⟦ Product of SKRTEEEEEE ⟧
    Co-authored-by: Agent666 <agent666@skrte.ai>

Procedimiento exacto para hacer commit:
1. Generar el mensaje completo dentro del archivo `commit-message.txt`
2. Ejecutar: `git commit -F commit-message.txt`
3. Borrar `commit-message.txt` después de confirmar


## 📃 Documentación
- Archivos core (documentación base - NO MODIFICAR, prohibidos ): `AGENTS.md`, `README.md`, `docs/*.md/` (los de la raíz de /docs/)
- *[TODO: Archivos principales (general): `docs/dev/arquitectura-final.gpt.md` y `docs/dev/workflow.gpt.md` - ~150 lineas.]*
- Archivos principales (agente): `docs/dev/agent/**` - *archivos necesarios para mantener coherencia en el desarrollo* - ~80-120 lineas, max 200 lineas.
- Modificar archivos principales (general i agent) antes de hacer commit si se considera necesario
- Modificar **SIEMPRE al implementar un feat**, antes de hacer commit los archivos principales (generales) - `docs/dev/arquitectura-final.gpt.md` y `docs/dev/workflow.gpt.md` 
- **Si es repetitivo o esta en otro documento, no se debe escribir de nuevo, se debe hacer una referencia markdown al documento que lo contiene**
- **Nunca escribas código** en los archivos principales (agente): `docs/dev/agent/**`
### 📒 Archivos Core - NO MODIFICAR 

-> __*AQUí ESTA LA INFORMACIÓN MAS REAL DEL PROYECTO, ultra-revisada/escrita por el usuario, tómalo como verdad absoluta en caso de contradicción con otro documento*__ 

- **[Testing Strategy](./tests/README.md)** - Vitest + Playwright + LHCI
- **[Clean Architecture](./docs/cleanarch.md)** - Capas (Domain, Application, Infrastructure, Presentation)
- **[Microservices Arch](./docs/microservices-arch.md)** - Arquitectura general del monorepo
- **[/log-ui-ts/*.md](./log-ui-ts/README.md)** - Toda la documentación de 'log-ui-ts' folder
- **[README](../README.md)**
- **[AGENTS](../AGENTS.md)**
- **[docs proyecto: ./docs/*.md](./docs/): todos los archivos que cuelgan directamente de ./docs/**



### 📖 Archivos principales - GENERAL (Documentación Técnica)


### 📋 Archivos principales - GENERAL (Documentación Desarrollo)

- **[Stack & Arquitectura](./docs/dev/agents/stack-architecture.md)** - Tecnologías core + temas
- **[Project Structure](./docs/dev/agents/project-structure.md)** - Árbol de directorios + convenciones
- **[log-ui-ts Integration](./docs/dev/agents/log-ui-integration.md)** - Uso de funciones core, componentes y hooks
- **[Development Workflows](./docs/dev/agents/dev-workflows.md)** - Flujos de desarrollo activo
- **[Critical Rules](./docs/dev/agents/critical-rules.md)** - Reglas NUNCA/SIEMPRE + debugging


### 📦 Resumen ubicación archivos
#### `dev`
**Documentación util para el desarrollo**
- Importancia alta. Sobretodo a los que cuelgan de /dev/
- `/dev/user/`: Vetado para AgentCLI
- `/dev/agents/`: Permitido para AgentCLI
#### `changelog`
Changelog de desarrollo
- Exclusivo para AgentCLI
#### `bs`
BrainStorming
- Permitido para AgentCLI

## 🚨 Reglas Críticas (Resumen)

### ✅ SIEMPRE
- Coverage ≥80% (Vitest), ≥60% (Playwright)
- Conventional commits: `feat/fix/docs/chore/test/refactor`
- [Flujo de validación](#️-flujo-de-validación-obligatorio) antes de commit
- `throw createDomainError()` en todas las capas

### ❌ NUNCA
- Modificar `log-ui-ts/` sin confirmación
- Cambiar `.nycrc`, `playwright.config.ts` thresholds
- Hardcodear strings (usar i18n)
- Skip pre-commit hooks

---

**Ver documentación detallada en `docs/dev/agents/` para workflows de desarrollo específicos.**