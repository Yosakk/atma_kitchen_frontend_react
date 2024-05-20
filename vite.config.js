import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import purgeIcons from 'vite-plugin-purge-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    purgeIcons(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: ['.js', '.jsx'],
  },
});
