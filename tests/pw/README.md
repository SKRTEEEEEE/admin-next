# Playwright Testing Strategy

Este directorio contiene los tests que requieren un servidor en ejecución (Navegador Real). Utilizamos una jerarquía de 4 niveles para optimizar la velocidad y la fiabilidad.

## 1. API Tests (`/api`)
- **Objetivo**: Humo (smoke) del backend.
- **Enfoque**: Peticiones directas a endpoints sin renderizar UI.
- **Backend**: Real.
- **Uso**: Verificar que los contratos de la API siguen vigentes.

## 2. Integración (`/integration`)
- **Objetivo**: Flujos de usuario y lógica de UI compleja.
- **Enfoque**: Navegador real, pero **Backend interceptado/mockeado**.
- **Backend**: Simulado (vía `page.route`).
- **Uso**: Validaciones de formularios, estados de carga, navegación entre páginas sin depender de la red o DB. Muy rápidos y estables.

## 3. E2E - "Test Padre" (`/e2e`)
- **Objetivo**: Sanidad total del sistema (Puntos críticos).
- **Enfoque**: Navegador real con **Backend Real**.
- **Backend**: Real / Staging.
- **Uso**: Probar la "cañería" completa (ej: Login real que guarda en DB real). Solo rutas críticas para evitar lentitud y fragilidad.

## 4. Performance (`/performance`)
- **Objetivo**: Métricas de experiencia de usuario.
- **Enfoque**: Auditorías automáticas (Lighthouse / CWV).
- **Backend**: Producción o Build optimizado.
- **Uso**: Asegurar que no hay regresiones en tiempos de carga (LCP, FID, CLS).

---
## [No `pw:cov`: `nyc` disabled](../../docs/dev/no-pw-cov.md)
### Cobertura de Código
En este directorio **no se mide cobertura de código (NYC)**. 
- La lógica ya está auditada al 100% en Vitest.
- Playwright se centra en la fiabilidad de los flujos, no en estadísticas de líneas.
- Más info en [admin-next/docs/dev/no-pw-cov.md](../../docs/dev/no-pw-cov.md).

## Prioridades
1. **E2E/Smoke - Test Padre (Crítico)**: Es la prioridad absoluta. Debe asegurar que el flujo principal de la app funciona.
- **DEBE tener un jsdoc descriptivo del flujo que se está probando**
- **El jsdoc solo puede ser modificado por el usuario/dev, nunca por un AGENT-CLI**
2. **Integración/Performance (Opcional)**: Métricas de carga para optimizaciones específicas.
3. **API (Opcional)**: Check básico del backend.
4. **E2E/Checks (Opcional)**: Flujos secundarios.

#### ¿Dónde va mi test? -> AGENTS.md
| Si quieres probar... | Usa... |
| :--- | :--- |
| Si un endpoint devuelve 200 | **API** |
| Cómo reacciona la UI a un error 500 | **Integration** |
| Si el Login real guarda el token en la DB | **E2E/Checks** |
| Si una página tarda más de 2s en cargar | **Performance** |

