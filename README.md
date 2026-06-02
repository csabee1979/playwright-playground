# playwright-playground

TypeScript Playwright project with page objects, components, API clients, test data, and environment config.

## Project structure

```
config/                 # Environment-specific URLs and timeouts
src/
  pages/                # Page objects (one per screen/route)
  components/           # Reusable UI fragments
  api/                  # API clients (Playwright APIRequestContext)
  fixtures/             # Custom test fixtures
  test-data/            # JSON fixtures, types, builders
  utils/                # Shared helpers
tests/
  ui/                   # UI specs
  api/                  # API specs
```

## Running tests

```bash
pnpm install
pnpm exec playwright install
pnpm typecheck
pnpm test
```

### Environment

Set `TEST_ENV` to `local`, `staging`, or `production` (default: `local`). Copy `.env.example` to `.env` to override URLs:

```bash
TEST_ENV=staging
BASE_URL=https://your-app.example.com
API_BASE_URL=https://api.your-app.example.com
```

If API tests fail with certificate errors behind a corporate proxy, set `IGNORE_HTTPS_ERRORS=true` locally (CI typically does not need this).

`local` defaults to `https://playwright.dev`. `staging` and `production` require both `BASE_URL` and `API_BASE_URL`.

### Targeted runs

```bash
pnpm exec playwright test tests/ui
pnpm exec playwright test tests/api
pnpm exec playwright test --project=chromium
```

### Allure reports and trends

```bash
pnpm run allure:clean
pnpm test
pnpm run allure:trend
```

`allure:trend` copies the previous report history into fresh results before generating the new report so trend charts are preserved across runs.

## Conventions

| Layer | File pattern | Role |
|-------|----------------|------|
| Page object | `*.page.ts` | Screen-level actions; each page defines `path` + `open()` |
| Component | `*.component.ts` | Shared widgets (header, modal, form) |
| API client | `*.client.ts` | Domain API calls via `APIRequestContext` |
| Spec | `*.spec.ts` | Thin tests using fixtures |

Import the extended `test` / `expect` from `src/fixtures/test.fixture.ts` in all specs.
