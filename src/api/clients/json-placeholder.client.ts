import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { TestConfig } from '@config/index';
import { BaseApiClient } from '../base-api.client';

export class JsonPlaceholderApiClient extends BaseApiClient {
  constructor(
    request: APIRequestContext,
    testConfig: TestConfig,
    baseURL: string,
  ) {
    super(request, testConfig, { baseURL });
  }

  /** GET /posts/{id} */
  getPost(postId: number): Promise<APIResponse> {
    return this.get(`/posts/${postId}`);
  }
}
