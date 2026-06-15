import type { TestConfig } from '../types';
import { getRestfulApiConfig } from '../restful-api';

export const localConfig: TestConfig = {
  name: 'local',
  baseURL: 'https://playwright.dev',
  apiBaseURL: 'https://playwright.dev',
  jsonPlaceholderBaseURL: 'https://jsonplaceholder.typicode.com',
  restfulApi: getRestfulApiConfig(),
  defaultTimeout: 30_000,
};
