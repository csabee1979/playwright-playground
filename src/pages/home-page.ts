import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '@components/header-component';
import { PathCardsComponent } from '@components/path-cards-component';

export class HomePage extends BasePage {
  readonly path = '/' as const;

  readonly header: HeaderComponent;
  readonly pathCards: PathCardsComponent;

  constructor(protected readonly page: Page) {
    super(page);
    this.header = new HeaderComponent(page, page.locator('header'));
    this.pathCards = new PathCardsComponent(page, page.locator('.pathCard_fFQW'));
  }

  async expectTitleContains(text: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(text);
  }
}
