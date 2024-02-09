import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth/register": "https://api-server-not-my-space.onrender.com",
      "/auth/login": "https://api-server-not-my-space.onrender.com",
      "/auth/forget": "https://api-server-not-my-space.onrender.com",
      "/posts/create": "https://api-server-not-my-space.onrender.com",
      "/posts/all": "https://api-server-not-my-space.onrender.com",
      "/posts/likes": "https://api-server-not-my-space.onrender.com",
      "/posts/personal": "https://api-server-not-my-space.onrender.com",
      "/posts/edit": "https://api-server-not-my-space.onrender.com",
      "/posts/remove": "https://api-server-not-my-space.onrender.com",
    },
  },
});
