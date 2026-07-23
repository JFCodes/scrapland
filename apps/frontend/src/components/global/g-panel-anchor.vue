<script setup lang="ts">
// App
import { usePanelStore } from '@/stores/panel'

const panelStore = usePanelStore()
</script>

<template>
  <div class="panel-anchor">
    <component
      v-if="panelStore.activePanel"
      v-bind="panelStore.activePanel.props"
      :is="panelStore.activePanel.component"
      :key="panelStore.activePanel.id" />
  </div>
</template>

<style lang="scss" scoped>
.panel-anchor {
  z-index: var(--z-modals);
  position: fixed;
  left: 0;
  top: 0;
}
</style>