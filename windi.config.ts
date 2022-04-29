import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        display: ["Lobster", "cursive"],
      },
    },
  },
  extract: {
    include: ["./**/*.{html,js,jsx,ts,tsx}"],
  },
  plugins: [
    require("@windicss/plugin-icons"),
    require("@windicss/plugin-scrollbar"),
  ],
});
