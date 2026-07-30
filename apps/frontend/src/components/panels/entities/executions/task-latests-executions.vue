<script setup lang="ts">
import type { T_Execution } from '@scrapland/data-model'
import { onMounted, ref } from 'vue'
// App
import type { PanelExecutionsTaskLatestExecutions } from '@/components/panels/types'
import { usePaginated } from '@/composables/paginated'
import { API } from '@/api'
// Components
import CompEntityExecutionCard from '@/components/entity/executions/execution-card.vue'
import CompPanelsOverlay from '@/components/panels/p-overlay.vue'

const props = defineProps<PanelExecutionsTaskLatestExecutions>()

const executions = ref<Array<T_Execution>>([])
const { load, isLoading } = usePaginated({
  request: API.tasks.latestsExecutions,
  data: executions,
})

onMounted(() => {
  load({ taskId: props.task._id })
})
</script>

<template>
  <CompPanelsOverlay
    close-on-overlay-click
    close-on-escape-press
    show-close-icon
    content-dark
    :is-loading="isLoading"
    :width="620">
    <template #header>
      <p class="--text-xl --font-bold">{{ $t('panels.latestExecutions.title') }}</p>
    </template>

    <div class="--group-v">
      <CompEntityExecutionCard
        v-for="execution in executions"
        :execution="execution"
        :key="execution._id"
        :task="task" />
    </div>
  </CompPanelsOverlay>
</template>
