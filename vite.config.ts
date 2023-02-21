// @ts-nocheck
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import alias from '@rollup/plugin-alias';
const path = require('path');

export default () => {
  return defineConfig({
    base: '/villiam/',
    build: {
      outDir: 'villiam',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 路径别名
      },
    },
    plugins: [
      vue(),
      alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve(__dirname, 'src'),
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, 'src/style/index.less')}";`,
        },
      },
    },
  });
};
