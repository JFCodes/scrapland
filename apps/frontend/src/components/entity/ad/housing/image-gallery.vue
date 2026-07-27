<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// App
import { useModals } from '@/composables/modals'
// Components
import CompUiNumberNavigation from '@/components/ui/ui-number-navigation.vue'
import { Maximize } from '@lucide/vue'

const props = defineProps<{
  images: Array<string>
  canMaximize?: boolean
  startIndex?: number
}>()

const { adHousingGallery } = useModals()

const activeIndex = ref(0)
const activeImage = computed(() => props.images[activeIndex.value])

const seedActiveIndex = () => {
  if (props.startIndex === undefined) return

  const topClamp = Math.min(props.startIndex, props.images.length - 1)
  const bottomClamp = Math.max(0, topClamp)
  activeIndex.value = bottomClamp
}

const maximize = () => {
  if (!props.canMaximize) return
  adHousingGallery({
    activeIndex: activeIndex.value,
    images: props.images,
  })
}

onMounted(seedActiveIndex)
</script>

<template>
  <div class="gallery">
    <div v-if="canMaximize" class="gallery__expand --pointer" @click="maximize">
      <Maximize :size="22" />
    </div>

    <div class="gallery__image --mb-xs">
      <img v-if="activeImage" class="gallery__image-img" :src="activeImage" />
    </div>

    <nav class="gallery__nav">
      <CompUiNumberNavigation
        v-model="activeIndex"
        :count="images.length" />
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  border: solid 1px var(--c-border);
  border-radius: var(--radius-md);
  padding: var(--s-sm);
  position: relative;

  &__expand {
    background: var(--c-background-surface);
    border-radius: var(--radius-sm);
    padding: var(--s-2xs);
    position: absolute;
    right: var(--s-md);
    top: var(--s-md);
  }

  &__image {
    aspect-ratio: 4/3;

    &-img {
      object-position: center center;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__nav {
    justify-content: center;
    display: flex;
  }
}
</style>