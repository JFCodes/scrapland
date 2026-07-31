<script setup lang="ts">
import type { T_Execution, T_Task } from '@scrapland/data-model'
import { computed } from 'vue'
// App
import { useExecutionsStore } from '@/stores/executions'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompLayoutVerticalScrollContent from '@/components/layouts/vertical-scroll-content.vue'
import CompEntityExecutionCard from '@/components/entity/executions/execution-card.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'

type ExecutionAndTask = { execution: T_Execution, task: T_Task }

const executionsStore = useExecutionsStore()
const tasksStore = useTasksStore()

const executionsAnsTask = computed<Array<ExecutionAndTask>>(() => {
  const pairs: Array<ExecutionAndTask> = []
  executionsStore.executions.forEach(execution => {
    const task = tasksStore.taskMap.get(execution.taskId)
    if (task) pairs.push({ execution, task })
  })

  return pairs
})
</script>

<template>
  <CompLayoutVerticalScrollContent :max-width="800">
    <template #top>
      <CompUiTitleMain :title="$t('pages.executionHistory.title')" />
    </template>

    <div class="--group-v">
      <CompEntityExecutionCard
        v-for="pair in executionsAnsTask"
        show-task-data
        :execution="pair.execution"
        :key="pair.execution._id"
        :task="pair.task" />
    </div>

  </CompLayoutVerticalScrollContent>
</template>
