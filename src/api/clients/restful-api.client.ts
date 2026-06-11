import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { TestConfig } from '@config/index';
import { BaseApiClient } from '../base-api.client';

function withJwtAuth(path: string): string {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}auth-type=jwt`;
}

export class RestfulApiClient extends BaseApiClient {
  constructor(request: APIRequestContext, testConfig: TestConfig) {
    super(request, testConfig, { baseURL: testConfig.restfulApi.url });
  }

  /** GET /collections?auth-type=jwt */
  listCollections(): Promise<APIResponse> {
    return this.get(withJwtAuth('/collections'));
  }

  /** GET /collections/{collectionName}/objects?auth-type=jwt */
  listCollectionObjects(collectionName: string): Promise<APIResponse> {
    return this.get(withJwtAuth(`/collections/${encodeURIComponent(collectionName)}/objects`));
  }
}
