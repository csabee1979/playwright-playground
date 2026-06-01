import { expect, type Page } from '@playwright/test';
import { SiteHeaderComponent } from '@components/site-header.component';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly path = '/' as const;

  readonly header: SiteHeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new SiteHeaderComponent(page);
  }

  async expectTitleContains(text: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(text);
  }
}
