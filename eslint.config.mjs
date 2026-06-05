import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/allure-results/**',
      '**/allure-report/**',
      '**/test-results/**',
      '**/playwright-report/**',
      '**/.history/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Typed rules (like no-floating-promises) must run only on TS files.
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        // Use TypeScript Project Service for type-aware lint rules.
        projectService: true,
        // Resolve tsconfig relative to this config file directory.
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    files: ['**/fixtures/**/*.ts', '**/*.fixture.ts'],
    rules: {
      // Playwright fixtures with no dependencies use `async ({}, use)`.
      'no-empty-pattern': 'off',
    },
  },
  eslintConfigPrettier,
);
