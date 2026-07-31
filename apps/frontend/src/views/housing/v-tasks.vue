<script setup lang="ts">
import { E_AD_ENTITY_TYPE } from '@scrapland/data-model'
// App
import { useCreateEntityTaskLaunch } from '@/composables/create-entity/tasks/launch'
import { useAppI18n } from '@/composables/use-i18n'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityTaskHousingFindNewTable from '@/components/entity/tasks/housing/find-new-table.vue'
import CompLayoutVerticalScrollContent from '@/components/layouts/vertical-scroll-content.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const { launch } = useCreateEntityTaskLaunch()
const { t } = useAppI18n()
const tasksStore = useTasksStore()
</script>

<template>
  <CompLayoutCenterContainer>
    <CompLayoutVerticalScrollContent>

      <template #top>
        <div class="--group --group--spread">
          <CompUiTitleMain :title="t('pages.adHousingTasks.title')" />
          <CompUiButton
            type="info"
            :label="t('global.createTask')"
            @click="launch(E_AD_ENTITY_TYPE.HOUSING)" />
        </div>
      </template>

      <CompEntityTaskHousingFindNewTable :tasks="tasksStore.housingFindNewTasks" />

    </CompLayoutVerticalScrollContent>
  </CompLayoutCenterContainer>
</template>
