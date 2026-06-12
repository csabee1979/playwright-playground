import {
  request as apiRequest,
  type APIRequestContext,
  type APIResponse,
  type PlaywrightTestConfig,
} from '@playwright/test';
import type { TestConfig } from '@config/index';
import { log } from '@utils/logger';

type PlaywrightUseOptions = NonNullable<PlaywrightTestConfig['use']>;
type BaseURL = NonNullable<PlaywrightUseOptions['baseURL']>;
type ApiRequestContextOptions = Exclude<Parameters<typeof apiRequest.newContext>[0], undefined>;
type PlaywrightRequestOptions = Exclude<Parameters<APIRequestContext['fetch']>[1], undefined>;

export type RequestOptions = Omit<PlaywrightRequestOptions, 'method'>;
export type RequestParams = Exclude<RequestOptions['params'], undefined>;
type HttpMethod = 'GET' | 'POST';
type AcceptableStatusCodes = number | number[];

export abstract class BaseApiClient {
  protected readonly basePath: string = '';

  constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseUrl: BaseURL,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  protected static async createRequestContext(
    testConfig: TestConfig,
    options: ApiRequestContextOptions = {},
  ): Promise<APIRequestContext> {
    const { extraHTTPHeaders, ...requestOptions } = options;

    return apiRequest.newContext({
      ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        ...extraHTTPHeaders,
      },
      ...requestOptions,
    });
  }

  async dispose(): Promise<void> {
    await this.request.dispose();
  }

  protected url(path: string): string {
    const normalizedBasePath = this.normalizePath(this.basePath);
    const normalizedPath = this.normalizePath(path);
    return `${this.baseUrl}${normalizedBasePath}${normalizedPath}`;
  }

  private normalizePath(path: string): string {
    if (!path) {
      return '';
    }

    return path.startsWith('/') ? path : `/${path}`;
  }

  protected async get(
    path: string,
    options?: RequestOptions,
    acceptableStatusCodes?: AcceptableStatusCodes,
  ): Promise<APIResponse> {
    return this.sendRequest('GET', path, options, acceptableStatusCodes);
  }

  protected async post(
    path: string,
    options?: RequestOptions,
    acceptableStatusCodes?: AcceptableStatusCodes,
  ): Promise<APIResponse> {
    return this.sendRequest('POST', path, options, acceptableStatusCodes);
  }

  private async sendRequest(
    method: HttpMethod,
    path: string,
    options: RequestOptions = {},
    acceptableStatusCodes?: AcceptableStatusCodes,
  ): Promise<APIResponse> {
    const url = this.url(path);
    const response = await this.request.fetch(url, { ...options, method });
    const status = response.status();

    log(`Request [${method}] ${url}`, {
      status,
      params: options.params,
      hasBody: options.data !== undefined,
    });

    return this.validateResponse(response, acceptableStatusCodes);
  }

  private async validateResponse(
    response: APIResponse,
    acceptableStatusCodes?: AcceptableStatusCodes,
  ): Promise<APIResponse> {
    const status = response.status();
    const expectedStatuses = Array.isArray(acceptableStatusCodes)
      ? acceptableStatusCodes
      : acceptableStatusCodes !== undefined
        ? [acceptableStatusCodes]
        : undefined;
    const isAcceptable = expectedStatuses ? expectedStatuses.includes(status) : response.ok();

    if (!isAcceptable) {
      const body = await this.getResponseBody(response);
      log('Request failed', { status, body });
      throw new Error(`Request failed with status ${status}. Body: ${JSON.stringify(body)}`);
    }

    return response;
  }

  private async getResponseBody(response: APIResponse): Promise<string | object> {
    const contentType = response.headers()['content-type'] ?? '';

    try {
      if (contentType.includes('application/json')) {
        return (await response.json()) as object;
      }

      return await response.text();
    } catch (error) {
      log('Failed to parse response body, falling back to text', { error });
      return response.text();
    }
  }
}
