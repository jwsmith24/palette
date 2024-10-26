import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: [
      '**/build/**',
      '**/dist/**',
      '/node_modules',
      '**/prisma/**',
      'eslint.config.js',
    ],
  },
  eslint.configs.recommended, // Basic ESLint recommended config
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React-specific rules
      'react/react-in-jsx-scope': 'off', // If using new JSX transform
      'react/prop-types': 'off', // Typically off when using TypeScript for props

      // React Refresh rule
      'react-refresh/only-export-components': 'warn',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error', // Checks the rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks dependency arrays

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
];
