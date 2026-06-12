import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from '@playwright/test';
import { getConfig } from './config';
import { desktopChromeProject, mobileProject, APIProject } from '@config/playwright-config';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.secrets') });
const testConfig = getConfig();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: testConfig.defaultTimeout ?? 15_000,
  reporter: process.env.CI
    ? [['github'], ['html'], ['allure-playwright', { outputFolder: 'allure-results' }]]
    : [['html'], ['allure-playwright', { outputFolder: 'allure-results' }]],
  use: {
    testIdAttribute: 'id',
    trace:
      (process.env.LOG_LEVEL ?? 'error').toLowerCase() === 'debug' ? 'retain-on-failure' : 'off',
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  // Projects can be configured with extended project-specific use options on top of the common use options.
  projects: [
    desktopChromeProject(
      'playwright-docs-desktop',
      '**/tests/e2e/playwright-docs/**/*.*.ts',
      testConfig.playwrightBaseURL,
    ),
    mobileProject(
      'playwright-docs-mobile',
      '**/tests/e2e/playwright-docs/**/*.*.ts',
      testConfig.playwrightBaseURL,
    ),

    desktopChromeProject(
      'leetcode-desktop',
      '**/tests/e2e/leetcode/**/*.*.ts',
      testConfig.leetcodeBaseURL,
    ),
    mobileProject('leetcode-mobile', '**/tests/e2e/leetcode/**/*.*.ts', testConfig.leetcodeBaseURL),

    APIProject(
      'json-placeholder-api',
      '**/tests/api/json-placeholder/**/*.*.ts',
      testConfig.jsonPlaceholderBaseURL,
    ),

    APIProject('restful-api', '**/tests/api/restful-api/**/*.*.ts', testConfig.restfulApiBaseURL),
  ],
});
