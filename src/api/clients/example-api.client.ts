import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { TestConfig } from '@config/index';
import { BaseApiClient } from '../base-api.client';

export class ExampleApiClient extends BaseApiClient {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  static async create(testConfig: TestConfig): Promise<ExampleApiClient> {
    const baseUrl = testConfig.playwrightApiBaseURL ?? testConfig.playwrightBaseURL;
    const request = await this.createRequestContext(testConfig);

    return new ExampleApiClient(request, baseUrl);
  }

  /** GET / — smoke check that the configured API base is reachable. */
  healthCheck(): Promise<APIResponse> {
    return this.get('/');
  }
}
