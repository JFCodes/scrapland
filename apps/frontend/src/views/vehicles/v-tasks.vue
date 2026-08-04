<script setup lang="ts">
import { E_AD_ENTITY_TYPE, E_TASK_STATUS } from '@scrapland/data-model'
import { F_GetFiltered } from '@scrapland/functions'
import { computed, ref } from 'vue'
// App
import { useCreateEntityTaskLaunch } from '@/composables/create-entity/tasks/launch'
import { useAppI18n } from '@/composables/use-i18n'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityTaskVehicleFindNewTable from '@/components/entity/tasks/vehicle/find-new-table.vue'
import CompLayoutVerticalScrollContent from '@/components/layouts/vertical-scroll-content.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompFormCheckbox from '@/components/forms/f-checkbox.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const { launch } = useCreateEntityTaskLaunch()
const { t } = useAppI18n()
const tasksStore = useTasksStore()

const showDeleted = ref(false)

const filteredTasks = computed(() => {
  if (showDeleted.value) return tasksStore.vehicleFindNewTasks

  return F_GetFiltered(tasksStore.vehicleFindNewTasks, {
    value: E_TASK_STATUS.DELETED,
    comparison: 'not-equal',
    key: '_task_status',
  })
})

const deletedCount = computed(() => {
  return F_GetFiltered(tasksStore.vehicleFindNewTasks, {
    value: E_TASK_STATUS.DELETED,
    comparison: 'equal',
    key: '_task_status',
  }).length
})

const deletedLabel = computed<string>(() => {
  const deletedText = t('global.showDeleted')
  return deletedCount.value > 0
    ? `${deletedText} (${deletedCount.value})`
    : deletedText
})

</script>

<template>
  <CompLayoutCenterContainer>
    <CompLayoutVerticalScrollContent>

      <template #top>
        <div class="--group --group--spread">
          <CompUiTitleMain :title="t('pages.adVehicleTasks.title')" />

          <div class="--group">
            <CompFormCheckbox v-model="showDeleted" :label="deletedLabel" />
            <CompUiButton
              type="info"
              :label="t('global.createTask')"
              @click="launch(E_AD_ENTITY_TYPE.VEHICLE)" />
          </div>
        </div>
      </template>

      <CompEntityTaskVehicleFindNewTable :tasks="filteredTasks" />

    </CompLayoutVerticalScrollContent>
  </CompLayoutCenterContainer>
</template>
