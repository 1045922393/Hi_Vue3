// @ts-nocheck
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";
const path = require("path");

export default () => {
  return defineConfig({
    plugins: [
      vue(),
      alias({
        entries: [
          {
            find: "@",
            replacement: path.resolve(__dirname, "src"),
          },
        ],
      }),
    ],
  });
};
