# Admin Next - Template Guidelines

> Micro-frontend template Next.js 16 con clean architecture + log-ui-ts submodule

## 🎯 Contexto del Proyecto

**[TODO: NOMBRE DEL PROYECTO]** es un micro-frontend basado en el template `admin-next`:

- [TODO: Propósito principal del micro-frontend]
- [TODO: Usuarios objetivo o casos de uso]
- Integración con backend monolítico (`profile-nest` en puerto :3001)

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
### [TODO: Otros requerimientos]
- *Explica todo lo que desees sobre esta acción de validación*



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
- [TODO: Archivos principales (general): `docs/dev/arquitectura-final.gpt.md` y `docs/dev/workflow.gpt.md` - ~150 lineas.]
- Archivos principales (agente): `docs/dev/agent/**` - *archivos necesarios para mantener coherencia en el desarrollo* - ~80-120 lineas, max 200 lineas.
- Modificar archivos principales (general i agent) antes de hacer commit si se considera necesario
- Modificar **SIEMPRE** al implementar un feat, antes de hacer commit los archivos principales (generales) - `docs/dev/arquitectura-final.gpt.md` y `docs/dev/workflow.gpt.md` 
- **Si es repetitivo o esta en otro documento, no se debe escribir de nuevo, se debe hacer una referencia markdown al documento que lo contiene**
- **Nunca escribas código** en los archivos principales (agente): `docs/dev/agent/**`
### 📒 Archivos Core - NO MODIFICAR 

-> __*AQUí ESTA LA INFORMACIÓN MAS REAL DEL PROYECTO, ultra-revisada/escrita por el usuario, tómalo como verdad absoluta en caso de contradicción con otro documento*__ 

- **[Testing Strategy](./tests/README.md)** - Vitest + Playwright + LHCI
- **[Clean Architecture](../docs/cleanarch.md)** - Capas (Domain, Application, Infrastructure, Presentation)
- **[Microservices Arch](../docs/microservices-arch.md)** - Arquitectura general del monorepo

- [TODO: **[feat](./folder-example/feat)** - *Se recomienda una explicación del flujo de la aplicación detallado, puede estar separando en feats*]
### 📖 Archivos principales - GENERAL (Documentación Técnica)

- [TODO: **[Workflow](./folder-example/workflow.gpt)** - *Se recomienda una explicación del flujo de la aplicación, para uso del agente*]

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
