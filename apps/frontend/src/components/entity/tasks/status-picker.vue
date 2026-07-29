<script setup lang="ts">
import { E_TASK_STATUS } from '@scrapland/data-model'
// Components
import ComponentEntityTaskStatusBadge from '@/components/entity/tasks/status-badge.vue'
import CompUiDropdown from '@/components/ui/ui-dropdown.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'

const emits = defineEmits<{ 'status-change': [status: E_TASK_STATUS] }>()

const props = defineProps<{
  changeStatus?: (status: E_TASK_STATUS) => void | Promise<void>
  isOptionsLoading?: boolean
  status: E_TASK_STATUS
}>()

const changeAndClose = async (status: E_TASK_STATUS, close: () => void): Promise<void> => {
  emits('status-change', status)

  if (props.changeStatus) await props.changeStatus(status)
  close()
}
</script>

<template>
  <CompUiDropdown close-on-click-outside>
    <template #trigger="{ toggle, isOpen }">
      <ComponentEntityTaskStatusBadge
        :task-status="status"
        :height="32"
        :width="120"
        @click="toggle">

        <template #after-icon>
          <ChevronUp v-if="isOpen" :size="22" />
          <ChevronDown v-else :size="22" />
        </template>
      </ComponentEntityTaskStatusBadge>
    </template>

    <template #options="{ toggle }">
      <div class="options">
        <CompUiLoading v-if="isOptionsLoading" />

        <ComponentEntityTaskStatusBadge
          v-for="status in E_TASK_STATUS"
          class="--pointer"
          width="100%"
          :task-status="status"
          :filled="false"
          :key="status"
          @click="changeAndClose(status, toggle)" />
      </div>
    </template>
  </CompUiDropdown>
</template>

<style lang="scss" scoped>
.options {
  background-color: var(--c-background-main);
  flex-direction: column;
  padding: var(--s-xs);
  gap: var(--s-xs);
  display: flex;
}
</style>