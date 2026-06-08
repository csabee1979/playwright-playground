import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { getConfig } from './config';

const testConfig = getConfig();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: testConfig.defaultTimeout,
  reporter: [['html'], ['allure-playwright', { outputFolder: 'allure-results' }]],
  use: {
    baseURL: testConfig.baseURL,
    trace: 'on-first-retry',
    ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12 Pro Max'] },
    },
  ],
});
