import { localConfig } from './environments/local';
import { getProductionConfig } from './environments/production';
import { getStagingConfig } from './environments/staging';
import type { EnvironmentName, TestConfig } from './types';

const configFactories: Record<EnvironmentName, () => TestConfig> = {
  local: () => localConfig,
  staging: getStagingConfig,
  production: getProductionConfig,
};

function resolveEnvironment(): EnvironmentName {
  const env = process.env.TEST_ENV ?? 'local';
  if (env in configFactories) {
    return env as EnvironmentName;
  }
  throw new Error(
    `Unknown TEST_ENV "${env}". Expected one of: ${Object.keys(configFactories).join(', ')}`,
  );
}

export function getConfig(): TestConfig {
  const config = configFactories[resolveEnvironment()]();
  if (process.env.IGNORE_HTTPS_ERRORS === 'true') {
    return { ...config, ignoreHTTPSErrors: true };
  }
  return config;
}

export type { EnvironmentName, TestConfig };
