import { defineConfig, type Plugin } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'fs'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

const runtimeSettingsPath = '../_runtime/settings.json'

function watchRuntimeSettings(): Plugin {
  return {
    name: 'watch-runtime-settings',

    configureServer(server) {
      server.watcher.add(runtimeSettingsPath)
      server.watcher.on('add', async (file) => {
        if (file === runtimeSettingsPath) await server.restart()
      })
      server.watcher.on('change', async (file) => {
        if (file === runtimeSettingsPath) await server.restart()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(() => {
  let appSettings
  try {
    const settingsString = readFileSync('../_runtime/settings.json', 'utf-8')
    appSettings = JSON.parse(settingsString)
  } catch (_) { }

  const port = appSettings?.BACKEND_SERVER_PORT ?? 3000

  return {
    plugins: [
      vue(),
      vueDevTools(),
      watchRuntimeSettings(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${port}`,
        },
      },
    }
  }
})
