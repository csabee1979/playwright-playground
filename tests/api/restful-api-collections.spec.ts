import { expect, test } from '@fixtures/test.fixture';

test.describe('restful-api.dev authenticated API', () => {
  test('lists collections as user with worker-cached auth state', async ({ restfulApiAsUser }) => {
    const response = await restfulApiAsUser.listCollections();
    expect(response.ok()).toBeTruthy();

    const body = (await response.json()) as unknown;
    expect(Array.isArray(body)).toBeTruthy();
  });
});
