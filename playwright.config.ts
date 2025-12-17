import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.ts',
  timeout: 90000,
  retries: process.env.CI ? 2 : 1, // Reduced retries for faster feedback
  outputDir: "docs/test-results/artifacts",
  fullyParallel: true, // Run tests in parallel for speed
  
  // Global expect timeout
  expect: {
    timeout: 10000, // Unified timeout
  },
  
  // Automatic server management
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: true, // Reuse dev server if running
    timeout: 120000, // 2min to start
    stdout: 'ignore', // Don't pollute logs
    stderr: 'pipe', // Show only errors
    env: {
      NODE_ENV: 'production',
      // Thirdweb Client ID (public, safe to commit)
      NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || 'ef963e90a058d6e8228ab34d38f50752',
    },
  },
  
  // Configure projects for different test types
  projects: [
    {
      name: 'pw:unit',
      testMatch: /tests\/pw\/unit\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'pw:api',
      testMatch: /tests\/pw\/api\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'pw:component',
      testMatch: /tests\/pw\/component\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'pw:integration',
      testMatch: /tests\/pw\/integration\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'pw:e2e',
      testMatch: /tests\/pw\/e2e\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'pw:performance',
      testMatch: /tests\/pw\/performance\/.*\.spec\.ts/,
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
