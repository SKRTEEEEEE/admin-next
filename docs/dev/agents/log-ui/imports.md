# log-ui-ts: Regla de Imports

> Cómo importar correctamente desde el submodule log-ui-ts

## 🎯 Regla Fundamental

```typescript
// ✅ CORRECTO - Desde submodule (compartido)
import { analyzeError } from "@log-ui/lib/error-serialization"
import { useMediaQuery } from "@log-ui/lib/hooks/use-media-query"
import { CustomConnectButton } from "@log-ui/components/custom-connect-button"
import { createDomainError, ErrorCodes } from "@skrteeeeee/profile-domain"

// ✅ CORRECTO - Desde host (proyecto-específico)
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@/lib/i18n/routing"
```

### ❌ INCORRECTO - NUNCA Mezclar

```typescript
// ❌ Button está en el HOST, NO en log-ui-ts
import { Button } from "@log-ui/components/ui/button"

// ❌ cn() está en el HOST
import { cn } from "@log-ui/lib/utils"

// ❌ routing.ts está en el HOST
import { Link } from "@log-ui/lib/i18n/routing"
```

## 📦 Prefijos

| Prefijo | Ubicación | Uso |
|---------|-----------|-----|
| `@log-ui/*` | `log-ui-ts/` | Código compartido entre múltiples micro-frontends |
| `@/*` | `src/` | Código específico del proyecto actual |
| `@skrteeeeee/profile-domain` | npm package | Domain compartido (frontend + backend) |

## 🔍 Cómo Saber Qué Usar

### log-ui-ts (Compartido)
```typescript
// Core
import { analyzeError, serializeError } from "@log-ui/lib/error-serialization"
import { useMediaQuery, useToastOnce } from "@log-ui/lib/hooks"
import { useUploadThing } from "@log-ui/lib/uploadthing"

// Components
import { CustomConnectButton } from "@log-ui/components/custom-connect-button"
import { SiteHeader } from "@log-ui/components/site-header"
import { ModeToggle } from "@log-ui/components/mode-toggle"
import { SectionFallbackProvider } from "@log-ui/components/section-fallback-provider"
```

### Host (Proyecto-Específico)
```typescript
// UI Components (shadcn)
import { Button, Card, Dialog } from "@/components/ui/*"

// Custom Components
import { FeatureCard } from "@/components/admin/feature-card"

// Utils
import { cn } from "@/lib/utils"

// Routing
import { Link, useRouter } from "@/lib/i18n/routing"

// Config
import { siteConfig } from "@/lib/log-ui-data"
```

### Domain Package (Compartido)
```typescript
// Errores y tipos
import { 
  createDomainError, 
  ErrorCodes,
  type DomainError,
  type UserEntity,
  type RoleEntity 
} from "@skrteeeeee/profile-domain"
```

## ⚠️ Reglas Críticas

- ❌ NUNCA importar con `@log-ui/*` código del host
- ❌ NUNCA modificar código en `log-ui-ts/` sin confirmación
- ✅ SIEMPRE verificar si componente/hook ya existe en log-ui-ts antes de crear
- ✅ SIEMPRE usar prefijo correcto según ubicación del código

## 📚 Referencias

- **Componentes:** [log-ui/components.md](./components.md)
- **Hooks:** [log-ui/hooks.md](./hooks.md)
- **Core Functions:** [log-ui/core-functions.md](./core-functions.md)
