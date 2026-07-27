import {
  type T_Ad_Housing_BuildingType,
  E_TASK_SCHEDULE_TYPE,
  E_EXECUTION_STATUS,
  E_AD_ENTITY_TYPE,
  E_ENTITY_TYPE,
  E_TASK_STATUS,
  E_AD_STATUS,
  E_TASK_TYPE,
} from '@scrapland/data-model'
import { E_ROUTER_PAGES } from '@/router/enums'

const adEntityType: Record<E_AD_ENTITY_TYPE, string> = {
  [E_AD_ENTITY_TYPE.VEHICLE]: 'Vehicles',
  [E_AD_ENTITY_TYPE.HOUSING]: 'Housing',
}

const taskStatus: Record<E_TASK_STATUS, string> = {
  [E_TASK_STATUS.DRAFT]: 'Draft',
  [E_TASK_STATUS.PUBLISHED]: 'Published',
  [E_TASK_STATUS.PAUSED]: 'Paused',
  [E_TASK_STATUS.DELETED]: 'Deleted',
}

const entityTypes: Record<E_ENTITY_TYPE, string> = {
  [E_ENTITY_TYPE.EXECUTION]: 'Executions',
  [E_ENTITY_TYPE.TARGET]: 'Targets',
  [E_ENTITY_TYPE.TASK]: 'Tasks',
  [E_ENTITY_TYPE.AD]: 'Ads',
}

const pages: Record<E_ROUTER_PAGES, string> = {
  [E_ROUTER_PAGES.NOTIFICATIONS]: 'Notifications',
  [E_ROUTER_PAGES.SETTINGS]: 'Settings',
  [E_ROUTER_PAGES.HOME]: 'Home',
  [E_ROUTER_PAGES.HOME_INDEX]: '',
  [E_ROUTER_PAGES.EXECUTIONS]: 'Executions',
  [E_ROUTER_PAGES.EXECUTIONS_ALL]: 'Executions',
  [E_ROUTER_PAGES.EXECUTIONS_QUEUE]: 'Queued executions',
  [E_ROUTER_PAGES.EXECUTIONS_RUNNING]: 'Running executions',
  [E_ROUTER_PAGES.EXECUTIONS_ABORTED]: 'Aborted executions',
  [E_ROUTER_PAGES.EXECUTIONS_FAILED]: 'Failed executions',
  [E_ROUTER_PAGES.EXECUTIONS_COMPLETED]: 'Completed executions',
  [E_ROUTER_PAGES.VEHICLES]: 'Vehicles',
  [E_ROUTER_PAGES.HOUSING]: 'Housing',
  [E_ROUTER_PAGES.HOUSING_DASHBOARD]: 'Dashboard',
  [E_ROUTER_PAGES.HOUSING_TASKS]: 'Tasks',
  [E_ROUTER_PAGES.HOUSING_ADS]: 'Housing ads',
  [E_ROUTER_PAGES.HOUSING_ADS_ALL]: 'All ads',
  [E_ROUTER_PAGES.HOUSING_ADS_CLASSIFY]: 'Classify ads',
}

const executionStatus: Record<E_EXECUTION_STATUS, string> = {
  [E_EXECUTION_STATUS.QUEUED]: 'Queued',
  [E_EXECUTION_STATUS.RUNNING]: 'Running',
  [E_EXECUTION_STATUS.ABORTED]: 'Aborted',
  [E_EXECUTION_STATUS.FAILED]: 'Failed',
  [E_EXECUTION_STATUS.COMPLETED]: 'Completed',
}

const taskScheduleType: Record<E_TASK_SCHEDULE_TYPE, string> = {
  [E_TASK_SCHEDULE_TYPE.INTERVAL]: 'Interval',
  [E_TASK_SCHEDULE_TYPE.MANUAL]: 'Manual',
  [E_TASK_SCHEDULE_TYPE.CRON]: 'Cron Job',
}

const adStatus: Record<E_AD_STATUS, string> = {
  [E_AD_STATUS.NEW]: 'New',
  [E_AD_STATUS.DELETED]: 'Deleted',
  [E_AD_STATUS.INTERESTING]: 'Interesting',
  [E_AD_STATUS.CONTACT_MADE]: 'Contact Made',
  [E_AD_STATUS.PROPOSAL_MADE]: 'Proposal Made',
  [E_AD_STATUS.PROPOSAL_ACCEPTED]: 'Proposal Accepted',
  [E_AD_STATUS.PROPOSAL_REJECTED]: 'Proposal Rejected',
  [E_AD_STATUS.COMPLETED]: 'Completed',
}

const adHousingBuildingTypes: Record<T_Ad_Housing_BuildingType, string> = {
  'single-house': 'Single house',
  'apartment': 'Apartment',
}

const taskType: Record<E_TASK_TYPE, string> = {
  [E_TASK_TYPE.FIND_NEW_ADS]: 'find new ads'
}

export default {
  global: {
    all: 'All',
    area: 'Area',
    askingPrice: 'Asking price',
    buildingTypes: 'Building Types',
    classify: 'Classify',
    discardChanges: 'Discard changes',
    location: 'Location',
    createdAt: 'Created ad',
    noParking: 'No parking',
    rooms: 'Rooms',
    save: 'Save',
    schedule: 'Schedule',
    scheduleExecution: 'Schedule execution',
    status: 'Status',
    target: 'Target',
    targetId: 'Source id',
    task: 'Task',
  },
  pages: {
    adsHousingAll: {
      indexTitle: 'All housing ads',
      showing: 'showing {loaded} of {total} housing ads',
    }
  },
  components: {},
  entities: {
    task: {
      schedule: {
        interval: 'Not set | This task runs every minute | This task runs every {count} minutes',
        manual: 'This task only runs on a manual trigger',
        cron: 'This cron job runs: {cronDescription}'
      },
    },
  },
  tooltips: {
    targetLocation1: 'Location option is based on the source website.',
    targetLocation2: 'Please check the source information about this field.',
  },
  panels: {
    task: {
      createTitle: 'Create new task',
      editTitle: 'Edit task',
    }
  },
  toasts: {
    executionQueued: {
      message: `Task '{taskType}' '{adEntityType}' on target '{target}' is queued for execution.`,
      title: 'Task execution queued',
    },
    executionRunning: {
      message: `Task '{taskType}' '{adEntityType}' on target '{target}' is started execution.`,
      title: 'Task execution running',
    },
    executionAborted: {
      message: `Task '{taskType}' '{adEntityType}' on target '{target}' was aborted.`,
      title: 'Task execution aborted',
    },
    executionFailed: {
      message: `Task '{taskType}' '{adEntityType}' on target '{target}' failed execution.`,
      title: 'Task execution failed',
    },
    executionCompleted: {
      message: `Task '{taskType}' '{adEntityType}' on target '{target}' completed execution.`,
      title: 'Task execution completed',
    },
    patchAdError: {
      title: 'Failed to update ad',
      message: `Failed to save changes to add with id '{adId}'`
    }
  },
  enums: {
    adHousingBuildingTypes,
    taskScheduleType,
    executionStatus,
    adEntityType,
    entityTypes,
    taskStatus,
    taskType,
    adStatus,
    pages,
  }
} as const
