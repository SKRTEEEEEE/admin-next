# log-ui-ts Integration

> Submodule compartido con componentes UI, auth y core entre micro-frontends

## 📚 Documentación Detallada

### 🎯 [Regla de Imports](./log-ui/imports.md)
Cómo importar correctamente desde log-ui-ts vs host.
- Prefijos `@log-ui/*` vs `@/*`
- Qué está en el submodule vs proyecto
- Domain Package (`@skrteeeeee/profile-domain`)

### 🚨 [Error Handling](./log-ui/error-handling.md)
Sistema de errores auto-toast con título + descripción + icono.
- Flujo Repository → Use Case → Server Component → Client
- Strings predefinidos (`'tryAgainOrContact'`, `'credentials'`, `'d'`)
- `analyzeError()` + `<SectionFallbackProvider>`

**📖 Guía completa:** [error-handling-quick-guide.md](../../../log-ui-ts/error-handling-quick-guide.md)

### 🪝 [Hooks](./log-ui/hooks.md)
Hooks reutilizables del submodule.
- `useMediaQuery(query)` - Media queries
- `useToastOnce(error | message)` - Toast automático (solo una vez)

### 🎨 [Componentes](./log-ui/components.md)
Componentes UI compartidos.
- `<CustomConnectButton />` - Thirdweb wallet login
- `<SiteHeader />` - Header con navegación
- `<ModeToggle />` - Selector de tema (6 presets × 2 modos)
- `<SectionFallbackProvider />` - Fallback genérico con toast

### 🛠️ [Core Functions](./log-ui/core-functions.md)
Funciones utilitarias del core.
- Error serialization (`analyzeError`, `serializeError`, etc.)
- Uploadthing helpers (`useUploadThing`, `<UploadButton />`, etc.)
- Apps config (`getCurrentApp`, `getAppUrl`, etc.)

---

## 🔐 Domain Package

**log-ui-ts depende de `@skrteeeeee/profile-domain`** para tipos compartidos.

### Setup en Host (NO en log-ui-ts)

```bash
# 1. Crear .npmrc en raíz del proyecto
echo "@skrteeeeee:registry=https://npm.pkg.github.com" > .npmrc

# 2. Instalar package
npm install @skrteeeeee/profile-domain
```

**GitHub Token:** Scope `read:packages` ([ver README](https://github.com/SKRTEEEEEE/profile-domain#installation))

### Exports Principales

```typescript
import { 
  createDomainError,
  ErrorCodes,
  type DomainError,
  type UserEntity,
  type RoleEntity
} from "@skrteeeeee/profile-domain"
```

---

## ⚠️ Reglas Críticas

### NUNCA Hacer
- ❌ Modificar código en `log-ui-ts/` sin confirmación
- ❌ Importar con `@log-ui/*` código del host (`@/*`)
- ❌ Instalar deps en `log-ui-ts/` (instalar en host)
- ❌ Commit cambios en `log-ui-ts/` desde el proyecto host

### SIEMPRE Hacer
- ✅ Verificar si componente/hook ya existe en log-ui-ts
- ✅ Usar `throw createDomainError()` en todas las capas
- ✅ Configurar Domain Package en el host
- ✅ Revisar [error-handling-quick-guide.md](../../../log-ui-ts/error-handling-quick-guide.md)

---

## 📚 Referencias

- **Setup Completo:** [log-ui-ts/README.md](../../../log-ui-ts/README.md)
- **Error Handling Completo:** [error-handling-quick-guide.md](../../../log-ui-ts/error-handling-quick-guide.md)
- **Domain Package:** [profile-domain](https://github.com/SKRTEEEEEE/profile-domain)
