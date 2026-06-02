import type { TestConfig } from '../types';

export const localConfig: TestConfig = {
  name: 'local',
  baseURL: 'https://playwright.dev',
  apiBaseURL: 'https://playwright.dev',
  jsonPlaceholderBaseURL: 'https://jsonplaceholder.typicode.com',
  defaultTimeout: 30_000,
};
