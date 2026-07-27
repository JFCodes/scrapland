import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
// App
import type { UiPageTabRoute, UiPageTab} from '@/components/types'

export function tabIsActive (
  route: RouteLocationNormalizedLoadedGeneric,
  tab: UiPageTabRoute | UiPageTab,
  activeKey?: string
): boolean {
  if ('to' in tab) {
    if (typeof tab.to !== 'string') {
      let hasSameName = false
      let hasSameParams = true

      if ('name' in tab.to) hasSameName = tab.to.name === route.name
      if ('params' in tab.to) {
        hasSameParams = JSON.stringify(tab.to.params) === JSON.stringify(route.params)
      }

      return hasSameName && hasSameParams
    }
  }

  return tab.key === activeKey
}