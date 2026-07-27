import { watch, onBeforeUnmount, type Ref } from 'vue'

export function useOnScrollEnd (
  elementRef: Ref<null | HTMLElement>,
  onScrollEnd: () => void,
  debounceTime = 100
) {
  let listenerAttached = false
  let debounceTimeout: null | ReturnType<typeof window.setTimeout> = null

  const onScroll = (event: Event): void => {
    if (!event.target) return

    const element = event.target as HTMLElement
    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) debounceOnScrollEnd()
  }

  const debounceOnScrollEnd = (): void => {
    if (debounceTimeout !== null) window.clearTimeout(debounceTimeout)
    debounceTimeout = window.setTimeout(() => {
      onScrollEnd()
      debounceTimeout = null
    }, debounceTime)
  }

  const addListener = (): void => {
    if (!elementRef.value) return
    if (listenerAttached) return

    elementRef.value.addEventListener('scroll', onScroll)
    listenerAttached = true
  }

  watch(elementRef, addListener, { immediate: true })
  onBeforeUnmount(() => elementRef.value?.removeEventListener('scroll', onScroll))

}