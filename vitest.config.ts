import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/vitest/setup.ts'],
    include: [
      'tests/vitest/**/*.test.{ts,tsx}',
      'tests/vitest/**/*.spec.{ts,tsx}',
    ],
    exclude: ['node_modules', 'dist', '.next'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportsDirectory: './docs/coverage/vitest',
      include: [
        'src/**/*.{ts,tsx}',
      ],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        '.next/',
        'src/components/ui/**/*',
        'src/components/ui-ac/**/*',
        'src/lib/i18n/**/*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@log-ui': path.resolve(__dirname, './log-ui-ts'),
    },
  },
});
