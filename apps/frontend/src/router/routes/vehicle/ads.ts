import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/vehicles/v-ads.vue'
// Sub routes
import { route as AllRoute } from '@/router/routes/vehicle/ads/all'

const name = E_ROUTER_PAGES.VEHICLES_ADS

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.VEHICLES_ADS_ALL },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  children: [AllRoute],
  name,
}
