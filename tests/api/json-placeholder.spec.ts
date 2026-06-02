import { expect, test } from '@fixtures/test.fixture';

test.describe('JSONPlaceholder API', () => {
  test('can fetch a sample post', async ({
    jsonPlaceholderApi,
  }) => {
    const response = await jsonPlaceholderApi.getPost(1);
    expect(response.ok()).toBeTruthy();

    const body = (await response.json()) as { id?: number; title?: string };
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
  });
});
