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
      "/posts/create": "http://localhost:3000",
      "/posts/all": "http://localhost:3000",
      "/posts/likes": "http://localhost:3000",
      "/posts/personal": "http://localhost:3000",
      "/posts/edit": "http://localhost:3000",
      "/posts/remove": "http://localhost:3000",
    },
  },
});
