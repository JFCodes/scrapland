<script setup lang="ts">
import { E_AD_ENTITY_TYPE } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import { useTaskVehicleFindNewCreate } from '@/composables/task-vehicle-find-new/create'
import type { OverLayExposed } from '@/components/panels/types'
import { useAppSettings } from '@/stores/app-settings'
import { useAppI18n } from '@/composables/use-i18n'
import { useModals } from '@/composables/modals'
// Components
import CompEntityTaskMinMaxPriceField from '@/components/entity/tasks/fields/field-min-max-price.vue'
import CompEntityTargetFieldsTarget from '@/components/entity/targets/fields/target-field.vue'
import CompEntityTaskScheduleField from '@/components/entity/tasks/fields/field-schedule.vue'
import CompEntityTaskFieldNotes from '@/components/entity/tasks/fields/field-notes.vue'
import CompPanelsOverlay from '@/components/panels/p-overlay.vue'
import CompUiMessage from '@/components/ui/ui-message.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const appSettings = useAppSettings()
const { prompt } = useModals()
const { t } = useAppI18n()
const {
  createTask,
  displayEquivalentTaskWarning,
  fieldTargetError,
  fieldSchedule,
  fieldPriceMax,
  fieldPriceMin,
  fieldTarget,
  fieldNotes,
  isValid,
} = useTaskVehicleFindNewCreate()

const overlayRef = ref<null | OverLayExposed>(null)
let entityCreated = false

const create = async (): Promise<void> => {
  const created = await createTask()

  if (created) {
    entityCreated = true
    overlayRef.value?.closePanel()
    // window.setTimeout(() => {
    //   panelStore.show<PanelTaskHousingEditCreateProps>(CompPanelTaskHousingFindNewEdit, { task: created })
    // }, 500)
  }
}

const beforeClose = async (): Promise<boolean> => {
  if (entityCreated) return true

  const { resolution } = prompt({
    title: t('sentences.youHaveUnsavedChanges'),
    confirmText: t('global.discardChanges'),
    confirmButtonType: 'danger',
    messages: [
      t('entities.task.unsavedChanges'),
      t('sentences.doYouWishToDiscardThem')
    ]
  })

  const proceed = await resolution
  return proceed ?? false
}
</script>

<template>
  <CompPanelsOverlay
    close-on-overlay-click
    show-close-icon
    ref="overlayRef"
    :before-close-guard="beforeClose"
    :width="720">

    <template #header>
      <p class="--text-xl --font-bold">{{ t('panels.task.createTitle') }}</p>
    </template>

    <CompEntityTargetFieldsTarget
      v-model="fieldTarget"
      :ad-entity-type="E_AD_ENTITY_TYPE.VEHICLE"
      class="--mb-sm"
      :error="fieldTargetError" />

    <template v-if="fieldTarget">
      <CompEntityTaskScheduleField
        v-model="fieldSchedule"
        class="--mb-sm" />

      <CompEntityTaskMinMaxPriceField
        v-model:price-min="fieldPriceMin"
        v-model:price-max="fieldPriceMax"
        :max-value="appSettings.settings.VEHICLE_TASK_PRICE_MAX_VALUE"
        :step="appSettings.settings.VEHICLE_TASK_PRICE_RANGE_STEP"
        class="--mb-sm" />

      <CompEntityTaskFieldNotes
        v-model="fieldNotes"
        class="--mb-sm" />

    </template>

    <template #footer="{ closePanel }">
      <div class="--group-v">
        <CompUiMessage v-if="displayEquivalentTaskWarning" type="info">
          <template #message>
            <p class="--font-bold">{{ t('panels.taskHousingFindNew.equivalentMessage.title') }}</p>
            <p>{{ t('panels.taskHousingFindNew.equivalentMessage.message') }}</p>
          </template>
        </CompUiMessage>

        <div class="--group --group--end">
          <CompUiButton type="link" :label="t('global.discardChanges')" @click="closePanel" />
          <CompUiButton
            filled
            type="success"
            :label="t('global.create')"
            :disabled="!isValid"
            @click="create" />
        </div>
      </div>
    </template>
  </CompPanelsOverlay>
</template>
