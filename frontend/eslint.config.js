import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript rules
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: './tsconfig.json', // Point to your tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs['recommended'].rules, // TypeScript recommended rules
      ...tseslint.configs['recommended-requiring-type-checking'].rules, // TypeScript with type checking
    },
  },

  // React rules
  {
    files: ['*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true, // Enable JSX
      },
    },
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules, // React recommended rules
    },
  },

  // React Hooks rules
  {
    files: ['*.tsx'],
    plugins: {
      reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error', // Enforce the rules of hooks
      'react-hooks/exhaustive-deps': 'warn', // Warn for missing dependencies in useEffect
    },
  },

  // React Refresh rules
  {
    files: ['*.jsx', '*.tsx'],
    plugins: {
      reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': 'warn', // Ensure that only components are exported
    },
  },

  // Ignore certain directories
  {
    ignores: ['**/build/**', '**/dist/**', '/node_modules', 'eslint.config.js'],
  },
];
