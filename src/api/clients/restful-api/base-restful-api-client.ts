import { BaseApiClient } from '@api/base-api.client';
import { TestConfig } from '@config/types';
import { APIRequestContext } from '@playwright/test';

export abstract class BaseRestfulApiClient extends BaseApiClient {
  protected readonly basePath: string = '';

  protected constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  protected static async createRestfulApiRequestContext(
    testConfig: TestConfig,
  ): Promise<APIRequestContext> {
    return this.createRequestContext(testConfig, {
      extraHTTPHeaders: {
        'x-api-key': process.env.DEV_RESTFUL_API_X_API_KEY ?? '',
      },
    });
  }
}
