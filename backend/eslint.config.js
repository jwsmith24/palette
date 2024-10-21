import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    ignores: ["dist", "node_modules"], // Ignore the compiled files in the 'dist' directory and node_modules
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"], // apply to typescript and javascript files
    languageOptions: {
      parser: tsParser, // Use @typescript-eslint parser
      parserOptions: {
        project: "./tsconfig.json", // Point to your tsconfig for project-specific settings
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: "latest", // Use the latest ECMAScript features
      },
    },
    plugins: {
      typescript, // Enable TypeScript plugin for linting
      prettier, // Integrate Prettier into ESLint
    },
    rules: {
      ...js.configs.recommended.rules, // Default ESLint rules
      ...typescript.configs.recommended.rules, // TypeScript-specific rules
      "prettier/prettier": "error", // Run Prettier as an ESLint rule and show errors
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Ignore unused vars prefixed with '_'
      "@typescript-eslint/explicit-function-return-type": "off", // Disable requiring return types on functions
      "@typescript-eslint/no-explicit-any": "warn", // Warn if 'any' is used (optional)
    },
  },
];
