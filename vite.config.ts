import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const pathResolve = (pathStr) => {
  return path.resolve(__dirname, pathStr)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的svg图标文件夹，即需要识别的svg都应该放在这个文件夹下
      // iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
      // 或
      iconDirs: [pathResolve('./src/icons/svg')],
      // 指定symbolId格式（这里的配置与6.2步骤中的引入svg组件的name配置项写法有关）
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      '@': path.resolve(__dirname, 'src'), // 配置@路径
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    https: false,
    proxy: {// 跨域代理
      '/api': {
        // target: 'http://' + env.VUE_APP_BASE_API,
        target: 'https://lianghj.top:8888/api/private/v1/', // 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  define: {
    'process.env': {
      'BASE_API':"/api"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
        `
        @import "@/styles/variables.scss";  // scss文件地址
        @import "@/styles/mixin.scss";     // scss文件地址
        `
      }
    }
  },
})
