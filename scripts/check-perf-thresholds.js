const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const THRESHOLDS = {
  performance: 0.40,
  accessibility: 0.80,
  seo: 0.80,
  'best-practices': 0.80,
};

const manifestPath = path.resolve(__dirname, '../docs/lighthouse-reports/perf/manifest.json');
const BADGES_DIR = path.resolve(__dirname, '../docs/badges');

// Mapeo de categorías a archivos de badge
const BADGE_FILES = {
  performance: 'perf.json',
  accessibility: 'acc.json',
  seo: 'seo.json',
  'best-practices': 'bp.json',
};

if (!fs.existsSync(manifestPath)) {
  console.warn('⚠️  Lighthouse manifest not found. Skipping performance validation.');
  console.log('ℹ️  Run `npm run perf` to generate Lighthouse reports.');
  console.log('✅ Performance check skipped (no reports available).');
  process.exit(0); // Exit successfully to allow commit
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

if (!manifest || manifest.length === 0) {
  console.error('❌ No Lighthouse reports found in manifest.');
  process.exit(1);
}

let failed = false;
const results = [];

manifest.forEach(report => {
  const summary = JSON.parse(fs.readFileSync(report.jsonPath, 'utf-8'));
  const url = report.url;
  const scores = {};

  Object.entries(THRESHOLDS).forEach(([category, minScore]) => {
    const score = summary.categories[category]?.score ?? 0;
    scores[category] = score;

    if (score < minScore) {
      console.error(`❌ ${category}: ${(score * 100).toFixed(0)}% < ${(minScore * 100).toFixed(0)}% (${url})`);
      failed = true;
    } else {
      console.log(`✅ ${category}: ${(score * 100).toFixed(0)}% >= ${(minScore * 100).toFixed(0)}%`);
    }
  });

  results.push({ url, scores });
});

console.log('\n📊 Performance Coverage Summary:');
results.forEach(({ url, scores }) => {
  console.log(`\n${url}:`);
  Object.entries(scores).forEach(([category, score]) => {
    console.log(`  ${category}: ${(score * 100).toFixed(0)}%`);
  });
});

/**
 * Determina el color del badge según el score
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
 */
function calculateAverageScores() {
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
  console.log('\n🎨 Generando badges de Lighthouse...');

  // Verificar si existe el directorio de badges
  if (!fs.existsSync(BADGES_DIR)) {
    fs.mkdirSync(BADGES_DIR, { recursive: true });
    console.log(`✅ Directorio creado: ${BADGES_DIR}`);
  }

  // Calcular promedios de scores
  const averages = calculateAverageScores();

  // Generar y guardar badges
  Object.entries(BADGE_FILES).forEach(([category, filename]) => {
    const score = averages[category] || 0;
    const badge = createBadge(category, score);
    const filePath = path.join(BADGES_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(badge, null, 2), 'utf-8');

    const percentage = Math.round(score * 100);
    console.log(`✅ ${filename}: ${percentage}% (${badge.color})`);
  });

  console.log('\n✨ Badges de Lighthouse actualizados exitosamente!');
  console.log(`📍 Ubicación: ${BADGES_DIR}`);
}

// Generar badges antes de finalizar
generateLighthouseBadges();

if (failed) {
  console.error('\n❌ Performance coverage failed! Some pages are below thresholds.');
  process.exit(1);
} else {
  console.log('\n✅ Performance coverage passed! All pages meet thresholds.');
  process.exit(0);
}
