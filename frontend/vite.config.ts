import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./",
  build: {
    outDir: "../backend/dist/frontend",
  },
  server: {
    host: "0.0.0.0", // listen on all network interfaces not just localhost for 5173 to work with docker container
    port: 5173,
  },
  test: {
    ...configDefaults,
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reportsDirectory: "./coverage",
      reporter: ["text", "json", "html"],
    },
  },
});
