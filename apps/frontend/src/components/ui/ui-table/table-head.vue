<script setup lang="ts">
// App
import type { UiTableHeader } from '@/components/types'

defineProps<{ headers: Array<UiTableHeader> }>()
</script>

<template>
  <thead>
    <tr>
      <th
        v-for="(header, index) in headers"
        :key="`header-${index}`">
        {{ header.label }}
      </th>
    </tr>
  </thead>
</template>
