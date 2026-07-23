<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
// App
import { usePanelStore } from '@/stores/panel'
// Components
import CompUiLoading from '@/components/ui/ui-loading.vue'
import { X } from '@lucide/vue'

const DEFAULT_WIDTH = 420

const slots = defineSlots<{
  default(): void
  header(): void
  footer(props: { closePanel: () => void }): void
}>()

const props = defineProps<{
  closeOnOverlayClick?: boolean
  showCloseIcon?: boolean
  isLoading?: boolean
  width?: number
}>()

const panelStore = usePanelStore()

const overlayRef = ref<null | HTMLDivElement>(null)
const panelIsOpen = ref(false)

const close = (): void => {
  panelIsOpen.value = false
  window.setTimeout(() => panelStore.closeCurrent(), 500)
}


const onOverlayClick = (event: MouseEvent) => {
  // Check if clicked element is the panel ref, otherwise we ignore it
  if (event.target) return
  if (!overlayRef.value) return
  if (!overlayRef.value.isSameNode(event.target)) return
  if (!props.closeOnOverlayClick) return

  close()
}

defineExpose({ 'closePanel': close })
onMounted(() => {
  nextTick().then(() => panelIsOpen.value = true)
})
</script>

<template>
  <div ref="overlayRef" class="panel-overlay" @click="onOverlayClick">
    <Transition name="slide-in">

      <div
        v-if="panelIsOpen"
        class="panel"
        :class="{ 'panel--open': panelIsOpen }"
        :style="{
          width: `${width || DEFAULT_WIDTH}px`,
          right: panelIsOpen ? '0px' : '-100%',
        }">

        <CompUiLoading v-if="isLoading" />

        <div v-if="showCloseIcon" class="panel__close --pointer" @click="close">
          <X :size="32" />
        </div>

        <div v-if="slots['header']" class="panel__header">
          <slot name="header"></slot>
        </div>

        <div class="panel__content">
          <slot :close-panel="close"></slot>
        </div>

        <div v-if="slots['footer']" class="panel__footer">
          <slot name="footer" :close-panel="close"></slot>
        </div>
      </div>

    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.panel-overlay {
  background-color: var(--c-panel-overlay-background);
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.panel {
  background-color: var(--c-panel-background);
  border-left: solid 2px var(--c-border);
  transform: translateX(0);
  flex-direction: column;
  position: absolute;
  overflow: hidden;
  display: flex;
  height: 100%;
  bottom: 0;
  right: 0;
  top: 0;

  &__close {
    padding: var(--s-2xs);
    position: absolute;
    right: var(--s-xs);
    top: var(--s-xs);
  }

  &__header {
    border-bottom: solid 2px var(--c-border);
    padding: var(--s-lg) var(--s-sm);
  }

  &__content {
    padding: var(--s-lg) var(--s-lg);
    max-height: 100%;
    overflow-y: auto;
    flex: 1;
  }

  &__footer {
    border-top: solid 2px var(--c-border);
    padding: var(--s-lg) var(--s-sm);
    justify-content: flex-end;
    align-items: center;
    gap: var(--s-sm);
    display: flex;
  }
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}
</style>