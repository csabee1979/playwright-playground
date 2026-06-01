import type { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base.component';

export class SiteHeaderComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, page.locator('nav').first());
  }

  getStartedLink(): Locator {
    return this.page.getByRole('link', { name: 'Get started' });
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink().click();
  }
}
