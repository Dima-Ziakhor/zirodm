import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import onlyWarn from "eslint-plugin-only-warn";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
   ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports', // Enforces 'import type'
          fixStyle: 'separate-type-imports', // Splits value and type imports into separate blocks
        },
      ],
    },
  },
  eslintConfigPrettier,
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ["error", "always"]
    },
  },
  {
    ignores: ["dist/**"],
  },
];
