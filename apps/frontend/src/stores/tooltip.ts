import { defineStore } from 'pinia'
import { markRaw, ref } from 'vue'
// App
import {
  DEFAULT_TOOLTIP_OPTIONS,
  type Tooltip,
  type TooltipOptions
} from '@/stores/tooltip/types'

type ActiveTooltip<Props extends object> = {
  tooltip: Tooltip<Props>,
  element: HTMLElement,
}

export const useTooltipStore = defineStore('tooltip', () => {
  const activeTooltip = ref<null | ActiveTooltip<object>>(null)
  const activeElement = ref<null | HTMLElement>(null)

  const clear = () => {
    activeTooltip.value = null
    if (activeElement.value) {
      activeElement.value.removeEventListener('mouseleave', onElementLeave)
      activeElement.value = null
    }
  }

  const onElementLeave = () => clear()
  const getOptions = <Props extends object>(tooltip: Tooltip<Props>): TooltipOptions => {
    if (!tooltip.options) return DEFAULT_TOOLTIP_OPTIONS
    return { ...DEFAULT_TOOLTIP_OPTIONS, ...tooltip.options }
  }

  const launchTooltip = <Props extends object>(element: HTMLElement, tooltip: Tooltip<Props>): void => {

    const component = markRaw(tooltip.component)
    const options = getOptions(tooltip)

    activeElement.value = element
    if (options.closeOnTargetElementLeave) activeElement.value.addEventListener('mouseleave', onElementLeave)

    activeTooltip.value = {
      tooltip: {
        ...tooltip,
        component,
        options
      },
      element,
    }
  }

  return {
    launchTooltip,
    activeTooltip,
  }
})
