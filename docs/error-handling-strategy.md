# Estrategia de Manejo de Errores Server → Client

## 🎯 Problema Original

```typescript
// EN: src/core/application/usecases/entities/project.ts
export const getProjectsForLandingUC = async (locale?: string): Promise<LandingProject[]> => {
  try {
    const response = await readProjectUC();
    if (!response.success) return []; // ❌ Pérdida de información del error
    return mapProjects(response.data, normalizedLocale);
  } catch {
    return []; // ❌ Error silencioso
  }
};
```

### Lo que se desea:

```typescript
// COMPORTAMIENTO IDEAL:
if (!response.success) throw createDomainError(...);

// Si friendlyDesc === "undefined" → ErrorBoundary (servidor caído)
// Si friendlyDesc !== "undefined" → Toast en UI (error controlado)
```

### Restricciones:
- ✅ NO modificar respuesta del backend (sigue estándar DomainError)
- ✅ Backend devuelve `[]` cuando no hay datos (normal)
- ✅ Backend devuelve DomainError para errores (unauthorized, db error, etc.)

---

## 🚫 Por qué Middleware NO funciona

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // ❌ Solo intercepta HTTP requests
  // ❌ NO captura errores de renderizado de Server Components
  // ❌ Next.js ejecuta Server Components DESPUÉS del middleware
}
```

**Middleware solo funciona para:**
- Redirecciones basadas en cookies/headers
- Rate limiting
- Auth checks antes de llegar a la ruta

**NO puede capturar:** Errores lanzados durante `await getProjectsForLandingUC()`

---

## ✅ Soluciones Propuestas

### Solución 1: Error Wrapper Helper (Recomendada para proyectos pequeños)

```typescript
// lib/server-error-handler.ts
export async function withErrorHandling<T>(
  asyncFn: () => Promise<T>,
  fallback: T
): Promise<{ data: T; error: SerializedError | null }> {
  try {
    return { data: await asyncFn(), error: null };
  } catch (err) {
    const { action, serializedError } = analyzeError(err);
    if (action === 'throw') throw err; // ErrorBoundary
    return { data: fallback, error: serializedError };
  }
}
```

**Uso:**
```typescript
export async function ProjectsSection({ locale }) {
  const { data: projects, error } = await withErrorHandling(
    () => getProjectsForLandingUC(locale),
    [] // fallback
  );
  
  return (
    <ClientWrapper error={error}>
      {projects.length > 0 ? <Grid /> : <Empty />}
    </ClientWrapper>
  );
}
```

**Esfuerzo:** 2-3h | **Complejidad:** Baja

---

### Solución 2: HOC Automático (Para proyectos grandes)

```typescript
export function withAutoErrorHandling<P>(
  Component: (props: P) => Promise<JSX.Element>,
  fallback: ReactNode
) {
  return async (props: P) => {
    try {
      return await Component(props);
    } catch (err) {
      const { action, error } = analyzeError(err);
      if (action === 'throw') throw err;
      return <ErrorToastFallback error={error} fallback={fallback} />;
    }
  };
}
```

**Esfuerzo:** 5-6h | **Complejidad:** Media-Alta

---

## 🎯 Recomendación para 4 Microfrontends Pequeños

### Opción Pragmática: **Keep It Simple** (0h)

```typescript
// Mantener Graceful Degradation actual
export const getCurrentUserUC = async () => {
  try {
    return await fetch();
  } catch {
    console.warn('[getCurrentUserUC] Backend unavailable');
    return null; // ✅ App sigue funcionando
  }
}
```

**+ Agregar monitoring externo:**
- Sentry / LogRocket para errores en producción
- Alertas automáticas cuando backend falla
- Logs centralizados

**Por qué:**
- ✅ ROI mejor: 1h setup vs 5-6h implementación
- ✅ Detecta problemas igual de bien
- ✅ Permite enviar features más rápido

---

## 📊 Comparación

| Aspecto | Graceful Degradation | Solución 1 | Solución 2 |
|---------|---------------------|------------|------------|
| Tiempo | 0h (actual) | 2-3h | 5-6h |
| Toast visible | ❌ | ✅ | ✅ |
| Automatización | Manual | Semi | Alta |
| Complejidad | Muy baja | Baja | Media-Alta |
| Escalabilidad | Baja | Media | Alta |

---

## 💡 Decisión Final

**Para 4 microfrontends (<10 Server Components c/u):**
→ Mantener actual + Sentry

**Si creces a 10+ microfrontends:**
→ Entonces implementar Solución 1 o 2

**Punto de inflexión:** ~50+ Server Components con fetch
