import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://aashishjoshua05.github.io/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    minify: "esbuild", // Use esbuild for faster builds
    chunkSizeWarningLimit: 500, // Split code for faster loading
  },
});
