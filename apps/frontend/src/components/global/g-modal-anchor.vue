<script setup lang="ts">
// App
import { useModalsStore } from '@/stores/modals'

const modalsStore = useModalsStore()
</script>

<template>
  <div class="modal-anchor">
    <component
      v-for="modal in modalsStore.activeModals"
      v-bind="{
        ...modal.injectedProps,
        ...modal.props
      }"
      :is="modal.component"
      :key="modal.id" />
  </div>
</template>

<style lang="scss" scoped>
.modal-anchor {
  z-index: var(--z-modals);
  position: fixed;
  left: 0;
  top: 0;
}
</style>