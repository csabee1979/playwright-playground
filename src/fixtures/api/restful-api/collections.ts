import { CollectionsClient } from '@api/clients/restful-api/collections';
import { baseFixture } from '@fixtures/base-fixture';

type TestFixtures = {
  collectionsClient: CollectionsClient;
};

export const collectionsFixture = baseFixture.extend<TestFixtures>({
  collectionsClient: async ({ testConfig }, use) => {
    const collectionsClient = await CollectionsClient.create(testConfig);
    await use(collectionsClient);
    await collectionsClient.dispose();
  },
});
