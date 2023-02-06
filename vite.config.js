import { resolve } from "path";

/** @type {import('vite').UserConfig} */
const config = {
  base: "",
  server: {
    port: 1234,
    host: true,
  },
  preview: {
    port: 1234,
    host: true,
  },
  build: {
    outDir: "./docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        skyscrapers: resolve(__dirname, "skyscrapers.html"),
      },
    },
  },
};

export default config;
