import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // binds to 0.0.0.0 (required for Docker)
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL || "http://backend:8083",
        changeOrigin: true,
      },
      "/ws": {
        target:
          process.env.VITE_BACKEND_URL?.replace("/api", "") ||
          "http://backend:8083",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
