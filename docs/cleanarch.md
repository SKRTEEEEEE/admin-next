# Clean Architecture en log-ui-ts

## 📚 Índice
1. [Introducción](#introducción)
2. [Arquitectura por Capas](#arquitectura-por-capas)
3. [Domain como Package Externo](#domain-como-package-externo)
4. [Dependency Rule](#dependency-rule)
5. [Decisiones de Diseño](#decisiones-de-diseño)
6. [Buenas Prácticas Implementadas](#buenas-prácticas-implementadas)
7. [Antipatrones Evitados](#antipatrones-evitados)

---

## Introducción

**log-ui-ts** es un submodule compartido que implementa **Clean Architecture** para ser consumido tanto por **múltiples micro-frontends** (admin-next, agora-next, profile-next) como por el **backend** (profile-nest). Comparte dominio mediante npm package y separa claramente entre contratos del dominio (módulos) y servicios externos.

### Objetivos Principales
- **Domain compartido** entre frontend y backend vía npm package
- **Lógica de negocio** centralizada en Application Layer
- **Testabilidad** mediante dependency injection
- **Independencia de frameworks** en capas internas
- **Separación clara** entre módulos del dominio y servicios externos

---

## Arquitectura por Capas

```
log-ui-ts/
├─ core/
│  ├─ application/                    ← Application Layer
│  │  ├─ interfaces/
│  │  │  ├─ entities/                 ← Módulos (Contratos puros del dominio)
│  │  │  └─ services/                 ← Servicios (Contratos de sistemas externos)
│  │  └─ usecases/
│  │     ├─ entities/                 ← Módulos (Casos de uso del dominio)
│  │     └─ services/                 ← Servicios (Casos de uso externos)
│  ├─ infrastructure/                 ← Infrastructure Layer
│  │  ├─ api/                         ← Módulos (Repositories del dominio - API REST)
│  │  ├─ connectors/                  ← Servicios (Inicializadores externos)
│  │  └─ services/                    ← Servicios (Implementaciones externas)
│  └─ presentation/                   ← Presentation Layer
│     ├─ adapters/                    ← Adaptadores de framework (Next.js)
│     └─ services/                    ← Factories con DI
└─ [domain en @skrteeeeee/profile-domain]  ← Domain Layer (npm package)
```

### Separación: Módulos vs Servicios

Esta arquitectura distingue claramente entre dos tipos de contratos:

#### **Módulos (Entities)**
Representan **contratos puros del dominio de la aplicación**. Son la lógica de negocio central que define qué es la aplicación.

**Características:**
- Representan entidades del dominio (User, Role, Image)
- Contratos que existen independientemente de servicios externos
- Lógica de negocio pura sin dependencias externas
- Definen las reglas fundamentales de la aplicación

**Ubicación:**
- `application/interfaces/entities/` - Interfaces de contratos del dominio
- `application/usecases/entities/` - Casos de uso del dominio (user.ts, role.ts)
- `infrastructure/api/` - Implementaciones que gestionan entidades del dominio

**Ejemplo:** User, Role, Image son módulos porque representan conceptos fundamentales del dominio que existirían independientemente de cualquier servicio externo.

#### **Servicios (Services)**
Representan **contratos con sistemas externos**. Son dependencias de terceros que la aplicación necesita para funcionar.

**Características:**
- Representan integraciones con servicios de terceros
- Abstracción de librerías y APIs externas (Thirdweb, Uploadthing)
- Pueden ser reemplazados sin cambiar la lógica del dominio
- Definen cómo la aplicación interactúa con el mundo exterior

**Ubicación:**
- `application/interfaces/services/` - Abstracciones de servicios externos
- `application/usecases/services/` - Casos de uso que orquestan servicios externos
- `infrastructure/connectors/` - Inicialización de servicios de terceros
- `infrastructure/services/` - Implementaciones concretas de servicios externos

**Ejemplo:** Thirdweb (autenticación blockchain), Uploadthing (subida de archivos) son servicios porque son integraciones con sistemas externos que podrían ser reemplazados por alternativas.

### 1. **Application Layer**

**Ubicación:** `core/application/`  
**Responsabilidad:** Lógica de negocio de la aplicación. Define tanto los contratos del dominio puro (módulos) como los contratos con servicios externos (servicios).
- **Solo depende del lenguaje primario - No utiliza librerías**

Esta capa se divide en dos subcapas principales:

#### **Interfaces (Puertos/Abstracciones)**

Define los contratos que la infrastructure debe implementar. Se separa internamente en:

**Entities (Módulos):**
- Representan interfaces de contratos puros del dominio
- Definen la estructura de datos fundamental de la aplicación
- Independientes de cualquier servicio externo
- Ejemplo: interfaces de User, Role, Image

**Services (Servicios):**
- Representan abstracciones de servicios externos
- Definen cómo la aplicación espera interactuar con terceros
- Permiten reemplazar implementaciones sin afectar la lógica
- Ejemplo: AuthRepository, CookieProvider, UploadProvider

**Por qué interfaces aquí (Uncle Bob):**
- Las interfaces son **contratos de la aplicación**, no del dominio
- Definen **puertos** que infrastructure implementa (inversión de dependencias)
- Application define qué necesita, infrastructure lo provee

#### **Use Cases (Casos de Uso)**

Orquesta la lógica de negocio usando repositories e interfaces. Se separa internamente en:

**Entities (Módulos):**
- Casos de uso que operan sobre entidades del dominio
- Lógica de negocio central de la aplicación
- Gestionan flujos relacionados con User, Role, Image
- Ejemplo: `apiReadUsersUC`, `apiUpdateUserUC`, `readRoleByIdUC`

**Services (Servicios):**
- Casos de uso que orquestan servicios externos
- Coordinan integraciones con terceros
- Gestionan flujos de autenticación, uploads, etc.
- Ejemplo: `loginUC`, `logoutUC`, `uploadImageUC`

**Responsabilidades generales:**
- Orquestar llamadas entre repositories y services
- Obtener contexto de ejecución (ej: JWT desde presentation)
- Delegar a infrastructure las operaciones concretas
- Mantener la lógica de negocio simple y testeable
- **NO contiene reglas de dominio** (esas van en domain package)

---

### 2. **Infrastructure Layer**

**Ubicación:** `core/infrastructure/`  
**Responsabilidad:** Implementaciones concretas de los contratos definidos en application layer. Gestiona la comunicación con sistemas externos.

Esta capa también distingue entre módulos y servicios:

#### **API (Módulos)**

**Ubicación:** `infrastructure/api/`  
**Naming:** `{entity}.repository.ts`

Implementaciones de repositories que gestionan las entidades del dominio a través de la API REST del backend. Son "módulos" porque manejan datos del dominio puro.

**Características:**
- Gestionan operaciones CRUD sobre entidades del dominio
- Se comunican con el backend para persistir/recuperar datos
- Reciben JWT como parámetro opcional (inyectado desde use cases)
- Usan `createDomainError` para consistencia en errores
- **NO dependen de Next.js** ni otros frameworks

**Ejemplos:** `ApiUserRepository`, `ApiRoleRepository`

#### **Connectors (Servicios)**

**Ubicación:** `infrastructure/connectors/`

Inicializadores y configuradores de servicios externos de terceros. Contienen la lógica de setup e instanciación.

**Características:**
- Inicializan clientes de SDKs externos
- Configuran autenticación y opciones del servicio
- Exponen el cliente configurado a las implementaciones
- Patrón legacy: separar inicialización de lógica

**Ejemplos:** `ThirdwebAuthAdapter`, `UploadthingAdapter`

#### **Services (Servicios)**

**Ubicación:** `infrastructure/services/`

Implementaciones concretas de servicios externos que usan los connectors. Implementan las interfaces definidas en `application/interfaces/services/`.

**Características:**
- Implementan la lógica de negocio relacionada con el servicio
- Usan los connectors para acceder a SDKs configurados
- Reciben dependencias vía constructor (Dependency Injection)
- Traducen errores de terceros a `createDomainError`

**Ejemplos:** `ThirdwebAuthRepository`, `UploadthingService`

**Reglas generales de Infrastructure:**
- **Independencia de framework**: NO importa `cookies()`, `redirect()`, etc.
- **Recepción de contexto**: JWT y datos de sesión vienen como parámetros
- **Errores consistentes**: Usa `createDomainError` del domain package
- **Sin side effects ocultos**: No console.log, usar logger si es necesario
- **Testeable**: Todas las dependencias inyectadas, fácil mockear

**Decisión de naming:** Se mantiene "repository" en `api/` y "service" en `services/` para evitar confusión. Aunque ambos son implementaciones, el contexto de cada carpeta deja claro su propósito.

---

### 3. **Presentation Layer**

**Ubicación:** `core/presentation/`  
**Responsabilidad:** Capa de adaptación específica del framework (Next.js). Es la **única capa** que puede depender de tecnologías de framework.

#### **Adapters**

**Ubicación:** `presentation/adapters/`  
**Naming:** `{framework}-{service}.adapter.ts`

Implementaciones concretas de las interfaces de application usando APIs específicas de Next.js.

- *Adaptan el core al fw*

**Características:**
- **Única capa** que importa `next/headers`, `next/navigation`, etc.
- Implementa interfaces de `application/interfaces/services/`
- Traduce APIs de framework a contratos de la aplicación
- Facilita migración: cambiar Next.js → Express solo requiere nuevos adapters

**Ejemplos:** `nextCookieAdapter` (implementa `CookieProvider`)

#### **Controllers**

**Ubicación:** `presentation/controllers/`  
**Naming:** `{entity}.controller.ts`

Manejan peticiones HTTP y delegan la lógica de negocio a los Use Cases. **Solo crear cuando sea necesario.**

**Cuándo SÍ crear controllers:**

1. **Server Actions para Client Components** (OBLIGATORIO)
   - Client Components necesitan `"use server"` para ejecutar código del servidor
   - Actualización reactiva sin reload de página completa
   
```typescript
// ✅ core/presentation/controllers/user.controller.ts
"use server"; // ← OBLIGATORIO para Client Components

import { updateUserUC } from "@/core/application/usecases/entities/user";
import { revalidatePath } from "next/cache"; // ← API Next.js

export async function updateUserAction(data: UpdateUserData) {
  const result = await updateUserUC(data);
  revalidatePath("/users"); // ← Framework-specific
  return result;
}

// ✅ components/UserForm.tsx
"use client";
export function UserForm() {
  const handleSubmit = async (data) => {
    await updateUserAction(data); // ✅ Server Action
  };
  return <form onSubmit={handleSubmit}>...</form>;
}
```

2. **Uso de APIs específicas del framework**
   - Necesitas `revalidatePath()`, `cookies()`, `redirect()`, etc.
   
3. **Lógica compleja compartida entre múltiples routes**
   - Evitar duplicación entre varios endpoints
   - Webhook handlers compartidos, middleware complejo

**Cuándo NO crear controllers:**

1. **Server Components → Application directamente**
   - Server Components ya ejecutan en el servidor
   - NO necesitan `"use server"`
   
```typescript
// ✅ app/users/page.tsx (Server Component)
import { getUsersUC } from "@/core/application/usecases/entities/user";

export default async function UsersPage() {
  const users = await getUsersUC(); // ✅ Llamada directa, sin controller
  return <UserList users={users} />;
}
```

2. **API Routes simples → Application directamente**
   - `route.ts` ya es Presentation Layer por naturaleza
   - Solo necesita extraer params y llamar use case
   
```typescript
// ✅ app/api/users/route.ts
import { NextResponse } from "next/server";
import { getUsersUC } from "@/core/application/usecases/entities/user";

export async function GET() {
  const users = await getUsersUC(); // ✅ Directo, sin controller extra
  return NextResponse.json(users);
}
```

**Principio:** Evitar duplicación innecesaria. Solo crear controllers cuando aporten valor real (Server Actions obligatorias, APIs del framework, reutilización).

---

#### **Services (Factories con DI)**

**Ubicación:** `presentation/services/`

Factories que instancian repositories e inyectan adapters. Punto de entrada para conectar todas las capas.

**Características:**
- Crean instancias de infrastructure con dependencias concretas
- Inyectan adapters de presentation en infrastructure
- Exponen instancias configuradas para usar en toda la aplicación
- Centralizan la configuración de Dependency Injection

**Por qué aquí:**
- Infrastructure NO debe conocer Next.js (Dependency Rule)
- Presentation conoce tanto framework como infrastructure
- Facilita testing: crear factories con mocks en lugar de adapters reales

**Ejemplo:**
```typescript
// ✅ presentation/services/auth.factory.ts
import { nextCookieAdapter } from "../adapters/next-cookie.adapter";
import { ThirdwebAuthRepository } from "@/core/infrastructure/services/thirdweb-auth";

export const authRepository = new ThirdwebAuthRepository(nextCookieAdapter);
```

---

### Presentation Layer: `core/presentation/` vs `app/`

**Ambos son Presentation Layer (framework-specific), pero con responsabilidades diferentes:**

#### **`core/presentation/` - Lógica Reutilizable**

**Contiene:**
- `adapters/` - Adaptadores de APIs del framework
- `controllers/` - Server Actions y lógica compartida (solo cuando necesario)
- `services/` - Factories con Dependency Injection

**Características:**
- Lógica reutilizable entre diferentes routes/páginas
- NO contiene estructura de routing
- Puede ser compartido entre proyectos (como submodule)

**Cuándo usar:**
- ✅ Server Actions que se llaman desde múltiples Client Components
- ✅ Adaptadores de framework que se usan en varios lugares
- ✅ Factories de DI que configuran toda la aplicación

---

#### **`app/` - Estructura de Next.js**

**Contiene:**
- Server Components (pages, layouts)
- Client Components (`"use client"`)
- API Routes (`route.ts`)
- Metadata, loading, error boundaries

**Características:**
- Estructura de routing de Next.js (App Router)
- Componentes específicos de la aplicación
- NO reutilizable entre proyectos

**Principio:** Llamar **directamente** a Application Layer cuando no necesites:
- Directivas del framework (`"use server"`, `"use client"`)
- APIs específicas del framework (`revalidatePath`, `cookies`, etc.)
- Lógica compartida entre múltiples endpoints

**Ejemplos:**

```typescript
// ✅ Server Component → Application directamente
// app/[locale]/page.tsx
import { getProjectsUC } from "@/core/application/usecases/entities/project";

export default async function Page({ params }) {
  const projects = await getProjectsUC(params.locale); // ✅ Sin controller
  return <ProjectList projects={projects} />;
}

// ✅ API Route → Application directamente  
// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { getProjectsUC } from "@/core/application/usecases/entities/project";

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale");
  const projects = await getProjectsUC(locale || "es"); // ✅ Sin controller
  return NextResponse.json(projects);
}

// ✅ Client Component → Server Action (SÍ necesita controller)
// components/ProjectRefresh.tsx
"use client";
import { refreshProjectsAction } from "@/core/presentation/controllers/project.controller";

export function ProjectRefresh() {
  const handleRefresh = async () => {
    await refreshProjectsAction(); // ✅ Controller OBLIGATORIO aquí
  };
  return <button onClick={handleRefresh}>Refresh</button>;
}
```

---

### Regla de Oro: Minimizar Presentation Controllers

**Presentation Controllers SOLO para:**


| Caso | ¿Crear Controller? | Ubicación |
|------|-------------------|-----------|
| Server Component → Use Case | ❌ NO | `app/` llama Application directo |
| Client Component con acción | ✅ **SÍ (OBLIGATORIO)** | `core/presentation/controllers/` con `"use server"` |
| API Route simple | ❌ NO | `app/api/*/route.ts` llama Application directo |
| API Route compleja compartida | 🟧 SÍ | `core/presentation/controllers/` para reutilización |
| Usa APIs del framework | 🟧 NO | `core/presentation/controllers/` (revalidatePath, etc.) |

🟧 → *Opcional*


**Principio:** `app/` (Server Components, API Routes) **ya es Presentation Layer**. Solo crear controllers en `core/presentation/` cuando:
1. Client Components necesiten Server Actions (`"use server"` obligatorio)
2. Necesites APIs específicas del framework (`revalidatePath`, `cookies`, etc.)
3. Haya lógica compleja compartida entre múltiples endpoints

**Best Practice de Next.js aplicada:**
- ✅ `"use client"` lo más abajo posible (solo para interactividad)
- ✅ Fetch en Server Components, pasar datos como props
- ✅ Evitar fetching en Client Components cuando se puede hacer en servidor
- ✅ Usar Server Actions solo cuando sea necesario (actualizaciones reactivas)

---



## Domain como Package Externo

**Ubicación:** `@skrteeeeee/profile-domain` (npm package)  
**Responsabilidad:** Solo tipos, interfaces, enums, ErrorCodes y factory de errores. **NO contiene lógica de negocio ni validaciones.**

### Por qué Domain es un Package Externo

Domain es compartido entre **frontend (micro-frontends) y backend (profile-nest)** para garantizar un vocabulario común sin duplicación.

**Single Source of Truth:**
- Frontends (admin-next, agora-next, profile-next) y backend (profile-nest) usan las mismas definiciones
- TypeScript garantiza type safety en todo el stack
- Cambios en tipos se propagan automáticamente vía versionado npm

**Contenido del Domain Package:**
- **Tipos/Interfaces:** `UserEntity`, `RoleEntity`, `ImageEntity`
- **Value Objects:** `RoleType`, `UserStatus`, `VerificationLevel` (enums)
- **ErrorCodes:** Catálogo de códigos de error
- **createDomainError:** Factory para crear errores consistentes con i18n (ES, EN, CA, DE)
- **Descripciones de enums**

**Lo que NO contiene:**
- ❌ Validaciones de negocio (van en Application Layer)
- ❌ Lógica de negocio (va en Application Layer)
- ❌ Reglas de autorización (van en Application Layer)

### Filosofía: Domain = Vocabulario Compartido

Domain define **qué existe** (tipos), no **qué se puede hacer** (lógica). Cada aplicación (frontend o backend) decide su propia lógica de negocio en su Application Layer.

---

## Distribución de Lógica: Principio de "Lo Más Profundo Posible"

### Regla Fundamental

**La lógica de negocio debe vivir lo más profundo posible en la arquitectura de la APLICACIÓN.**

```
Domain (solo tipos y contratos)
    ↓
Application (TODA la lógica de negocio)
    ↓
Infrastructure/Presentation (solo detalles técnicos)
```

### Dónde va cada tipo de lógica

#### **Domain Layer (Package Externo)**
```
✅ Tipos e interfaces
✅ Enums (RoleType, UserStatus)
✅ ErrorCodes (catálogo)
✅ createDomainError (factory)
❌ NO validaciones
❌ NO reglas de negocio
```

**Filosofía:** Domain es el vocabulario compartido entre frontend y backend, NO la lógica.

#### **Application Layer (Corazón de la Lógica)**
```
✅ Validaciones: "El email debe ser válido"
✅ Reglas de negocio: "Solo admin puede borrar users"
✅ Autorizaciones: "Necesito JWT para leer users"
✅ Orquestación: getJWT() → validate() → call repository
```

- **Regla de Oro:** Si es una decisión de negocio, va en Application, no en Infrastructure.
- **Red Flag:** Si necesita **librerías** (a excepción de domain), **va en Infrastructure**, no en Application.
- **Red Flag: 'user server'** is exclusive of 'fw'

**Ubicación específica:**
- `application/usecases/entities/` → Validaciones y lógica sobre entidades del dominio
- `application/usecases/services/` → Orquestación de servicios externos

#### **Infrastructure Layer (Solo Detalles Técnicos)**
```
✅ Traducción: HTTP 401 → createDomainError(UNAUTHORIZED_ACTION)
✅ Persistencia: Enviar data al backend con JWT en header
✅ SDKs: Llamar Thirdweb SDK, Uploadthing SDK
❌ NO decide qué validar
❌ NO decide quién puede hacer qué
❌ NO contiene reglas de negocio
```
- **Regla de Oro:** Si **depende de servicios externos** (librerías, sdk, etc..), va en Infrastructure.
- **Red Flag: 'user server'** is exclusive of 'fw'

**Regla:** Infrastructure **implementa** capacidades técnicas, Application **decide** cuándo usarlas.

### Ejemplo Práctico

**❌ MAL: Validación en Infrastructure**
```
infrastructure/api/user.repository.ts:
  if (!email.includes('@')) throw error  // ❌ Lógica de negocio!
```

**✅ BIEN: Validación en Application**
```
application/usecases/entities/user.ts:
  if (!isValidEmail(email)) throw createDomainError(...)  // ✅
  return await apiUserRepository.update(data, jwt)  // Infrastructure solo ejecuta
```

### Por qué esta Distribución

1. **Testabilidad:** Application Layer se testea sin Next.js ni backend real
2. **Reutilización:** Lógica de negocio compartida entre todos los frontends
3. **Mantenibilidad:** Cambiar validaciones NO requiere tocar infrastructure
4. **Flexibilidad:** Cambiar de Thirdweb a Auth0 NO afecta reglas de negocio


## Presentation (fw) vs Application (core) vs app (fw) 
- En muchos casos, hay funciones de Application(use-cases), que se pueden llamar desde la app(fw) ya que no necesitan 'use server', ya que NO son ejecutadas desde paginas del 'cliente'
  - En estos casos realmente tiene sentido duplicar la lógica en core/Presentation ?
- Se entiende que /core/presentation/ i /app/ -> son 'fw' osea son 'presentation'
### CHAT ESCRIBE AQUI


---




## Dependency Rule

Las dependencias **solo pueden apuntar hacia adentro**:
- ✅ Presentation → Application → Domain
- ✅ Infrastructure → Application → Domain
- ❌ Infrastructure ↔ Presentation
- ❌ Domain → cualquier capa

**Implementación:**
- Presentation inyecta adapters (Next.js) en Infrastructure vía DI
- Application define interfaces, Infrastructure las implementa
- Infrastructure usa tipos de Domain y contratos de Application
- Domain es consumido por todas las capas sin depender de ninguna

---

## Decisiones de Diseño

1. **Domain como package externo:** Compartir tipos entre frontend y backend
2. **Lógica en Application:** Validaciones y reglas de negocio centralizadas
3. **JWT como parámetro:** Repositories reciben JWT desde use cases
4. **Connectors + Services (Legacy):** Separar inicialización, no repetir en nuevos servicios

---

## Buenas Prácticas

**Errores centralizados:** `createDomainError` con i18n en 4 idiomas  
**JWT inyectado:** Use cases obtienen JWT, repositories NO dependen de Next.js  
**Use cases simplificados:** Delegación directa, -48% de código  
**Separación módulos/servicios:** Clarifica dominio vs integraciones externas

---

## Antipatrones Evitados

1. **Dependency Rule violada:** Infrastructure importando `cookies()` de Next.js
2. **Errores inconsistentes:** Múltiples tipos custom por capa
3. **Console.log en infrastructure:** Logs mezclados con lógica
4. **Boilerplate innecesario:** Clases abstractas sin valor

---

## Evaluación Final: 8.5/10

**Fortalezas:**  
✅ Dependency Rule respetada  
✅ Domain compartido frontend + backend  
✅ Lógica centralizada en Application  
✅ Infrastructure framework-agnostic  

**Mejoras futuras:**  
🔄 Consolidar connectors + services  
🔄 Logger abstraction  
🔄 Tests de integración  

**Lecciones clave:**  
Domain = solo tipos, Application = toda la lógica, Infrastructure = solo detalles técnicos.
