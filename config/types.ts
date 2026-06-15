export type EnvironmentName = 'local' | 'dev' | 'staging' | 'production';

export interface RestfulApiConfig {
  url: string;
  apiKey: string;
  tokenExpiryBufferMs: number;
}

export interface TestConfig {
  name: EnvironmentName;
  baseURL: string;
  apiBaseURL: string;
  jsonPlaceholderBaseURL: string;
  restfulApi: RestfulApiConfig;
  defaultTimeout: number;
  /** Set via IGNORE_HTTPS_ERRORS=true when behind a TLS-inspecting proxy. */
  ignoreHTTPSErrors?: boolean;
}
