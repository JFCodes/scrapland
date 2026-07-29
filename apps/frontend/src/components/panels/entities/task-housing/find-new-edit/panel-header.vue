<script setup lang="ts">
import type { E_AD_ENTITY_TYPE, E_TASK_STATUS } from '@scrapland/data-model'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
// Components
import CompEntityTaskStatusPicker from '@/components/entity/tasks/status-picker.vue'
import CompEntityAdEntityBadge from '@/components/entity/ad/ad-entity-badge.vue'

const props = defineProps<{
  changeStatus: (status: E_TASK_STATUS) => Promise<void>
  adEntityType: E_AD_ENTITY_TYPE
  status: E_TASK_STATUS
}>()

const { t } = useI18n()

const isStatusPickerOptionsLoading = ref(false)

const changeStatus = async (status: E_TASK_STATUS): Promise<void> => {
  isStatusPickerOptionsLoading.value = true
  await props
    .changeStatus(status)
    .finally(() => isStatusPickerOptionsLoading.value = false)
}
</script>

<template>

  <div class="--group --group--spread --pr-3xl">
    <div class="--group">
      <CompEntityAdEntityBadge :ad-entity="adEntityType" />
      <p class="--text-xl --font-bold">{{ t('panels.task.editTitle') }}</p>
    </div>

    <CompEntityTaskStatusPicker
      :is-options-loading="isStatusPickerOptionsLoading"
      :status="status"
      :change-status="changeStatus" />
  </div>
</template>
