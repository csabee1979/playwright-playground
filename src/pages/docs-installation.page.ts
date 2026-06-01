import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DocsInstallationPage extends BasePage {
  /** Direct URL for the Installation docs section (also reachable via Get started). */
  readonly path = '/docs/intro' as const;

  constructor(page: Page) {
    super(page);
  }

  installationHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Installation' });
  }

  async expectInstallationVisible(): Promise<void> {
    await expect(this.installationHeading()).toBeVisible();
  }
}
