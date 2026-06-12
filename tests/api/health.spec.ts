import { expect } from '@playwright/test';
import { test } from '@fixtures/e2e/test.fixture';

test.describe('API smoke', () => {
  test('health check returns success', async ({ exampleApi }) => {
    const response = await exampleApi.healthCheck();
    expect(response.ok()).toBeTruthy();
  });
});
