import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // listen on all network interfaces not just localhost for 5173 to work with docker container
    port: 5173,
  },
});
