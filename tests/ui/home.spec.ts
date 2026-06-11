import { test } from '@fixtures/test.fixture';
import { UserBuilder } from '@test-data/builders/user.builder';
import { log } from '@utils/logger';

test.describe('Playwright docs home', () => {
  test('has title', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectTitleContains(/Playwright/);
  });

  test('Card has h3', async ({ homePage }) => {
    await homePage.open();
    await homePage.pathCards.expectPathCardH3Visible();
  });

  test('get started navigates to installation', async ({
    homePage,
    docsInstallationPage,
    seedUsers,
  }) => {
    await test.step('Prepare admin context', () => {
      const admin = new UserBuilder().withEmail(seedUsers[1].email).asAdmin().build();

      log('Prepared admin context', {
        role: admin.role,
        displayName: admin.displayName,
      });
    });

    await homePage.open();
    await homePage.header.clickGetStarted();
    await docsInstallationPage.expectInstallationVisible();
  });
});
