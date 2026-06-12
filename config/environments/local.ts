import type { TestConfig } from '../types';

export const localConfig: TestConfig = {
  env: 'local',
  defaultTimeout: 15_000,
  playwrightBaseURL: 'https://playwright.dev',
  leetcodeBaseURL: 'https://leetcode.com',
  restfulApiBaseURL: 'https://jsonplaceholder.typicode.com',
  jsonPlaceholderBaseURL: 'https://jsonplaceholder.typicode.com',
  actionTimeout: 10_000,
  navigationTimeout: 15_000,
};
