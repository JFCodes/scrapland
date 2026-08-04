<script setup lang="ts">
import type { T_Task_Ad_Vehicle_FindNew } from '@scrapland/data-model'
// App
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompEntityTasksVehicleFindNewTableLine from '@/components/entity/tasks/vehicle/find-new-table-item.vue'

defineProps<{ tasks: Array<T_Task_Ad_Vehicle_FindNew> }>()

const { t } = useAppI18n()

</script>

<template>
  <table class="--base-table">
    <thead>
      <tr>
        <th>#</th>
        <th>{{ t('global.createdAt') }}</th>
        <th>{{ t('global.status') }}</th>
        <th>{{ t('global.target') }}</th>
        <th>{{ t('global.schedule') }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <CompEntityTasksVehicleFindNewTableLine
        v-for="(task, index) in tasks"
        :key="task._id"
        :index="index"
        :task="task" />
    </tbody>
  </table>
</template>
