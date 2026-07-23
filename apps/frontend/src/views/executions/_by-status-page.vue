<script setup lang="ts">
import type { E_EXECUTION_STATUS, T_Execution } from '@scrapland/data-model'
import { computed } from 'vue'
// App
import { useExecutionsStore } from '@/stores/executions'
// Components
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompEntityExecutionsTable from '@/components/entity/executions/e-table.vue'

const executionsStore = useExecutionsStore()

const props = defineProps<{ status: E_EXECUTION_STATUS }>()

const filteredExecutions = computed<Array<T_Execution>>(() => {
  return executionsStore.executions.filter(e => e.status === props.status)
})

</script>

<template>
  <CompLayoutCenterContainer>
    <CompEntityExecutionsTable :executions="filteredExecutions" />
  </CompLayoutCenterContainer>
</template>
