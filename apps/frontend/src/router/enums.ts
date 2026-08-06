export enum E_ROUTER_PAGES {
  NOTIFICATIONS = 'notifications',
  SETTINGS = 'settings',
  TASKS = 'tasks',
  HOME = 'home',
    HOME_INDEX = 'home-index',
  EXECUTIONS = 'executions',
    EXECUTIONS_HISTORY = 'executions-history',
    EXECUTIONS_ALL = 'executions-all',
    EXECUTIONS_QUEUE = 'executions-queue',
    EXECUTIONS_RUNNING = 'executions-running',
    EXECUTIONS_ABORTED = 'executions-aborted',
    EXECUTIONS_FAILED = 'executions-failed',
    EXECUTIONS_COMPLETED = 'executions-completed',
  VEHICLES = 'vehicles',
    VEHICLES_DASHBOARD = 'vehicles-dashboard',
    VEHICLES_TASKS = 'vehicles-tasks',
    VEHICLES_ADS = 'vehicles-ads',
      VEHICLES_ADS_ALL = 'vehicle-ads-all',
  HOUSING = 'housing',
    HOUSING_DASHBOARD = 'housing-dashboard',
    HOUSING_TASKS = 'housing-tasks',
    HOUSING_ADS = 'housing-ads',
      HOUSING_ADS_ALL = 'housing-ads-all',
      HOUSING_ADS_CLASSIFY = 'housing-ads-classify',
}

export enum E_ROUTER_PARAMS {
  AD_ENTITY = 'ad_entity'
}

export enum E_ROUTER_QUERIES {
  AD_STATUS = 'ad-status',
  LIST_VIEW = 'list-view'
}

export const CONST_ROUTER_PATHS: Record<E_ROUTER_PAGES, string> = {
  [E_ROUTER_PAGES.NOTIFICATIONS]: '/notifications',
  [E_ROUTER_PAGES.SETTINGS]: '/settings',
  [E_ROUTER_PAGES.TASKS]: '/tasks',
  [E_ROUTER_PAGES.HOME]: '/',
    [E_ROUTER_PAGES.HOME_INDEX]: '',
  [E_ROUTER_PAGES.EXECUTIONS]: '/executions',
    [E_ROUTER_PAGES.EXECUTIONS_HISTORY]: '',
    [E_ROUTER_PAGES.EXECUTIONS_ALL]: 'all',
    [E_ROUTER_PAGES.EXECUTIONS_QUEUE]: 'queue',
    [E_ROUTER_PAGES.EXECUTIONS_RUNNING]: 'running',
    [E_ROUTER_PAGES.EXECUTIONS_ABORTED]: 'aborted',
    [E_ROUTER_PAGES.EXECUTIONS_FAILED]: 'failed',
    [E_ROUTER_PAGES.EXECUTIONS_COMPLETED]: 'completed',
  [E_ROUTER_PAGES.VEHICLES]: '/vehicles',
    [E_ROUTER_PAGES.VEHICLES_DASHBOARD]: '',
    [E_ROUTER_PAGES.VEHICLES_TASKS]: 'tasks',
    [E_ROUTER_PAGES.VEHICLES_ADS]: 'ads',
      [E_ROUTER_PAGES.VEHICLES_ADS_ALL]: '',
  [E_ROUTER_PAGES.HOUSING]: '/housing',
    [E_ROUTER_PAGES.HOUSING_DASHBOARD]: '',
    [E_ROUTER_PAGES.HOUSING_TASKS]: 'tasks',
    [E_ROUTER_PAGES.HOUSING_ADS]: 'ads',
      [E_ROUTER_PAGES.HOUSING_ADS_ALL]: '',
      [E_ROUTER_PAGES.HOUSING_ADS_CLASSIFY]: 'classify'
}
