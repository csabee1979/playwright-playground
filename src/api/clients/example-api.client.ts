import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { TestConfig } from '@config/index';
import { BaseApiClient } from '../base-api.client';

export class ExampleApiClient extends BaseApiClient {
  constructor(request: APIRequestContext, config: TestConfig) {
    super(request, config);
  }

  /** GET / — smoke check that the configured API base is reachable. */
  healthCheck(): Promise<APIResponse> {
    return this.get('/');
  }
}
