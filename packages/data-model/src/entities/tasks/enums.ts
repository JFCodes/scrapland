export enum E_TASK_TYPE {
  FIND_NEW_ADS = 'find-new-ads'
}

export enum E_TASK_STATUS {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PAUSED = 'paused',
  DELETED = 'deleted',
}

export enum E_TASK_SCHEDULE_TYPE {
  INTERVAL = 'interval',
  MANUAL = 'manual',
  CRON = 'cron',
}
