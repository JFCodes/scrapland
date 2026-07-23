<script setup lang="ts">
import { computed } from 'vue'
// Components
import ModalsOverlay from '@/components/modals/m-overlay.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import { X } from '@lucide/vue'

const slots = defineSlots<{
  'header'(): void
  'content'(): void
  'footer'(): void
}>()

const emits = defineEmits<{
  'overlay-click': []
  'close': []
}>()

const props = defineProps<{
  closeOnEscapePress?: boolean
  isLoading?: boolean
  width?: number
}>()

const style = computed<string>(() => {
  const styles: Array<string> = []

  if (props.width) styles.push(`width:${props.width}px`)

  return styles.join(';')

})

const onEscapePress = (): void => {
  if (props.closeOnEscapePress) emits('close')
}
</script>

<template>
  <ModalsOverlay
    tabindex="-1"
    @overlay-click="emits('overlay-click')"
    @keydown.esc="onEscapePress()">

    <div class="modal-base" :style="style">
      <CompUiLoading v-if="isLoading" />

      <div v-if="slots['header']" class="modal-base__header">
        <slot name="header"></slot>

        <div class="modal-base__header-close --pointer" @click="emits('close')">
          <X :size="24" />
        </div>
      </div>

      <div class="modal-base__content">
        <slot name="content"></slot>
      </div>

      <div v-if="slots['footer']" class="modal-base__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </ModalsOverlay>
</template>


<style lang="scss" scoped>
.modal-base {
  border: solid 2px var(--c-modal-border-color);
  background-color: var(--c-modal-background);
  border-radius: var(--radius-lg);
  position: relative;
  max-height: 100%;
  overflow: hidden;
  min-width: 400px;

  &__header {
    padding: var(--s-sm) var(--s-xs);
    border-bottom: solid 1px var(--c-card-border-color);
    position: relative;

    &-close {
      transform: translateY(-50%);
      padding: var(--s-2xs);
      right: var(--s-xs);
      position: absolute;
      top: 50%;
    }
  }

  &__content {
    padding: var(--s-sm) var(--s-xs);
  }

  &__footer {
    border-top: solid 1px var(--c-card-border-color);
    padding: var(--s-sm) var(--s-xs);
  }
}
</style>