import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'http://localhost:8080/api/library',
    httpCredentials: {
      username: 'admin',
      password: 'password',
      send: 'always',
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
