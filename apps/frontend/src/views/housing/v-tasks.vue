<script setup lang="ts">
import { E_AD_ENTITY_TYPE, E_TASK_STATUS } from '@scrapland/data-model'
import { computed, ref } from 'vue'
// App
import { useCreateEntityTaskLaunch } from '@/composables/create-entity/tasks/launch'
import { useAppI18n } from '@/composables/use-i18n'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityTaskHousingFindNewTable from '@/components/entity/tasks/housing/find-new-table.vue'
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
  if (showDeleted.value) return tasksStore.housingFindNewTasks
  return tasksStore.housingFindNewTasks.filter(t => t._task_status !== E_TASK_STATUS.DELETED)
})

</script>

<template>
  <CompLayoutCenterContainer>
    <CompLayoutVerticalScrollContent>

      <template #top>
        <div class="--group --group--spread">
          <CompUiTitleMain :title="t('pages.adHousingTasks.title')" />

          <div class="--group">
            <CompFormCheckbox v-model="showDeleted" :label="t('global.showDeleted')" />
            <CompUiButton
              type="info"
              :label="t('global.createTask')"
              @click="launch(E_AD_ENTITY_TYPE.HOUSING)" />
          </div>
        </div>
      </template>

      <CompEntityTaskHousingFindNewTable :tasks="filteredTasks" />

    </CompLayoutVerticalScrollContent>
  </CompLayoutCenterContainer>
</template>
