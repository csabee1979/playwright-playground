import { getEnv } from '@config/env';
import { getConfig } from '@config/index';
import { loginUserRepository } from '@test-data/repositories/login-user.repository';
import { expect, test } from '@fixtures/test.fixture';

const config = getConfig();
const userId = getEnv('RESTFUL_API_USER_ID');
const hasCredentials = Boolean(
  config.restfulApi.apiKey && userId && loginUserRepository.findById(userId),
);

test.describe('restful-api.dev authenticated API', () => {
  test.skip(
    !hasCredentials,
    'Missing RESTFUL_API_KEY or user login credentials (RESTFUL_API_USER_ID, RESTFUL_API_USER_NAME, RESTFUL_API_USER_EMAIL, RESTFUL_API_USER_PASSWORD).',
  );

  test('lists collections as user with worker-cached auth state', async ({ restfulApiAsUser }) => {
    const response = await restfulApiAsUser.listCollections();
    expect(response.ok()).toBeTruthy();

    const body = (await response.json()) as unknown;
    expect(Array.isArray(body)).toBeTruthy();
  });
});
