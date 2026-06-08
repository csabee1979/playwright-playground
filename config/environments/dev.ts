import { getRequiredEnv } from '@config/env';
import type { TestConfig } from '../types';

export function getDevConfig(): TestConfig {
  return {
    name: 'dev',
    baseURL: getRequiredEnv('BASE_URL'),
    apiBaseURL: getRequiredEnv('API_BASE_URL'),
    jsonPlaceholderBaseURL: getRequiredEnv('JSON_PLACEHOLDER_BASE_URL'),
    defaultTimeout: 30_000,
  };
}
