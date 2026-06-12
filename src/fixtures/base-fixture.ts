import { test as base } from '@playwright/test';
import { getConfig } from '@config/index';
import type { TestConfig } from '@config/index';

type BaseFixtures = {
  testConfig: TestConfig;
};

export const baseFixture = base.extend<BaseFixtures>({
  testConfig: async ({}, use) => {
    await use(getConfig());
  },
});
