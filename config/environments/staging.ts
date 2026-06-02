import { getRequiredEnv } from '../env';
import type { TestConfig } from '../types';

export function getStagingConfig(): TestConfig {
  return {
    name: 'staging',
    baseURL: getRequiredEnv('BASE_URL'),
    apiBaseURL: getRequiredEnv('API_BASE_URL'),
    jsonPlaceholderBaseURL: getRequiredEnv('JSON_PLACEHOLDER_BASE_URL'),
    defaultTimeout: 30_000,
  };
}
