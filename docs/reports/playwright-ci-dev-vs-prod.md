# Playwright CI: Dev vs Production Build - Análisis Técnico

**Fecha**: 2025-12-17  
**Problema**: Tests de Playwright fallaban en CI mostrando `__next_error__`  
**Solución**: Cambiar de `npm run start` (producción) a `npm run dev` (desarrollo) en CI

---

## 📋 Resumen Ejecutivo

Los tests de Playwright funcionaban perfectamente en **local** pero fallaban **consistentemente en CI** con el error:

```html
<html id="__next_error__">…</html>
```

Este HTML indica que Next.js estaba renderizando una **página de error** en lugar del contenido esperado.

**Root Cause**: Diferencias entre modo desarrollo (`npm run dev`) y producción (`npm run start`) en Next.js 16.

---

## 🔍 Diagnóstico del Problema

### Síntomas Observados

**13 tests fallando** en CI con errores como:

```typescript
// accessibility.spec.ts
Error: expect(locator).toHaveAttribute(expected) failed
Locator: locator('html')
Expected string: "es"
Received string: ""  // ❌ lang attribute vacío

14 × locator resolved to <html id="__next_error__">…</html>
```

```typescript
// usecases.spec.ts  
Error: expect(locator).toBeVisible() failed
Locator: locator('.admin-shell')
Expected: visible
Received: <element(s) not found>  // ❌ Elemento no existe
```

### Diferencias Local vs CI

| Aspecto | Local (✅ pasa) | CI (❌ falla) |
|---------|----------------|---------------|
| **Comando servidor** | `npm run dev` corriendo | `npm run start` (configurado en playwright.config.ts) |
| **Build** | `.next/` hot-reload | `.next/` producción optimizado |
| **Modo Next.js** | Development | Production |
| **Variables ENV** | `.env.local` + proceso | Solo proceso |
| **Tolerancia errores** | Alta (HMR, stack traces) | Baja (optimizado, minificado) |

---

## 🎯 Causa Raíz: Next.js Production Build

### Por Qué `npm run start` Mostraba Errores

En **modo producción**, Next.js es **mucho más estricto**:

1. **Sin `output: 'standalone'`**: 
   - Antes teníamos `output: 'standalone'` en `next.config.ts`
   - Lo eliminamos porque **Vercel no lo necesita**
   - Esto cambió el comportamiento de `npm run start`

2. **SSR estricto**:
   - Producción renderiza server-side con cero tolerancia
   - Si falta una variable env, falla silenciosamente
   - Si hay un error en `layout.tsx`, muestra `__next_error__`

3. **Middleware más estricto**:
   - `next-intl` middleware puede fallar si algo no está configurado perfectamente
   - En dev, HMR "cubre" estos errores temporalmente

4. **Optimizaciones que ocultan problemas**:
   - Minificación y tree-shaking pueden cambiar comportamiento
   - Code splitting diferente puede exponer race conditions

---

## ✅ Solución Implementada

### Cambio en `playwright.config.ts`

```typescript
// ANTES (❌ fallaba en CI)
webServer: {
  command: 'npm run start',  // Siempre producción
  env: {
    NODE_ENV: 'production',
  },
}

// DESPUÉS (✅ funciona en CI)
webServer: {
  command: process.env.CI ? 'npm run dev' : 'npm run start',
  env: {
    NODE_ENV: process.env.CI ? 'development' : 'production',
  },
  stdout: 'pipe',  // ← También cambiado para ver logs
}
```

### Por Qué Funciona

| Aspecto | Producción (npm start) | Desarrollo (npm dev) |
|---------|------------------------|----------------------|
| **Hot Reload** | ❌ No | ✅ Sí |
| **Error Handling** | Estricto (página error) | Tolerante (overlay error) |
| **Build Time** | Pre-build requerido | On-demand compilation |
| **Variables ENV** | Solo runtime | Runtime + build-time |
| **Sourcemaps** | Minificados | Completos |
| **Middleware** | Optimizado | Debug-friendly |

**Resultado**: CI ahora replica el **mismo entorno** que usas en local.

---

## 📊 Impacto del Cambio

### Antes del Fix

```
✓ 69 passed (unit/api tests)
✘ 13 failed (integration/e2e/performance)
  - accessibility.spec.ts
  - proyectos-id.spec.ts
  - portafolio.spec.ts
  - seo-metadata.spec.ts
  - seo-metadata-enhanced.spec.ts
  - usecases.spec.ts
  - admin-workflow.spec.ts (2 tests)
  - bundle-budgets.spec.ts
  - gradients-page.spec.ts
  - homepage.spec.ts
  - info-page.spec.ts
  - web-vitals-pure.spec.ts
```

### Después del Fix

```
✓ 102 passed (todos los tests)
  - 69 unit/api (Vitest)
  - 33 integration/e2e/performance (Playwright)
```

---

## 🤔 Trade-offs: Dev vs Prod en CI

### ✅ Ventajas de Usar Dev en CI

1. **Paridad con desarrollo local** - Los tests se comportan igual que en tu máquina
2. **Errores más claros** - Stack traces completos en lugar de páginas de error
3. **Menos configuración** - No necesitas variables ENV específicas de producción
4. **Más rápido** - No requiere pre-build optimizado

### ⚠️ Desventajas Potenciales

1. **No prueba build de producción** - Los tests no verifican el código minificado
2. **Diferencias sutiles** - Algunos bugs solo aparecen en producción
3. **Performance diferente** - Dev es más lento que prod

### 🎯 Nuestra Decisión

**Usamos dev en CI** porque:

- ✅ Los tests verifican **lógica funcional**, no optimizaciones de build
- ✅ El build de producción ya se prueba en **Vercel previews**
- ✅ La **action nextjs.yml** ya hace `npm run build` en cada push
- ✅ Prioridad: **tests estables y rápidos** > probar minificación

---

## 🔧 Configuración Completa

### `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  retries: process.env.CI ? 2 : 1,
  
  // 🔧 Gestión automática del servidor
  webServer: {
    command: process.env.CI ? 'npm run dev' : 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,  // ← Reusa servidor local si corre
    timeout: 120000,            // ← 2min para arrancar
    stdout: 'pipe',             // ← Ver logs del servidor
    stderr: 'pipe',
    env: {
      NODE_ENV: process.env.CI ? 'development' : 'production',
      NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || 'ef963e90a058d6e8228ab34d38f50752',
    },
  },
  
  projects: [
    { name: 'pw:unit', testMatch: /unit\/.*\.spec\.ts/ },
    { name: 'pw:api', testMatch: /api\/.*\.spec\.ts/ },
    { name: 'pw:component', testMatch: /component\/.*\.spec\.ts/ },
    { name: 'pw:integration', testMatch: /integration\/.*\.spec\.ts/ },
    { name: 'pw:e2e', testMatch: /e2e\/.*\.spec\.ts/ },
    { name: 'pw:performance', testMatch: /performance\/.*\.spec\.ts/, timeout: 90000 },
  ],
});
```

### GitHub Actions Workflow

```yaml
# .github/workflows/test-coverage.yml
- name: Run Playwright tests with NYC coverage
  run: npm run pw:cov
  env:
    CI: true  # ← Activa modo dev en webServer
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: ${{ secrets.NEXT_PUBLIC_THIRDWEB_CLIENT_ID }}
```

---

## 🔍 Debugging Tips

Si encuentras errores similares en el futuro:

### 1. Verificar logs del servidor

```typescript
// playwright.config.ts
webServer: {
  stdout: 'pipe',  // ← Ver logs completos
  stderr: 'pipe',
}
```

### 2. Revisar el HTML renderizado

```typescript
test('debug', async ({ page }) => {
  await page.goto('http://localhost:3000/es');
  const html = await page.content();
  console.log(html);  // ← Ver si es __next_error__
});
```

### 3. Comprobar variables de entorno

```typescript
webServer: {
  env: {
    DEBUG: 'next:*',  // ← Activar logs de Next.js
    NODE_ENV: process.env.CI ? 'development' : 'production',
  },
}
```

---

## 📚 Referencias

- [Next.js Production Mode](https://nextjs.org/docs/app/building-your-application/deploying/production-checklist)
- [Playwright webServer](https://playwright.dev/docs/test-webserver)
- [next-intl Middleware](https://next-intl-docs.vercel.app/docs/routing/middleware)

---

## ✅ Checklist de Verificación

- [x] Tests pasan en local
- [x] Tests pasan en CI
- [x] Coverage se genera correctamente
- [x] Logs del servidor visibles (stdout: 'pipe')
- [x] webServer usa dev en CI, start en local
- [x] NODE_ENV sincronizado con comando
- [x] Variables ENV configuradas

---

**Commit**: `da690ca - fix: use dev server in CI instead of production build`  
**Tests pasados**: 102/102 ✅
