import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin(),
    WindiCSS({
      scan: {
        fileExtensions: ["html", "js", "ts", "jsx", "tsx"],
      },
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
