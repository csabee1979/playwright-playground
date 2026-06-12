import type { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base';

export class HeaderComponent extends BaseComponent {
  // root is optional, default to header locator. We can pass a custom locator if needed.
  constructor(page: Page, root: Locator = page.locator('header')) {
    super(page, root);
  }

  getStartedLink(): Locator {
    return this.root.getByRole('link', { name: 'Get started' });
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink().click();
  }
}
