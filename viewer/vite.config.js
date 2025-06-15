import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3004',
      '/games': 'http://localhost:3004',
      '/addjogo': 'http://localhost:3004',
      '/api': 'http://localhost:3004',
    },
  },
});
