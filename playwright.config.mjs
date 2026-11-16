import { defineConfig } from '@playwright/test';

// PORTA permite rodar ao lado de outro projeto que já use a 4173.
const porta = Number(process.env.PORTA || 4173);

export default defineConfig({
  testDir: 'tests',
  use: { baseURL: `http://127.0.0.1:${porta}` },
  webServer: {
    command: `npx http-server . -p ${porta} -a 127.0.0.1 -s`,
    url: `http://127.0.0.1:${porta}`,
    reuseExistingServer: false,
  },
});
