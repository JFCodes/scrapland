<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <h3 class="--text-white --text-lg --font-bold --pt-md">
    {{ title }}
  </h3>
</template>
