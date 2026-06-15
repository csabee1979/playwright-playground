import type { RestfulApiConfig } from './types';

const DEFAULT_RESTFUL_API_URL = 'https://api.restful-api.dev';
const DEFAULT_TOKEN_EXPIRY_BUFFER_MS = 60_000;

export function getRestfulApiConfig(): RestfulApiConfig {
  const tokenExpiryBufferMs = process.env.RESTFUL_API_TOKEN_EXPIRY_BUFFER_MS
    ? Number(process.env.RESTFUL_API_TOKEN_EXPIRY_BUFFER_MS)
    : DEFAULT_TOKEN_EXPIRY_BUFFER_MS;

  return {
    url: process.env.RESTFUL_API_URL ?? DEFAULT_RESTFUL_API_URL,
    apiKey: process.env.RESTFUL_API_KEY ?? '',
    tokenExpiryBufferMs,
  };
}
