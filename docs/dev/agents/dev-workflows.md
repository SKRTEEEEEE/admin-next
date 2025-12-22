# Development Workflows

> Flujos comunes de desarrollo activo

## 🔁 Workflows de Código

### Agregar Nueva Ruta
1. **Routing:** `src/lib/i18n/routing.ts` → pathnames
2. **Página:** `src/app/[locale]/nueva-ruta/page.tsx`
3. **i18n:** `content/data/{locale}/[NOMBRE].json`
4. **Componentes (opcional):** `_componentes/` en la ruta
5. **Tests:** `tests/pw/integration/nueva-ruta.spec.ts`

### Agregar Componente shadcn
```bash
npx shadcn@latest add [componente]
```
Importar desde `@/components/ui/[componente]`

### Crear Componente Custom
- **Reutilizable:** `src/components/[DOMINIO]/`
- **Página-específico:** `app/[locale]/[ruta]/_componentes/`

### Modificar Temas
1. Custom tokens en `src/app/globals.css`
2. Probar en `/gradients`
3. Documentar si afecta UX

---

## 🏗️ Workflows de Arquitectura

### Crear Use Case
1. **Interfaz:** `application/interfaces/entities/[entidad].repository.interface.ts`
2. **Use Case:** `application/usecases/entities/[entidad].ts`
3. **Repository:** `infrastructure/api/[entidad].repository.ts`
4. **Tests:** `tests/vitest/unit/core/application/usecases/`

### Crear API Route
1. **Route:** `src/app/api/[nombre]/route.ts`
2. **Tests:** `tests/vitest/api/[nombre].test.ts`

### Integrar log-ui-ts
1. Revisar exports en `log-ui-ts/`
2. Importar con `@log-ui/*`
3. Verificar deps en el HOST
4. Configurar si necesario (env vars, routes)

**Ver:** [log-ui-integration.md](./log-ui-integration.md)

---

## 🧪 Workflows de Testing

```bash
# Watch mode
npm run vitest

# Coverage
npm run vitest:cov        # docs/coverage/vitest/
npm run pw:cov            # docs/coverage/playwright/

# Performance
npm run perf              # docs/lighthouse-reports/perf/
npm run perf:check        # Validar + badges
```

**Ver detalles:** [tests/README.md](../../../tests/README.md)

---

## 🔄 Workflows Git

### Conventional Commits (Obligatorio)
```
feat(scope): descripción
fix(scope): descripción
docs/chore/test/refactor
```

### Pre-commit (Husky - Automático)
- ESLint → TypeScript → Vitest coverage → Commitlint


---

## 📚 Referencias

- **Testing:** [tests/README.md](../../../tests/README.md)
- **Estructura:** [project-structure.md](./project-structure.md)
- **log-ui-ts:** [log-ui-integration.md](./log-ui-integration.md)
- **Clean Arch:** [cleanarch.md](../../../docs/cleanarch.md)
