# Clean Architecture - admin-next/core

## 📁 Estructura de Capas

```
core/
├── application/                    ← Application Layer
│   ├── interfaces/
│   │   ├── entities/              ← Módulos (Contratos del dominio)
│   │   │   ├── project.interface.ts
│   │   │   └── tech.interface.ts
│   │   └── services/              ← Servicios (Contratos externos)
│   └── usecases/
│       ├── entities/              ← Módulos (Lógica de negocio)
│       │   ├── project.ts
│       │   ├── tech.ts
│       │   └── _project-basic.ts
│       └── services/              ← Servicios (Lógica externa)
│
├── infrastructure/                ← Infrastructure Layer
│   ├── api/                       ← Módulos (Repositories REST)
│   │   ├── project.repo.ts
│   │   └── tech.repo.ts
│   ├── connectors/                ← Servicios (Inicializadores)
│   └── services/                  ← Servicios (Implementaciones)
│
└── presentation/                  ← Presentation Layer
    ├── adapters/                  ← Adaptan el core al framework
    ├── controllers/               ← Manejan peticiones HTTP
    │   └── project.controller.ts
    └── services/                  ← Factories con DI
```

## 🎯 Responsabilidades por Capa

### **1. Application Layer**
**Ubicación:** `application/`  
**Responsabilidad:** Lógica de negocio de la aplicación  
**Regla:** Solo depende del lenguaje primario - NO usa librerías (excepto domain)

- **interfaces/entities/** - Contratos del dominio (Project, Tech)
- **interfaces/services/** - Contratos de servicios externos (Auth, Upload)
- **usecases/entities/** - Casos de uso del dominio
- **usecases/services/** - Casos de uso de servicios externos

### **2. Infrastructure Layer**
**Ubicación:** `infrastructure/`  
**Responsabilidad:** Implementaciones concretas  
**Regla:** NO depende del framework (NO `cookies()`, `redirect()`, etc.)

- **api/** - Repositories que se comunican con el backend REST
- **connectors/** - Inicializadores de SDKs externos (Thirdweb, etc.)
- **services/** - Implementaciones de servicios externos

### **3. Presentation Layer**
**Ubicación:** `presentation/`  
**Responsabilidad:** Adaptación al framework (Next.js)  
**Regla:** Única capa que puede usar APIs de Next.js

#### **Subcapas:**

**3.1. Adapters** (`adapters/`)
- Adaptan el core al framework
- Implementan interfaces de `application/interfaces/services/`
- Ejemplo: `nextCookieAdapter` implementa `CookieProvider`

**3.2. Controllers** (`controllers/`)
- Manejan peticiones HTTP y Server Actions
- Delegan lógica de negocio a Use Cases
- Pueden usar `"use server"` o `"use client"`

**3.3. Services/Factories** (`services/`)
- Instancian repositorios con DI
- Conectan todas las capas
- Inyectan adapters en infrastructure

## 🔗 Dependency Rule

```
Presentation → Application → Domain
Infrastructure → Application → Domain

❌ Infrastructure ↔ Presentation
❌ Domain → cualquier capa
```

## ✅ Buenas Prácticas

1. **Errores consistentes:** Usa `createDomainError` en todas las capas
2. **Controllers simples:** Solo delegación, NO lógica de negocio
3. **Use cases puros:** Lógica sin dependencia del framework
4. **Repositories framework-agnostic:** NO importan APIs de Next.js

## 📝 Naming Conventions

- **Interfaces:** `{Entity}Interface` (ej: `ProjectInterface`)
- **Repositories:** `{Entity}Repository` (ej: `ApiProjectRepository`)
- **Use Cases:** `{action}{Entity}UC` (ej: `readProjectsUC`)
- **Controllers:** `{entity}.controller.ts`
- **Adapters:** `{framework}-{service}.adapter.ts`

## 🚫 Antipatrones a Evitar

1. ❌ `"use server"` en Application Layer
2. ❌ Importar `cookies()` en Infrastructure
3. ❌ Lógica de negocio en Controllers
4. ❌ Console.log en producción (usar logger)
5. ❌ Tipos `any` sin justificación

## 📚 Referencias

- [Clean Architecture Documentation](../../../docs/cleanarch.md)
- [Domain Package](https://www.npmjs.com/package/@skrteeeeee/profile-domain)
