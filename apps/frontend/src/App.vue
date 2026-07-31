<script setup lang="ts">
import { onUnmounted, onMounted } from 'vue'
// App
import { useServerStatusStore } from '@/stores/server-status'
import { useExecutionsStore } from '@/stores/executions'
import { unsubscribeSocket } from '@/websocket/instance'
import { useTasksStore } from '@/stores/tasks'
import { websocket } from '@/websocket/client'
// Components
import CompGlobalTooltipAnchor from '@/components/global/g-tooltip-anchor.vue'
import CompGlobalToastsAnchor from '@/components/global/g-toasts-anchor.vue'
import CompGlobalPanelAnchor from '@/components/global/g-panel-anchor.vue'
import CompGlobalModalAnchor from '@/components/global/g-modal-anchor.vue'
import CompGlobalTeleports from '@/components/global/g-teleports.vue'
import CompGlobalPage from '@/components/global/g-page.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import ViewOffline from '@/views/v-offline.vue'

const serverStatusStore = useServerStatusStore()
const executionsStore = useExecutionsStore()
const tasksStore = useTasksStore()

onMounted(() => {
  executionsStore.load()
  websocket.connect()
  tasksStore.load()
})

onUnmounted(() => {
  unsubscribeSocket()
  websocket.disconnect()
})
</script>

<template>
  <CompGlobalTooltipAnchor />
  <CompGlobalToastsAnchor />
  <CompGlobalModalAnchor />
  <CompGlobalPanelAnchor />
  <CompGlobalTeleports />

  <CompUiLoading v-if="serverStatusStore.isInitializing" />
  <ViewOffline v-if="!serverStatusStore.serverOk" />

  <CompGlobalPage v-else>
    <template #content>
      <RouterView />
    </template>
  </CompGlobalPage>
</template>
