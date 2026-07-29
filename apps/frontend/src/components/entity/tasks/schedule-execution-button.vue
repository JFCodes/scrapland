<script setup lang="ts">
import { E_TASK_STATUS } from '@scrapland/data-model'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
// App
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { useTooltips } from '@/composables/tooltips'
import { API } from '@/api'
// Components
import CompUiButton from '@/components/ui/ui-button.vue'

const props = defineProps<{ taskId: string, status: E_TASK_STATUS }>()

const { onApiError } = useApiErrorHandling()
const { tooltip } = useTooltips()
const { t } = useI18n()

const isRequesting = ref(false)

const onClick = (): void => {

  isRequesting.value = true
  API.tasks
    .execute(props.taskId)
    .catch(onApiError)
    .finally(() => isRequesting.value = false)
}

const onMouseEnter = (event: MouseEvent): void => {
  if (props.status === E_TASK_STATUS.PUBLISHED) return
  tooltip(event, {
    messages: [
      t('tooltips.taskNotExecutable1', { status: props.status }),
      t('tooltips.taskNotExecutable2')
    ]
  })
}
</script>

<template>
  <CompUiButton
    type="info"
    :disabled="status !== E_TASK_STATUS.PUBLISHED"
    :label="$t('global.scheduleExecution')"
    :is-loading="isRequesting"
    @mouseenter="onMouseEnter"
    @click="onClick">

  </CompUiButton>
</template>