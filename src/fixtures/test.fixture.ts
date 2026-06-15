import { mergeTests, request as apiRequest, test as base } from '@playwright/test';
import { getConfig } from '@config/index';
import { ExampleApiClient } from '@api/clients/example-api.client';
import { JsonPlaceholderApiClient } from '@api/clients/json-placeholder.client';
import type { TestConfig } from '@config/index';
import { test as authTest } from './auth.fixture';
import { HomePage } from '@pages/home-page';
import { DocsInstallationPage } from '@pages/docs-installation.page';

type TestFixtures = {
  testConfig: TestConfig;
  homePage: HomePage;
  docsInstallationPage: DocsInstallationPage;
  exampleApi: ExampleApiClient;
  jsonPlaceholderApi: JsonPlaceholderApiClient;
};

const appTest = base.extend<TestFixtures>({
  testConfig: async ({}, use) => {
    await use(getConfig());
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  docsInstallationPage: async ({ page }, use) => {
    await use(new DocsInstallationPage(page));
  },

  exampleApi: async ({ testConfig }, use) => {
    const request = await apiRequest.newContext({
      ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors,
    });

    await use(new ExampleApiClient(request, testConfig));
    await request.dispose();
  },

  jsonPlaceholderApi: async ({ testConfig }, use) => {
    const request = await apiRequest.newContext({
      ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors,
    });

    await use(new JsonPlaceholderApiClient(request, testConfig));
    await request.dispose();
  },
});

export const test = mergeTests(appTest, authTest);

export { expect } from '@playwright/test';
