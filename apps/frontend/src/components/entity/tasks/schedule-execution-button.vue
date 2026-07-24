<script setup lang="ts">
import { ref } from 'vue'
// App
import { API } from '@/api'
// Components
import CompUiButton from '@/components/ui/ui-button.vue'

const props = defineProps<{ taskId: string }>()

const isRequesting = ref(false)

const onClick = (): void => {

  isRequesting.value = true
  API.tasks
    .execute(props.taskId)
    .finally(() => isRequesting.value = false)
}
</script>

<template>
  <CompUiButton
    type="info"
    :label="$t('global.scheduleExecution')"
    :is-loading="isRequesting"
    @click="onClick">

  </CompUiButton>
</template>