<script setup lang="ts">
// Components
import CompUiMessage from '@/components/ui/ui-message.vue'
</script>

<template>
  <div class="layout">
    <CompUiMessage opaque type="danger" :max-width="600">
      <template #message>
        <p class="--text-md --font-bold --pb-2xs">Server is currently offline.</p>
        <p class="--pb-2xs">Server is not responding. This might be caused by one or more issues:</p>
        <ul class="error-list">
          <li>Error encountered an initialization error</li>
          <li>An error occurred during run time</li>
          <li>Miss configured ports between server and frontend app</li>
        </ul>
      </template>
    </CompUiMessage>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
}

.error-list {
  list-style: inside;
}
</style>