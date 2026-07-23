import { useI18n } from 'vue-i18n'
// App
import type { TooltipMessageProps } from '@/components/tooltips/types'
import { TOOLTIP_POSITION } from '@/stores/tooltip/types'
import type { E_ROUTER_PAGES } from '@/router/enums'
import { useTooltipStore } from '@/stores/tooltip'
// Components
import TooltipMessage from '@/components/tooltips/t-message.vue'

export function useTooltips () {
  const tooltipStore = useTooltipStore()
  const { t } = useI18n()

  const linkTooltip = (event: MouseEvent, name: E_ROUTER_PAGES) => {
    if (!event.target) return
    const message = t(`enums.pages.${name}`)

    tooltipStore.launchTooltip<TooltipMessageProps>(event.target as HTMLElement, {
      position: TOOLTIP_POSITION.BOTTOM,
      props: { messages: [ message ] },
      component: TooltipMessage,
    })
  }

  const scheduleTypeTooltip = (event: MouseEvent, message: string) => {
    if (!event.target) return

    tooltipStore.launchTooltip<TooltipMessageProps>(event.target as HTMLElement, {
      position: TOOLTIP_POSITION.BOTTOM,
      props: { messages: [ message ] },
      component: TooltipMessage,
    })
  }

  const sourceLocationInfo = (event: MouseEvent, props: TooltipMessageProps) => {
    if (!event.target) return

    tooltipStore.launchTooltip<TooltipMessageProps>(event.target as HTMLElement, {
      position: TOOLTIP_POSITION.RIGHT,
      component: TooltipMessage,
      props
    })
  }

  return {
    scheduleTypeTooltip,
    sourceLocationInfo,
    linkTooltip
  }
}