# Análisis de Arquitectura: Monolito Backend + Micro-frontends

## Visión General

La arquitectura ha evolucionado desde un monolito Next.js (`profile-page`) hacia una estructura híbrida pragmática: un backend monolítico **intencionalmente centralizado** (`profile-nest`) que expone APIs para múltiples micro-frontends independientes. Esta decisión es deliberada: con poco tráfico actual y sin usuarios reales masivos, fragmentar el backend en micro-servicios sería over-engineering.

## Servicios y Responsabilidades

### Backend: `profile-nest` (Puerto 3001)
- **Framework:** NestJS 11 con arquitectura modular
- **Filosofía:** Monolito backend **por diseño** - se han unificado intencionalmente auth, techs, users, *y toda funcionalidad de configuración del user...*
- **Justificación:** Con bajo tráfico actual, micro-servicios backend serían innecesarios
- **Módulos principales:** Users, authentication (JWT + Passport + Thirdweb), cache, throttling
- **Base de datos:** MongoDB con Mongoose
- **Testing:** Jest (unit + e2e)
- **Decisión arquitectónica:** Todos los servicios relacionados con el usuario están deliberadamente juntos

### Frontend: `profile-next` (Puerto 3000)
- **Framework:** Next.js 16 con Turbopack
- **Responsabilidad:** Micro-frontend orientado a perfil de desarrollador (read-only)
- **Tipo:** GET-only - solo consume datos públicos
- **Dependencias:** No incluye `log-ui-ts` (no requiere autenticación dinámica)
- **Tecnologías:** Radix UI, Tailwind CSS v4, Next-intl, Next-themes
- **Testing:** Playwright (unit, integration, e2e, performance)

### Frontend: `agora-next` (Puerto 3002)
- **Framework:** Next.js 15.5.4 (versión anterior)
- **Responsabilidad:** Micro-frontend tipo blog/marketplace con contenido dinámico
- **Tipo:** Full app - requiere autenticación y lógica compleja
- **Dependencia crítica:** Incluye `log-ui-ts` (componentes UI compartidos con autenticación)
- **Tecnologías:** Swiper, React Hook Form, Uploadthing, Stripe
- **Testing:** Playwright projects especializados
- **Característica:** Contenido condicional según rango de usuario

### Template: `admin-next` (Puerto 3004:3000)
- **Estado actual:** NO es un servicio activo - es un TEMPLATE
- **Propósito futuro:** Será el servicio de administración eventualmente
- **Función actual:** Template base para nuevos micro-frontends que necesiten log-ui-ts
- **Framework:** Next.js 16
- **Stack:** shadcn/ui, Radix UI, Tailwind CSS v4, Uploadthing
- **Internacionalización:** next-intl con 6 presets
- **Testing:** Completo (unit, API, component, integration, e2e, performance)
- **Características:** Lighthouse CI, robots.txt, sitemap automático

## Conceptos Clave Transversales

### `domain` - Núcleo Lógico (Package/Submodule)
- **Ubicación:** Compartido entre servicios (clean architecture)
- **Contenido:** Toda la lógica de negocio centralizada
- **Patrón:** Use cases, entities, repositories abstratos
- **Problema principal:** La gestión de submodules es compleja, especialmente al integrarse con `log-ui-ts`
- **Impacto:** La lógica monolítica en domain limita la escalabilidad de micro-servicios backend

### `log-ui-ts` - UI Compartida (Submodule)
- **Propósito:** Encapsular componentes UI comunes (login, auth flows)
- **Disponible en:** `admin-next`, `agora-next`
- **No disponible en:** `profile-next` (no lo necesita - solo lectura)
- **Desafío:** Contiene lógica de librerías externas que aún no están packageadas
- **Roadmap:** Migración a `rauth-ui` project para extraer como paquete independiente
- **Impacto:** Duplicación de submodules ralentiza clones y actualizaciones

## Patrones de Integración

### Separación por Capacidades
| Micro-frontend | Autenticación | Datos dinámicos | log-ui-ts | Responsabilidad |
|---|---|---|---|---|
| `profile-next` | No | Públicos | ❌ | Perfil estático |
| `agora-next` | Sí | Condicionales | ✅ | Blog/marketplace |
| `admin-next` | Sí | CRUD | ✅ | Template admin |

### Orquestación Docker
- **Compose file:** Orquesta 3 servicios (backend + 2 frontends en desarrollo)
- **Healthchecks:** Cada servicio tiene verificación de salud
- **Red bridge:** Comunicación interna en `profile-network`
- **Dependencias:** Frontend aguarda salud del backend (JWT_STRATEGY dinámico)
- **Problema identificado:** Build time ~1300s debido a `npm ci` pesado en todos los servicios


## Decisiones Arquitectónicas Clave

### ¿Por qué Backend Monolítico?
- **Pragmatismo:** Sin usuarios masivos actuales, micro-servicios serían over-engineering
- **Cohesión:** Auth, techs, users están intrínsecamente relacionados
- **Mantenibilidad:** Un solo deployment, logs centralizados, debugging simplificado
- **Costo:** Menor overhead de infraestructura y comunicación entre servicios

### ¿Por qué Micro-frontends?
- **Autonomía total:** Cada frontend tiene su ciclo de vida independiente
- **Versionamiento independiente:** agora-next puede usar Next.js 15.5 mientras profile-next usa 16 - ¡NO es un problema!
- **Especialización:** profile-next (GET-only) vs agora-next (full app) tienen necesidades distintas
- **Template admin-next:** Base sólida para futuros frontends con autenticación
- **Escalabilidad selectiva:** Solo escalar los frontends que lo necesiten
- **Libertad tecnológica:** Cada equipo podría elegir su stack (React, Vue, Svelte) sin afectar a otros

## Conclusión

La arquitectura actual es **intencionalmente pragmática**: un backend monolítico por diseño con micro-frontends verdaderamente independientes. El versionamiento inconsistente entre frontends NO es un problema - es una **característica** de los micro-frontends bien implementados. 
