import type { RestfulApiConfig } from './types';

const DEFAULT_RESTFUL_API_URL = 'https://api.restful-api.dev';

export function getRestfulApiConfig(): RestfulApiConfig {
  return {
    url: process.env.RESTFUL_API_URL ?? DEFAULT_RESTFUL_API_URL,
    apiKey: process.env.RESTFUL_API_KEY ?? '',
  };
}
