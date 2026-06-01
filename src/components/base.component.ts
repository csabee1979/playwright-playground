import type { Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
  readonly root: Locator;

  constructor(
    protected readonly page: Page,
    root: Locator,
  ) {
    this.root = root;
  }
}
