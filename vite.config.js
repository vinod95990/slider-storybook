import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "vite-plugin-sass"; // Import the Sass plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
