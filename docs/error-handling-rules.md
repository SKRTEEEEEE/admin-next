# Reglas de Manejo de Errores en Admin-Next

## 🎯 Principio Fundamental

**NUNCA usar `throw new Error()` en código de runtime**. Todos los errores deben seguir una de estas estrategias:

1. **`createDomainError`** - Para errores críticos que deben detener la ejecución
2. **Graceful Degradation** - Para errores no críticos que permiten continuar
3. **`console.error + fallback + toast()`** - Para errores de cliente que no deben romper la UI

- **EXCEPCIÓN: /components/ui/** - Esto son componentes de 'libraría' que mantendremos tal como están.

---

## 📋 Reglas por Contexto

### 1. Server Components / Use Cases (Capa de Aplicación)

**Regla:** Usar `createDomainError` o devolver valores seguros

#### ✅ Opción A: Errores Críticos (backend caído, unauthorized)
```typescript
export const getProjectsForLandingUC = async (): Promise<LandingProject[]> => {
  try {
    const response = await readProjectUC();
    if (!response.success) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        getProjectsForLandingUC,
        "getProjectsForLandingUC",
        "tryAgainOrContact", // friendlyDesc
        { entity: "projects", optionalMessage: response.message }
      );
    }
    return mapProjects(response.data);
  } catch (error) {
    throw error; // Re-lanzar para que Server Component lo maneje
  }
};
```

#### ✅ Opción B: Graceful Degradation (dato opcional)
```typescript
export const getCurrentUserUC = async () => {
  try {
    const user = await fetchUser();
    if (!user.success) return null;
    return user.data;
  } catch (error) {
    console.warn('[getCurrentUserUC] Backend unavailable:', error);
    return null; // ✅ App sigue funcionando sin usuario
  }
};
```

**Cuándo usar cada opción:**
- **Opción A**: Dato crítico sin el cual la página no puede renderizar
- **Opción B**: Dato opcional (ej: usuario logueado, proyectos, etc.)

---

### 2. Repositories (Capa de Infraestructura)

**Regla:** SIEMPRE usar `createDomainError` para errores de backend

```typescript
// ✅ CORRECTO
async readById(id: string): Promise<ResFlow<Project>> {
  const response = await fetch(`${this.baseUrl}/project/${id}`);
  if (!response.ok) {
    throw createDomainError(
      ErrorCodes.DATABASE_FIND,
      ProjectApiRepository,
      "readById",
      "tryAgainOrContact",
      { 
        entity: "project", 
        optionalMessage: `HTTP ${response.status}: ${response.statusText}` 
      }
    );
  }
  return response.json();
}

// ❌ INCORRECTO
throw new Error(`HTTP ${response.status}`); // NO hacer esto
```

---

### 3. Client Components (React Hooks)

**Regla:** `console.error + return safe defaults` (NO romper la UI)

```typescript
// ✅ CORRECTO
export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  
  if (!fieldContext) {
    console.error("[useFormField] Must be used within <FormField>");
    // Devolver valores seguros para que UI no se rompa
    return {
      id: "",
      name: "",
      formItemId: "",
      error: undefined,
      invalid: false,
    };
  }
  
  return fieldContext;
};

// ❌ INCORRECTO
if (!fieldContext) {
  throw new Error("useFormField should be used within <FormField>"); // ROMPE LA UI
}
```

**Por qué:** En cliente, `throw` activa Error Boundary → pantalla blanca → mala UX

---

### 4. Server Actions (Controllers)

**Regla:** Usar `createDomainError` para errores de negocio

```typescript
// ✅ CORRECTO
"use server";
export async function deleteUser(payload, id, address) {
  const res = await apiDeleteUserUC({ payload, id, address });
  
  if (!res.success) {
    throw createDomainError(
      ErrorCodes.DATABASE_ACTION,
      deleteUser,
      "deleteUser",
      "tryAgainOrContact",
      { entity: "user", optionalMessage: res.message }
    );
  }
  
  revalidatePath("/");
}

// ❌ INCORRECTO
if (!res.success) throw new Error(res.message); // NO hacer esto
```

---

### 5. Middleware de Bibliotecas Externas

**Regla:** Convertir errores nativos a `createDomainError`

```typescript
// ✅ CORRECTO - UploadThing
.middleware(async () => {
  const user = await authRepository.getCookies();
  
  if (user === false) {
    throw createDomainError(
      ErrorCodes.UNAUTHORIZED_ACTION,
      ConcreteUploadThingAdapter,
      "middleware",
      "credentials",
      { entity: "file upload", optionalMessage: "User not authenticated" }
    );
  }
  
  return { userId: user.ctx.id };
});

// ❌ INCORRECTO
throw new UploadThingError("Unauthorized"); // Error nativo de biblioteca
```

---

## 🔧 Anatomía de `createDomainError`

```typescript
throw createDomainError(
  ErrorCodes.XXX,           // Tipo de error (DATABASE_FIND, UNAUTHORIZED_ACTION, etc.)
  MyClass,                  // Clase/función donde ocurre
  "functionName",           // Nombre de la función
  friendlyDesc,             // Mensaje para el usuario
  meta                      // Metadata adicional
);
```

### Valores de `friendlyDesc`:

| Valor | Comportamiento | Uso |
|-------|----------------|-----|
| `"tryAgainOrContact"` | Toast con mensaje genérico | Errores de backend |
| `"credentials"` | Toast "Credenciales inválidas" | Errores de auth |
| `"d"` | Silencioso (solo logs) | Errores esperados |
| `undefined` | ErrorBoundary (rompe la página) | Backend caído |
| `IntlBase` | Toast con mensaje custom | Mensajes específicos |

---

## 📊 Checklist de Decisión

Cuando tengas que manejar un error:

```
1. ¿Está en Server Component/Use Case?
   ├─ ¿Es dato crítico? 
   │  └─ SÍ → createDomainError
   └─ ¿Es dato opcional?
      └─ SÍ → return null/[] (Graceful Degradation)

2. ¿Está en Repository?
   └─ SIEMPRE → createDomainError

3. ¿Está en Client Component (React Hook)?
   └─ SIEMPRE → console.error + return safe defaults

4. ¿Está en Server Action?
   └─ SIEMPRE → createDomainError (si es error de negocio)

5. ¿Está en middleware de biblioteca externa?
   └─ SIEMPRE → createDomainError (convertir error nativo)
```

---

## ❌ Anti-Patrones (NO hacer)

```typescript
// ❌ 1. throw new Error en runtime
throw new Error("Something went wrong");

// ❌ 2. throw nativo de biblioteca sin convertir
throw new UploadThingError("Unauthorized");

// ❌ 3. throw en Client Component
if (!context) throw new Error("Invalid context");

// ❌ 4. catch sin re-lanzar (tragar errores)
try {
  await fetch();
} catch {
  // Silencio total - NO hacer esto en server
}

// ❌ 5. Mezclar estrategias inconsistentemente
try {
  const data = await fetch();
  if (!data) throw new Error("Not found"); // Inconsistente
} catch {
  return null; // No coincide con el throw de arriba
}
```

---

## ✅ Ejemplos Completos

### Ejemplo 1: Server Component con Fetch

```typescript
// use case
export const getProjectsUC = async (): Promise<Project[]> => {
  try {
    const response = await readProjectUC();
    if (!response.success) {
      throw createDomainError(
        ErrorCodes.DATABASE_FIND,
        getProjectsUC,
        "getProjectsUC",
        "tryAgainOrContact",
        { entity: "projects" }
      );
    }
    return response.data;
  } catch (error) {
    throw error; // Re-lanzar
  }
};

// Server Component
export async function ProjectsSection() {
  try {
    const projects = await getProjectsUC();
    return <ProjectsGrid projects={projects} />;
  } catch (error) {
    const { action, serializedError } = handleServerError(error);
    if (action === 'throw') throw error; // ErrorBoundary
    return <ErrorToastFallback error={serializedError} fallback={<Empty />} />;
  }
}
```

### Ejemplo 2: Client Hook con Fallback

```typescript
"use client";
export const useFormField = () => {
  const context = useContext(FormFieldContext);
  
  if (!context) {
    console.error("[useFormField] Must be used within FormFieldContext");
    return {
      id: "",
      name: "",
      error: undefined,
      invalid: false,
    }; // ✅ Safe defaults
  }
  
  return context;
};
```

### Ejemplo 3: Server Action

```typescript
"use server";
export async function updateUser(id, data) {
  try {
    const result = await apiUpdateUserUC(id, data);
    if (!result.success) {
      throw createDomainError(
        ErrorCodes.DATABASE_ACTION,
        updateUser,
        "updateUser",
        "tryAgainOrContact",
        { entity: "user", optionalMessage: result.message }
      );
    }
    revalidatePath("/");
    return result;
  } catch (error) {
    throw error; // Re-lanzar para que cliente lo capture
  }
}
```

---

## 🎯 Beneficios de estas Reglas

1. ✅ **Consistencia**: Todos los errores siguen el mismo patrón
2. ✅ **No rompe la UI**: Graceful degradation donde es posible
3. ✅ **Trazabilidad**: Todos los errores tienen metadata completa
4. ✅ **UX mejorada**: Mensajes de error claros para el usuario
5. ✅ **Debugging fácil**: Logs estructurados con contexto
6. ✅ **Type-safe**: TypeScript valida los códigos de error

---

## 📚 Referencias

- **DomainError spec**: `@skrteeeeee/profile-domain`
- **ErrorCodes disponibles**: `DATABASE_FIND`, `DATABASE_ACTION`, `UNAUTHORIZED_ACTION`, `CONFIG`
- **Hook de toast**: `useErrorToast` en `log-ui-ts/lib/hooks`
- **Estrategia general**: `docs/error-handling-strategy.md`
