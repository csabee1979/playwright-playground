import type { PlaywrightTestConfig } from '@playwright/test';

type PlaywrightUseOptions = NonNullable<PlaywrightTestConfig['use']>;

export type EnvironmentName = 'local' | 'dev' | 'staging' | 'production';

export interface TestConfig {
  env: EnvironmentName;
  defaultTimeout?: NonNullable<PlaywrightTestConfig['timeout']>;

  playwrightBaseURL: NonNullable<PlaywrightUseOptions['baseURL']>;
  playwrightApiBaseURL?: string;
  leetcodeBaseURL: NonNullable<PlaywrightUseOptions['baseURL']>;
  leetcodeApiBaseURL?: string;
  restfulApiBaseURL: NonNullable<PlaywrightUseOptions['baseURL']>;
  restfulApiApiBaseURL?: string;
  jsonPlaceholderBaseURL: NonNullable<PlaywrightUseOptions['baseURL']>;
  jsonPlaceholderApiBaseURL?: string;

  /** Set via IGNORE_HTTPS_ERRORS=true when behind a TLS-inspecting proxy. */
  ignoreHTTPSErrors?: PlaywrightUseOptions['ignoreHTTPSErrors'];
  screenshot?: PlaywrightUseOptions['screenshot'];
  browserName?: PlaywrightUseOptions['browserName'];
  headless?: PlaywrightUseOptions['headless'];
  actionTimeout: PlaywrightUseOptions['actionTimeout'];
  navigationTimeout: PlaywrightUseOptions['navigationTimeout'];
}
