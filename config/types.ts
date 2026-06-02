export type EnvironmentName = 'local' | 'dev' | 'staging' | 'production';

export interface TestConfig {
  name: EnvironmentName;
  baseURL: string;
  apiBaseURL: string;
  defaultTimeout: number;
  /** Set via IGNORE_HTTPS_ERRORS=true when behind a TLS-inspecting proxy. */
  ignoreHTTPSErrors?: boolean;
}
