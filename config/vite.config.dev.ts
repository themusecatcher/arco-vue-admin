import { defineConfig, loadEnv, mergeConfig } from 'vite'
import baseConfig from './vite.config.base'

export default defineConfig(({ mode }) => {
  // 加载环境变量 (注意路径调整)
  const env = loadEnv(mode, process.cwd(), '')

  // 获取 API 基础 URL
  const apiBaseUrl = env.VITE_API_BASE_URL
  console.log('apiBaseUrl', apiBaseUrl)

  return mergeConfig(
    {
      mode: 'development',
      server: {
        host: true,
        open: true,
        port: 8000,
        proxy: {
          '/api': {
            target: apiBaseUrl,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      }
    },
    baseConfig
  )
})
