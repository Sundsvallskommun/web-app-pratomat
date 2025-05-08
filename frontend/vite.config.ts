import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_PATH || "/",
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT, 10) : undefined,
    },
    preview: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT, 10) : undefined,
    },
    plugins: [react()],
  };
});
