import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
