import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@masonry": path.resolve(__dirname, "src/features/masonry-grid/"),
      "@app": path.resolve(__dirname, "src/app"),
      "@api": path.resolve(__dirname, "src/api"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@utils": path.resolve(__dirname, "src/utils/")
    },
  },
});