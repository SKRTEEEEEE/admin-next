const fs = require('fs');
const path = require('path');

/**
 * Genera badges de Lighthouse en formato Shields.io Endpoint
 * Basado en los reportes generados por `npm run perf`
 * 
 * USO:
 * - Este script se ejecuta automáticamente al hacer `npm run perf:check`
 * - También se puede ejecutar manualmente: `node scripts/generate-lighthouse-badges.js`
 * - Requiere que existan reportes de Lighthouse en `docs/lighthouse-reports/perf/manifest.json`
 * 
 * SALIDA:
 * - Genera/actualiza badges en `docs/badges/`:
 *   - perf.json (performance)
 *   - acc.json (accessibility)
 *   - seo.json (SEO)
 *   - bp.json (best practices)
 */

const BADGES_DIR = path.resolve(__dirname, '../docs/badges');
const MANIFEST_PATH = path.resolve(__dirname, '../docs/lighthouse-reports/perf/manifest.json');

// Mapeo de categorías a archivos de badge
const BADGE_FILES = {
  performance: 'perf.json',
  accessibility: 'acc.json',
  seo: 'seo.json',
  'best-practices': 'bp.json',
};

/**
 * Determina el color del badge según el score
 * @param {number} score - Score de 0 a 1
 * @returns {string} - Color del badge (brightgreen, green, yellow, orange, red)
 */
function getBadgeColor(score) {
  if (score >= 0.9) return 'brightgreen';
  if (score >= 0.8) return 'green';
  if (score >= 0.6) return 'yellow';
  if (score >= 0.4) return 'orange';
  return 'red';
}

/**
 * Crea un badge JSON en formato Shields.io Endpoint
 * @param {string} label - Etiqueta del badge
 * @param {number} score - Score de 0 a 1
 * @returns {object} - Badge en formato JSON
 */
function createBadge(label, score) {
  const percentage = Math.round(score * 100);
  return {
    schemaVersion: 1,
    label,
    message: `${percentage}%`,
    color: getBadgeColor(score),
  };
}

/**
 * Calcula el promedio de scores de todas las páginas auditadas
 * @param {Array} manifest - Array de reportes de Lighthouse
 * @returns {object} - Objeto con promedios por categoría
 */
function calculateAverageScores(manifest) {
  const categories = Object.keys(BADGE_FILES);
  const averages = {};

  categories.forEach(category => {
    let sum = 0;
    let count = 0;

    manifest.forEach(report => {
      const summary = JSON.parse(fs.readFileSync(report.jsonPath, 'utf-8'));
      const score = summary.categories[category]?.score ?? 0;
      sum += score;
      count++;
    });

    averages[category] = count > 0 ? sum / count : 0;
  });

  return averages;
}

/**
 * Genera y guarda los badges de Lighthouse
 */
function generateLighthouseBadges() {
  console.log('🎨 Generando badges de Lighthouse...');

  // Verificar si existe el directorio de badges
  if (!fs.existsSync(BADGES_DIR)) {
    fs.mkdirSync(BADGES_DIR, { recursive: true });
    console.log(`✅ Directorio creado: ${BADGES_DIR}`);
  }

  // Verificar si existe el manifest de Lighthouse
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.warn('⚠️  Lighthouse manifest not found. Generating placeholder badges.');
    
    // Generar badges en estado "pending"
    Object.entries(BADGE_FILES).forEach(([category, filename]) => {
      const badge = {
        schemaVersion: 1,
        label: category,
        message: 'pending',
        color: 'lightgrey',
      };
      const filePath = path.join(BADGES_DIR, filename);
      fs.writeFileSync(filePath, JSON.stringify(badge, null, 2), 'utf-8');
      console.log(`⏳ ${filename}: pending (no report available)`);
    });

    console.log('\nℹ️  Run `npm run perf` to generate Lighthouse reports and update badges.');
    return;
  }

  // Leer manifest de Lighthouse
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));

  if (!manifest || manifest.length === 0) {
    console.error('❌ No Lighthouse reports found in manifest.');
    process.exit(1);
  }

  // Calcular promedios de scores
  const averages = calculateAverageScores(manifest);

  // Generar y guardar badges
  Object.entries(BADGE_FILES).forEach(([category, filename]) => {
    const score = averages[category] || 0;
    const badge = createBadge(category, score);
    const filePath = path.join(BADGES_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(badge, null, 2), 'utf-8');

    const percentage = Math.round(score * 100);
    console.log(`✅ ${filename}: ${percentage}% (${badge.color})`);
  });

  console.log('\n✨ Badges de Lighthouse generados exitosamente!');
  console.log(`📍 Ubicación: ${BADGES_DIR}`);
}

// Ejecutar script
try {
  generateLighthouseBadges();
  process.exit(0);
} catch (error) {
  console.error('❌ Error generando badges de Lighthouse:', error.message);
  process.exit(1);
}
