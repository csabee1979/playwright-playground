import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { TestConfig } from '@config/index';

export abstract class BaseApiClient {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly config: TestConfig,
  ) {}

  protected url(path: string): string {
    const base = this.config.apiBaseURL.replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
  }

  protected async get(path: string): Promise<APIResponse> {
    return this.request.get(this.url(path));
  }

  protected async post(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(this.url(path), { data });
  }
}
