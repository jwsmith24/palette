/* eslint-env node */
/* eslint-disable no-undef */ // necessary for CI

/**
 * This script is used by CI to ensure that all compiled typescript files and dependencies run successfully in Node.
 *
 * This will primarily catch missing ".js" file extensions that are required due lack of native Typescript support in Node.
 *
 * It leverages the dynamic import Javascript feature which is asynchronous and returns a promise that we can use for validation.
 */

// dynamic import() vs static import {x} from "./path/to/file"
import("../dist/backend/src/app.js")
  .then(() => {
    console.log("App initialized successfully");
    process.exit(0); // terminate on success to avoid CI hang
  })
  .catch((error) => {
    console.error("App initialization failed:", error);
    process.exit(1); // terminate with error code to trigger CI failure
  });
