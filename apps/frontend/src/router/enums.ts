export enum E_ROUTER_PAGES {
  NOTIFICATIONS = 'notifications',
  SETTINGS = 'settings',
  HOME = 'home',
    HOME_INDEX = 'home-index',
  EXECUTIONS = 'executions',
    EXECUTIONS_ALL = 'executions-all',
    EXECUTIONS_QUEUE = 'executions-queue',
    EXECUTIONS_RUNNING = 'executions-running',
    EXECUTIONS_ABORTED = 'executions-aborted',
    EXECUTIONS_FAILED = 'executions-failed',
    EXECUTIONS_COMPLETED = 'executions-completed',
  VEHICLES = 'vehicles',
  HOUSING = 'housing',
    HOUSING_DASHBOARD = 'housing-dashboard',
    HOUSING_TASKS = 'housing-tasks',
    HOUSING_ADS = 'housing-ads',
}

export enum E_ROUTER_PARAMS {
  AD_ENTITY = 'ad_entity'
}

export enum E_ROUTER_QUERIES {}

export const CONST_ROUTER_PATHS: Record<E_ROUTER_PAGES, string> = {
  [E_ROUTER_PAGES.NOTIFICATIONS]: '/notifications',
  [E_ROUTER_PAGES.SETTINGS]: '/settings',
  [E_ROUTER_PAGES.HOME]: '/',
    [E_ROUTER_PAGES.HOME_INDEX]: '',
  [E_ROUTER_PAGES.EXECUTIONS]: '/executions',
    [E_ROUTER_PAGES.EXECUTIONS_ALL]: '',
    [E_ROUTER_PAGES.EXECUTIONS_QUEUE]: 'queue',
    [E_ROUTER_PAGES.EXECUTIONS_RUNNING]: 'running',
    [E_ROUTER_PAGES.EXECUTIONS_ABORTED]: 'aborted',
    [E_ROUTER_PAGES.EXECUTIONS_FAILED]: 'failed',
    [E_ROUTER_PAGES.EXECUTIONS_COMPLETED]: 'completed',
  [E_ROUTER_PAGES.VEHICLES]: '/vehicles',
  [E_ROUTER_PAGES.HOUSING]: '/housing',
    [E_ROUTER_PAGES.HOUSING_DASHBOARD]: '',
    [E_ROUTER_PAGES.HOUSING_TASKS]: 'tasks',
    [E_ROUTER_PAGES.HOUSING_ADS]: 'ads',
}
