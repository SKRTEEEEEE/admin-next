
# Folder Structure

> Árbol de directorios + convenciones de naming

## 📁 Estructura Crítica

```
admin-next/
├─ log-ui-ts/                         # Submodule compartido (auth, components, core)
├─ content/data/{locale}/
│  ├─ admin.json                      # Textos de la landing por idioma
│  └─ common.json                     # Traducciones comunes
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ _components/              # Carpeta para componentes exclusivos de dicha pagina
│  │  │  ├─ layout.tsx                # Layout nextjs (pueden ser otros tipos de archivos para app)
│  │  │  └─ page.tsx                  # Pagina nextjs 
│  │  └─ api/                         # API routes (backend next.js)
│  ├─ components/
│  │  ├─ admin/                       # Componentes específicos del proyecto (en este caso se llama admin, pero sera según el feat del frontend)
│  │  ├─ ui/                          # shadcn/ui components
│  │  └─                              # NO HAY COMPONENTES SUELTOS
│  ├─ core/                           # Sigue los principios Clean Arch
│  │  ├─ admin/surfaces.ts            # Mock data para API
│  │  ├─ application/                 # Use cases e interfaces
│  │  └─ infrastructure/              # Repositorios API
│  └─ lib/                            # Otros útiles compartidos
│     ├─ i18n/routing.ts              # Rutas i18n (/, /gradients)
│     ├─ utils.ts                     # Utilidades (gradients, cn)
│     └─ metadata.ts                  # SEO helpers
└─ tests/                             # Specs por tipo (unit/component/api/e2e)
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

## 📋 Archivos Críticos 

| Archivo | ¿Modificar? |
|---------|-------------|
| `src/app/globals.css` | ⚠️ NUNCA |
| `src/lib/i18n/routing.ts` | ✅ Agregar rutas proyecto |
| `playwright.config.ts` | ❌ NO cambiar proyectos |
| `.nycrc`, `vitest.config.ts` | ❌ NO cambiar thresholds |
| `log-ui-ts/` | ❌ NO modificar sin confirmar |
## 📁 Carpetas Principales

### 📚 Referencias

- **Clean Architecture:** [cleanarch.md](../../../docs/cleanarch.md)
- **Testing:** [tests/README.md](../../../tests/README.md)

### `docs/`
Documentación del proyecto y guías de desarrollo.
#### Importantes
•  docs/*.md (raíz) - Archivos core inmutables: cleanarch.md, microservices-arch.md, y otros documentos base que son truth source para el proyecto
•  docs/dev/ - Documentación de desarrollo con subdirectorios:
•  docs/dev/agents/ - Documentación específica para agentes/desarrolladores (modificable)
•  docs/dev/user/ - Documentación para usuarios finales (vetado para AgentCLI)
#### Secundarios
•  docs/badges/ - Archivos JSON con métricas de Lighthouse (performance, accesibilidad, SEO)
•  docs/coverage/ - Reportes de cobertura de tests (vitest y playwright)
•  docs/lighthouse-reports/ - Informes detallados de auditorías
•  docs/task/ - Documentación de tareas (completed, end, report, staged)
•  docs/reports/ - Informes específicos (como el reporte de playwright ci dev vs prod)

Crear archivos cuando se necesite documentar nuevas funcionalidades o procesos.

### `src/app/`
Estructura basada en App Router de Next.js con soporte multilenguaje. Contiene layouts, páginas y componentes específicos por ruta en `_components/`. Crear subcarpetas por rutas cuando sea necesario (ej: `[locale]/dashboard/`) para mantener la organización.

### `src/components/`
Componentes reutilizables organizados por dominio. Crear carpetas por funcionalidad (ej: `admin/`, `user/`) para mantener la organización.

### `src/components/ui/`
Componentes de interfaz de usuario basados en shadcn/ui y Radix UI. Contiene wrappers accesibles y estilizados de primitivas UI (botones, dialogs, dropdowns, etc.). No modificar la estructura interna ya que sigue el sistema de shadcn/ui.

### `src/components/ui-*`
Variantes de componentes UI para librerías específicas (ej: `ui-ac` para Aceternity UI). Contiene componentes especializados con estilos y comportamientos particulares. Mantener separados de `ui/` para evitar conflictos de estilos y dependencias.
