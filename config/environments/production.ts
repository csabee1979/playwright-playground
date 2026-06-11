import { getRequiredEnv } from '../env';
import type { TestConfig } from '../types';
import { getRestfulApiConfig } from '../restful-api';

export function getProductionConfig(): TestConfig {
  return {
    name: 'production',
    baseURL: getRequiredEnv('BASE_URL'),
    apiBaseURL: getRequiredEnv('API_BASE_URL'),
    jsonPlaceholderBaseURL: getRequiredEnv('JSON_PLACEHOLDER_BASE_URL'),
    restfulApi: getRestfulApiConfig(),
    defaultTimeout: 30_000,
  };
}
