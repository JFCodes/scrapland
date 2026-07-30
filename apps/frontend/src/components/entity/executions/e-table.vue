<script setup lang="ts">
import type { T_Execution } from '@scrapland/data-model'
// App
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityExecutionsTableItem from '@/components/entity/executions/e-table-item.vue'

const tasksStore = useTasksStore()

defineProps<{ executions: Array<T_Execution> }>()
</script>

<template>
  <table class="--base-table --base-table--fixed">
    <thead>
      <tr>
        <td>#</td>
        <td>{{ $t('global.createdAt') }}</td>
        <td>{{ $t('global.task') }}</td>
        <td>{{ $t('global.status') }}</td>
      </tr>
    </thead>

    <tbody>
      <CompEntityExecutionsTableItem
        v-for="(execution, index) in executions"
        :task="tasksStore.taskMap.get(execution.taskId) ?? null"
        :execution="execution"
        :key="execution._id"
        :index="index" />
    </tbody>
  </table>
</template>