# log-ui-ts: Hooks

> Hooks reutilizables del submodule compartido

## 🪝 Hooks Disponibles

### `useMediaQuery(query: string): boolean`

Detecta media queries con `matchMedia` API.

**Uso:**
```typescript
import { useMediaQuery } from "@log-ui/lib/hooks/use-media-query"

const isMobile = useMediaQuery("(max-width: 768px)")
```

---

### `useToastOnce(input: SerializedError | IntlBase)`

Muestra toast **solo una vez** (sessionStorage).

**Modos:**
1. `SerializedError` - Título + Descripción + Icono (automático con `<SectionFallbackProvider>`)
2. `IntlBase` - Solo mensaje simple

**Comportamiento:**
- Detecta locale actual
- Solo muestra una vez por sesión
- Usado internamente por `<SectionFallbackProvider>`

---

## 📚 Referencias

- **Error Handling:** [error-handling.md](./error-handling.md)
- **Components:** [components.md](./components.md#sectionfallbackprovider)
