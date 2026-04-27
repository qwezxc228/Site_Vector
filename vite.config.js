import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        detail: resolve(__dirname, 'detail/index.html'),
        detailThanks: resolve(__dirname, 'detail/thanks/index.html'),
        detailPrivacy: resolve(__dirname, 'detail/privacy/index.html'),
        detailConsent: resolve(__dirname, 'detail/consent/index.html'),
      },
    },
  },
});
