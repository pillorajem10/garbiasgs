import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5175',
    },
  },
  build: {
    cssCodeSplit: false,
    minify: 'esbuild',
    cssMinify: true,
    target: isSsrBuild ? 'node20' : 'es2018',
    modulePreload: { polyfill: true },
    rollupOptions: {
      // Manual chunking is a browser-payload concern; the SSR bundle is a
      // single Node module and rejects the option.
      output: isSsrBuild
        ? undefined
        : {
            manualChunks: {
              router: ['react-router', 'react-router-dom'],
            },
          },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@sections': path.resolve(__dirname, 'src/Sections'),
      '@pages': path.resolve(__dirname, 'src/Pages'),
    },
  },
}));
