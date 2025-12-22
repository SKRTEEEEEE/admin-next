# Análisis: Client Components que usan Server Actions

## 🎯 Objetivo
Identificar qué componentes del cliente necesitan implementar skeleton + fallback usando el patrón `SectionFallbackProvider` + `analyzeError()`.

---

## ✅ Ya implementado

### 1. **CustomConnectButton** (`log-ui-ts/components/custom-connect-button.tsx`)
**Server Actions usadas:**
- `login()` ✅
- `isLoggedIn()` ✅
- `generatePayload()` ✅
- `getUserData()` ✅
- `fetch('/api/logout')` ✅

**Estado:** ✅ **COMPLETO**
- Try/catch en todas las acciones
- Toast con `showAuthErrorToast()` helper
- Traducciones i18n en 4 idiomas
- Fallback a mensajes predefinidos

---

### 2. **UserConnectWrapper** (`log-ui-ts/components/site-header/user-connect-wrapper.tsx`)
**Server Actions usadas:**
- `getCurrentUserUC()` (comentado, se eliminó el wrapper)

**Estado:** ✅ **COMPLETO**
- `UserConnectSkeleton` con Button de shadcn/ui + i18n
- Se usa con `<Suspense>` en site-header
- Integrado con `SectionFallbackProvider` en `UserConnectSection`

---

## 🔴 Pendientes de implementar

### 3. **UserFormDialog** (`log-ui-ts/components/site-header/user-form-dialog.tsx`)
**Server Actions usadas:**
- `updateUser()` - Actualizar nick, email
- `updateImg()` - Actualizar imagen de perfil
- `uploadImg()` - Subir nueva imagen
- `generatePayload()` - Generar payload para firma

**Tipo de errores esperados:**
- Error de conexión al backend (ECONNREFUSED)
- Error HTTP 400/500 del servidor
- Error de validación (nick muy corto/largo, email inválido)
- Error al subir imagen (tamaño, formato)

**Implementación necesaria:**
- ❌ Try/catch en `handleUpdate()` para mostrar toast
- ❌ Try/catch en `handleImageUpload()` para errores de upload
- ❌ Traducciones i18n para errores:
  - `updateUser`: "Error al actualizar perfil"
  - `uploadImage`: "Error al subir imagen"

**Prioridad:** 🔴 **ALTA** (funcionalidad core de usuario)

---

### 4. **VerificacionEmailAlert** (`log-ui-ts/components/site-header/verificacion-email-alert.tsx`)
**Server Actions usadas:**
- `resendVerificationEmail()` - Reenviar email de verificación

**Tipo de errores esperados:**
- Error de conexión al backend
- Error HTTP 429 (rate limit - demasiados emails)
- Error HTTP 404 (usuario no encontrado)
- Error de servicio de email (SMTP)

**Implementación necesaria:**
- ❌ Try/catch en `handleResend()` tiene un catch que re-lanza pero no muestra toast
- ❌ Traducciones i18n para errores:
  - `resendEmail`: "Error al enviar email de verificación"
  - `emailRateLimit`: "Demasiados intentos, espera un momento"

**Prioridad:** 🟡 **MEDIA** (funcionalidad importante pero no crítica)

---

### 5. **SolicitudRoleButton** (`log-ui-ts/components/site-header/solicitud-role.tsx`)
**Server Actions usadas:**
- `updateUserSolicitud()` - Solicitar cambio de rol

**Tipo de errores esperados:**
- Error de conexión al backend
- Error HTTP 403 (no autorizado)
- Error de validación (rol inválido)

**Implementación necesaria:**
- ❌ Try/catch en `onSubmit()` tiene un catch que re-lanza pero no muestra toast
- ❌ Traducciones i18n para errores:
  - `requestRole`: "Error al solicitar rol"
  - `roleUnauthorized`: "No tienes permiso para solicitar este rol"

**Prioridad:** 🟢 **BAJA** (funcionalidad admin)

---

### 6. **DeleteUserButton** (`log-ui-ts/components/site-header/delete-user-button.tsx`)
**Server Actions usadas:**
- `deleteUser()` - Eliminar cuenta de usuario
- `generatePayload()` - Generar payload para firma

**Tipo de errores esperados:**
- Error de conexión al backend
- Error HTTP 403 (no autorizado)
- Error de validación (dirección no coincide)
- Error al desconectar wallet

**Implementación necesaria:**
- ❌ Try/catch en `onSubmit()` tiene un catch que re-lanza pero no muestra toast
- ❌ Traducciones i18n para errores:
  - `deleteUser`: "Error al eliminar cuenta"
  - `deleteUnauthorized`: "No tienes permiso para eliminar esta cuenta"

**Prioridad:** 🟡 **MEDIA** (acción destructiva importante)

---

## 📋 Patrón a seguir (basado en CustomConnectButton)

```typescript
"use client"
import { analyzeError } from "@log-ui/lib/error-serialization";
import { toast } from "sonner";
import { getErrorIcon } from "@log-ui/lib/get-error-icon";
import { useLocale, useTranslations } from "next-intl";

export function MyComponent() {
  const currentLocale = useLocale() as "es" | "en" | "ca" | "de";
  const t = useTranslations("errors.predefined");
  
  const showErrorToast = (error: unknown, fallbackKey: string) => {
    try {
      const serializedError = analyzeError(error);
      
      if (serializedError.description.es !== 'd') {
        toast.error(serializedError.title[currentLocale], {
          description: serializedError.description[currentLocale],
          icon: getErrorIcon(serializedError.iconType)
        });
      }
    } catch (analyzeErr) {
      // Fallback: usar traducciones predefinidas
      toast.error(t(`${fallbackKey}.title`), {
        description: t(`${fallbackKey}.description`)
      });
    }
  };
  
  const handleAction = async () => {
    try {
      await myServerAction();
      // Success feedback opcional
    } catch (error) {
      showErrorToast(error, "myActionError");
      // NO re-lanzar si es una acción del usuario (formulario, botón)
      // Solo re-lanzar si es parte de un flujo automático
    }
  };
  
  return <Button onClick={handleAction}>Do Action</Button>;
}
```

---

## 🎯 Traducciones i18n necesarias

### En `log-ui-ts/i18n/{locale}/common.json`:

```json
{
  "errors": {
    "predefined": {
      "updateUser": {
        "title": "Error al actualizar perfil",
        "description": "No se pudieron guardar los cambios"
      },
      "uploadImage": {
        "title": "Error al subir imagen",
        "description": "Verifica el formato y tamaño de la imagen"
      },
      "resendEmail": {
        "title": "Error al enviar email",
        "description": "No se pudo enviar el email de verificación"
      },
      "emailRateLimit": {
        "title": "Demasiados intentos",
        "description": "Espera unos minutos antes de volver a intentarlo"
      },
      "requestRole": {
        "title": "Error al solicitar rol",
        "description": "No se pudo procesar la solicitud"
      },
      "deleteUser": {
        "title": "Error al eliminar cuenta",
        "description": "No se pudo eliminar la cuenta"
      }
    }
  }
}
```

---

## 📊 Priorización de implementación

| Prioridad | Componente | Razón |
|-----------|------------|-------|
| 🔴 **1** | UserFormDialog | Funcionalidad core, múltiples Server Actions, usuarios la usan constantemente |
| 🟡 **2** | DeleteUserButton | Acción destructiva importante, debe tener feedback claro |
| 🟡 **3** | VerificacionEmailAlert | Importante para verificación de usuarios |
| 🟢 **4** | SolicitudRoleButton | Funcionalidad admin, menos crítica |

---

## ✅ Checklist de implementación

Para cada componente:

- [ ] Importar helpers necesarios (`analyzeError`, `toast`, `getErrorIcon`, `useLocale`, `useTranslations`)
- [ ] Crear función `showErrorToast(error, fallbackKey)`
- [ ] Envolver Server Actions en try/catch
- [ ] Mostrar toast con error analizado
- [ ] Agregar traducciones i18n en 4 idiomas (es, en, ca, de)
- [ ] Decidir si re-lanzar el error o no (según contexto)
- [ ] Testing manual con backend apagado

---

## 🚀 Beneficios esperados

1. **Mejor UX**: Usuario siempre sabe qué pasó cuando algo falla
2. **Consistencia**: Todos los errores se muestran de la misma forma
3. **i18n**: Mensajes en el idioma del usuario
4. **Debuggeable**: Iconos visuales ayudan a identificar tipo de error
5. **Graceful degradation**: Fallback a mensajes predefinidos si analyzeError falla
