<script setup lang="ts">
import { onMounted } from 'vue'
// // App
// import { useDiscoveryTasksStore } from '@/stores/discovery-tasks'
import { useServerStatusStore } from '@/stores/server-status'
import { useExecutionsStore } from '@/stores/executions'
import { useTasksStore } from '@/stores/tasks'
// import { unsubscribeSocket } from '@/websocket/instance'
// import { websocket } from '@/websocket/client'
// import { useAdsStore } from '@/stores/ads'
// // Components
import CompGlobalTooltipAnchor from '@/components/global/g-tooltip-anchor.vue'
import CompGlobalToastsAnchor from '@/components/global/g-toasts-anchor.vue'
import CompGlobalPanelAnchor from '@/components/global/g-panel-anchor.vue'
import CompGlobalModalAnchor from '@/components/global/g-modal-anchor.vue'
import CompGlobalTeleports from '@/components/global/g-teleports.vue'
import CompGlobalPage from '@/components/global/g-page.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import ViewOffline from '@/views/v-offline.vue'

// const discoveryTasksStore = useDiscoveryTasksStore()
const serverStatusStore = useServerStatusStore()
const executionsStore = useExecutionsStore()
const tasksStore = useTasksStore()
// const adsStore = useAdsStore()

onMounted(() => {
  executionsStore.load()
  tasksStore.load()
  //   discoveryTasksStore.search()
  //   websocket.connect()
  //   adsStore.search()
})

// onUnmounted(() => {
//   unsubscribeSocket()
//   websocket.disconnect()
// })
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
