<script setup lang="ts">
// App
import type { ModalAdHousingGalleryProps } from '@/components/modals/types'
import type { InjectedProps } from '@/stores/modals'
// Components
import CompEntityAdHousingGallery from '@/components/entity/ad/housing/image-gallery.vue'
import CompModalBase from '@/components/modals/m-base.vue'
import { Minimize } from '@lucide/vue'

defineProps<ModalAdHousingGalleryProps & InjectedProps<null>>()
</script>

<template>
  <CompModalBase close-on-escape-press :width="1400" @close="closeModal(null)">
    <template #content>

      <div class="close --pointer" @click="closeModal(null)">
        <Minimize :size="22" />
      </div>

      <CompEntityAdHousingGallery
        :start-index="activeIndex"
        :images="images" />
    </template>
  </CompModalBase>
</template>

<style lang="scss" scoped>
.close {
  background: var(--c-background-surface);
  border-radius: var(--radius-sm);
  padding: var(--s-2xs);
  position: absolute;
  right: var(--s-xl);
  top: var(--s-xl);
  z-index: 10;
}
</style>