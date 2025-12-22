# log-ui-ts: Error Handling

> Sistema de errores auto-toast: título + descripción + icono automático

**📚 Guía completa con ejemplos:** [error-handling-quick-guide.md](../../../../log-ui-ts/error-handling-quick-guide.md)

## 🎯 Flujo en 4 Pasos

### 1. Repository
- `throw createDomainError()` con string predefinido o IntlBase
- Try/catch solo para errores de **red** (no HTTP)

### 2. Use Case
- `throw createDomainError()` con IntlBase (descripción del error)
- NO usar try/catch (dejar que burbujee)

### 3. Server Component
- `try/catch` + `analyzeError(error, overrideTitle?)` → SerializedError
- Render `<SectionFallbackProvider error={serialized}>` + UI alternativa

### 4. Client Fallback
- Usar `<SectionFallbackProvider>` genérico (ya existe en log-ui-ts)
- Toast automático vía `useToastOnce()` interno

## 🎨 Strings Predefinidos (friendlyDesc)

| Valor | Comportamiento | Icono |
|-------|----------------|-------|
| `'tryAgainOrContact'` | Toast predefinido | 💥 ServerCrash |
| `'credentials'` | Toast predefinido | 🛡️ ShieldX |
| `'d'` | Silencioso (solo logs) | - |
| `undefined` | ErrorBoundary (rompe) | - |
| `IntlBase` | Toast personalizado | ⚠️ AlertCircle |

## 📦 Funciones Core

```typescript
import { 
  analyzeError,      // DomainError → SerializedError
  isDomainError,     // Type guard
} from "@log-ui/lib/error-serialization"
```

**Otras:** `serializeError`, `deserializeError`, `getErrorIcon` (ver [core-functions.md](./core-functions.md))

## 📚 Referencias

- **Ejemplos completos:** [error-handling-quick-guide.md](../../../../log-ui-ts/error-handling-quick-guide.md)
- **Componentes:** [components.md](./components.md#sectionfallbackprovider)
- **Hooks:** [hooks.md](./hooks.md#usetoastonce)
