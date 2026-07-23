<template>
  <div class="center-container --container-page">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.center-container {
  padding-top: var(--s-md);
  overflow-y: auto;
  height: 100%;
}
</style>
