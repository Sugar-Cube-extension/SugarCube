import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: 'src/popup',
  plugins: [svelte()],
  build: {
    outDir: path.resolve(__dirname, 'dist/popup'), // isolate popup dist if you add background/content later
    emptyOutDir: true,
    sourcemap: true // helpful for debugging in Chrome Extension DevTools
  },
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.cjs'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});