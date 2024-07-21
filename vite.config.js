// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/sekiro-boss-tracker/', // Ensure this line is included
  plugins: [react()],
});
