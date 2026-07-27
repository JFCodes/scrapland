<script setup lang="ts">
import type { E_AD_STATUS } from '@scrapland/data-model'
// App
import { AD_STATUS_ORDERED } from '@/components/constants'
// Components
import ComponentEntityAdStatusBadge from '@/components/entity/ad/ad-status-badge.vue'
import CompUiDropdown from '@/components/ui/ui-dropdown.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'

const emits = defineEmits<{ 'status-change': [status: E_AD_STATUS] }>()

const props = defineProps<{
  changeStatus?: (status: E_AD_STATUS) => void | Promise<void>
  isOptionsLoading?: boolean
  status: E_AD_STATUS
}>()

const changeAndClose = async (status: E_AD_STATUS, close: () => void): Promise<void> => {
  emits('status-change', status)

  if (props.changeStatus) await props.changeStatus(status)
  close()
}
</script>

<template>
  <CompUiDropdown close-on-click-outside>
    <template #trigger="{ toggle, isOpen }">
      <ComponentEntityAdStatusBadge
        :ad-status="status"
        :height="32"
        :width="200"
        @click="toggle">

        <template #after-icon>
          <ChevronUp v-if="isOpen" :size="22" />
          <ChevronDown v-else :size="22" />
        </template>

      </ComponentEntityAdStatusBadge>
    </template>

    <template #options="{ toggle }">
      <div class="options">
        <CompUiLoading v-if="isOptionsLoading" />

        <ComponentEntityAdStatusBadge
          v-for="status in AD_STATUS_ORDERED"
          class="--pointer"
          width="100%"
          :ad-status="status"
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