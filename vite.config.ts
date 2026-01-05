import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/hero-new/main.tsx'),
      name: 'HeroApp',
      fileName: () => 'hero.js',
      formats: ['iife'] // Self-executing bundle for HTML script tag
    },
    rollupOptions: {
      external: [], // Bundle everything (restored)
      output: {
        globals: {},
        compact: true,
        manualChunks: undefined,
      }
    },
    outDir: 'dist',
    // Production optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
