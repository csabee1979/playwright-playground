import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { TestConfig } from '@config/index';

export type BaseApiClientConfig = {
  baseURL?: string;
};

export abstract class BaseApiClient {
  private readonly baseURL: string;

  constructor(
    protected readonly request: APIRequestContext,
    protected readonly testConfig: TestConfig,
    clientConfig: BaseApiClientConfig = {},
  ) {
    this.baseURL = (clientConfig.baseURL ?? this.testConfig.apiBaseURL).replace(/\/$/, '');
  }

  protected url(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseURL}${normalizedPath}`;
  }

  protected async get(path: string): Promise<APIResponse> {
    return this.request.get(this.url(path));
  }

  protected async post(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(this.url(path), { data });
  }
}
