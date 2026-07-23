import { onMounted, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'

const MAX_DEPTH = 100

export function useClickoutSide (
  elements: Array<MaybeRefOrGetter<null | HTMLElement>>,
  onClickOutside: () => void
) {

  const onWindowClick = (event: MouseEvent): void => {
    if (!event.target) return
    checkClickOutside(event.target as HTMLElement)
  }

  const checkClickOutside = (checkElement: HTMLElement, attempt = 0): void => {
    if (attempt > MAX_DEPTH) return

    // Reached body tag -> click was outside
    if (checkElement.tagName === 'BODY') {
      onClickOutside()
      return
    }

    // Element is tracked elements -> click was inside
    const trackedElements = elements.map(toValue).filter(e => e !== null)
    if (trackedElements.some(e => checkElement.isSameNode(e))) return

    if (!checkElement.parentElement) return
    checkClickOutside(checkElement.parentElement, attempt + 1)
  }

  onUnmounted(() => window.removeEventListener('click', onWindowClick))
  onMounted(() => window.addEventListener('click', onWindowClick))

  return {}
}