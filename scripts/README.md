# Scripts del Proyecto

Este directorio contiene scripts de utilidad para el proyecto `admin-next`.

## 📊 Scripts de Performance (Lighthouse)

### `check-perf-thresholds.js`

**Propósito:** Valida que los reportes de Lighthouse cumplan con los thresholds mínimos y **actualiza automáticamente los badges** en `docs/badges/`.

**Uso:**
```bash
npm run perf:check
```

**Funcionamiento:**
1. Lee los reportes de Lighthouse desde `docs/lighthouse-reports/perf/manifest.json`
2. Valida que cada página cumpla los thresholds mínimos:
   - Performance: ≥40%
   - Accessibility: ≥80%
   - SEO: ≥80%
   - Best Practices: ≥80%
3. Calcula el promedio de scores de todas las páginas auditadas
4. **Genera/actualiza badges** en `docs/badges/`:
   - `perf.json` (performance)
   - `acc.json` (accessibility)
   - `seo.json` (SEO)
   - `bp.json` (best practices)
5. Muestra un resumen de performance por página
6. Sale con código 0 si todo está OK, o código 1 si alguna página no cumple

**Salida esperada:**
```
✅ performance: 45% >= 40%
✅ accessibility: 94% >= 80%
✅ seo: 92% >= 80%
✅ best-practices: 100% >= 80%

📊 Performance Coverage Summary:
http://localhost:3000/es:
  performance: 45%
  accessibility: 94%
  seo: 92%
  best-practices: 100%

🎨 Generando badges de Lighthouse...
✅ perf.json: 45% (orange)
✅ acc.json: 94% (brightgreen)
✅ seo.json: 92% (brightgreen)
✅ bp.json: 100% (brightgreen)

✨ Badges de Lighthouse actualizados exitosamente!
```

---

### `generate-lighthouse-badges.js`

**Propósito:** Genera badges de Lighthouse en formato Shields.io Endpoint (JSON).

**Uso:**
```bash
# Automático (recomendado)
npm run perf:check

# Manual
node scripts/generate-lighthouse-badges.js
```

**Funcionamiento:**
1. Lee los reportes de Lighthouse desde `docs/lighthouse-reports/perf/manifest.json`
2. Calcula el promedio de scores de todas las páginas auditadas
3. Genera badges en formato JSON (Shields.io Endpoint) en `docs/badges/`:
   - `perf.json` (performance)
   - `acc.json` (accessibility)
   - `seo.json` (SEO)
   - `bp.json` (best practices)

**Colores de badges:**
- 🟢 `brightgreen` (90-100%) - Excelente
- 🟢 `green` (80-89%) - Bueno
- 🟡 `yellow` (60-79%) - Aceptable
- 🟠 `orange` (40-59%) - Necesita mejoras
- 🔴 `red` (<40%) - Crítico

**Formato de badge generado (ejemplo):**
```json
{
  "schemaVersion": 1,
  "label": "performance",
  "message": "45%",
  "color": "orange"
}
```

**Nota:** Si no existen reportes de Lighthouse, el script generará badges en estado "pending" (color `lightgrey`).

---

## 📝 Notas

- **Prerequisito:** Antes de ejecutar `perf:check`, asegúrate de tener reportes de Lighthouse generados con `npm run perf`.
- **Automatización:** El script `check-perf-thresholds.js` **ya incluye** la generación de badges, por lo que no es necesario ejecutar `generate-lighthouse-badges.js` manualmente.
- **CI/CD:** Estos scripts se pueden integrar fácilmente en workflows de GitHub Actions para validación automática en pull requests.

---

## 🚀 Flujo Completo Recomendado

```bash
# 1. Genera reportes de Lighthouse (requiere build + start del servidor)
npm run perf

# 2. Valida thresholds y actualiza badges automáticamente
npm run perf:check

# 3. (Opcional) Commit de badges actualizados
git add docs/badges/*.json
git commit -m "chore: update lighthouse badges"
```
