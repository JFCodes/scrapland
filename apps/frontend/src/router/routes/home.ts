import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-home.vue'
// Sub routes
import { route as IndexRoute } from '@/router/routes/home/index'

const name = E_ROUTER_PAGES.HOME

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.HOME_INDEX },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  children: [IndexRoute],
  name,
}
