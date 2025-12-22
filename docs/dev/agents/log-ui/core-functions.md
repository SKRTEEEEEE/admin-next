# log-ui-ts: Core Functions

> Funciones utilitarias del submodule

## 🛠️ Error Serialization

```typescript
import { 
  analyzeError,
  serializeError,
  deserializeError,
  isDomainError,
  getErrorIcon
} from "@log-ui/lib/error-serialization"
```

**Funciones principales:**
- `analyzeError(error, overrideTitle?, overrideDesc?)` - DomainError → SerializedError
- `isDomainError(error)` - Type guard
- `serializeError(error)` - Manual serialization
- `deserializeError(json)` - Recuperar DomainError
- `getErrorIcon(iconType)` - ErrorIcon → React component

**Ver ejemplos:** [error-handling.md](./error-handling.md)

---

## 📤 Uploadthing

```typescript
import { 
  useUploadThing,
  UploadButton,
  UploadDropzone 
} from "@log-ui/lib/uploadthing"
```

**Disponibles:**
- `useUploadThing(endpoint)` - Hook programático
- `<UploadButton endpoint="..." />` - Componente botón
- `<UploadDropzone endpoint="..." />` - Componente dropzone

**Setup:** `src/app/api/uploadthing/route.ts` (importar de log-ui-ts connector)

---

## 🗺️ Apps Config

```typescript
import { 
  getCurrentApp,
  getAppUrl,
  getFeaturedApp,
  getSecondaryApps
} from "@log-ui/lib/config/apps-config"
```

**Funciones:**
- `getCurrentApp()` - Detecta app actual por dominio
- `getAppUrl(appId)` - URL de otra app
- `getFeaturedApp()` / `getSecondaryApps()` - Apps del config

---

## 📚 Referencias

- **Error Handling:** [error-handling.md](./error-handling.md)
- **Hooks:** [hooks.md](./hooks.md)
- **Components:** [components.md](./components.md)
