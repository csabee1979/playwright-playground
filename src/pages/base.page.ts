import type { Page } from '@playwright/test';

export abstract class BasePage {
  abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async open(): Promise<void> {
    await this.goto(this.path);
  }

  async goto(path: string = this.path): Promise<void> {
    await this.page.goto(path);
  }

  async expectOnPage(): Promise<void> {
    await this.page.waitForURL(`**${this.path}`);
  }
}
