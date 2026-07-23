<template>
  <div class="loading">
    <div class="loading__loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  background-color: rgba(255, 255, 255, 0.2);
  z-index: var(--z-loading);
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  inset: 0;

  &__loader {
    border: 4px solid var(--c-black);
    border-color: var(--c-font-main) #0000;
    animation: l16 1s infinite linear;
    border-radius: 50%;
    aspect-ratio: 1;
    display: grid;
    width: 50px;

    &::before,
    &::after {
      border-radius: 50%;
      grid-area: 1/1;
      border: inherit;
      content: "";
      margin: 2px;
    }

    &::before {
      border-color: var(--c-orange) #0000;
      animation-direction: reverse;
      animation-duration: .5s;
      animation: inherit;
    }

    &::after {
      margin: 8px;
    }
  }
}

@keyframes l16 {
  100% {
    transform: rotate(1turn)
  }
}
</style>