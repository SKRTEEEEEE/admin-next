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

### ¿Dónde va mi test?
| Si quieres probar... | Usa... |
| :--- | :--- |
| Si un endpoint devuelve 200 | **API** |
| Cómo reacciona la UI a un error 500 | **Integration** |
| Si el Login real guarda el token en la DB | **E2E** |
| Si una página tarda más de 2s en cargar | **Performance** |
