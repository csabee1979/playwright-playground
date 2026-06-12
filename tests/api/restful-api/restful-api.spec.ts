import { expect } from '@playwright/test';
import { collectionsFixture as test } from '@fixtures/api/restful-api/collections';

test.describe('Restful API tests', () => {
  test('can fetch collections', async ({ collectionsClient }) => {
    console.log(process.env.DEV_RESTFUL_API_X_API_KEY);
    const response = await collectionsClient.getCollections();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });
});
