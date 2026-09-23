import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// Basic Vite + React config.
// Tailwind is NOT configured here - you set that up yourself.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
