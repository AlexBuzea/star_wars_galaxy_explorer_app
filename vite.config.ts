/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/star_wars_galaxy_explorer_app/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    // Proxy disabled - using direct API calls with fallbacks
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})