import { getRequiredEnv } from '../env';
import type { TestConfig } from '../types';

export function getProductionConfig(): TestConfig {
  const playwrightDocsBaseURL = getRequiredEnv('PRODUCTION_PLAYWRIGHT_DOCS_BASE_URL');
  const leetcodeBaseURL = getRequiredEnv('PRODUCTION_LEETCODE_BASE_URL');
  const restfulApiBaseURL = getRequiredEnv('PRODUCTION_RESTFUL_API_URL');
  const jsonPlaceholderBaseURL = getRequiredEnv('PRODUCTION_JSON_PLACEHOLDER_BASE_URL');

  return {
    env: 'production',
    defaultTimeout: 20_000,
    screenshot: 'on',
    browserName: 'chromium',
    headless: true,
    actionTimeout: 15_000,
    navigationTimeout: 20_000,

    // Playwright Docs
    playwrightBaseURL: playwrightDocsBaseURL,
    playwrightApiBaseURL: process.env.PRODUCTION_PLAYWRIGHT_DOCS_API_URL ?? playwrightDocsBaseURL,
    // Leetcode
    leetcodeBaseURL: leetcodeBaseURL,
    leetcodeApiBaseURL: process.env.PRODUCTION_LEETCODE_API_URL ?? leetcodeBaseURL,
    // Restful API
    restfulApiBaseURL: restfulApiBaseURL,
    restfulApiApiBaseURL: process.env.PRODUCTION_RESTFUL_API_API_URL ?? restfulApiBaseURL,
    // JSON Placeholder API
    jsonPlaceholderBaseURL: jsonPlaceholderBaseURL,
    jsonPlaceholderApiBaseURL:
      process.env.PRODUCTION_JSON_PLACEHOLDER_API_URL ?? jsonPlaceholderBaseURL,
  };
}
