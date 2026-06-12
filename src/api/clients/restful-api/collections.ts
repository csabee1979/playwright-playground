import type { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseRestfulApiClient } from './base-restful-api-client';
import { TestConfig } from '@config/types';

export class CollectionsClient extends BaseRestfulApiClient {
  protected readonly basePath = '/collections';

  private constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  static async create(testConfig: TestConfig): Promise<CollectionsClient> {
    const request = await this.createRestfulApiRequestContext(testConfig);
    const baseUrl = testConfig.restfulApiApiBaseURL ?? testConfig.restfulApiBaseURL;
    return new CollectionsClient(request, baseUrl);
  }

  getCollections(): Promise<APIResponse> {
    return this.get('', { params: { 'auth-type': 'jwt' } });
  }
}
