import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue2";
import copy from "rollup-plugin-copy";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    copy({
      targets: [
        { src: "src/locales/*", dest: "dist/locales" },
        { src: "src/features.js", dest: "dist" },
      ],
      hook: "writeBundle",
    }),
  ],
  resolve: {
    alias: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      formats: ["es", "cjs"],
      name: "VueFinder",
      // the proper extensions will be added
      fileName: "vuefinder",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "vue",
        "mitt",
        "vanilla-lazyload",
        "dragselect",
        "cropperjs/dist/cropper.css",
        "cropperjs",
        "@uppy/core",
        "@uppy/xhr-upload",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
