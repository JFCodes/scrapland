<script setup lang="ts">
// App
import { TELEPORTS } from '@/components/constants'

</script>

<template>
  <div class="teleport-dropdown" :id="TELEPORTS.DROPDOWNS"></div>
</template>

<style lang="scss" scoped>
.teleport-dropdown {
  z-index: var(--z-teleports);
  position: fixed;
  left: 0;
  top: 0;
}
</style>
