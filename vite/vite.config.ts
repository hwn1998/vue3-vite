import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import autoImport from "unplugin-auto-import/vite";
// https://vite.dev/config/
export default defineConfig({

  build: {
    outDir: "hwn", // 重命名打包后生成的dist文件夹
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 将'@'映射到'src'目录
    },
  },
  plugins: [
    vue(),
    autoImport({
      imports: [
        // 自动导入Vue的API
        "vue",
      ],
    }),
  ],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http: //localhost:3000", // 后端服务的URL
        changeOrigin: true, // 是否改变源（通常用于跨域请求）
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
