import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth/register": "http://localhost:3000",
      "/auth/login": "http://localhost:3000",
      "/auth/forget": "http://localhost:3000",
    },
  },
});
