import type { TestConfig } from '../types';

export const localConfig: TestConfig = {
  name: 'local',
  baseURL: 'https://playwright.dev',
  apiBaseURL: 'https://playwright.dev',
  defaultTimeout: 30_000,
};
