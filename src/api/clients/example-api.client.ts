import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from '../base-api.client';

export class ExampleApiClient extends BaseApiClient {
  /** GET / — smoke check that the configured API base is reachable. */
  healthCheck(): Promise<APIResponse> {
    return this.get('/');
  }
}
