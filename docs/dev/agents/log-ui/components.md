# log-ui-ts: Componentes

> Componentes compartidos del submodule

## 🎨 Componentes Disponibles

### `<CustomConnectButton />`

Botón Thirdweb para wallet login.

**Requiere env vars:**
- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
- `NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN`
- `THIRDWEB_ADMIN_PRIVATE_KEY`

---

### `<SiteHeader config={siteConfig} />`

Header con navegación y theme toggle.

**Setup:**
1. Configurar `src/lib/log-ui-data.tsx` (siteConfig)
2. i18n en `content/data/{locale}/log-ui.json` (nav keys)

---

### `<ModeToggle />`

Selector de tema: 6 presets × 2 modos = 12 combinaciones.

---

### `<SectionFallbackProvider error={serialized}>`

**Componente genérico** para errores con toast automático.

**Props:**
- `children` - UI alternativa (EmptyState, Skeleton, etc.)
- `error` - SerializedError (de `analyzeError()`)

**Uso típico:**
```typescript
catch (error) {
  const serialized = analyzeError(error)
  return (
    <SectionFallbackProvider error={serialized}>
      <EmptyState />
    </SectionFallbackProvider>
  )
}
```

---

## 📚 Referencias

- **Error Handling:** [error-handling.md](./error-handling.md)
- **Hooks:** [hooks.md](./hooks.md)
