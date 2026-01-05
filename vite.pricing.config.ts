import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false, // Don't clear dist folder - preserve hero.js
    lib: {
      entry: path.resolve(__dirname, 'src/pricing-new/main.tsx'),
      name: 'PricingApp',
      fileName: () => 'pricing.js',
      formats: ['iife'] // Self-executing bundle for HTML script tag
    },
    rollupOptions: {
      external: [], // Bundle everything
      output: {
        globals: {},
        compact: true,
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'pricing.css';
          }
          return assetInfo.name || '[name][extname]';
        },
      }
    },
    outDir: 'dist',
    // Production optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
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
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
