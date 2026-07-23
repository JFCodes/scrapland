<script setup lang="ts">
import { E_EXECUTION_STATUS } from '@scrapland/data-model'
// Components
import ViewExecutionByStatusPage from '@/views/executions/_by-status-page.vue'
</script>

<template>
  <ViewExecutionByStatusPage :status="E_EXECUTION_STATUS.COMPLETED" />
</template>
