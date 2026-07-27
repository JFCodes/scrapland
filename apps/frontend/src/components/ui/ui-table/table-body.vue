<script setup lang="ts" generic="I extends { _id: string }">

defineSlots<{
  row(props: { item: I, index: number }): void
}>()

defineProps<{ items: Array<I> }>()
</script>

<template>
  <tbody>
    <tr v-for="(item, index) in items" :key="item._id">
      <slot name="row" :index="index" :item="item"></slot>
    </tr>
  </tbody>
</template>
