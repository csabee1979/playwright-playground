import { expect, test } from '@fixtures/test.fixture';

test.describe('API smoke', () => {
  test('health check returns success', async ({ exampleApi }) => {
    const response = await exampleApi.healthCheck();
    expect(response.ok()).toBeTruthy();
  });
});
