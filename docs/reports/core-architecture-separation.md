# Arquitectura: Separación entre admin-next/core y log-ui-ts/core

## ✅ Estado Actual: Correctamente Separado

La arquitectura actual está **correctamente organizada** con una clara separación de responsabilidades:

---

## 📁 admin-next/src/core/ (Específico del Micro-frontend)

### Propósito
Código específico del micro-frontend **admin-next** que **NO se comparte** con otros frontends.

### Contenido (10 archivos)

#### **Módulos de Dominio Específicos:**

**Project (Proyectos del Desarrollador)**
- `application/interfaces/entities/project.interface.ts`
- `application/usecases/entities/project.ts`
- `application/usecases/entities/_project-basic.ts`
- `infrastructure/api/project.repo.ts`

**Tech (Tecnologías del Stack)**
- `application/interfaces/entities/tech.interface.ts`
- `application/usecases/entities/tech.ts`
- `infrastructure/api/tech.repo.ts`

#### **Configuración Específica:**
- `admin/surfaces.ts` - Estado de micro-frontends
- `utils.ts` - Utilidades para tests
- `README.md` - Documentación de Clean Architecture

### Características
- ✅ Usa `ApiBaseRepository` de `log-ui-ts/core`
- ✅ Sigue Clean Architecture
- ✅ Usa `createDomainError` del domain package
- ✅ NO duplica código con log-ui-ts

---

## 📁 log-ui-ts/core/ (Compartido entre Micro-frontends)

### Propósito
Código compartido entre **todos los micro-frontends** (admin-next, agora-next, profile-next).

### Contenido (18 archivos)

#### **Módulos Compartidos:**

**User (Usuarios y Autenticación)**
- `application/interfaces/entities/user.interface.ts`
- `application/usecases/entities/user.ts`
- `infrastructure/api/user.repository.ts`
- `presentation/controllers/user.ts`

**Role (Roles y Permisos)**
- `application/interfaces/entities/role.interface.ts`
- `application/usecases/entities/role.ts`
- `infrastructure/api/role.repository.ts`

**Auth (Autenticación Thirdweb)**
- `application/interfaces/services/auth.d.ts`
- `application/usecases/services/auth.ts`
- `infrastructure/services/thirdweb-auth.ts`
- `infrastructure/connectors/thirdweb-auth.ts`
- `presentation/controllers/auth.ts`
- `presentation/services/auth.service.ts`

**Img (Subida de Imágenes)**
- `application/interfaces/services/img.d.ts`
- `application/usecases/services/img.ts`
- `infrastructure/services/uploadthing-img.ts`
- `infrastructure/connectors/uploadthing-st.ts`
- `presentation/controllers/img.ts`

#### **Infraestructura Base:**
- `infrastructure/api/base.repository.ts` - Clase base para todos los repositorios
- `application/interfaces/services/cookie-provider.d.ts` - Interfaz de cookies
- `presentation/adapters/next-cookie.adapter.ts` - Adaptador Next.js

### Características
- ✅ Reutilizable entre todos los micro-frontends
- ✅ Clean Architecture completa
- ✅ Dependency Injection configurada
- ✅ Framework-agnostic en capas internas

---

## 🔗 Relación entre ambos

### Patrón de Uso Correcto

**admin-next/src/core/** extiende de **log-ui-ts/core/**:

```typescript
// ✅ admin-next/src/core/infrastructure/api/project.repo.ts
import { ApiBaseRepository, Modules } from "@log-ui/core/infrastructure/api/base.repository";

export class ProjectApiRepository extends ApiBaseRepository {
  constructor(baseUrl?: string) {
    super(Modules.PROJECTS, baseUrl);
  }
  // Implementación específica de Project
}
```

```typescript
// ✅ admin-next/src/core/infrastructure/api/tech.repo.ts
import { ApiBaseRepository, Modules } from "@log-ui/core/infrastructure/api/base.repository";

export class TechApiRepository extends ApiBaseRepository {
  constructor(baseUrl?: string) {
    super(Modules.TECH, baseUrl);
  }
  // Implementación específica de Tech
}
```

### Configuración de Módulos

**log-ui-ts/core/infrastructure/api/base.repository.ts:**
```typescript
export enum Modules {
    PRE_TECH = "PRE_TECH",
    PROJECTS = "PROJECTS",    // ← Configurado para admin-next
    ROLE = "ROLE",
    TECH = "TECH",            // ← Configurado para admin-next
    USER = "USER"
}

// Endpoints configurados por módulo
[Modules.PROJECTS]: {
    list: { endpoint: "project", method: "GET" },
    readById: { endpoint: "project/:id", method: "GET" }
},
[Modules.TECH]: {
    create: {endpoint: "tech", method: "POST"},
    update: {endpoint: "tech", method: "PUT"},
    readAll: {endpoint: (opt)=>`tech/${opt}`, method: "GET"},
    delete: {endpoint: "tech", method: "DELETE"},
},
```

---

## 📊 Comparación

| Aspecto | admin-next/src/core | log-ui-ts/core |
|---------|---------------------|----------------|
| **Alcance** | Específico de admin-next | Compartido entre frontends |
| **Módulos** | Project, Tech | User, Role, Auth, Img |
| **Repositorios** | 2 (Project, Tech) | 2 (User, Role) |
| **Use Cases** | Específicos del dominio | Autenticación y gestión común |
| **Infraestructura** | Usa base de log-ui-ts | Provee ApiBaseRepository |
| **Presentation** | Solo si necesario | Controllers, Adapters, Services |
| **Reutilizable** | ❌ NO | ✅ SÍ |

---

## ✅ Verificación de Correctitud

### NO hay Duplicación
```bash
# admin-next/src/core/
project.interface.ts  ← Único aquí
project.repo.ts       ← Único aquí
project.ts            ← Único aquí
tech.interface.ts     ← Único aquí
tech.repo.ts          ← Único aquí
tech.ts               ← Único aquí

# log-ui-ts/core/
user.repository.ts    ← Único aquí
role.repository.ts    ← Único aquí
auth.ts               ← Único aquí
img.ts                ← Único aquí
```

### Imports Correctos
```typescript
// ✅ admin-next usa código compartido
import { ApiBaseRepository } from "@log-ui/core/infrastructure/api/base.repository";

// ✅ admin-next usa su propio código
import { Project } from "@/core/application/interfaces/entities/project.interface";
import { getProjectsForLandingUC } from "@/core/application/usecases/entities/project";
```

### Dependency Rule Respetada
```
admin-next/src/core/ → log-ui-ts/core/ → domain package
                    ↓
            admin-next/src/app/ (Next.js)
```

---

## 🎯 Conclusión

La arquitectura actual está **perfectamente organizada**:

1. ✅ **Separación clara** entre código específico y compartido
2. ✅ **NO hay duplicación** de funcionalidad
3. ✅ **Reutilización correcta** de ApiBaseRepository
4. ✅ **Clean Architecture** respetada en ambas capas
5. ✅ **Dependency Rule** cumplida
6. ✅ **Preparado para escalar** con nuevos micro-frontends

### Módulos Futuros

Si **agora-next** o **profile-next** necesitan módulos específicos:
- Crear en `{frontend}/src/core/` (como Project en admin-next)
- Extender de `ApiBaseRepository` de log-ui-ts
- Agregar configuración en `Modules` enum si es necesario

Si necesitan funcionalidad común:
- Agregar en `log-ui-ts/core/`
- Será automáticamente compartido entre todos

---

## 📝 Reglas de Decisión

### ¿Dónde poner nuevo código?

**admin-next/src/core/** SI:
- ✅ Es específico del micro-frontend admin
- ✅ NO se usará en otros frontends
- ✅ Es dominio del "desarrollador" (proyectos, tecnologías)

**log-ui-ts/core/** SI:
- ✅ Se usa en múltiples micro-frontends
- ✅ Es funcionalidad transversal (auth, upload, users)
- ✅ Es infraestructura compartida (base repositories, adapters)

**domain package** SI:
- ✅ Son solo tipos/interfaces
- ✅ Se comparte entre frontend Y backend
- ✅ NO tiene lógica de negocio

---

## ✨ No se Requieren Cambios

La estructura actual es **óptima** y sigue las mejores prácticas de Clean Architecture con micro-frontends.
