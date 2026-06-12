import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { TestConfig } from '@config/index';
import { BaseApiClient } from '../base-api.client';

export class JsonPlaceholderApiClient extends BaseApiClient {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  static async create(testConfig: TestConfig): Promise<JsonPlaceholderApiClient> {
    const baseUrl = testConfig.jsonPlaceholderApiBaseURL ?? testConfig.jsonPlaceholderBaseURL;
    const request = await this.createRequestContext(testConfig);

    return new JsonPlaceholderApiClient(request, baseUrl);
  }

  /** GET /posts/{id} */
  getPost(postId: number): Promise<APIResponse> {
    return this.get(`/posts/${postId}`);
  }
}
