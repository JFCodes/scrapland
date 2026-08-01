<script setup lang="ts">
import { ref } from 'vue'
// App
import type { PanelTaskHousingEditCreateProps, OverLayExposed } from '@/components/panels/types'
import { useTaskHousingFindNewEdit } from '@/composables/task-housing-find-new/edit'
import { useAppI18n } from '@/composables/use-i18n'
import { useModals } from '@/composables/modals'
// Components
import PanelTaskHousingFindNewEditHeader from '@/components/panels/entities/task-housing/find-new-edit/panel-header.vue'
import CompEntityTaskHousingBuildingTypesField from '@/components/entity/tasks/housing/fields/field-building-type.vue'
import CompEntityTaskHousingLocationField from '@/components/entity/tasks/housing/fields/field-location.vue'
import CompEntityTaskMinMaxPriceField from '@/components/entity/tasks/fields/field-min-max-price.vue'
import CompEntityTaskScheduleField from '@/components/entity/tasks/fields/field-schedule.vue'
import CompEntityTaskFieldNotes from '@/components/entity/tasks/fields/field-notes.vue'
import CompPanelsOverlay from '@/components/panels/p-overlay.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const props = defineProps<PanelTaskHousingEditCreateProps>()

const { prompt } = useModals()
const { t } = useAppI18n()
const {
  changeStatus,
  saveChanges,
  editableBuildingTypes,
  buildingTypesError,
  editableSchedule,
  isChangingStatus,
  editableLocation,
  editablePriceMin,
  editablePriceMax,
  editableStatus,
  locationError,
  editableNotes,
  adEntityType,
  hasChanges,
  isSaving,
  isValid
} = useTaskHousingFindNewEdit(() => props.task)

const overlayRef = ref<null | OverLayExposed>(null)
let hasMadeChanges = false

const save = async (): Promise<void> => {
  const saved = await saveChanges()
  if (!saved) return

  hasMadeChanges = true
  overlayRef.value?.closePanel()
}

const beforeClose = async (): Promise<boolean> => {
  if (!hasChanges.value) return true
  if (hasMadeChanges) return true

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
    show-close-icon
    ref="overlayRef"
    :before-close-guard="beforeClose"
    :is-loading="isSaving"
    :width="720">

    <template #header>
      <PanelTaskHousingFindNewEditHeader
        :is-changing-status="isChangingStatus"
        :ad-entity-type="adEntityType"
        :change-status="changeStatus"
        :target="task._task_target"
        :status="editableStatus" />
    </template>

    <CompEntityTaskHousingLocationField
      v-model="editableLocation"
      class="--mb-sm"
      :error="locationError" />

    <CompEntityTaskHousingBuildingTypesField
      v-model="editableBuildingTypes"
      class="--mb-sm"
      :error="buildingTypesError" />

    <CompEntityTaskScheduleField v-model="editableSchedule" class="--mb-sm" />

    <CompEntityTaskMinMaxPriceField
      v-model:price-min="editablePriceMin"
      v-model:price-max="editablePriceMax"
      class="--mb-sm" />

    <CompEntityTaskFieldNotes v-model="editableNotes" />

    <template #footer="{ closePanel }">
      <CompUiButton type="link" :label="t('global.discardChanges')" @click="closePanel" />
      <CompUiButton
        filled
        type="success"
        :disabled="!hasChanges || !isValid"
        :label="t('global.save')"
        @click="save" />
    </template>
  </CompPanelsOverlay>
</template>
