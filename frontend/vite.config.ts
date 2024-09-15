/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    setupFiles: ["src/test-setup.ts"],
    environment: "jsdom",
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      ".git",
      ".cache",
      "src/**/*.exclude",
    ],
    coverage: {
      include: ["src/components/**/*.{ts,tsx}", "src/pages/**/*.{ts,tsx}"],
    },
  },
});
