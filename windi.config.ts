import { defineConfig } from "vite-plugin-windicss";
import { transform } from "windicss/helpers";

export default defineConfig({
  darkMode: "media",
  extract: {
    include: ["./**/*.{html,js,jsx,ts,tsx}"],
  },
  plugins: [transform("daisyui")],
});
