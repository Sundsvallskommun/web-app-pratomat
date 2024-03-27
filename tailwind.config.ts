import Core from "@sk-web-gui/core";
import { Config } from "tailwindcss/types/config";
import ContainerQueries from "@tailwindcss/container-queries";

export default {
  mode: "jit",
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: ["Raleway", "Arial", "Helvetica", "sans-serif"],
      },
      fontWeight: {
        DEFAULT: "500",
      },
      fontSize: {
        base: "2rem",
      },
      lineHeight: {
        base: "130%",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s infinite",
      },
    },
  },
  plugins: [
    Core({
      cssBase: true,
      colors: [],
    }),
    ContainerQueries,
  ],
} satisfies Config;
