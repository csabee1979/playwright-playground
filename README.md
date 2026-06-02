# Playwright Playground

Practical Playwright + TypeScript project for contributors.
This repository includes:
- UI tests with page objects and reusable components
- API tests with typed API clients
- Shared fixtures and test data
- Environment-based configuration

## Quick start

### 1) Prerequisites

- Node.js 20+ (LTS recommended)
- `pnpm` installed globally

Install `pnpm` if needed:

```bash
npm install -g pnpm
```

### 2) Install dependencies and browsers

```bash
pnpm install
pnpm exec playwright install
```

### 3) Run tests

```bash
pnpm test
```

Additional run options:

```bash
pnpm run test:ui       # Playwright interactive mode
pnpm run test:headed   # Run tests with browser visible
pnpm exec playwright test tests/ui
pnpm exec playwright test tests/api
```

## Environment setup

Set `TEST_ENV` to `local`, `staging`, or `production` (default: `local`).

1. Copy `.env.example` to `.env`
2. Override values as needed:

```bash
TEST_ENV=staging
BASE_URL=https://your-app.example.com
API_BASE_URL=https://api.your-app.example.com
```

Notes:
- `local` defaults to `https://playwright.dev`
- `staging` and `production` require both `BASE_URL` and `API_BASE_URL`
- If your corporate proxy causes certificate issues, use `IGNORE_HTTPS_ERRORS=true` locally

## Conventions

Use these conventions to keep tests consistent and maintainable across teams.

### Folder and naming conventions

| Layer | Pattern | Purpose |
|---|---|---|
| Page object | `src/pages/*.page.ts` | Screen-level actions and checks (`open()`, assertions, workflows) |
| Component | `src/components/*.component.ts` | Reusable UI parts (header, modal, form) |
| API client | `src/api/**/*.client.ts` | Encapsulates API calls using `APIRequestContext` |
| Fixtures | `src/fixtures/*.fixture.ts` | Shared setup objects (pages, clients, test data) |
| Tests | `tests/**/*.spec.ts` | Test scenarios only (keep thin and readable) |

### Test authoring guidelines

- Always import `test` (and `expect` when needed) from `@fixtures/test.fixture`
- Keep assertions in specs, and page/API interaction logic in page objects or clients
- Use clear test names in business language (what behavior is validated)
- Prefer `test.step()` for multi-step scenarios
- Keep tests independent; do not rely on order

### Example: UI test style

```ts
import { test } from '@fixtures/test.fixture';

test('get started navigates to installation', async ({
  homePage,
  docsInstallationPage,
}) => {
  await homePage.open();
  await homePage.header.clickGetStarted();
  await docsInstallationPage.expectInstallationVisible();
});
```

### Example: API test style

```ts
import { expect, test } from '@fixtures/test.fixture';

test('health check returns success', async ({ exampleApi }) => {
  const response = await exampleApi.healthCheck();
  expect(response.ok()).toBeTruthy();
});
```

## Recommended daily commands

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm run check
```

## Reports (Allure)

```bash
pnpm run allure:clean
pnpm test
pnpm run allure:trend
```

`allure:trend` keeps history so trend charts stay visible across runs.

## Common issues

- **`pnpm: command not found`**: install pnpm globally (`npm i -g pnpm`)
- **Browser executable missing**: run `pnpm exec playwright install`
- **Environment URL errors**: check `.env` values for `BASE_URL` and `API_BASE_URL`
- **SSL/proxy failures in API tests**: try `IGNORE_HTTPS_ERRORS=true` locally
