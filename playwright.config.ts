import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.ts',
  timeout: 30000,
  retries: process.env.CI ? 3 : 2, // More retries in CI
  outputDir: "docs/test-results/artifacts",
  
  // Global expect timeout
  expect: {
    timeout: process.env.CI ? 10000 : 5000, // Longer timeout in CI
  },
  
  // Configure projects for different test types
  projects: [
    {
      name: 'unit',
      testMatch: /tests\/unit\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'component',
      testMatch: /tests\/component\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'pages',
      testMatch: /tests\/pages\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'integration',
      testMatch: /tests\/integration\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'e2e',
      testMatch: /tests\/e2e\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'performance',
      testMatch: /tests\/performance\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
      timeout: 90000, // Performance tests need more time (90s)
    },
  ],
  
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  
  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'docs/test-results/html-report' }],
    ['json', { outputFile: 'docs/test-results/test-results.json' }],
  ],
});
