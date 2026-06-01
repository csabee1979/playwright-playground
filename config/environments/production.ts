import { getRequiredEnv } from '../env';
import type { TestConfig } from '../types';

export function getProductionConfig(): TestConfig {
  return {
    name: 'production',
    baseURL: getRequiredEnv('BASE_URL'),
    apiBaseURL: getRequiredEnv('API_BASE_URL'),
    defaultTimeout: 30_000,
  };
}
