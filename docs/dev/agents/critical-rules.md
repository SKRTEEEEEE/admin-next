# Critical Rules

> Reglas obligatorias para desarrollo

## 🚫 NUNCA Hacer

1. **Modificar log-ui-ts** sin confirmación (afecta múltiples micro-frontends)
2. **Cambiar i18n** sin actualizar todos los locales (en/es/ca/de)
3. **Agregar libs** sin verificar log-ui-ts primero
4. **Commit sin tests** (Husky bloqueará)
5. **Hardcodear strings** (usar i18n)
6. **Crear fallback específico** (usar `<SectionFallbackProvider>` genérico)
7. **Modificar thresholds** de coverage (.nycrc, vitest.config.ts)

---

## ✅ SIEMPRE Hacer

1. **Verificar tipos:** `npx tsc --noEmit` antes de commit
2. **Actualizar tests** cuando cambies lógica (coverage ≥80%)
3. **`throw createDomainError()`** en todas las capas
4. **Conventional commits:** `feat/fix/docs/chore/test/refactor`
5. **Consultar docs** antes de modificar archivos críticos
6. **Probar en 4 idiomas** antes de merge
7. **Separar componentes:** reutilizable vs página-específico
8. **Documentar cambios** arquitectónicos

---

## 📦 Archivos Críticos

| Archivo | ¿Modificar? |
|---------|-------------|
| `log-ui-ts/` | ❌ NO sin confirmar |
| `src/app/globals.css` | ⚠️ Solo custom tokens |
| `src/lib/i18n/routing.ts` | ✅ Agregar rutas |
| `playwright.config.ts`, `.nycrc` | ❌ NO tocar |
| `content/data/{locale}/` | ✅ Textos proyecto |

**Ver tabla completa:** [project-structure.md](./project-structure.md)

---

## ❌ Anti-Patrones

- Olvidar `throw` con `createDomainError()`
- `return []` en use case en lugar de `throw`
- `new Error()` nativo en lugar de `createDomainError()`
- `useEffect` para toasts en lugar de `useToastOnce()`
- Pensar que IntlBase es título (es descripción)
- Duplicar componentes que ya existen en log-ui-ts

**Ver ejemplos:** [log-ui/error-handling.md](./log-ui/error-handling.md)

---

## 🐛 Debugging Rápido

```bash
npx tsc --noEmit                    # TypeScript errors
npm run vitest:cov                  # Coverage HTML
npm run pw:cov                      # Playwright coverage
rm -rf .next && npm run dev         # Clean rebuild
git submodule update --init         # Fix submodule
```

---

## ✅ Checklist Pre Commit

- [ ] `npm run lint` ✅
- [ ] `npx tsc --noEmit` ✅
- [ ] `npm run vitest:cov` ≥80% ✅
- [ ] i18n en 4 locales ✅
- [ ] Tests agregados ✅
- [ ] Docs actualizadas ✅
- [ ] log-ui-ts NO modificado ✅
- [ ] Conventional commits ✅

---

## 📚 Referencias

- **Workflows:** [dev-workflows.md](./dev-workflows.md)
- **Testing:** [tests/README.md](../../../tests/README.md)
- **Estructura:** [project-structure.md](./project-structure.md)
- **log-ui-ts:** [log-ui-integration.md](./log-ui-integration.md)
