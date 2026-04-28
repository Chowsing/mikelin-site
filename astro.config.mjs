// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  vite: {
    server: {
      allowedHosts: ['mikebear.cloud'],
    },
    preview: {
      allowedHosts: ['mikebear.cloud'],
    },
  },
});
