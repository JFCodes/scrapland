import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/housing/v-ads.vue'
// Sub routes
import { route as ClassifyRoute } from '@/router/routes/housing/ads/classify'
import { route as AllRoute } from '@/router/routes/housing/ads/all'

const name = E_ROUTER_PAGES.HOUSING_ADS

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.HOUSING_ADS_ALL },
  children: [AllRoute, ClassifyRoute],
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
}
