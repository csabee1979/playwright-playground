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

| Layer       | Pattern                         | Purpose                                                           |
| ----------- | ------------------------------- | ----------------------------------------------------------------- |
| Page object | `src/pages/*.page.ts`           | Screen-level actions and checks (`open()`, assertions, workflows) |
| Component   | `src/components/*.component.ts` | Reusable UI parts (header, modal, form)                           |
| API client  | `src/api/**/*.client.ts`        | Encapsulates API calls using `APIRequestContext`                  |
| Fixtures    | `src/fixtures/*.fixture.ts`     | Shared setup objects (pages, clients, test data)                  |
| Tests       | `tests/**/*.spec.ts`            | Test scenarios only (keep thin and readable)                      |

### Test authoring guidelines

- Always import `test` (and `expect` when needed) from `@fixtures/test.fixture`
- Keep assertions in specs, and page/API interaction logic in page objects or clients
- Use clear test names in business language (what behavior is validated)
- Prefer `test.step()` for multi-step scenarios
- Keep tests independent; do not rely on order

### Example: UI test style

```ts
import { test } from '@fixtures/test.fixture';

test('get started navigates to installation', async ({ homePage, docsInstallationPage }) => {
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

## Developer tooling

This project enforces code quality locally through Git hooks (Husky), ESLint, and Prettier.
Playwright tests run in GitHub Actions on every push and pull request.

### Husky (Git hooks)

[Husky](https://typicode.github.io/husky/) runs scripts automatically at Git lifecycle events.
This repo uses a **pre-commit** hook so checks run before each commit is created.

#### Installation

Husky is installed as a dev dependency and wired through the `prepare` script in `package.json`:

```json
"scripts": {
  "prepare": "husky"
}
```

When you run `pnpm install`, `prepare` runs and registers the hooks from the `.husky/` folder.
No extra setup is needed after a fresh clone.

#### Pre-commit hook

File: `.husky/pre-commit`

```bash
pnpm typecheck
pnpm lint-staged
```

| Step | Command            | Scope             | What it does                                    |
| ---- | ------------------ | ----------------- | ----------------------------------------------- |
| 1    | `pnpm typecheck`   | Whole project     | Runs `tsc --noEmit` to catch TypeScript errors  |
| 2    | `pnpm lint-staged` | Staged files only | Auto-formats and lints files you are committing |

If either step fails, the commit is blocked. Fix the reported issues and try again.

To skip hooks in exceptional cases (not recommended):

```bash
git commit --no-verify -m "your message"
```

#### lint-staged configuration

`lint-staged` runs commands only on **staged** files, keeping commits fast.
Configuration lives in `package.json`:

```json
"lint-staged": {
  "*.{ts,js,mjs}": [
    "prettier --write",
    "eslint --fix"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ]
}
```

| File pattern           | Tools run (in order)            |
| ---------------------- | ------------------------------- |
| `*.{ts,js,mjs}`        | Prettier write, then ESLint fix |
| `*.{json,md,yml,yaml}` | Prettier write only             |

Prettier runs before ESLint so formatting is settled before lint rules are evaluated.

> **Note:** `lint-staged@15` is used for compatibility with Git 2.29+. If you upgrade Git to 2.32+,
> you can move to `lint-staged@17` in `package.json`.

### ESLint (linter)

[ESLint](https://eslint.org/) catches code-quality and correctness issues.
This project uses the **flat config** format in `eslint.config.mjs`.

#### Stack

| Package                  | Role                                              |
| ------------------------ | ------------------------------------------------- |
| `eslint`                 | Core linter                                       |
| `@eslint/js`             | Base JavaScript recommended rules                 |
| `typescript-eslint`      | TypeScript parser and rules                       |
| `eslint-config-prettier` | Disables ESLint rules that conflict with Prettier |

#### Key configuration

```text
eslint.config.mjs
├── ignores          → node_modules, reports, test output
├── recommended      → @eslint/js + typescript-eslint base rules
├── typed rules      → TypeScript-only, type-aware checks (*.ts)
├── fixture override → allows empty destructuring in Playwright fixtures
└── prettier         → turns off stylistic rules handled by Prettier
```

Notable rules:

- `@typescript-eslint/no-floating-promises` — errors on unhandled promises (important in async tests)
- `no-empty-pattern: off` — allowed in `*.fixture.ts` files because Playwright fixtures may use `async ({}, use)`

#### Commands

```bash
pnpm lint           # check all files
pnpm lint:fix       # auto-fix where possible
```

ESLint checks the whole project. On commit, `lint-staged` runs `eslint --fix` only on staged
TypeScript/JavaScript files.

### Prettier (formatter)

[Prettier](https://prettier.io/) enforces consistent code style (quotes, spacing, line breaks).
It handles formatting; ESLint handles logic and best practices.

#### Configuration

File: `.prettierrc`

| Option          | Value   | Effect                                          |
| --------------- | ------- | ----------------------------------------------- |
| `singleQuote`   | `true`  | Use `'single'` quotes                           |
| `trailingComma` | `"all"` | Trailing commas in multi-line structures        |
| `printWidth`    | `100`   | Wrap lines longer than 100 characters           |
| `semi`          | `true`  | Always use semicolons                           |
| `tabWidth`      | `2`     | 2-space indentation                             |
| `endOfLine`     | `"lf"`  | Unix line endings (pairs with `.gitattributes`) |

#### Ignored paths

File: `.prettierignore` — excludes generated output and dependencies:

- `node_modules/`, `test-results/`, `playwright-report/`, `allure-report/`, `allure-results/`
- `pnpm-lock.yaml` (lockfiles should not be reformatted)

#### Commands

```bash
pnpm format         # write formatting fixes to all files
pnpm format:check   # verify formatting without writing (used in pnpm check)
```

On commit, `lint-staged` runs `prettier --write` on staged files automatically.

### Line endings

File: `.gitattributes`

```gitattributes
* text=auto eol=lf
```

All text files are stored with **LF** line endings in the repository, regardless of the contributor's OS.
Binary files (images, fonts, PDFs) are explicitly marked so Git never alters them.

If you see line-ending warnings on Windows after cloning:

```bash
git add --renormalize .
```

Optionally set locally:

```bash
git config core.autocrlf false
```

### GitHub Actions

File: `.github/workflows/playwright.yml`

The workflow runs Playwright tests in CI and publishes HTML reports to GitHub Pages.

#### Triggers

| Event               | When it runs                     |
| ------------------- | -------------------------------- |
| `push`              | Commits to `main` or `master`    |
| `pull_request`      | PRs targeting `main` or `master` |
| `workflow_dispatch` | Manual run from the Actions tab  |

#### Job: `test`

Runs on `ubuntu-latest` with a 60-minute timeout.

1. **Checkout** repository
2. **Setup Node.js** (LTS)
3. **Install dependencies** — `pnpm install`
4. **Install Playwright browsers** — all browsers by default, or a single browser on manual runs
5. **Run Playwright tests** — `pnpm exec playwright test`
6. **Restore Allure history** from the `gh-pages` branch (for trend charts)
7. **Generate Allure report**
8. **Upload artifacts** — Playwright HTML report and Allure report (retained 30 days)

#### Job: `deploy-report`

Runs after `test` (even if tests fail) and publishes reports to the `gh-pages` branch.

- Copies Playwright and Allure reports into dated folders (`YYYY-MM-DD-<run_id>`)
- Updates `reports/latest/` and `allure/latest/` symlinks (copies)
- Prunes reports older than 5 days
- Adds links to the GitHub Actions job summary

#### Manual run options (`workflow_dispatch`)

| Input           | Options                                | Default    |
| --------------- | -------------------------------------- | ---------- |
| `browser`       | `all`, `chromium`, `firefox`, `webkit` | `chromium` |
| `test_filter`   | Optional Playwright `--grep` pattern   | (empty)    |
| `deploy_report` | Publish to GitHub Pages                | `true`     |

#### Local vs CI checks

| Check                       | Pre-commit (Husky) | GitHub Actions |
| --------------------------- | ------------------ | -------------- |
| TypeScript (`tsc --noEmit`) | Yes                | No             |
| ESLint                      | Yes (staged files) | No             |
| Prettier                    | Yes (staged files) | No             |
| Playwright tests            | No                 | Yes            |

Run the full local validation suite before pushing:

```bash
pnpm run check   # typecheck + lint + format:check + test
```

## Recommended daily commands

```bash
pnpm typecheck
pnpm lint
pnpm format:check
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
