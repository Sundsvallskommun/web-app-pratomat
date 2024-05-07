import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    // base: import.meta.env.VITE_BASE_PATH,
    plugins: [react()],
  };
});
