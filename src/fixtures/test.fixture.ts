import { request as apiRequest, test as base } from '@playwright/test';
import { getConfig } from '@config/index';
import { ExampleApiClient } from '@api/clients/example-api.client';
import { JsonPlaceholderApiClient } from '@api/clients/json-placeholder.client';
import { DocsInstallationPage } from '@pages/docs-installation.page';
import { HomePage } from '@pages/home.page';
import type { TestConfig } from '@config/index';
import users from '@test-data/users.json';
import type { User } from '@test-data/types/user.types';

type TestFixtures = {
  testConfig: TestConfig;
  homePage: HomePage;
  docsInstallationPage: DocsInstallationPage;
  exampleApi: ExampleApiClient;
  jsonPlaceholderApi: JsonPlaceholderApiClient;
  seedUsers: User[];
};

const userRoles: readonly User['role'][] = ['admin', 'user', 'guest'];

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.displayName === 'string' &&
    typeof candidate.role === 'string' &&
    userRoles.includes(candidate.role as User['role'])
  );
}

function parseUsers(value: unknown): User[] {
  if (!Array.isArray(value) || !value.every(isUser)) {
    throw new Error('Invalid user test data. Expected an array of User objects.');
  }
  return value;
}

const seedUsers = parseUsers(users);

export const test = base.extend<TestFixtures>({
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

    await use(
      new JsonPlaceholderApiClient(
        request,
        testConfig,
        testConfig.jsonPlaceholderBaseURL,
      ),
    );
    await request.dispose();
  },

  seedUsers: async ({}, use) => {
    await use(seedUsers);
  },
});

export { expect } from '@playwright/test';
