<script setup lang="ts">
// App
import { useExecutionsStore } from '@/stores/executions'
// Components
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompEntityExecutionsTable from '@/components/entity/executions/e-table.vue'

const executionsStore = useExecutionsStore()

</script>

<template>
  <CompLayoutCenterContainer>
    <CompEntityExecutionsTable :executions="executionsStore.executions" />
  </CompLayoutCenterContainer>
</template>
