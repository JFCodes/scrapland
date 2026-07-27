<script setup lang="ts">
import { computed } from 'vue'
// Components
import { Rewind, FastForward, Play } from '@lucide/vue'

type NumberGroups = Array<Array<number>>

const props = defineProps<{ count: number }>()

const activeIndex = defineModel<number>({ default: 0 })

const selectFirst = () => activeIndex.value = 0
const previous = () => activeIndex.value = Math.max(0, activeIndex.value - 1)
const next = () => activeIndex.value = Math.min(props.count - 1, activeIndex.value + 1)
const selectLast = () => activeIndex.value = props.count - 1

const numberGroups = computed<NumberGroups>(() => {
  if (props.count <= 9) {
    const group = new Array(props.count).fill(0).map((_, index) => index)
    return [group]
  }

  const beforeGroup: Array<number> = []
  const activeGroup = [activeIndex.value]
  const afterGroup: Array<number> = []

  // Add the 5 indexes before the active index

  for (let beforeI = activeIndex.value - 1; beforeI >= activeIndex.value - 5; beforeI--) {
    if (beforeI >= 0) beforeGroup.unshift(beforeI)
  }

  for (let beforeI = activeIndex.value + 1; beforeI <= activeIndex.value + 5; beforeI++) {
    if (beforeI <= props.count - 1) afterGroup.push(beforeI)
  }

  // Fill missing before group elements in the after group
  if (beforeGroup.length < 5) {
    const toAdd = 5 - beforeGroup.length
    const lastAfterGroup = afterGroup[afterGroup.length - 1]
    if (lastAfterGroup !== undefined) {
      const fillNumbers = new Array(toAdd).fill('').map((_, index) => lastAfterGroup + index + 1)
      afterGroup.push(...fillNumbers)
    }
  }

  // Fill missing after group elements in the before group
  if (afterGroup.length < 5) {
    const toAdd = 5 - afterGroup.length
    const firstBeforeGroup = beforeGroup[0]
    if (firstBeforeGroup) {
      const fillNumbers = new Array(toAdd).fill('').map((_, index) => firstBeforeGroup - index - 1)
      beforeGroup.unshift(...fillNumbers)
    }
  }

  return [
    beforeGroup,
    activeGroup,
    afterGroup
  ]
})

</script>

<template>
  <div
    class="navigation"
    @keydown.left="previous"
    @keydown.right="next">

    <button
      class="navigation__btn --pointer"
      type="button"
      :disabled="activeIndex === 0"
      @click="selectFirst">
      <Rewind :size="20" />
    </button>

    <button
      class="navigation__btn --pointer"
      type="button"
      :disabled="activeIndex === 0"
      @click="previous">
      <Play class="--rotate-180" :size="20" />
    </button>

    <template v-for="(group, groupIndex) in numberGroups" :key="`group-${groupIndex}`">
      <template v-for="(number, numberIndex) in group" :key="`number-${numberIndex}`">
        <button
          class="navigation__btn --pointer"
          type="button"
          :class="{ 'navigation__btn--active': number === activeIndex }"
          @click="activeIndex = number">
          {{ number + 1 }}
        </button>
      </template>
    </template>

    <button
      class="navigation__btn --pointer"
      type="button"
      :disabled="activeIndex === count - 1"
      @click="next">
      <Play :size="20" />
    </button>

    <button
      class="navigation__btn --pointer"
      type="button"
      :disabled="activeIndex === count - 1"
      @click="selectLast">
      <FastForward :size="20" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  align-items: center;
  display: flex;

  &__btn {
    border: solid 1px var(--c-number-navigation-border);
    color: var(--c-number-navigation-border);
    justify-content: center;
    background: transparent;
    align-items: center;
    display: flex;
    height: 32px;
    width: 32px;

    &--active {
      border-color: var(--c-number-navigation-border-active);
      color: var(--c-number-navigation-border-active);
    }

    &:disabled {
      border-color: var(--c-number-navigation-border-disabled);
      color: var(--c-number-navigation-border-disabled);
    }

    &:first-child {
      border-bottom-left-radius: var(--radius-sm);
      border-top-left-radius: var(--radius-sm);
    }

    &:last-child {
      border-bottom-right-radius: var(--radius-sm);
      border-top-right-radius: var(--radius-sm);
    }
  }
}
</style>