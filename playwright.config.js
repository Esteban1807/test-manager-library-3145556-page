import { defineConfig } from '@playwright/test';

// The page is opened straight from disk: it must work without the API and without a server (T-23).
// Uses the Edge already installed on Windows, so no browser download is needed.
export default defineConfig({
  testDir: './tests',
  reporter: 'list',
  use: { channel: process.env.PW_CHANNEL ?? 'msedge' },
});
