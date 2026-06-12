# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/restful-api/restful-api.spec.ts >> Restful API tests >> can fetch collections
- Location: tests/api/restful-api/restful-api.spec.ts:5:7

# Error details

```
Error: Request failed with status 404. Body: {}
```

# Test source

```ts
  14  | 
  15  | export type RequestOptions = Omit<PlaywrightRequestOptions, 'method'>;
  16  | export type RequestParams = Exclude<RequestOptions['params'], undefined>;
  17  | type HttpMethod = 'GET' | 'POST';
  18  | type AcceptableStatusCodes = number | number[];
  19  | 
  20  | export abstract class BaseApiClient {
  21  |   protected readonly basePath: string = '';
  22  | 
  23  |   constructor(
  24  |     protected readonly request: APIRequestContext,
  25  |     protected readonly baseUrl: BaseURL,
  26  |   ) {
  27  |     this.baseUrl = baseUrl.replace(/\/$/, '');
  28  |   }
  29  | 
  30  |   protected static async createRequestContext(
  31  |     testConfig: TestConfig,
  32  |     options: ApiRequestContextOptions = {},
  33  |   ): Promise<APIRequestContext> {
  34  |     const { extraHTTPHeaders, ...requestOptions } = options;
  35  | 
  36  |     return apiRequest.newContext({
  37  |       ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors,
  38  |       extraHTTPHeaders: {
  39  |         'Content-Type': 'application/json',
  40  |         ...extraHTTPHeaders,
  41  |       },
  42  |       ...requestOptions,
  43  |     });
  44  |   }
  45  | 
  46  |   async dispose(): Promise<void> {
  47  |     await this.request.dispose();
  48  |   }
  49  | 
  50  |   protected url(path: string): string {
  51  |     const normalizedBasePath = this.normalizePath(this.basePath);
  52  |     const normalizedPath = this.normalizePath(path);
  53  |     return `${this.baseUrl}${normalizedBasePath}${normalizedPath}`;
  54  |   }
  55  | 
  56  |   private normalizePath(path: string): string {
  57  |     if (!path) {
  58  |       return '';
  59  |     }
  60  | 
  61  |     return path.startsWith('/') ? path : `/${path}`;
  62  |   }
  63  | 
  64  |   protected async get(
  65  |     path: string,
  66  |     options?: RequestOptions,
  67  |     acceptableStatusCodes?: AcceptableStatusCodes,
  68  |   ): Promise<APIResponse> {
  69  |     return this.sendRequest('GET', path, options, acceptableStatusCodes);
  70  |   }
  71  | 
  72  |   protected async post(
  73  |     path: string,
  74  |     options?: RequestOptions,
  75  |     acceptableStatusCodes?: AcceptableStatusCodes,
  76  |   ): Promise<APIResponse> {
  77  |     return this.sendRequest('POST', path, options, acceptableStatusCodes);
  78  |   }
  79  | 
  80  |   private async sendRequest(
  81  |     method: HttpMethod,
  82  |     path: string,
  83  |     options: RequestOptions = {},
  84  |     acceptableStatusCodes?: AcceptableStatusCodes,
  85  |   ): Promise<APIResponse> {
  86  |     const url = this.url(path);
  87  |     const response = await this.request.fetch(url, { ...options, method });
  88  |     const status = response.status();
  89  | 
  90  |     log(`Request [${method}] ${url}`, {
  91  |       status,
  92  |       params: options.params,
  93  |       hasBody: options.data !== undefined,
  94  |     });
  95  | 
  96  |     return this.validateResponse(response, acceptableStatusCodes);
  97  |   }
  98  | 
  99  |   private async validateResponse(
  100 |     response: APIResponse,
  101 |     acceptableStatusCodes?: AcceptableStatusCodes,
  102 |   ): Promise<APIResponse> {
  103 |     const status = response.status();
  104 |     const expectedStatuses = Array.isArray(acceptableStatusCodes)
  105 |       ? acceptableStatusCodes
  106 |       : acceptableStatusCodes !== undefined
  107 |         ? [acceptableStatusCodes]
  108 |         : undefined;
  109 |     const isAcceptable = expectedStatuses ? expectedStatuses.includes(status) : response.ok();
  110 | 
  111 |     if (!isAcceptable) {
  112 |       const body = await this.getResponseBody(response);
  113 |       log('Request failed', { status, body });
> 114 |       throw new Error(`Request failed with status ${status}. Body: ${JSON.stringify(body)}`);
      |             ^ Error: Request failed with status 404. Body: {}
  115 |     }
  116 | 
  117 |     return response;
  118 |   }
  119 | 
  120 |   private async getResponseBody(response: APIResponse): Promise<string | object> {
  121 |     const contentType = response.headers()['content-type'] ?? '';
  122 | 
  123 |     try {
  124 |       if (contentType.includes('application/json')) {
  125 |         return (await response.json()) as object;
  126 |       }
  127 | 
  128 |       return await response.text();
  129 |     } catch (error) {
  130 |       log('Failed to parse response body, falling back to text', { error });
  131 |       return response.text();
  132 |     }
  133 |   }
  134 | }
  135 | 
```