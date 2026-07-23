<script setup lang="ts">
// App
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityTaskHousingFindNewTable from '@/components/entity/tasks/housing/find-new-table.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'

const tasksStore = useTasksStore()

</script>

<template>
  <CompLayoutCenterContainer>
    <CompEntityTaskHousingFindNewTable :tasks="tasksStore.housingFindNewTasks" />
  </CompLayoutCenterContainer>
</template>
