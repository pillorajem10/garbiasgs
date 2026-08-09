import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/',
  // The prerender bundle runs once under Node at build time, so it needs
  // framer-motion bundled rather than externalised — the package resolves to
  // browser-only entry points otherwise.
  ssr: { noExternal: ['framer-motion'] },
  build: {
    // The prerender needs to know which CSS chunk belongs to which route, so
    // it can link that route's stylesheet in the static HTML instead of leaving
    // the prerendered markup unstyled until the lazy page chunk loads.
    manifest: !isSsrBuild,
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
              motion: ['framer-motion'],
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
