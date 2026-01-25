import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Determine which component to build based on environment variable
const buildTarget = process.env.BUILD_TARGET || 'hero';

const inputMap = {
  hero: path.resolve(__dirname, 'src/hero-new/main.tsx'),
  faq: path.resolve(__dirname, 'src/faq/main.tsx'),
};

const outputMap = {
  hero: 'hero.js',
  faq: 'faq.js',
};

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: buildTarget === 'hero', // Only empty on hero build
    rollupOptions: {
      input: inputMap[buildTarget],
      output: {
        entryFileNames: outputMap[buildTarget],
        assetFileNames: 'certsync_website.css',
        format: 'iife',
        compact: true,
      }
    },
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
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
