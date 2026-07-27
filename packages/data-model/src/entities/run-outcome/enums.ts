export enum E_RUN_OUTCOME_RESULT {
  INITIALIZED = 'initialize',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum E_RUN_OUTCOME_ERROR_TYPE {
  // Housing add specific
  AD_HOUSING_FIND_NEW_MISSING_NECESSARY_OPTIONS = 'ad-housing-find-new-missing-necessary-options',
  AD_HOUSING_FIND_NEW_EXECUTION_ERROR = 'ad-housing-find-new-missing-execution-error',
  
  // Find new ads routine specific
  FIND_NEW_ADS_EXECUTION_MAX_RESULTS = 'find-new-ads-execution-reached-max-results-count',
  
  // Browser instance and setup specific
  BROWSER_LAUNCH_OR_INITIAL_SETUP_ERROR = 'browser-launch-or-initial-setup-error',
  
  // Data processing specific
  AD_PARSING_ERROR = 'ad-parsing-error',

  // Unknown, generic or undocumented
  ROUTINE_EXECUTION_ERROR = 'routine-execution-error',
  UNKNOWN_EXECUTION_ERROR = 'unknown-execution-error',
}
