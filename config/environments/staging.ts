import { getRequiredEnv } from '../env';
import type { TestConfig } from '../types';

export function getStagingConfig(): TestConfig {
  const playwrightDocsBaseURL = getRequiredEnv('STAGING_PLAYWRIGHT_DOCS_BASE_URL');
  const leetcodeBaseURL = getRequiredEnv('STAGING_LEETCODE_BASE_URL');
  const restfulApiBaseURL = getRequiredEnv('STAGING_RESTFUL_API_URL');
  const jsonPlaceholderBaseURL = getRequiredEnv('STAGING_JSON_PLACEHOLDER_BASE_URL');

  return {
    env: 'staging',
    defaultTimeout: 30_000,
    screenshot: 'on',
    browserName: 'chromium',
    headless: true,
    actionTimeout: 20_000,
    navigationTimeout: 30_000,

    // Playwright Docs
    playwrightBaseURL: playwrightDocsBaseURL,
    playwrightApiBaseURL: process.env.STAGING_PLAYWRIGHT_DOCS_API_URL ?? playwrightDocsBaseURL,
    // Leetcode
    leetcodeBaseURL: leetcodeBaseURL,
    leetcodeApiBaseURL: process.env.STAGING_LEETCODE_API_URL ?? leetcodeBaseURL,
    // Restful API
    restfulApiBaseURL: restfulApiBaseURL,
    restfulApiApiBaseURL: process.env.STAGING_RESTFUL_API_API_URL ?? restfulApiBaseURL,
    // JSON Placeholder API
    jsonPlaceholderBaseURL: jsonPlaceholderBaseURL,
    jsonPlaceholderApiBaseURL:
      process.env.STAGING_JSON_PLACEHOLDER_API_URL ?? jsonPlaceholderBaseURL,
  };
}
