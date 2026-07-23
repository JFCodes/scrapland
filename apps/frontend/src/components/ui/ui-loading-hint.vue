<template>
  <span class="loading-spin"></span>
</template>

<style lang="scss" scoped>
.loading-spin {
  --color-1: #fff;
  --color-2: #ff3d00;
  --size: 0.3px;

  width: calc(48 * var(--size));
  height: calc(48 * var(--size));
  border: calc(5 * var(--size)) solid var(--color-1);
  border-bottom-color: var(--color-2);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>