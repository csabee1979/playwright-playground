import type { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base';

export class HeaderComponent extends BaseComponent {
  constructor(page: Page, root: Locator) {
    super(page, root);
  }

  getStartedLink(): Locator {
    return this.root.getByRole('link', { name: 'Get started' });
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink().click();
  }
}
