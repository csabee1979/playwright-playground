import { getRequiredEnv } from '@config/env';
import { TestConfig } from '@config/types';

export function getDevConfig(): TestConfig {
  const playwrightDocsBaseURL = getRequiredEnv('DEV_PLAYWRIGHT_DOCS_BASE_URL');
  const leetcodeBaseURL = getRequiredEnv('DEV_LEETCODE_BASE_URL');
  const restfulApiBaseURL = getRequiredEnv('DEV_RESTFUL_API_URL');
  const jsonPlaceholderBaseURL = getRequiredEnv('DEV_JSON_PLACEHOLDER_BASE_URL');

  return {
    env: 'dev',
    defaultTimeout: 12_000,
    screenshot: 'on',
    browserName: 'chromium',
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 10_000,

    // Playwright Docs
    playwrightBaseURL: playwrightDocsBaseURL,
    playwrightApiBaseURL: process.env.DEV_PLAYWRIGHT_DOCS_API_URL ?? playwrightDocsBaseURL,
    // Leetcode
    leetcodeBaseURL: leetcodeBaseURL,
    leetcodeApiBaseURL: process.env.DEV_LEETCODE_API_URL ?? leetcodeBaseURL,
    // Restful API
    restfulApiBaseURL: restfulApiBaseURL,
    restfulApiApiBaseURL: process.env.DEV_RESTFUL_API_API_URL ?? restfulApiBaseURL,
    // JSON Placeholder API
    jsonPlaceholderBaseURL: jsonPlaceholderBaseURL,
    jsonPlaceholderApiBaseURL: process.env.DEV_JSON_PLACEHOLDER_API_URL ?? jsonPlaceholderBaseURL,
  };
}
