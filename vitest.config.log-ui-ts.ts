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
      'log-ui-ts/tests/vitest/**/*.{test,spec}.{ts,tsx}'
    ],
    exclude: ['node_modules', 'dist', '.next'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportsDirectory: './docs/coverage/log-ui-ts',
      include: [
        'log-ui-ts/**/*.{ts,tsx}'
      ],
      exclude: [
        'node_modules/',
        'log-ui-ts/tests/', // Exclude tests from coverage calculation
        '**/*.d.ts',
        '**/*.config.*',
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
