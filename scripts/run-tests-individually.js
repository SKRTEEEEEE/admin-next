#!/usr/bin/env node

/**
 * Script para ejecutar tests individuales de Playwright
 * Ejecuta tests que fallaban según el documento de la tarea
 */

const { execSync } = require('child_process');

const tests = [
  // Component tests
  { name: 'admin-components', path: 'tests/component/admin-components.spec.ts', project: 'component' },
  { name: 'admin-hero', path: 'tests/component/admin-hero.spec.ts', project: 'component' },
  { name: 'admin-theming', path: 'tests/component/admin-theming.spec.ts', project: 'component' },
  { name: 'mode-toggle', path: 'tests/component/mode-toggle.spec.ts', project: 'component' },
  { name: 'navbar', path: 'tests/component/navbar.spec.ts', project: 'component' },
  
  // Pages tests
  { name: 'portafolio', path: 'tests/pages/portafolio.spec.ts', project: 'pages' },
  
  // Integration tests
  { name: 'accessibility', path: 'tests/integration/accessibility.spec.ts', project: 'integration' },
  { name: 'proyectos-id', path: 'tests/integration/pages/proyectos-id.spec.ts', project: 'integration' },
  { name: 'seo-metadata-enhanced', path: 'tests/integration/seo-metadata-enhanced.spec.ts', project: 'integration' },
  { name: 'seo-metadata', path: 'tests/integration/seo-metadata.spec.ts', project: 'integration' },
  { name: 'usecases', path: 'tests/integration/usecases.spec.ts', project: 'integration' },
];

const results = {
  passed: [],
  failed: [],
  skipped: []
};

console.log('🧪 Ejecutando tests individuales...\n');

for (const test of tests) {
  try {
    console.log(`▶️  Ejecutando: ${test.name} (${test.project})...`);
    
    const command = `npx playwright test ${test.path} --project=${test.project}`;
    execSync(command, { 
      stdio: 'inherit',
      cwd: __dirname 
    });
    
    results.passed.push(test.name);
    console.log(`✅ PASÓ: ${test.name}\n`);
  } catch (error) {
    results.failed.push(test.name);
    console.log(`❌ FALLÓ: ${test.name}\n`);
  }
}

// Resumen
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE TESTS');
console.log('='.repeat(60));
console.log(`✅ Pasaron: ${results.passed.length}`);
results.passed.forEach(name => console.log(`   - ${name}`));
console.log(`\n❌ Fallaron: ${results.failed.length}`);
results.failed.forEach(name => console.log(`   - ${name}`));
console.log('='.repeat(60));

process.exit(results.failed.length > 0 ? 1 : 0);
