import { expect, Locator, type Page } from '@playwright/test';
import { BaseComponent } from './base';

export class PathCardsComponent extends BaseComponent {
  constructor(page: Page, root: Locator) {
    super(page, root);
  }

  getFirstPathCard = () => this.root.first();
  getPathCardH3 = () => this.getFirstPathCard().locator('h3');

  async expectPathCardH3Visible(): Promise<void> {
    await expect(this.getPathCardH3()).toBeVisible();
  }
}
