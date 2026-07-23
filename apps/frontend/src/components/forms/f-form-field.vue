<script setup lang="ts">
defineProps<{ label: string }>()
defineSlots<{
  default(props: { id: string }): void
  'before-label'(): void
  'after-label'(): void
}>()

const internalId = crypto.randomUUID()
</script>

<template>
  <div class="form-field">
    <label class="form-field__label --font-bold --uppercase" :for="internalId">
      <slot name="before-label"></slot>
      {{ label }}
      <slot name="after-label"></slot>
    </label>

    <slot :id="internalId"></slot>
  </div>
</template>
<style lang="scss" scoped>
.form-field {
  &__label {
    margin-bottom: var(--s-2xs);
    align-items: center;
    gap: var(--s-xs);
    display: flex;
  }
}
</style>