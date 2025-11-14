const fs = require('fs');
const path = require('path');

const THRESHOLDS = {
  performance: 0.90,
  accessibility: 0.95,
  seo: 0.90,
  'best-practices': 0.95,
};

const manifestPath = path.resolve(__dirname, '../docs/lighthouse-reports/perf/manifest.json');

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

if (failed) {
  console.error('\n❌ Performance coverage failed! Some pages are below thresholds.');
  process.exit(1);
} else {
  console.log('\n✅ Performance coverage passed! All pages meet thresholds.');
  process.exit(0);
}
